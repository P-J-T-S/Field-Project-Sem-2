import { BrevoClient } from '@getbrevo/brevo';

const API_KEY = process.env.BREVO_API_KEY || '';
const SENDER_EMAIL = process.env.EMAIL_FROM_ADDRESS || process.env.BREVO_SENDER_EMAIL || '';
const SENDER_NAME = process.env.EMAIL_FROM_NAME || 'DMCT Hospital & Old Age Home';

let brevoClient = null;

const getBrevoClient = () => {
  if (!API_KEY) {
    console.warn('[Email] BREVO_API_KEY is missing. Transactional emails are disabled.');
    return null;
  }

  if (!brevoClient) {
    brevoClient = new BrevoClient({ apiKey: API_KEY });
    console.log('[Email] Brevo transactional email client configured.');
  }

  return brevoClient;
};

const getErrorMessage = (error) => {
  const brevoBody = error?.response?.body;

  if (typeof brevoBody === 'string' && brevoBody) {
    return brevoBody;
  }

  if (brevoBody?.message) {
    return brevoBody.message;
  }

  return error?.message || 'Unknown email error';
};

const fmtCurrency = (n) =>
  "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 });

const sender = () => ({
  name: SENDER_NAME,
  email: SENDER_EMAIL || "your-verified@gmail.com",
});

const fmtReceiptNo = (n) => (n ? `RCP-${String(n).padStart(4, "0")}` : "—");

// ── Donor email HTML ──────────────────────────────────────────────────────────
const buildDonorHtml = (donation) => /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    body        { margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Arial,sans-serif; }
    .wrap       { max-width:560px; margin:40px auto; background:#fff; border-radius:6px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
    .top        { background:#C85000; padding:26px 32px; text-align:center; }
    .top h1     { color:#fff; font-size:19px; margin:0 0 3px; font-weight:700; }
    .top p      { color:rgba(255,255,255,.8); font-size:11px; margin:0; letter-spacing:1px; text-transform:uppercase; }
    .body       { padding:30px 32px; }
    .greet      { font-size:15px; color:#C85000; font-weight:600; margin-bottom:7px; }
    .intro      { font-size:13px; color:#4B5563; line-height:1.7; margin-bottom:22px; }
    .amt-box    { background:#FFF3EB; border:1px solid #FDBA74; border-radius:6px; padding:18px 24px; text-align:center; margin-bottom:22px; }
    .amt-label  { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#6B7280; margin-bottom:5px; }
    .amt-value  { font-size:34px; font-weight:800; color:#C85000; }
    .amt-badge  { display:inline-block; margin-top:7px; background:#16A34A; color:#fff; font-size:11px; font-weight:700; padding:3px 14px; border-radius:20px; }
    table.det   { width:100%; border-collapse:collapse; margin-bottom:22px; font-size:13px; }
    table.det td{ padding:8px 12px; border-bottom:1px solid #F3F4F6; }
    table.det td:first-child { color:#6B7280; width:44%; }
    table.det td:last-child  { color:#1B2A4A; font-weight:600; word-break:break-all; }
    .note       { background:#FFFBEB; border:1px solid #FCD34D; border-radius:4px; padding:11px 15px; font-size:12px; color:#92400E; margin-bottom:22px; }
    .note strong{ display:block; margin-bottom:3px; }
    .dl-wrap    { text-align:center; margin-bottom:22px; }
    .dl-btn     { background:#C85000; color:#fff; text-decoration:none; padding:10px 28px; border-radius:5px; font-size:13px; font-weight:700; display:inline-block; }
    hr          { border:none; border-top:1px solid #F3F4F6; margin:22px 0; }
    .foot       { font-size:11px; color:#9CA3AF; line-height:1.7; }
    .foot a     { color:#C85000; text-decoration:none; }
    .bot        { background:#F9FAFB; border-top:1px solid #F3F4F6; padding:14px 32px; text-align:center; font-size:11px; color:#9CA3AF; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <h1>Doctor Mitra Charitable Trust</h1>
    <p>DMCT Hospital &amp; Old Age Home · Donation Confirmed</p>
  </div>
  <div class="body">
    <p class="greet">Dear ${donation.name},</p>
    <p class="intro">Thank you for your generous contribution to DMCT Hospital &amp; Old Age Home. Your donation brings warmth and dignity to our elderly residents. Your official receipt is attached as a PDF.</p>

    <div class="amt-box">
      <div class="amt-label">Donation Amount</div>
      <div class="amt-value">${fmtCurrency(donation.amountRupees)}</div>
      <div class="amt-badge">✓ &nbsp;Payment Successful</div>
    </div>

    <table class="det">
      <tr><td>Donor Name</td>       <td>${donation.name}</td></tr>
      <tr><td>Email</td>            <td>${donation.email}</td></tr>
      <tr><td>Phone</td>            <td>${donation.phone}</td></tr>
      <tr><td>Receipt No.</td>      <td><strong>${fmtReceiptNo(donation.receiptNo)}</strong></td></tr>
      <tr><td>Transaction ID</td>   <td style="font-size:11px;">${donation.txnId}</td></tr>
      <tr><td>PhonePe Ref</td>      <td style="font-size:11px;">${donation.phonePeTxnId || "—"}</td></tr>
      <tr><td>Payment Method</td>   <td>PhonePe</td></tr>
      <tr><td>Date</td>             <td>${new Date(donation.completedAt || Date.now()).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Kolkata" })}</td></tr>
    </table>

    <div class="note">
      <strong>📎 Receipt Attached</strong>
      Your official donation receipt (PDF) is attached. Save it for 80G tax benefit claims.
    </div>

    ${
      donation.driveReceiptUrl
        ? `
    <div class="dl-wrap">
      <a class="dl-btn" href="${donation.driveReceiptUrl}" target="_blank">⬇ &nbsp;Download Receipt PDF</a>
    </div>`
        : ""
    }

    <hr/>
    <p class="foot">
      For queries: <a href="tel:7977211807">7977 211 807</a> / <a href="tel:9833155731">9833 155 731</a><br/>
      Visiting hours: 10 AM – 6 PM<br/><br/>
      <strong>DMCT Hospital &amp; Old Age Home</strong><br/>
      New Rachna Park, Near St. Mary English School, Chakki Naka,<br/>
      Kalyan East, Thane – 421306, Maharashtra
    </p>
  </div>
  <div class="bot">Automated message — do not reply. Payments secured by PhonePe (256-bit SSL).</div>
</div>
</body>
</html>
`;

// ── Public API ────────────────────────────────────────────────────────────────

export const sendDonorConfirmationEmail = async (donation, pdfBuffer) => {
  const client = getBrevoClient();
  
  if (!client) {
    console.error('[Email] Email service is not configured');
    return { success: false, error: 'Email service is not configured' };
  }

  if (!SENDER_EMAIL) {
    console.warn('[Email] SENDER_EMAIL is missing. Transactional emails are disabled.');
    return { success: false, error: 'Email sender is not configured' };
  }

  const fileName = `DMCT_Receipt_${fmtReceiptNo(donation.receiptNo)}_${donation.txnId}.pdf`;

  try {
    const response = await client.transactionalEmails.sendTransacEmail({
      sender: sender(),
      to: [{ email: donation.email, name: donation.name }],
      subject: `Donation Receipt ${fmtReceiptNo(donation.receiptNo)} – ${fmtCurrency(donation.amountRupees)} | DMCT Hospital`,
      htmlContent: buildDonorHtml(donation),
      textContent: [
        `Dear ${donation.name},`,
        `Thank you for donating ${fmtCurrency(donation.amountRupees)} to DMCT Hospital & Old Age Home.`,
        `Receipt No: ${fmtReceiptNo(donation.receiptNo)}`,
        `Transaction ID: ${donation.txnId}`,
        `PhonePe Ref: ${donation.phonePeTxnId || "—"}`,
        "Receipt PDF attached.",
        donation.driveReceiptUrl ? `Drive link: ${donation.driveReceiptUrl}` : "",
        "Queries: 7977 211 807 | 9833 155 731",
      ].join("\n"),
      attachment: [
        { name: fileName, content: pdfBuffer.toString("base64") },
      ],
    });

    const messageId = response?.data?.messageId || response?.messageId || null;
    console.log(`[EMAIL] Donor → ${donation.email} | msgId=${messageId}`);
    return { success: true, messageId };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[Email] Failed to send donor confirmation email:', message);
    return { success: false, error: message };
  }
};

export const sendAdminNotificationEmail = async (donation, sheetUrl) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log("[EMAIL] ADMIN_EMAIL not set — skipping.");
    return null;
  }

  const client = getBrevoClient();
  
  if (!client) {
    console.error('[Email] Email service is not configured');
    return { success: false, error: 'Email service is not configured' };
  }

  if (!SENDER_EMAIL) {
    console.warn('[Email] SENDER_EMAIL is missing. Transactional emails are disabled.');
    return { success: false, error: 'Email sender is not configured' };
  }

  try {
    const response = await client.transactionalEmails.sendTransacEmail({
      sender: sender(),
      to: [{ email: adminEmail, name: "DMCT Admin" }],
      subject: `[NEW DONATION] ${fmtCurrency(donation.amountRupees)} from ${donation.name} | Receipt ${fmtReceiptNo(donation.receiptNo)}`,
      htmlContent: /* html */ `
        <div style="font-family:Arial,sans-serif;font-size:13px;max-width:500px;">
          <h3 style="color:#C85000;margin-bottom:16px;">New Donation Received</h3>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:7px 12px;color:#666;border-bottom:1px solid #eee;">Donor</td>        <td style="padding:7px 12px;font-weight:600;border-bottom:1px solid #eee;">${donation.name}</td></tr>
            <tr><td style="padding:7px 12px;color:#666;border-bottom:1px solid #eee;">Email</td>        <td style="padding:7px 12px;border-bottom:1px solid #eee;">${donation.email}</td></tr>
            <tr><td style="padding:7px 12px;color:#666;border-bottom:1px solid #eee;">Phone</td>        <td style="padding:7px 12px;border-bottom:1px solid #eee;">${donation.phone}</td></tr>
            <tr><td style="padding:7px 12px;color:#666;border-bottom:1px solid #eee;">Amount</td>       <td style="padding:7px 12px;font-weight:700;color:#C85000;border-bottom:1px solid #eee;">${fmtCurrency(donation.amountRupees)}</td></tr>
            <tr><td style="padding:7px 12px;color:#666;border-bottom:1px solid #eee;">Receipt No.</td>  <td style="padding:7px 12px;font-weight:700;border-bottom:1px solid #eee;">${fmtReceiptNo(donation.receiptNo)}</td></tr>
            <tr><td style="padding:7px 12px;color:#666;border-bottom:1px solid #eee;">Txn ID</td>       <td style="padding:7px 12px;font-size:11px;border-bottom:1px solid #eee;">${donation.txnId}</td></tr>
            <tr><td style="padding:7px 12px;color:#666;">Date</td>                                      <td style="padding:7px 12px;">${new Date(donation.completedAt || Date.now()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>
          </table>
          <p style="margin-top:18px;display:flex;gap:12px;flex-wrap:wrap;">
            ${sheetUrl ? `<a href="${sheetUrl}" style="background:#C85000;color:#fff;padding:9px 18px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px;">Open Donor Sheet</a>` : ""}
            ${donation.driveReceiptUrl ? `<a href="${donation.driveReceiptUrl}" style="background:#1B2A4A;color:#fff;padding:9px 18px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px;">View Receipt PDF</a>` : ""}
          </p>
        </div>
      `,
      textContent: `New donation: ${fmtCurrency(donation.amountRupees)} from ${donation.name}. Receipt: ${fmtReceiptNo(donation.receiptNo)}. Sheet: ${sheetUrl}`,
    });

    const messageId = response?.data?.messageId || response?.messageId || null;
    console.log(`[EMAIL] Admin → ${adminEmail} | msgId=${messageId}`);
    return { success: true, messageId };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[Email] Failed to send admin notification email:', message);
    return { success: false, error: message };
  }
};
