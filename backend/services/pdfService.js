/**
 * pdfService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates a donation receipt PDF by:
 *  1. Reading the HTML template from `../templates/receipt.html`
 *  2. Injecting real donor data into the template variables ({{...}})
 *  3. Rendering the HTML to PDF using Puppeteer (headless Chromium)
 *  4. Returning the PDF as a Buffer (ready to be attached to an email)
 *
 * Template variables (all replaced at runtime):
 *   {{DONOR_NAME}}      – Full name of the donor
 *   {{DONOR_EMAIL}}     – Donor's email address
 *   {{DONOR_PHONE}}     – Donor's phone number
 *   {{TXN_ID}}          – Merchant transaction ID (DMCT-…)
 *   {{PHONEPE_TXN_ID}}  – PhonePe reference ID
 *   {{AMOUNT}}          – Donation amount in ₹ (e.g. "1,000")
 *   {{AMOUNT_IN_WORDS}} – Amount spelled out in words (e.g. "One Thousand")
 *   {{PAYMENT_DATE}}    – Formatted payment completion timestamp
 *   {{RECEIPT_NUMBER}}  – Same as TXN_ID (used as receipt identifier)
 *   {{RECEIPT_DATE}}    – Today's date (formatted)
 *
 * To swap in your own HTML later:
 *   – Replace the file at `backend/templates/receipt.html`
 *   – Keep (or add) the same {{VARIABLE}} placeholders wherever you need data
 *
 * Dependencies: puppeteer
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'receipt.html');

// ── Number → Words (supports up to crore range) ──────────────────────────────
const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen',
];
const tens = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
  'Sixty', 'Seventy', 'Eighty', 'Ninety',
];

const convertHundreds = (n) => {
  if (n === 0) return '';
  if (n < 20)  return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertHundreds(n % 100) : '');
};

export const numberToWords = (num) => {
  if (num === 0) return 'Zero';
  const n = Math.floor(num); // ignore paise for receipt wording
  if (n >= 10_000_000) {
    return convertHundreds(Math.floor(n / 10_000_000)) + ' Crore '  + numberToWords(n % 10_000_000);
  }
  if (n >= 100_000) {
    return convertHundreds(Math.floor(n / 100_000))   + ' Lakh '    + numberToWords(n % 100_000);
  }
  if (n >= 1_000) {
    return convertHundreds(Math.floor(n / 1_000))     + ' Thousand' + (n % 1_000 ? ' ' + numberToWords(n % 1_000) : '');
  }
  return convertHundreds(n);
};

// ── Date formatter ────────────────────────────────────────────────────────────
const fmtDate = (iso) =>
  new Date(iso || Date.now()).toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

const fmtDateShort = (iso) =>
  new Date(iso || Date.now()).toLocaleDateString('en-IN', {
    dateStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  });

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Generate a PDF receipt Buffer for a completed donation.
 *
 * @param {object} donation
 * @param {string} donation.txnId
 * @param {string} [donation.phonePeTxnId]
 * @param {string} donation.name
 * @param {string} donation.email
 * @param {string} donation.phone
 * @param {number} donation.amountRupees
 * @param {string} [donation.completedAt]  – ISO timestamp
 *
 * @returns {Promise<Buffer>} Raw PDF bytes
 */
export const generateReceiptPDF = async (donation) => {
  // ── Read template ──────────────────────────────────────────────────────────
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`Receipt template not found at: ${TEMPLATE_PATH}`);
  }

  let html = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // ── Build replacement map ──────────────────────────────────────────────────
  const amountFormatted = Number(donation.amountRupees).toLocaleString('en-IN');
  const amountWords     = numberToWords(Math.floor(donation.amountRupees));

  const replacements = {
    '{{DONOR_NAME}}':      donation.name            || '—',
    '{{DONOR_EMAIL}}':     donation.email           || '—',
    '{{DONOR_PHONE}}':     donation.phone           || '—',
    '{{TXN_ID}}':          donation.txnId           || '—',
    '{{PHONEPE_TXN_ID}}':  donation.phonePeTxnId    || '—',
    '{{AMOUNT}}':          amountFormatted,
    '{{AMOUNT_IN_WORDS}}': amountWords,
    '{{PAYMENT_DATE}}':    fmtDate(donation.completedAt),
    '{{RECEIPT_NUMBER}}':  donation.txnId           || '—',
    '{{RECEIPT_DATE}}':    fmtDateShort(donation.completedAt),
  };

  // Replace every placeholder
  for (const [placeholder, value] of Object.entries(replacements)) {
    // Use split/join to replace ALL occurrences (RegExp special chars in keys)
    html = html.split(placeholder).join(value);
  }

  // ── Launch Puppeteer and render PDF ───────────────────────────────────────
  const browser = await puppeteer.launch({
    headless: 'new',  // use new headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',   // important in Docker/CI environments
      '--disable-gpu',
    ],
  });

  try {
    const page = await browser.newPage();

    // Load HTML directly (no file:// URL needed)
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,   // render background colours/images
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });

    console.log(`[PDF] Receipt generated for txn=${donation.txnId} (${pdfBuffer.length} bytes)`);
    return pdfBuffer;
  } finally {
    await browser.close();
  }
};
