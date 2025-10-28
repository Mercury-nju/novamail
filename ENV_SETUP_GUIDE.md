# Environment Variables Setup Guide

## Quick Start

1. **Copy the example file:**
   ```bash
   cp env.example .env.local
   ```

2. **Update the following REQUIRED variables in `.env.local`:**

### ✅ Required for Production

```env
# API Configuration - REQUIRED
NEXT_PUBLIC_API_BASE_URL="https://novamail-api.lihongyangnju.workers.dev"

# OpenAI API - REQUIRED for AI email generation
OPENAI_API_KEY="sk-your-openai-api-key"

# Resend API - REQUIRED for sending emails
RESEND_API_KEY="re_your-resend-api-key"
EMAIL_FROM="noreply@novamail.world"

# Creem Payment - REQUIRED for subscriptions
CREEM_API_KEY="creem_your-api-key"
CREEM_WEBHOOK_SECRET="whsec_your-webhook-secret"
```

### 📝 How to Get API Keys

#### 1. API Base URL
- Already set to production: `https://novamail-api.lihongyangnju.workers.dev`
- For local development/testing: `http://localhost:8787`

#### 2. OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Copy and paste into `OPENAI_API_KEY`

#### 3. Resend API Key
1. Go to https://resend.com/api-keys
2. Create new API key
3. Copy and paste into `RESEND_API_KEY`
4. Verify your sending domain at https://resend.com/domains

#### 4. Creem Payment
1. Go to https://creem.io/dashboard
2. Get your API key from Settings
3. Get webhook secret from Webhooks section
4. Copy both values

## Optional Configurations

### Google OAuth (Optional)
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Mailchimp Integration (Optional)
```env
MAILCHIMP_API_KEY="your-mailchimp-api-key"
```

### Alternative Payment Providers (Optional)
```env
# Stripe
STRIPE_SECRET_KEY="sk_live_your-stripe-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# PayPal
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-secret"
```

## Environment Variables for Different Environments

### Development (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8787"
# ... other variables
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_BASE_URL="https://novamail-api.lihongyangnju.workers.dev"
# ... other variables
```

## Security Best Practices

1. **NEVER commit `.env.local` or `.env.production` to git**
   - Already in `.gitignore`

2. **Use different API keys for development and production**

3. **Rotate API keys regularly**

4. **Use environment-specific keys in Vercel/Cloudflare**

## Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all required variables from above
4. Set appropriate environment scope (Production/Preview/Development)

## Cloudflare Pages Deployment

1. Go to your Cloudflare Pages project
2. Navigate to Settings → Environment Variables
3. Add all required variables with `NEXT_PUBLIC_` prefix
4. Redeploy your application

## Troubleshooting

### API calls failing with CORS errors
- Make sure `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Check if your Workers API has proper CORS headers

### Email sending not working
- Verify `RESEND_API_KEY` is valid
- Check if domain is verified in Resend dashboard
- Ensure `EMAIL_FROM` uses a verified domain

### Payment webhooks failing
- Verify `CREEM_WEBHOOK_SECRET` matches Creem dashboard
- Check webhook URL is correctly configured in Creem
- Ensure webhook endpoint is publicly accessible

### AI generation not working
- Verify `OPENAI_API_KEY` is valid and has credits
- Check API quota in OpenAI dashboard
- Ensure the key has permissions for chat completions

## Verification Checklist

Before deploying to production, verify:

- [ ] `NEXT_PUBLIC_API_BASE_URL` points to correct API
- [ ] `OPENAI_API_KEY` is valid and has sufficient quota
- [ ] `RESEND_API_KEY` is valid and domain is verified
- [ ] `CREEM_API_KEY` and webhook secret are correct
- [ ] All email domains are verified
- [ ] Webhook endpoints are accessible
- [ ] Test email sending works
- [ ] Test AI generation works
- [ ] Test payment flow works

## Need Help?

Contact support@novamail.world for assistance with environment setup.

