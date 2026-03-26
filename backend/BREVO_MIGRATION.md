# Brevo Email Service Migration

## ✅ Migration Complete

Successfully migrated from legacy Brevo API (`TransactionalEmailsApi`) to the new `BrevoClient` interface.

## 📋 Changes Made

### 1. **Updated `emailService.js`**
   - Replaced `import * as Brevo from "@getbrevo/brevo"` with `import { BrevoClient } from '@getbrevo/brevo'`
   - Implemented new `BrevoClient` with singleton pattern
   - Added proper error handling with `getErrorMessage()` helper
   - Updated both email functions to return `{ success, messageId/error }` format
   - Added null checks and graceful degradation when API key is missing

### 2. **Updated `package.json`**
   - Removed `nodemailer` dependency (no longer needed)
   - Kept `@getbrevo/brevo` v5.0.3

### 3. **Updated `.env.example`**
   - Replaced SMTP configuration section with Brevo configuration
   - Required variables:
     - `BREVO_API_KEY` - Get from https://app.brevo.com/settings/keys/api
     - `EMAIL_FROM_NAME` - Sender name (e.g., "DMCT Hospital & Old Age Home")
     - `EMAIL_FROM_ADDRESS` - Verified sender email
     - `ADMIN_EMAIL` - Admin notification recipient (optional)

## 🔧 Setup Instructions

### 1. Get Your Brevo API Key
   1. Sign up at [Brevo](https://www.brevo.com/) (free tier: 9,000 emails/month)
   2. Go to [Settings → API Keys](https://app.brevo.com/settings/keys/api)
   3. Create a new API key
   4. Copy the key

### 2. Configure Environment Variables
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add:
   BREVO_API_KEY=your-actual-api-key-here
   EMAIL_FROM_NAME=DMCT Hospital & Old Age Home
   EMAIL_FROM_ADDRESS=your-verified@brevo.com
   ADMIN_EMAIL=admin@yourdomain.com
   ```

### 3. Verify Sender Email
   - In Brevo dashboard, go to **Senders** → **Add a New Sender**
   - Add your email and verify it (check your inbox for verification link)
   - Use this verified email as `EMAIL_FROM_ADDRESS`

### 4. Install Dependencies (if needed)
   ```bash
   cd backend
   npm install
   ```

### 5. Test the Service
   ```bash
   npm start
   # Make a test donation to verify emails are sent
   ```

## 📧 Email Functions

### `sendDonorConfirmationEmail(donation, pdfBuffer)`
Sends a donation receipt email to the donor with PDF attachment.

**Returns:** `{ success: true, messageId: "..." }` or `{ success: false, error: "..." }`

### `sendAdminNotificationEmail(donation, sheetUrl)`
Sends a notification to the admin about a new donation.

**Returns:** `{ success: true, messageId: "..." }` or `{ success: false, error: "..." }`

## 🔍 Error Handling

The new implementation includes:
- ✅ Null checks for missing API key or sender email
- ✅ Graceful error messages with `getErrorMessage()` helper
- ✅ Console warnings when email service is not configured
- ✅ Return objects with success/error status instead of throwing

## 🚀 Benefits of New API

1. **Cleaner Interface** - `BrevoClient` is simpler and more modern
2. **Better Error Handling** - Structured error responses
3. **Type Safety** - Better TypeScript support (if you add types later)
4. **Consistent Returns** - All functions return `{ success, messageId/error }`
5. **Singleton Pattern** - Client is initialized once and reused

## 📝 Migration Notes

- **Behavior Change** - The public API functions (`sendDonorConfirmationEmail`, `sendAdminNotificationEmail`) now return `{ success, messageId/error }` instead of throwing on failure. Callers should check the `success` flag rather than relying on exceptions.
- **Removed nodemailer** - No longer needed since we're using Brevo API directly
- **Environment Variables** - Remove old SMTP variables, use `BREVO_API_KEY` instead
- **Backwards Compatible Env Vars** - Supports both `EMAIL_FROM_ADDRESS` and `BREVO_SENDER_EMAIL` for flexibility in configuration

## ⚠️ Important

- **Free Tier Limits:** 9,000 emails/month, 300/day
- **Sender Verification:** Your sender email MUST be verified in Brevo dashboard
- **API Key Security:** NEVER commit `.env` to Git (already in `.gitignore`)

## 🐛 Troubleshooting

### Email not sending?
1. Check if `BREVO_API_KEY` is set correctly
2. Verify sender email is verified in Brevo dashboard
3. Check console for error messages
4. Ensure you haven't exceeded free tier limits

### Getting authentication errors?
- Your API key may be invalid or expired
- Regenerate a new key from Brevo dashboard

### Emails going to spam?
- Make sure sender email is verified
- Add SPF/DKIM records in your domain DNS (if using custom domain)
- Brevo provides these in their dashboard

## 📚 Resources

- [Brevo API Documentation](https://developers.brevo.com/)
- [Brevo Node.js SDK](https://github.com/getbrevo/brevo-node)
- [Free Tier Limits](https://www.brevo.com/pricing/)
