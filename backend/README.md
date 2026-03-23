# DMCT Hospital – PhonePe Payment Backend

A Node.js + Express backend that integrates PhonePe's Standard Checkout payment gateway for the DMCT Hospital & Old Age Home donation portal.

---

## Project Structure

```
backend/
├── server.js                  # Entry point – Express app setup
├── routes/
│   └── payment.js             # All payment-related routes
├── middleware/
│   └── errorHandler.js        # Global error handler
├── package.json
├── .env.example               # Copy to .env and fill credentials
└── .gitignore
```

---

## Quick Start

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and fill in your PhonePe credentials (UAT sandbox values are pre-filled for testing).

### 3. Start the server

```bash
# Development (auto-restart on file change)
npm run dev

# Production
npm start
```

The server starts at **http://localhost:5000**.

---

## API Endpoints

### `POST /api/payment/initiate`

Initiates a PhonePe payment and returns a redirect URL.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "amount": "500"
}
```

**Success response:**
```json
{
  "success": true,
  "message": "Payment initiated successfully.",
  "redirectUrl": "https://mercury-uat.phonepe.com/transact/...",
  "transactionId": "DMCT-1712345678901-ABCD1234"
}
```

**Error response:**
```json
{
  "success": false,
  "message": "name, email, phone, and amount are all required."
}
```

---

### `POST /api/payment/callback`

PhonePe calls this URL after the user completes payment. It decodes the response and redirects the browser to the React frontend success or failure page.

This endpoint is not called directly by your frontend — PhonePe posts to it automatically.

---

### `GET /api/payment/status/:transactionId`

Verifies payment status with PhonePe directly. Use this to poll for a result on the success/failure page.

**Example:**
```
GET /api/payment/status/DMCT-1712345678901-ABCD1234
```

**Response:**
```json
{
  "success": true,
  "status": "SUCCESS",
  "phonePeData": { ... },
  "donation": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "amountRupees": 500,
    "initiatedAt": "2024-04-05T10:30:00.000Z",
    "status": "SUCCESS"
  }
}
```

---

### `GET /api/payment/health`

Health probe for deployment pipelines.

```json
{
  "success": true,
  "message": "DMCT Payment API is running.",
  "timestamp": "2024-04-05T10:30:00.000Z",
  "env": "development"
}
```

---

## PhonePe Credentials

### UAT / Sandbox (for testing)

| Field | Value |
|---|---|
| Merchant ID | `PGTESTPAYUAT86` |
| Salt Key | `96434309-7796-489d-8924-ab56988a6076` |
| Salt Index | `1` |
| API Base URL | `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay` |
| Status URL | `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status` |

These sandbox credentials are publicly provided by PhonePe for developer testing. No real money is charged.

### Production

1. Register at [PhonePe for Business](https://business.phonepe.com)
2. Complete KYC and get your live `MERCHANT_ID`, `SALT_KEY`, and `SALT_INDEX`
3. Replace the `.env` values and switch to the production API URLs

---

## How the Payment Flow Works

```
User clicks "Pay via PhonePe"
        │
        ▼
POST /api/payment/initiate
  - Validates inputs
  - Builds PhonePe payload
  - Signs with SHA256 checksum
  - Calls PhonePe API
  - Returns redirectUrl
        │
        ▼
Frontend redirects browser to PhonePe payment page
        │
        ▼
User completes / cancels payment on PhonePe
        │
        ▼
PhonePe POSTs to /api/payment/callback
  - Decodes base64 response
  - Updates transaction status
  - Redirects to frontend success/failure URL
        │
        ▼
Frontend shows result page
  - Polls GET /api/payment/status/:txnId
  - Displays confirmed status
```

---

## Moving to Production

1. Set `NODE_ENV=production` in your `.env`
2. Switch to PhonePe live credentials and API URLs
3. Update `REDIRECT_URL` to your live backend domain
4. Update `FRONTEND_SUCCESS_URL` / `FRONTEND_FAILURE_URL` to your live frontend domain
5. Update `FRONTEND_URL` for CORS
6. Replace the in-memory `pendingDonations` Map with a real database (MongoDB, PostgreSQL, etc.)
7. Add proper logging (Winston, Pino, etc.)
8. Deploy behind HTTPS (required by PhonePe in production)

---

## Security Notes

- Never commit `.env` to Git — it's in `.gitignore`
- The checksum (X-VERIFY header) prevents payload tampering
- In production, validate the callback response checksum before trusting it
- Use HTTPS in production — PhonePe requires it for live merchant accounts
