# Testing Guide for NovaMail

This guide provides step-by-step instructions for testing all critical functionalities before launch.

---

## 🎯 Testing Priority

### P0 (Critical - Must Work)
1. User Registration & Email Verification
2. User Login & Authentication
3. Dashboard Access
4. Template Selection & Use
5. Payment/Subscription (Creem integration)
6. AI Email Generation with Credit System

### P1 (Important)
7. Campaign Creation & Management
8. Contact Import (CSV)
9. Email Sending
10. User Profile Management

### P2 (Nice to Have)
11. Analytics & Reporting
12. Email Scheduling
13. A/B Testing

---

## 📋 Test Cases

### 1. User Registration & Email Verification ✅

**Test Steps:**
1. Navigate to `/register`
2. Enter email address (use a real email you can access)
3. Enter password (min 6 characters)
4. Click "Sign Up"
5. Check email inbox for verification code
6. Enter 6-digit verification code
7. Should redirect to dashboard

**Expected Results:**
- ✅ Verification email received within 60 seconds
- ✅ Verification code is 6 digits
- ✅ Code expires after 10 minutes
- ✅ Invalid code shows error message
- ✅ Successful verification redirects to dashboard
- ✅ User is automatically logged in

**Test Data:**
```
Email: your-test-email@example.com
Password: Test123456
```

**Common Issues:**
- ⚠️ Email not received: Check spam folder
- ⚠️ Code expired: Request new code
- ⚠️ API error: Check Workers deployment

---

### 2. User Login & Authentication ✅

**Test Steps:**
1. Navigate to `/login`
2. Enter registered email
3. Enter password
4. Click "Log In"
5. Should redirect to dashboard

**Expected Results:**
- ✅ Correct credentials → Dashboard
- ❌ Wrong password → Error message
- ❌ Non-existent email → Error message
- ✅ Remember me checkbox works
- ✅ Token stored correctly
- ✅ User stays logged in after refresh

**Test Data:**
```
Email: your-registered-email@example.com
Password: YourPassword123
```

**Common Issues:**
- ⚠️ "Session expired": Token may be invalid
- ⚠️ Stuck on login page: Check browser console
- ⚠️ API error: Verify API endpoint is accessible

---

### 3. Dashboard Access & User Status ✅

**Test Steps:**
1. After logging in, check dashboard sidebar
2. Verify UserStatusCard is displayed
3. Check user name/email display
4. Verify "Free" badge is shown
5. Check AI credits display (should show 10/10)
6. Verify progress bar is visible

**Expected Results:**
- ✅ User name/email displayed correctly
- ✅ "Free User" badge visible
- ✅ AI credits: "10 / 10" for new users
- ✅ Progress bar shows 100% (green)
- ✅ "Upgrade to Premium" button visible
- ✅ Info message: "Free Plan Active - All templates free"

**What to Check:**
```
User Status Card should show:
┌─────────────────────────┐
│ [AB] Your Name          │
│      Free User          │
│                         │
│ ⚡ AI Credits: 10 / 10  │
│ [==========] 100%       │
│                         │
│ 💡 Free Plan Active     │
│    All templates free   │
│    AI uses credits      │
│                         │
│ [Upgrade to Premium]    │
└─────────────────────────┘
```

---

### 4. Template Selection & Use ✅

**Test Steps:**
1. Click "Templates" in sidebar
2. Browse available templates
3. Click on a template to preview
4. Click "Use Template"
5. Customize template content
6. Save/Export template

**Expected Results:**
- ✅ All 100+ templates are visible
- ✅ Template preview loads correctly
- ✅ "Use Template" button works
- ✅ Template editor opens
- ✅ Can customize text/images
- ✅ Can export template (HTML/PDF)
- ✅ **NO credits deducted** for using templates

**Important:**
🎨 **Templates are FREE** - Should work even with 0 AI credits!

---

### 5. AI Email Generation with Credits ⚡

**Test Steps - Scenario A: User Has Credits (10 credits)**
1. Navigate to AI generation page
2. Enter prompt: "Write a product launch email for a new smartphone"
3. Click "Generate with AI"
4. Modal should appear explaining:
   - "AI Email Generation"
   - "You have 3 generations available"
   - How credits work (3 per generation)
5. Click "Continue"
6. Wait for AI to generate content
7. Check credits after generation

**Expected Results - Has Credits:**
- ✅ Modal shows friendly explanation
- ✅ AI generates email content (~10-30 seconds)
- ✅ Credits deducted: 10 → 7
- ✅ UserStatusCard updates to "7 / 10"
- ✅ Progress bar updates to 70%
- ✅ Success message: "Email generated! 7 credits remaining"

**Test Steps - Scenario B: User Has 0 Credits**
1. Use AI generation 3 times (3 × 3 = 9 credits used)
2. Credits remaining: 1
3. Try to generate again
4. Modal should appear with warning

**Expected Results - No Credits:**
- ✅ Modal shows "Insufficient Credits"
- ✅ Orange/red theme (not blue)
- ✅ Clear explanation: "AI needs 3 credits, you have 1"
- ✅ Lists Premium benefits
- ✅ Reminds: "All 100+ templates are FREE!"
- ✅ Two options:
   - "Use Templates Instead" → Templates page
   - "Upgrade Now" → Pricing page
- ❌ AI generation is blocked
- ✅ **Templates still work!**

**Test Prompts:**
```
1. "Write a welcome email for new subscribers"
2. "Create a promotional email for 20% off sale"
3. "Generate a newsletter about company updates"
```

**What to Check:**
- AI quality (coherent, relevant content)
- Credit deduction accuracy (exactly 3 per use)
- Modal messaging clarity
- UserStatusCard updates in real-time
- Templates remain accessible with 0 credits

---

### 6. Payment/Subscription (Creem Integration) 💳

**Test Steps:**
1. Click "Upgrade to Premium" in UserStatusCard
2. Should redirect to pricing page
3. Select "Premium" plan
4. Choose billing cycle (Monthly/Yearly)
5. Click "Get Started"
6. Redirects to Creem payment page
7. Complete payment with test card
8. Wait for redirect back to dashboard
9. Check subscription status

**Expected Results:**
- ✅ Pricing page shows correct information
- ✅ Creem payment page loads
- ✅ Payment processes successfully
- ✅ Webhook updates user to Premium
- ✅ UserStatusCard shows "Premium User"
- ✅ AI credits: "5000 / 5000"
- ✅ "Manage Subscription" button appears
- ✅ Premium features unlocked

**Test Card (if using Creem test mode):**
```
Card: Ask Creem for test card details
or use Stripe test cards if integrated
```

**Webhook Verification:**
- Check Workers logs for webhook receipt
- Verify user record updated in database
- Confirm credit balance updated to 5000

**Common Issues:**
- ⚠️ Payment success but no upgrade: Check webhook
- ⚠️ Redirect failed: Check redirect URL config
- ⚠️ Credits not updated: Verify API endpoint

---

### 7. Campaign Creation ✉️

**Test Steps:**
1. Click "Campaigns" → "New Campaign"
2. Enter campaign name
3. Select method:
   - Option A: Use template
   - Option B: Use AI generation
4. Customize content
5. Add recipients/contacts
6. Click "Send" or "Schedule"

**Expected Results - Using Template:**
- ✅ Can create campaign
- ✅ Template loads correctly
- ✅ Can edit content
- ✅ Can add recipients
- ✅ **NO credits needed**
- ✅ Campaign saves

**Expected Results - Using AI:**
- ✅ Prompts for AI input
- ✅ Shows credits modal
- ✅ Deducts 3 credits
- ✅ Generates content
- ✅ Can edit AI content
- ✅ Campaign saves

---

### 8. Contact Import (CSV) 📥

**Test Steps:**
1. Navigate to "Contacts"
2. Click "Import Contacts"
3. Upload CSV file with contacts
4. Map CSV columns to fields
5. Import contacts
6. Verify contacts appear in list

**Expected Results:**
- ✅ CSV upload works
- ✅ Column mapping interface appears
- ✅ Contacts imported successfully
- ✅ Duplicate detection works
- ✅ Can view imported contacts
- ✅ Can use contacts in campaigns

**Test CSV:**
```csv
email,name,company
john@example.com,John Doe,Acme Corp
jane@example.com,Jane Smith,Tech Inc
bob@example.com,Bob Johnson,Design Co
```

---

### 9. Email Sending & Delivery 📧

**Test Steps:**
1. Create a test campaign
2. Add your own email as recipient
3. Click "Send Now"
4. Check email inbox
5. Verify email received
6. Check spam score

**Expected Results:**
- ✅ Email sent within 5 minutes
- ✅ Email arrives in inbox (not spam)
- ✅ Email formatting correct
- ✅ Images load properly
- ✅ Links work
- ✅ Unsubscribe link present
- ✅ Sender info correct

**Delivery Rate Test:**
- Send to 10+ different email providers
- Gmail, Outlook, Yahoo, ProtonMail, etc.
- Track delivery rate (should be >95%)

**Spam Score Check:**
- Use: mail-tester.com
- Send test email to provided address
- Check spam score (should be >7/10)

**Common Issues:**
- ⚠️ Emails in spam: Check SPF/DKIM/DMARC
- ⚠️ Not delivered: Check Resend dashboard
- ⚠️ Slow delivery: Check API rate limits

---

### 10. User Profile Management 👤

**Test Steps:**
1. Click user avatar/name
2. Go to "Profile" or "Settings"
3. Update name
4. Update email (if allowed)
5. Change password
6. Save changes
7. Log out and log back in
8. Verify changes persisted

**Expected Results:**
- ✅ Can update profile info
- ✅ Changes save successfully
- ✅ Changes persist after logout
- ✅ Password change requires old password
- ✅ Email change requires verification

---

## 🧪 Automated Testing Script

Create a test script to quickly verify core functions:

```javascript
// test-core-functionality.js
const testResults = {
  registration: false,
  login: false,
  dashboard: false,
  templates: false,
  aiGeneration: false,
  credits: false,
  payment: false
};

async function runTests() {
  console.log('🧪 Starting Core Functionality Tests...\n');

  // Test 1: Registration
  console.log('Test 1: User Registration');
  // Add test code here
  
  // Test 2: Login
  console.log('Test 2: User Login');
  // Add test code here
  
  // ... more tests
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(testResults);
}

runTests();
```

---

## ✅ Pre-Launch Checklist

Before going live, verify:

### Critical (Must be ✅)
- [ ] New user can register successfully
- [ ] Email verification works
- [ ] User can log in
- [ ] Dashboard loads with user info
- [ ] AI credits system works correctly
- [ ] Templates are free to use
- [ ] Payment/upgrade flow works
- [ ] AI generation works and deducts credits
- [ ] Credit modal displays correctly
- [ ] Emails are delivered (not spam)

### Important
- [ ] All API endpoints respond correctly
- [ ] Error messages are user-friendly
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] All navigation links work
- [ ] Images load correctly
- [ ] Forms validate properly

### Nice to Have
- [ ] Analytics tracking works
- [ ] Social sharing works
- [ ] SEO meta tags correct
- [ ] Performance optimized
- [ ] Accessibility standards met

---

## 🐛 Bug Reporting Template

When you find issues, report them like this:

```
**Bug Title:** [Short description]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. Enter...

**Expected Result:**
What should happen

**Actual Result:**
What actually happened

**Screenshots:**
[Attach if applicable]

**Browser/Device:**
Chrome 120 / Windows 11

**Console Errors:**
[Paste any errors from browser console]
```

---

## 📞 Support Contacts

If you encounter issues during testing:

1. **Check Documentation:**
   - PRODUCTION_READINESS_CHECK.md
   - AI_CREDITS_IMPLEMENTATION_GUIDE.md
   - ENV_SETUP_GUIDE.md

2. **Check Logs:**
   - Browser Console (F12)
   - Cloudflare Workers Logs
   - Resend Dashboard
   - Creem Dashboard

3. **Common Solutions:**
   - Clear browser cache & cookies
   - Try incognito/private mode
   - Check API endpoint is accessible
   - Verify environment variables set

---

## 🚀 Test Environment URLs

**Staging:**
- Frontend: https://novamail-staging.pages.dev
- API: https://novamail-api.lihongyangnju.workers.dev

**Production:**
- Frontend: https://novamail.com (or your domain)
- API: https://api.novamail.com (or your domain)

---

## 📈 Success Metrics

After testing, these should all be ✅:

- **Registration Success Rate:** >95%
- **Email Delivery Rate:** >95%
- **Payment Success Rate:** >90%
- **AI Generation Success Rate:** >98%
- **Template Load Time:** <2 seconds
- **Dashboard Load Time:** <3 seconds
- **Spam Score:** >7/10
- **User Satisfaction:** Positive feedback

---

## 🎉 Ready to Launch

When all P0 and P1 tests pass, you're ready to launch! 🚀

**Final Steps:**
1. ✅ Run full test suite one more time
2. ✅ Backup database
3. ✅ Set up monitoring/alerts
4. ✅ Prepare customer support docs
5. ✅ Announce launch! 🎊

---

**Last Updated:** 2024-11-06  
**Version:** 1.0  
**Tested By:** [Your Name]

