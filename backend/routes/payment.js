import express from 'express';
import crypto from 'crypto';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a unique merchant transaction ID.
 * Format: DMCT-<timestamp>-<4 random chars>
 */
const generateTransactionId = () => {
  const ts = Date.now();
  const rand = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();
  return `DMCT-${ts}-${rand}`;
};

/**
 * Build the X-VERIFY checksum required by PhonePe.
 * checksum = SHA256(base64Payload + endpoint + saltKey) + "###" + saltIndex
 */
const buildChecksum = (base64Payload, endpoint) => {
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  const rawString = base64Payload + endpoint + saltKey;
  const hash = crypto.createHash('sha256').update(rawString).digest('hex');
  return `${hash}###${saltIndex}`;
};

/**
 * Build the X-VERIFY checksum for the status check endpoint.
 * checksum = SHA256(statusEndpointPath + saltKey) + "###" + saltIndex
 */
const buildStatusChecksum = (merchantId, merchantTransactionId) => {
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  const endpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const rawString = endpoint + saltKey;
  const hash = crypto.createHash('sha256').update(rawString).digest('hex');
  return `${hash}###${saltIndex}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// In-memory store (replace with a real DB in production)
// ─────────────────────────────────────────────────────────────────────────────
const pendingDonations = new Map();

// ─────────────────────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/payment/initiate
 *
 * Initiates a PhonePe payment for a donation.
 *
 * Request body:
 *   { name: string, email: string, phone: string, amount: number }
 *
 * Response (success):
 *   { success: true, redirectUrl: string, transactionId: string }
 *
 * Response (error):
 *   { success: false, message: string }
 */
router.post('/initiate', async (req, res, next) => {
  try {
    const { name, email, phone, amount } = req.body;

    // ── Validate inputs ────────────────────────────────────────────────────
    if (!name || !email || !phone || !amount) {
      return res.status(400).json({
        success: false,
        message: 'name, email, phone, and amount are all required.',
      });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number (minimum ₹1).',
      });
    }

    const phoneClean = String(phone).replace(/\D/g, '');
    if (phoneClean.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number.',
      });
    }

    // ── Build payload ──────────────────────────────────────────────────────
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const merchantTransactionId = generateTransactionId();
    const amountInPaise = Math.round(parsedAmount * 100); // PhonePe uses paise

    const paymentPayload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: `MUID-${uuidv4().substring(0, 8)}`,
      name,
      amount: amountInPaise,
      redirectUrl: process.env.REDIRECT_URL,
      redirectMode: 'POST',
      mobileNumber: phoneClean.slice(-10),
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    // ── Encode & sign ──────────────────────────────────────────────────────
    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const checksum = buildChecksum(base64Payload, '/pg/v1/pay');

    // ── Store pending donation (attach metadata) ───────────────────────────
    pendingDonations.set(merchantTransactionId, {
      name,
      email,
      phone: phoneClean.slice(-10),
      amountRupees: parsedAmount,
      initiatedAt: new Date().toISOString(),
      status: 'PENDING',
    });

    // ── Call PhonePe API ───────────────────────────────────────────────────
    const phonePeResponse = await axios.post(
      process.env.PHONEPE_BASE_URL,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );

    const { data } = phonePeResponse;

    if (
      data.success &&
      data.data?.instrumentResponse?.redirectInfo?.url
    ) {
      const redirectUrl = data.data.instrumentResponse.redirectInfo.url;

      console.log(
        `[PAYMENT INITIATED] txn=${merchantTransactionId} | amount=₹${parsedAmount} | donor=${name}`
      );

      return res.status(200).json({
        success: true,
        message: 'Payment initiated successfully.',
        redirectUrl,
        transactionId: merchantTransactionId,
      });
    }

    // PhonePe returned a non-success response
    console.error('[PHONEPE ERROR]', data);
    return res.status(502).json({
      success: false,
      message: data.message || 'PhonePe could not initiate the payment. Please try again.',
    });
  } catch (err) {
    // Surface Axios errors clearly
    if (err.response) {
      console.error('[PHONEPE HTTP ERROR]', err.response.status, err.response.data);
      return res.status(502).json({
        success: false,
        message:
          err.response.data?.message ||
          'PhonePe API returned an error. Please try again later.',
      });
    }
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/payment/callback
 *
 * PhonePe posts the payment result to this URL after the user completes
 * (or cancels / fails) payment on the PhonePe page.
 *
 * PhonePe sends:  { response: <base64-encoded status response> }
 *
 * This endpoint verifies the response and redirects the browser to the
 * appropriate frontend URL.
 */
router.post('/callback', async (req, res) => {
  try {
    const { response: base64Response } = req.body;

    if (!base64Response) {
      console.warn('[CALLBACK] Empty response body from PhonePe.');
      return res.redirect(process.env.FRONTEND_FAILURE_URL + '?reason=empty_callback');
    }

    // Decode the base64 response
    const decoded = JSON.parse(Buffer.from(base64Response, 'base64').toString('utf-8'));
    const { merchantTransactionId, code, transactionId } = decoded.data || decoded;

    console.log(`[CALLBACK] txn=${merchantTransactionId} | code=${code}`);

    // Update our in-memory store
    if (pendingDonations.has(merchantTransactionId)) {
      const donation = pendingDonations.get(merchantTransactionId);
      donation.status = code === 'PAYMENT_SUCCESS' ? 'SUCCESS' : 'FAILED';
      donation.phonePeTxnId = transactionId;
      donation.completedAt = new Date().toISOString();
      pendingDonations.set(merchantTransactionId, donation);
    }

    if (code === 'PAYMENT_SUCCESS') {
      return res.redirect(
        `${process.env.FRONTEND_SUCCESS_URL}?txnId=${merchantTransactionId}`
      );
    }

    return res.redirect(
      `${process.env.FRONTEND_FAILURE_URL}?txnId=${merchantTransactionId}&reason=${code}`
    );
  } catch (err) {
    console.error('[CALLBACK ERROR]', err.message);
    return res.redirect(process.env.FRONTEND_FAILURE_URL + '?reason=server_error');
  }
});

// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/payment/status/:transactionId
 *
 * Verify payment status directly with PhonePe.
 * Useful for polling from the frontend on the success/failure page.
 *
 * Response:
 *   { success: bool, status: string, donation: {...} }
 */
router.get('/status/:transactionId', async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const merchantId = process.env.PHONEPE_MERCHANT_ID;

    if (!transactionId) {
      return res.status(400).json({ success: false, message: 'transactionId is required.' });
    }

    // ── Build checksum for status endpoint ─────────────────────────────────
    const checksum = buildStatusChecksum(merchantId, transactionId);
    const statusUrl = `${process.env.PHONEPE_STATUS_URL}/${merchantId}/${transactionId}`;

    const phonePeResponse = await axios.get(statusUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': merchantId,
      },
    });

    const { data } = phonePeResponse;
    const responseCode = data?.data?.responseCode || data?.code;
    const isSuccess = responseCode === 'SUCCESS' || data?.data?.state === 'COMPLETED';

    // Fetch stored donation metadata (if any)
    const donation = pendingDonations.get(transactionId) || null;

    console.log(`[STATUS CHECK] txn=${transactionId} | code=${responseCode}`);

    return res.status(200).json({
      success: true,
      status: isSuccess ? 'SUCCESS' : responseCode || 'UNKNOWN',
      phonePeData: data?.data || {},
      donation,
    });
  } catch (err) {
    if (err.response) {
      console.error('[STATUS CHECK ERROR]', err.response.status, err.response.data);
      return res.status(502).json({
        success: false,
        message: 'Could not verify payment status with PhonePe.',
        detail: err.response.data,
      });
    }
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/payment/health
 * Simple health probe – useful in deployment pipelines.
 */
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'DMCT Payment API is running.',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

export default router;
