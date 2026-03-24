/**
 * excelService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Maintains a persistent Excel workbook (`data/donations.xlsx`) that acts as
 * the administrator's donation ledger.
 *
 * Every successful payment appends one new row with full donor metadata.
 * If the file doesn't exist yet it is created with a styled header row.
 *
 * Dependencies: exceljs
 */

import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ── Resolve the absolute path to the data directory ─────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_DIR   = path.join(__dirname, '..', 'data');
const FILE_PATH  = path.join(DATA_DIR, 'donations.xlsx');

// Sheet name
const SHEET_NAME = 'Donations';

// Column definitions – order here is the order in the spreadsheet
const COLUMNS = [
  { header: 'S.No',               key: 'serial',        width: 8  },
  { header: 'Transaction ID',     key: 'txnId',         width: 34 },
  { header: 'PhonePe TXN ID',     key: 'phonePeTxnId',  width: 24 },
  { header: 'Donor Name',         key: 'name',          width: 22 },
  { header: 'Email',              key: 'email',         width: 30 },
  { header: 'Phone',              key: 'phone',         width: 16 },
  { header: 'Amount (₹)',         key: 'amount',        width: 14 },
  { header: 'Payment Status',     key: 'status',        width: 16 },
  { header: 'Initiated At',       key: 'initiatedAt',   width: 24 },
  { header: 'Completed At',       key: 'completedAt',   width: 24 },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Ensure the data directory exists. */
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

/** Style the header row (row 1) of the worksheet. */
const styleHeaderRow = (worksheet) => {
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    cell.fill  = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1B2A4A' }, // hospital-navy
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
      bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
      right:  { style: 'thin', color: { argb: 'FFFFFFFF' } },
    };
  });
  headerRow.height = 28;
  headerRow.commit();
};

/** Style a data row with zebra striping. */
const styleDataRow = (row, rowIndex) => {
  const isEven = rowIndex % 2 === 0;
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: isEven ? 'FFF0F4F8' : 'FFFFFFFF' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      top:    { style: 'hair', color: { argb: 'FFCCCCCC' } },
      bottom: { style: 'hair', color: { argb: 'FFCCCCCC' } },
      left:   { style: 'hair', color: { argb: 'FFCCCCCC' } },
      right:  { style: 'hair', color: { argb: 'FFCCCCCC' } },
    };
  });

  // Highlight "SUCCESS" status in green, others in red/orange
  const statusCell = row.getCell('status');
  if (statusCell.value === 'SUCCESS') {
    statusCell.font = { bold: true, color: { argb: 'FF15803D' } };
  } else {
    statusCell.font = { bold: true, color: { argb: 'FFDC2626' } };
  }

  row.height = 22;
  row.commit();
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Append one donation record to donations.xlsx.
 *
 * @param {object} donation
 * @param {string} donation.txnId           - Merchant transaction ID
 * @param {string} donation.phonePeTxnId    - PhonePe transaction ID
 * @param {string} donation.name            - Donor full name
 * @param {string} donation.email           - Donor email
 * @param {string} donation.phone           - Donor phone
 * @param {number} donation.amountRupees    - Amount in ₹
 * @param {string} donation.status          - 'SUCCESS' | 'FAILED'
 * @param {string} donation.initiatedAt     - ISO timestamp
 * @param {string} donation.completedAt     - ISO timestamp
 *
 * @returns {Promise<string>} Absolute path to the updated Excel file
 */
export const appendDonationToExcel = async (donation) => {
  ensureDataDir();

  const workbook  = new ExcelJS.Workbook();
  let worksheet;

  // ── Load existing file or create a fresh workbook ─────────────────────────
  if (fs.existsSync(FILE_PATH)) {
    await workbook.xlsx.readFile(FILE_PATH);
    worksheet = workbook.getWorksheet(SHEET_NAME);

    // Safety net: if sheet was deleted manually, recreate it
    if (!worksheet) {
      worksheet = workbook.addWorksheet(SHEET_NAME);
      worksheet.columns = COLUMNS;
      styleHeaderRow(worksheet);
    }
  } else {
    // Brand-new file
    workbook.creator  = 'DMCT Hospital System';
    workbook.created  = new Date();

    worksheet = workbook.addWorksheet(SHEET_NAME, {
      views: [{ state: 'frozen', ySplit: 1 }], // freeze header row
    });
    worksheet.columns = COLUMNS;
    styleHeaderRow(worksheet);
  }

  // ── Determine the serial number (next row after header) ───────────────────
  // rowCount includes the header, so data rows = rowCount - 1
  const serial = worksheet.rowCount; // 1 after fresh header = next data row is 1

  // ── Format timestamps for readability ─────────────────────────────────────
  const fmt = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });
  };

  // ── Append the row ─────────────────────────────────────────────────────────
  const newRow = worksheet.addRow({
    serial,
    txnId:        donation.txnId       || '—',
    phonePeTxnId: donation.phonePeTxnId || '—',
    name:         donation.name        || '—',
    email:        donation.email       || '—',
    phone:        donation.phone       || '—',
    amount:       donation.amountRupees ?? 0,
    status:       donation.status      || 'UNKNOWN',
    initiatedAt:  fmt(donation.initiatedAt),
    completedAt:  fmt(donation.completedAt),
  });

  styleDataRow(newRow, serial);

  // ── Save ───────────────────────────────────────────────────────────────────
  await workbook.xlsx.writeFile(FILE_PATH);

  console.log(`[EXCEL] Row ${serial} written → ${FILE_PATH}`);
  return FILE_PATH;
};

/**
 * Return the absolute path to the donations Excel file.
 * Useful if another module needs to attach it to an admin report email.
 */
export const getDonationsFilePath = () => FILE_PATH;
