import express from 'express';
import crypto from 'crypto';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { appendDonationToExcel }        from '../services/excelService.js';
import { generateReceiptPDF }           from '../services/pdfService.js';
import { sendDonorConfirmationEmail,
         sendAdminNotificationEmail }   from '../services/emailService.js';

const router = express.Router();

// ── Helpers ──────────────────────────────────────────────────────────────────

const generateTransactionId = () => {
  const ts   = Date.now();
  const rand = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();
  return `DMCT-${ts}-${rand}`;
};

const buildChecksum = (base64Payload, endpoint) => {
  const rawString = base64Payload + endpoint + process.env.PHONEPE_SALT_KEY;
  const hash      = crypto.createHash('sha256').update(rawString).digest('hex');
  return `${hash}###${process.env.PHONEPE_SALT_INDEX}`;
};

const buildStatusChecksum = (merchantId, merchantTransactionId) => {
  const endpoint  = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const rawString = endpoint + process.env.PHONEPE_SALT_KEY;
  const hash      = crypto.createHash('sha256').update(rawString).digest('hex');
  return `${hash}###${process.env.PHONEPE_SALT_INDEX}`;
};

// ── In-memory store (replace with DB in production) ──────────────────────────
const pendingDonations = new Map();

// ── POST /api/payment/initiate ────────────────────────────────────────────────
router.post('/initiate', async (req, res, next) => {
  try {
    const { name, email, phone, amount } = req.body;

    if (!name || !email || !phone || !amount)
      return res.status(400).json({ success: false, message: 'name, email, phone, and amount are all required.' });

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 1)
      return res.status(400).json({ success: false, message: 'Amount must be a positive number (minimum Rs. 1).' });

    const phoneClean = String(phone).replace(/\D/g, '');
    if (phoneClean.length < 10)
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });

    const merchantId            = process.env.PHONEPE_MERCHANT_ID;
    const merchantTransactionId = generateTransactionId();
    const amountInPaise         = Math.round(parsedAmount * 100);

    const paymentPayload = {
      merchantId, merchantTransactionId,
      merchantUserId: `MUID-${uuidv4().substring(0, 8)}`,
      name, amount: amountInPaise,
      redirectUrl:  process.env.REDIRECT_URL,
      redirectMode: 'POST',
      mobileNumber: phoneClean.slice(-10),
      paymentInstrument: { type: 'PAY_PAGE' },
    };

    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const checksum      = buildChecksum(base64Payload, '/pg/v1/pay');

    pendingDonations.set(merchantTransactionId, {
      name, email,
      phone:        phoneClean.slice(-10),
      amountRupees: parsedAmount,
      initiatedAt:  new Date().toISOString(),
      status:       'PENDING',
    });

    const { data } = await axios.post(
      process.env.PHONEPE_BASE_URL,
      { request: base64Payload },
      { headers: { 'Content-Type': 'application/json', 'X-VERIFY': checksum } }
    );

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      console.log(`[PAYMENT INITIATED] txn=${merchantTransactionId} | Rs.${parsedAmount} | ${name}`);
      return res.status(200).json({
        success: true, message: 'Payment initiated successfully.',
        redirectUrl: data.data.instrumentResponse.redirectInfo.url,
        transactionId: merchantTransactionId,
      });
    }

    console.error('[PHONEPE ERROR]', data);
    return res.status(502).json({ success: false, message: data.message || 'PhonePe could not initiate the payment.' });

  } catch (err) {
    if (err.response) {
      console.error('[PHONEPE HTTP ERROR]', err.response.status, err.response.data);
      return res.status(502).json({ success: false, message: err.response.data?.message || 'PhonePe API error.' });
    }
    next(err);
  }
});

// ── POST /api/payment/callback ────────────────────────────────────────────────
// PhonePe POSTs here after payment. We then:
//  1. Append the record to the Excel ledger
//  2. Generate a PDF receipt from the HTML template
//  3. Email the PDF to the donor
//  4. (Optional) Notify the admin
router.post('/callback', async (req, res) => {
  try {
    const { response: base64Response } = req.body;

    if (!base64Response) {
      console.warn('[CALLBACK] Empty body received from PhonePe.');
      return res.redirect(process.env.FRONTEND_FAILURE_URL + '?reason=empty_callback');
    }

    const decoded = JSON.parse(Buffer.from(base64Response, 'base64').toString('utf-8'));
    const { merchantTransactionId, code, transactionId } = decoded.data || decoded;

    console.log(`[CALLBACK] txn=${merchantTransactionId} | code=${code}`);

    const isSuccess = code === 'PAYMENT_SUCCESS';

    let donation = {
      ...(pendingDonations.get(merchantTransactionId) || {}),
      txnId:        merchantTransactionId,
      phonePeTxnId: transactionId || '—',
      status:       isSuccess ? 'SUCCESS' : (code || 'FAILED'),
      completedAt:  new Date().toISOString(),
    };

    pendingDonations.set(merchantTransactionId, donation);

    // ── Always log to Excel (success and failure both) ────────────────────
    let excelPath = null;
    try {
      excelPath = await appendDonationToExcel(donation);
      console.log(`[POST-PAYMENT] Excel updated → ${excelPath}`);
    } catch (excelErr) {
      console.error('[POST-PAYMENT] Excel write failed:', excelErr.message);
    }

    // ── On SUCCESS: generate PDF and email donor ───────────────────────────
    if (isSuccess) {
      try {
        const pdfBuffer = await generateReceiptPDF(donation);
        console.log(`[POST-PAYMENT] PDF generated (${pdfBuffer.length} bytes)`);

        await sendDonorConfirmationEmail(donation, pdfBuffer);
        console.log(`[POST-PAYMENT] Confirmation email sent → ${donation.email}`);
      } catch (emailErr) {
        console.error('[POST-PAYMENT] PDF/Email step failed:', emailErr.message);
      }

      try {
        await sendAdminNotificationEmail(donation, excelPath);
      } catch (adminErr) {
        console.error('[POST-PAYMENT] Admin notification failed:', adminErr.message);
      }

      return res.redirect(`${process.env.FRONTEND_SUCCESS_URL}?txnId=${merchantTransactionId}`);
    }

    return res.redirect(
      `${process.env.FRONTEND_FAILURE_URL}?txnId=${merchantTransactionId}&reason=${code}`
    );

  } catch (err) {
    console.error('[CALLBACK ERROR]', err.message);
    return res.redirect(process.env.FRONTEND_FAILURE_URL + '?reason=server_error');
  }
});

// ── GET /api/payment/status/:transactionId ────────────────────────────────────
router.get('/status/:transactionId', async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const merchantId        = process.env.PHONEPE_MERCHANT_ID;

    if (!transactionId)
      return res.status(400).json({ success: false, message: 'transactionId is required.' });

    const checksum  = buildStatusChecksum(merchantId, transactionId);
    const statusUrl = `${process.env.PHONEPE_STATUS_URL}/${merchantId}/${transactionId}`;

    const { data } = await axios.get(statusUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY':      checksum,
        'X-MERCHANT-ID': merchantId,
      },
    });

    const responseCode = data?.data?.responseCode || data?.code;
    const isSuccess    = responseCode === 'SUCCESS' || data?.data?.state === 'COMPLETED';

    console.log(`[STATUS CHECK] txn=${transactionId} | code=${responseCode}`);

    return res.status(200).json({
      success:     true,
      status:      isSuccess ? 'SUCCESS' : responseCode || 'UNKNOWN',
      phonePeData: data?.data || {},
      donation:    pendingDonations.get(transactionId) || null,
    });

  } catch (err) {
    if (err.response) {
      console.error('[STATUS CHECK ERROR]', err.response.status, err.response.data);
      return res.status(502).json({ success: false, message: 'Could not verify status with PhonePe.', detail: err.response.data });
    }
    next(err);
  }
});

// ── GET /api/payment/health ───────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'DMCT Payment API is running.', timestamp: new Date().toISOString() });
});

export default router;
