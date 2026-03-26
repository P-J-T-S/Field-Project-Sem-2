/**
 * payment.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Flow on successful payment:
 *  1. Generate PDF receipt (Puppeteer)
 *  2. Upload PDF to Google Drive → get driveReceiptUrl
 *  3. Append donor + receipt details to Google Sheet → get receiptNo
 *  4. Email donor (Brevo) with PDF attached + Drive link
 *  5. Notify admin (Brevo) with Sheet link
 *  6. Redirect frontend to success page
 */

import express from "express";
import crypto from "crypto";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {
  appendDonationToSheet,
  getDonationsSheetUrl,
} from "../services/googleSheetService.js";
import { uploadReceiptToDrive } from "../services/googleDriveService.js";
import { generateReceiptPDF } from "../services/pdfService.js";
import {
  sendDonorConfirmationEmail,
  sendAdminNotificationEmail,
} from "../services/emailService.js";

const router = express.Router();

// ── Helpers ───────────────────────────────────────────────────────────────────
const generateTransactionId = () => {
  const rand = uuidv4().replace(/-/g, "").substring(0, 8).toUpperCase();
  return `DMCT-${Date.now()}-${rand}`;
};

const buildChecksum = (base64Payload, endpoint) => {
  const raw = base64Payload + endpoint + process.env.PHONEPE_SALT_KEY;
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  return `${hash}###${process.env.PHONEPE_SALT_INDEX}`;
};

const buildStatusChecksum = (merchantId, txnId) => {
  const endpoint = `/pg/v1/status/${merchantId}/${txnId}`;
  const hash = crypto
    .createHash("sha256")
    .update(endpoint + process.env.PHONEPE_SALT_KEY)
    .digest("hex");
  return `${hash}###${process.env.PHONEPE_SALT_INDEX}`;
};

// ── In-memory store ───────────────────────────────────────────────────────────
const pendingDonations = new Map();

// ── POST /api/payment/initiate ────────────────────────────────────────────────
router.post("/initiate", async (req, res, next) => {
  try {
    const { name, email, phone, amount } = req.body;

    if (!name || !email || !phone || !amount)
      return res
        .status(400)
        .json({
          success: false,
          message: "name, email, phone, and amount are all required.",
        });

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 1)
      return res
        .status(400)
        .json({ success: false, message: "Amount must be at least Rs. 1." });

    const phoneClean = String(phone).replace(/\D/g, "").slice(-10);
    if (phoneClean.length < 10)
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide a valid 10-digit mobile number.",
        });

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const merchantTransactionId = generateTransactionId();
    const amountInPaise = Math.round(parsedAmount * 100);

    const paymentPayload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: `MUID-${uuidv4().substring(0, 8)}`,
      name,
      amount: amountInPaise,
      redirectUrl: process.env.REDIRECT_URL,
      redirectMode: "POST",
      mobileNumber: phoneClean,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
      "base64",
    );
    const checksum = buildChecksum(base64Payload, "/pg/v1/pay");

    pendingDonations.set(merchantTransactionId, {
      name,
      email,
      phone: phoneClean,
      amountRupees: parsedAmount,
      initiatedAt: new Date().toISOString(),
      status: "PENDING",
    });

    const { data } = await axios.post(
      process.env.PHONEPE_BASE_URL,
      { request: base64Payload },
      { headers: { "Content-Type": "application/json", "X-VERIFY": checksum } },
    );

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      console.log(
        `[INITIATE] txn=${merchantTransactionId} | Rs.${parsedAmount} | ${name}`,
      );
      return res.status(200).json({
        success: true,
        message: "Payment initiated successfully.",
        redirectUrl: data.data.instrumentResponse.redirectInfo.url,
        transactionId: merchantTransactionId,
      });
    }

    return res
      .status(502)
      .json({
        success: false,
        message: data.message || "PhonePe could not initiate payment.",
      });
  } catch (err) {
    if (err.response)
      return res
        .status(502)
        .json({
          success: false,
          message: err.response.data?.message || "PhonePe API error.",
        });
    next(err);
  }
});

// ── POST /api/payment/callback ────────────────────────────────────────────────
router.post("/callback", async (req, res) => {
  try {
    const { response: base64Response } = req.body;

    if (!base64Response) {
      console.warn("[CALLBACK] Empty body from PhonePe.");
      return res.redirect(
        process.env.FRONTEND_FAILURE_URL + "?reason=empty_callback",
      );
    }

    const decoded = JSON.parse(
      Buffer.from(base64Response, "base64").toString("utf-8"),
    );
    const { merchantTransactionId, code, transactionId } =
      decoded.data || decoded;

    console.log(`[CALLBACK] txn=${merchantTransactionId} | code=${code}`);

    const isSuccess = code === "PAYMENT_SUCCESS";

    let donation = {
      ...(pendingDonations.get(merchantTransactionId) || {}),
      txnId: merchantTransactionId,
      phonePeTxnId: transactionId || "—",
      status: isSuccess ? "SUCCESS" : code || "FAILED",
      completedAt: new Date().toISOString(),
      driveReceiptUrl: null,
      receiptNo: null,
    };

    // ── FAILED — just log to sheet ────────────────────────────────────────────
    if (!isSuccess) {
      try {
        await appendDonationToSheet(donation);
      } catch (e) {
        console.error("[CALLBACK] Sheet log (failed):", e.message);
      }
      return res.redirect(
        `${process.env.FRONTEND_FAILURE_URL}?txnId=${merchantTransactionId}&reason=${code}`,
      );
    }

    // ── SUCCESS ───────────────────────────────────────────────────────────────

    // Step 1 — Generate PDF
    let pdfBuffer = null;
    try {
      pdfBuffer = await generateReceiptPDF(donation);
      console.log(`[CALLBACK] PDF generated (${pdfBuffer.length} bytes)`);
    } catch (e) {
      console.error("[CALLBACK] PDF failed:", e.message);
    }

    // Step 2 — Upload to Google Drive
    if (pdfBuffer) {
      try {
        const dr = await uploadReceiptToDrive(
          pdfBuffer,
          donation.txnId,
          donation.name,
        );
        donation.driveReceiptUrl = dr.webViewLink;
        console.log(`[CALLBACK] Drive → ${donation.driveReceiptUrl}`);
      } catch (e) {
        console.error("[CALLBACK] Drive failed:", e.message);
      }
    }

    // Step 3 — Append to Google Sheet (name, email, phone, amount, receipt link, etc.)
    let sheetUrl = getDonationsSheetUrl();
    try {
      const sr = await appendDonationToSheet(donation);
      sheetUrl = sr.sheetUrl;
      donation.receiptNo = sr.receiptNo;
      console.log(
        `[CALLBACK] Sheet appended. Receipt RCP-${String(sr.receiptNo).padStart(4, "0")}`,
      );
    } catch (e) {
      console.error("[CALLBACK] Sheet failed:", e.message);
    }

    // Step 4 — Email donor
    if (pdfBuffer) {
      try {
        await sendDonorConfirmationEmail(donation, pdfBuffer);
        console.log(`[CALLBACK] Email → ${donation.email}`);
      } catch (e) {
        console.error("[CALLBACK] Donor email failed:", e.message);
      }
    }

    // Step 5 — Notify admin
    try {
      await sendAdminNotificationEmail(donation, sheetUrl);
    } catch (e) {
      console.error("[CALLBACK] Admin email failed:", e.message);
    }

    pendingDonations.set(merchantTransactionId, donation);
    return res.redirect(
      `${process.env.FRONTEND_SUCCESS_URL}?txnId=${merchantTransactionId}`,
    );
  } catch (err) {
    console.error("[CALLBACK ERROR]", err.message);
    return res.redirect(
      process.env.FRONTEND_FAILURE_URL + "?reason=server_error",
    );
  }
});

// ── GET /api/payment/receipt/:txnId — frontend polls this for download link ───
router.get("/receipt/:txnId", (req, res) => {
  const d = pendingDonations.get(req.params.txnId);
  if (!d || d.status !== "SUCCESS")
    return res
      .status(404)
      .json({ success: false, message: "Receipt not found." });

  return res.json({
    success: true,
    receiptNo: d.receiptNo
      ? `RCP-${String(d.receiptNo).padStart(4, "0")}`
      : "—",
    driveReceiptUrl: d.driveReceiptUrl || null,
    donor: { name: d.name, email: d.email, amountRupees: d.amountRupees },
  });
});

// ── GET /api/payment/status/:transactionId ────────────────────────────────────
router.get("/status/:transactionId", async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const checksum = buildStatusChecksum(merchantId, transactionId);

    const { data } = await axios.get(
      `${process.env.PHONEPE_STATUS_URL}/${merchantId}/${transactionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": merchantId,
        },
      },
    );

    const responseCode = data?.data?.responseCode || data?.code;
    const isSuccess =
      responseCode === "SUCCESS" || data?.data?.state === "COMPLETED";

    return res.status(200).json({
      success: true,
      status: isSuccess ? "SUCCESS" : responseCode || "UNKNOWN",
      phonePeData: data?.data || {},
      donation: pendingDonations.get(transactionId) || null,
    });
  } catch (err) {
    if (err.response)
      return res
        .status(502)
        .json({ success: false, message: "Could not verify with PhonePe." });
    next(err);
  }
});

// ── GET /api/payment/health ───────────────────────────────────────────────────
router.get("/health", (_req, res) =>
  res.json({
    success: true,
    message: "DMCT Payment API is running.",
    timestamp: new Date().toISOString(),
  }),
);

export default router;
