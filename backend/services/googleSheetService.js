/**
 * googleSheetsService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Appends one donation record to a Google Sheet acting as the donation ledger.
 * Stores: S.No, Receipt No., Date, Donor Name, Email, Phone,
 *         Amount, Amount in Words, Txn ID, PhonePe Ref, Status, Drive Link
 *
 * Environment variables required:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_SHEET_ID
 *   GOOGLE_SHEET_TAB   (optional, default: "Donations")
 *
 * Dependencies: googleapis
 */

import { google } from "googleapis";

// ── Auth ──────────────────────────────────────────────────────────────────────
const getAuthClient = () => {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n",
  );
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
};

// ── Column headers ────────────────────────────────────────────────────────────
const HEADER_ROW = [
  "S.No",
  "Receipt No.",
  "Date",
  "Donor Name",
  "Email",
  "Phone",
  "Amount (₹)",
  "Amount in Words",
  "Transaction ID",
  "PhonePe Ref",
  "Payment Status",
  "Receipt (Drive Link)",
];

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

const convertHundreds = (n) => {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100)
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  return (
    ones[Math.floor(n / 100)] +
    " Hundred" +
    (n % 100 ? " " + convertHundreds(n % 100) : "")
  );
};

const numberToWords = (num) => {
  if (!num || num === 0) return "Zero";
  const n = Math.floor(num);
  if (n >= 10_000_000)
    return (
      convertHundreds(Math.floor(n / 10_000_000)) +
      " Crore " +
      numberToWords(n % 10_000_000)
    );
  if (n >= 100_000)
    return (
      convertHundreds(Math.floor(n / 100_000)) +
      " Lakh " +
      numberToWords(n % 100_000)
    );
  if (n >= 1_000)
    return (
      convertHundreds(Math.floor(n / 1_000)) +
      " Thousand" +
      (n % 1_000 ? " " + numberToWords(n % 1_000) : "")
    );
  return convertHundreds(n);
};

// ── Date formatter ────────────────────────────────────────────────────────────
const fmt = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
};

// ── Ensure header row exists ──────────────────────────────────────────────────
const ensureHeader = async (sheets, spreadsheetId, sheetName) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:L1`,
  });

  const existing = res.data.values?.[0];
  if (!existing || existing.length === 0) {
    // Write header text
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADER_ROW] },
    });

    // Style header: orange background (#C85000) + bold white text + freeze
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetObj = sheetMeta.data.sheets.find(
      (s) => s.properties.title === sheetName,
    );
    const sheetId = sheetObj?.properties?.sheetId ?? 0;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.784, green: 0.314, blue: 0.0 }, // #C85000
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    fontSize: 11,
                  },
                  horizontalAlignment: "CENTER",
                  verticalAlignment: "MIDDLE",
                },
              },
              fields:
                "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)",
            },
          },
          // Freeze header row
          {
            updateSheetProperties: {
              properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
              fields: "gridProperties.frozenRowCount",
            },
          },
          // Auto-resize all columns
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: 12,
              },
            },
          },
        ],
      },
    });

    console.log(`[SHEETS] Header row created in "${sheetName}"`);
  }
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Append a full donation record to Google Sheets.
 *
 * @param {object} donation
 * @param {string} donation.txnId
 * @param {string} donation.phonePeTxnId
 * @param {string} donation.name
 * @param {string} donation.email
 * @param {string} donation.phone
 * @param {number} donation.amountRupees
 * @param {string} donation.status
 * @param {string} donation.initiatedAt
 * @param {string} donation.completedAt
 * @param {string} [donation.driveReceiptUrl]  – Google Drive link to PDF
 *
 * @returns {Promise<{ sheetUrl: string, receiptNo: number }>}
 */
export const appendDonationToSheet = async (donation) => {
  const auth = getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_TAB || "Donations";

  await ensureHeader(sheets, spreadsheetId, sheetName);

  // Count existing rows to get serial + receipt number
  const countRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:A`,
  });
  const rowCount = countRes.data.values?.length ?? 1;
  const serial = rowCount; // row 1 = header, so first data = serial 1
  const receiptNo = serial; // receipt number matches serial

  const amountWords = numberToWords(Math.floor(donation.amountRupees));

  const row = [
    serial, // S.No
    `RCP-${String(receiptNo).padStart(4, "0")}`, // Receipt No. e.g. RCP-0001
    fmt(donation.completedAt), // Date
    donation.name || "—", // Donor Name
    donation.email || "—", // Email
    donation.phone || "—", // Phone
    donation.amountRupees ?? 0, // Amount (₹)
    amountWords + " Rupees Only", // Amount in Words
    donation.txnId || "—", // Transaction ID
    donation.phonePeTxnId || "—", // PhonePe Ref
    donation.status || "UNKNOWN", // Payment Status
    donation.driveReceiptUrl || "—", // Receipt Drive Link
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:L`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  // Color SUCCESS rows green, FAILED rows red
  const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetObj = sheetMeta.data.sheets.find(
    (s) => s.properties.title === sheetName,
  );
  const sheetId = sheetObj?.properties?.sheetId ?? 0;
  const dataRowIndex = rowCount; // 0-indexed: header=0, first data=1, etc.

  const isSuccess = donation.status === "SUCCESS";
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: dataRowIndex,
              endRowIndex: dataRowIndex + 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: isSuccess
                  ? { red: 0.851, green: 0.953, blue: 0.859 } // light green
                  : { red: 0.988, green: 0.878, blue: 0.878 }, // light red
              },
            },
            fields: "userEnteredFormat.backgroundColor",
          },
        },
      ],
    },
  });

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  console.log(
    `[SHEETS] Row ${serial} (Receipt RCP-${String(receiptNo).padStart(4, "0")}) appended`,
  );

  return { sheetUrl, receiptNo };
};

/**
 * Return the Google Sheet URL (for admin email links).
 */
export const getDonationsSheetUrl = () =>
  `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`;
