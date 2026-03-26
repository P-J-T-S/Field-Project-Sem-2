/**
 * googleDriveService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Uploads a generated PDF receipt to a Google Drive folder and returns
 * a shareable link. Works on Vercel (serverless) — buffers only, no disk I/O.
 *
 * Setup (one-time):
 *  1. Reuse the same Service Account from googleSheetsService.js
 *     (it already has drive.file scope)
 *  2. Create a folder in Google Drive for receipts
 *  3. Share that folder with the service account email (Editor)
 *  4. Copy the folder ID from the URL: drive.google.com/drive/folders/<FOLDER_ID>
 *  5. Set GOOGLE_DRIVE_RECEIPTS_FOLDER_ID in Vercel env vars
 *
 * Environment variables required:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL       – same as googleSheetsService
 *   GOOGLE_PRIVATE_KEY                 – same as googleSheetsService
 *   GOOGLE_DRIVE_RECEIPTS_FOLDER_ID    – folder ID for uploaded receipts
 *
 * Dependencies: googleapis, stream
 */

import { google } from "googleapis";
import { Readable } from "stream";

// ── Auth ──────────────────────────────────────────────────────────────────────

const getAuthClient = () => {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n",
  );

  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a Buffer to a Node.js Readable stream (required by Drive API). */
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Upload a PDF receipt Buffer to Google Drive.
 *
 * @param {Buffer} pdfBuffer    – Raw PDF bytes from generateReceiptPDF()
 * @param {string} txnId        – Used to name the file
 * @param {string} donorName    – Included in the file name for readability
 *
 * @returns {Promise<{ fileId: string, webViewLink: string, fileName: string }>}
 */
export const uploadReceiptToDrive = async (pdfBuffer, txnId, donorName) => {
  const auth = getAuthClient();
  const drive = google.drive({ version: "v3", auth });
  const folderId = process.env.GOOGLE_DRIVE_RECEIPTS_FOLDER_ID;

  const safeName = (donorName || "Donor")
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .trim();
  const fileName = `DMCT_Receipt_${safeName}_${txnId}.pdf`;

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: "application/pdf",
      parents: folderId ? [folderId] : [],
    },
    media: {
      mimeType: "application/pdf",
      body: bufferToStream(pdfBuffer),
    },
    fields: "id, webViewLink, name",
  });

  const fileId = response.data.id;
  const webViewLink = response.data.webViewLink;

  // Make file readable by anyone with the link (so donor can click it if needed)
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  console.log(`[DRIVE] Receipt uploaded → ${webViewLink}`);
  return { fileId, webViewLink, fileName };
};
