/**
 * emailService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Sends a donation confirmation email to the donor with the receipt PDF
 * attached, using Nodemailer over SMTP.
 *
 * Supported SMTP providers (set in .env):
 *   • Gmail    – works out of the box with an App Password
 *   • Outlook  – works with standard credentials
 *   • SendGrid – set host=smtp.sendgrid.net, user=apikey, pass=<API_KEY>
 *   • Any other SMTP server
 *
 * Environment variables required (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   EMAIL_FROM_NAME, EMAIL_FROM_ADDRESS, ADMIN_EMAIL (optional)
 *
 * Dependencies: nodemailer
 */

import nodemailer from 'nodemailer';

// ── Build the transporter (lazy singleton) ────────────────────────────────────
let _transporter = null;

const getTransporter = () => {
  if (_transporter) return _transporter;

  _transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT  || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true → port 465, false → STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Reasonable timeouts for production
    connectionTimeout: 10_000,
    greetingTimeout:   10_000,
    socketTimeout:     30_000,
  });

  return _transporter;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const fromAddress = () =>
  `"${process.env.EMAIL_FROM_NAME || 'DMCT Hospital'}" <${process.env.EMAIL_FROM_ADDRESS}>`;

const fmtCurrency = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 0 });

// ── Donor confirmation email HTML ─────────────────────────────────────────────

const buildDonorEmailHtml = (donation) => /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Donation Confirmation</title>
  <style>
    body      { margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Arial,sans-serif; }
    .wrapper  { max-width:560px; margin:40px auto; background:#fff; border-radius:6px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
    .top-bar  { background:#1B2A4A; padding:28px 32px; text-align:center; }
    .top-bar h1 { color:#fff; font-size:20px; margin:0 0 4px; font-weight:700; }
    .top-bar p  { color:rgba(255,255,255,.65); font-size:12px; margin:0; letter-spacing:1px; text-transform:uppercase; }
    .body     { padding:32px; }
    .greeting { font-size:16px; color:#1B2A4A; font-weight:600; margin-bottom:8px; }
    .intro    { font-size:13px; color:#4B5563; line-height:1.7; margin-bottom:24px; }
    .amount-box { background:#EFF6FF; border:1px solid #BFDBFE; border-radius:6px; padding:20px 24px; text-align:center; margin-bottom:24px; }
    .amount-box .label  { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#6B7280; margin-bottom:6px; }
    .amount-box .amount { font-size:36px; font-weight:800; color:#1B2A4A; }
    .amount-box .status { display:inline-block; margin-top:8px; background:#16A34A; color:#fff; font-size:11px; font-weight:700; padding:4px 14px; border-radius:20px; letter-spacing:1px; }
    table.details { width:100%; border-collapse:collapse; margin-bottom:24px; font-size:13px; }
    table.details td { padding:9px 12px; border-bottom:1px solid #F3F4F6; }
    table.details td:first-child { color:#6B7280; width:45%; }
    table.details td:last-child  { color:#1B2A4A; font-weight:600; word-break:break-all; }
    .attachment-note { background:#FFFBEB; border:1px solid #FCD34D; border-radius:4px; padding:12px 16px; font-size:12px; color:#92400E; margin-bottom:24px; }
    .attachment-note strong { display:block; margin-bottom:3px; }
    .divider  { border:none; border-top:1px solid #F3F4F6; margin:24px 0; }
    .footer-text { font-size:11px; color:#9CA3AF; line-height:1.7; }
    .footer-text a { color:#3B82F6; text-decoration:none; }
    .bottom-bar { background:#F9FAFB; border-top:1px solid #F3F4F6; padding:16px 32px; text-align:center; font-size:11px; color:#9CA3AF; }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Top bar -->
    <div class="top-bar">
      <h1>DMCT Hospital &amp; Old Age Home</h1>
      <p>Donation Confirmation</p>
    </div>

    <!-- Body -->
    <div class="body">
      <p class="greeting">Dear ${donation.name},</p>
      <p class="intro">
        Thank you for your generous contribution to DMCT Hospital &amp; Old Age Home.
        Your donation brings warmth, care, and dignity to our elderly residents.
        Please find your official receipt attached to this email as a PDF.
      </p>

      <!-- Amount -->
      <div class="amount-box">
        <div class="label">Donation Amount</div>
        <div class="amount">${fmtCurrency(donation.amountRupees)}</div>
        <div class="status">✓ &nbsp;Payment Successful</div>
      </div>

      <!-- Details table -->
      <table class="details">
        <tr><td>Donor Name</td>        <td>${donation.name}</td></tr>
        <tr><td>Email</td>             <td>${donation.email}</td></tr>
        <tr><td>Phone</td>             <td>${donation.phone}</td></tr>
        <tr><td>Transaction ID</td>    <td style="font-size:11px;">${donation.txnId}</td></tr>
        <tr><td>PhonePe Reference</td> <td style="font-size:11px;">${donation.phonePeTxnId || '—'}</td></tr>
        <tr><td>Payment Method</td>    <td>PhonePe</td></tr>
        <tr><td>Payment Date</td>      <td>${new Date(donation.completedAt || Date.now()).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}</td></tr>
      </table>

      <!-- Attachment note -->
      <div class="attachment-note">
        <strong>📎 Receipt Attached</strong>
        Your official donation receipt (PDF) is attached to this email.
        Please save it for your records and for any tax benefit claims.
      </div>

      <hr class="divider"/>

      <p class="footer-text">
        For any queries, please call us at <a href="tel:7977211807">7977 211 807</a>
        or <a href="tel:7400439760">7400 439 760</a>.<br/>
        Visiting hours: 10 AM – 6 PM<br/><br/>
        <strong>DMCT Hospital &amp; Old Age Home</strong><br/>
        New Rachna Park Shopping Centre, Near Saint Mary's School,<br/>
        Chakki Naka, Kalyan East, Thane – 421306, Maharashtra
      </p>
    </div>

    <!-- Bottom bar -->
    <div class="bottom-bar">
      This is an automated message. Please do not reply to this email.<br/>
      Payments are securely processed by PhonePe (256-bit SSL).
    </div>
  </div>
</body>
</html>
`;

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Send a donation confirmation email to the donor with the receipt PDF.
 *
 * @param {object} donation   – Full donation metadata (same shape as other services)
 * @param {Buffer} pdfBuffer  – The generated PDF receipt as a raw Buffer
 *
 * @returns {Promise<object>} Nodemailer info object (messageId, etc.)
 */
export const sendDonorConfirmationEmail = async (donation, pdfBuffer) => {
  const transporter = getTransporter();

  // Verify SMTP connection before sending (helpful to surface misconfig early)
  await transporter.verify();

  const fileName = `DMCT_Donation_Receipt_${donation.txnId}.pdf`;

  const info = await transporter.sendMail({
    from:    fromAddress(),
    to:      donation.email,
    subject: `Donation Confirmed – ₹${Number(donation.amountRupees).toLocaleString('en-IN')} | DMCT Hospital`,
    html:    buildDonorEmailHtml(donation),

    // Plain-text fallback for email clients that don't render HTML
    text: [
      `Dear ${donation.name},`,
      '',
      `Thank you for donating ₹${donation.amountRupees} to DMCT Hospital & Old Age Home.`,
      `Your transaction ID is: ${donation.txnId}`,
      `PhonePe Reference: ${donation.phonePeTxnId || '—'}`,
      '',
      'Your official receipt is attached as a PDF.',
      '',
      'For queries: 7977 211 807 | 7400 439 760',
      'DMCT Hospital & Old Age Home, Kalyan East, Thane – 421306',
    ].join('\n'),

    attachments: [
      {
        filename:    fileName,
        content:     pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });

  console.log(`[EMAIL] Confirmation sent → ${donation.email} | msgId=${info.messageId}`);
  return info;
};

/**
 * (Optional) Notify the admin that a new donation has been received.
 * Only sent if ADMIN_EMAIL is configured in .env.
 *
 * @param {object} donation – Full donation metadata
 * @param {string} excelPath – Absolute path to the updated Excel file
 */
export const sendAdminNotificationEmail = async (donation, excelPath) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log('[EMAIL] ADMIN_EMAIL not set – skipping admin notification.');
    return null;
  }

  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from:    fromAddress(),
    to:      adminEmail,
    subject: `[NEW DONATION] ₹${donation.amountRupees} from ${donation.name}`,
    html: /* html */ `
      <p><strong>New donation received on DMCT Hospital portal.</strong></p>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;">
        <tr><td style="padding:6px 12px;color:#666;">Donor</td>       <td style="padding:6px 12px;font-weight:600;">${donation.name}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;">Email</td>       <td style="padding:6px 12px;">${donation.email}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;">Phone</td>       <td style="padding:6px 12px;">${donation.phone}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;">Amount</td>      <td style="padding:6px 12px;font-weight:700;color:#1B2A4A;">₹${donation.amountRupees}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;">Txn ID</td>      <td style="padding:6px 12px;font-size:11px;">${donation.txnId}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;">PhonePe Ref</td> <td style="padding:6px 12px;font-size:11px;">${donation.phonePeTxnId || '—'}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;">Date</td>        <td style="padding:6px 12px;">${new Date(donation.completedAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
      </table>
      <p style="margin-top:16px;color:#666;font-size:12px;">The updated donations ledger (Excel) is attached.</p>
    `,
    text: `New donation: ₹${donation.amountRupees} from ${donation.name} (${donation.email}). Txn: ${donation.txnId}`,
    attachments: excelPath
      ? [{ filename: 'donations.xlsx', path: excelPath, contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }]
      : [],
  });

  console.log(`[EMAIL] Admin notification sent → ${adminEmail} | msgId=${info.messageId}`);
  return info;
};
