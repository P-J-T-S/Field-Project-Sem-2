/**
 * pdfService.js  — Vercel-compatible PDF generation
 * ─────────────────────────────────────────────────────────────────────────────
 * Uses @sparticuz/chromium + puppeteer-core (stays under Vercel's 50MB limit).
 *
 * Install:
 *   npm uninstall puppeteer
 *   npm install @sparticuz/chromium puppeteer-core
 *
 * Folder structure expected:
 *   backend/
 *   ├── services/
 *   │   └── pdfService.js        ← this file
 *   └── templates/
 *       └── receipt.html         ← your receipt template
 *
 * Template variables replaced at runtime:
 *   {{DONOR_NAME}}  {{DONOR_EMAIL}}  {{DONOR_PHONE}}
 *   {{TXN_ID}}      {{PHONEPE_TXN_ID}}
 *   {{AMOUNT}}      {{AMOUNT_IN_WORDS}}
 *   {{RECEIPT_NUMBER}}  {{RECEIPT_DATE}}  {{PAYMENT_DATE}}
 */

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Template path — works both locally and on Vercel ─────────────────────────
// backend/services/pdfService.js → same folder → receipt.html
const TEMPLATE_PATH = path.resolve(__dirname, "receipt.html");

// ── Number → Indian words ─────────────────────────────────────────────────────
const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const cvtH = (n) => {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100)
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  return (
    ones[Math.floor(n / 100)] +
    " Hundred" +
    (n % 100 ? " " + cvtH(n % 100) : "")
  );
};

export const numberToWords = (num) => {
  if (!num || num === 0) return "Zero";
  const n = Math.floor(num);
  if (n >= 10_000_000)
    return (
      cvtH(Math.floor(n / 10_000_000)) +
      " Crore " +
      numberToWords(n % 10_000_000)
    );
  if (n >= 100_000)
    return (
      cvtH(Math.floor(n / 100_000)) + " Lakh " + numberToWords(n % 100_000)
    );
  if (n >= 1_000)
    return (
      cvtH(Math.floor(n / 1_000)) +
      " Thousand" +
      (n % 1_000 ? " " + numberToWords(n % 1_000) : "")
    );
  return cvtH(n);
};

// ── Date formatter ────────────────────────────────────────────────────────────
const fmtDate = (iso) =>
  new Date(iso || Date.now()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

// ── Main export ───────────────────────────────────────────────────────────────
/**
 * @param {object} donation
 * @param {string}  donation.txnId
 * @param {string}  [donation.phonePeTxnId]
 * @param {string}  donation.name
 * @param {string}  donation.email
 * @param {string}  donation.phone
 * @param {number}  donation.amountRupees
 * @param {string}  [donation.completedAt]
 * @param {number}  [donation.receiptNo]
 * @returns {Promise<Buffer>}
 */
export const generateReceiptPDF = async (donation) => {
  // ── Read template ───────────────────────────────────────────────────────────
  if (!fs.existsSync(TEMPLATE_PATH))
    throw new Error(
      `receipt.html not found at: ${TEMPLATE_PATH}\n` +
        `Make sure backend/services/receipt.html exists.`,
    );

  let html = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  // ── Build receipt number ────────────────────────────────────────────────────
  const receiptNo = donation.receiptNo
    ? `RCP-${String(donation.receiptNo).padStart(4, "0")}`
    : donation.txnId; // fallback if sheet write failed

  // ── Replace all placeholders ────────────────────────────────────────────────
  const replacements = {
    "{{DONOR_NAME}}": donation.name || "—",
    "{{DONOR_EMAIL}}": donation.email || "—",
    "{{DONOR_PHONE}}": donation.phone || "—",
    "{{TXN_ID}}": donation.txnId || "—",
    "{{PHONEPE_TXN_ID}}": donation.phonePeTxnId || "—",
    "{{AMOUNT}}": Number(donation.amountRupees).toLocaleString("en-IN"),
    "{{AMOUNT_IN_WORDS}}": numberToWords(Math.floor(donation.amountRupees)),
    "{{RECEIPT_NUMBER}}": receiptNo,
    "{{RECEIPT_DATE}}": fmtDate(donation.completedAt),
    "{{PAYMENT_DATE}}": fmtDate(donation.completedAt),
  };

  for (const [k, v] of Object.entries(replacements))
    html = html.split(k).join(v);

  // ── Launch Chromium ─────────────────────────────────────────────────────────
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      width: "210mm",
      height: "148mm", // A5 landscape — matches physical receipt
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log(`[PDF] ${receiptNo} generated — ${pdfBuffer.length} bytes`);
    return pdfBuffer;
  } finally {
    await browser.close();
  }
};
