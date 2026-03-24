/**
 * DMCT Hospital & Old Age Home – Payment Backend
 * ────────────────────────────────────────────────────────────────────────────
 * Stack  : Node.js + Express (ESM)
 * Gateway: PhonePe Standard Checkout (UAT sandbox by default)
 *
 * Setup:
 *   cd backend
 *   cp .env.example .env        # fill in your credentials
 *   npm install
 *   npm run dev                 # development (nodemon)
 *   npm start                   # production
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRouter from './routes/payment.js';
import errorHandler from './middleware/errorHandler.js';

// ── Environment ──────────────────────────────────────────────────────────────
dotenv.config();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ── App ──────────────────────────────────────────────────────────────────────
const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────

// CORS – allow requests only from the React frontend (and PhonePe callbacks)
app.use(
  cors({
    origin: [
      FRONTEND_URL,
      'https://mercury-uat.phonepe.com',
      'https://api-preprod.phonepe.com',
      'https://api.phonepe.com',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Parse JSON and URL-encoded bodies
// PhonePe sends the callback as application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request logger (development) ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// ── Routes ───────────────────────────────────────────────────────────────────

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'DMCT Hospital Payment API',
    version: '1.0.0',
    status: 'running',
    docs: 'See README.md for endpoint documentation',
  });
});

// Payment endpoints
app.use('/api/payment', paymentRouter);

// 404 catch-all
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found.' });
});

// Global error handler (must be last)
app.use(errorHandler);

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║   DMCT Hospital – Payment Backend Running    ║');
  console.log(`  ║   http://localhost:${PORT}                       ║`);
  console.log(`  ║   Env : ${(process.env.NODE_ENV || 'development').padEnd(36)}║`);
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
  console.log('  Available endpoints:');
  console.log(`   POST  http://localhost:${PORT}/api/payment/initiate`);
  console.log(`   POST  http://localhost:${PORT}/api/payment/callback`);
  console.log(`   GET   http://localhost:${PORT}/api/payment/status/:txnId`);
  console.log(`   GET   http://localhost:${PORT}/api/payment/health`);
  console.log('');
});

export default app;
