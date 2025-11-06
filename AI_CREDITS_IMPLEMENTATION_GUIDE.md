# AI Credits System Implementation Guide

## Overview

This guide explains how to implement and use the AI credits system with user-friendly messaging.

---

## Components Created

### 1. UserStatusCard Component (`components/UserStatusCard.tsx`)

**Purpose:** Displays user identity, plan status, and AI credits in the dashboard sidebar.

**Features:**
- Shows user name and email
- Displays Free/Premium plan badge
- AI credits progress bar with visual indicators
- Color-coded status messages:
  - 🔴 Red: Out of credits
  - 🟠 Orange: Low credits (< 3)
  - 🟡 Yellow: Normal credits
- Upgrade/Billing buttons

**Status Messages:**
1. **Out of Credits (0 credits):**
   - Red alert box
   - Message: "Upgrade to Premium to continue using AI email generation"
   - Clear call-to-action

2. **Low Credits (1-2 credits):**
   - Orange warning box
   - Message: "You have X AI generations remaining"
   - Encourages upgrade

3. **Free Plan Active:**
   - Blue info box
   - Message: "All templates are free. AI generation uses credits"
   - Reassures user about free features

### 2. AICreditsModal Component (`components/AICreditsModal.tsx`)

**Purpose:** Friendly modal that explains AI credit usage when user tries to generate.

**Two States:**

#### State 1: Has Enough Credits
- Blue/Purple gradient header
- Explains how AI generation works:
  - Cost per generation (3 credits)
  - Current credits available
  - Monthly limits for Free/Premium
- Green success message: "All templates are free!"
- Continue/Cancel buttons

#### State 2: Insufficient Credits
- Orange/Red gradient header
- Clear explanation of the problem
- Lists Premium benefits:
  - 5,000 credits/month
  - Unlimited templates
  - Advanced analytics
  - Priority support
- Reminds: "Templates are still free!"
- Actions: "Use Templates Instead" or "Upgrade Now"

### 3. useAIGeneration Hook (`hooks/useAIGeneration.ts`)

**Purpose:** Handles AI generation logic with credit checking.

**Functions:**
- `checkCredits()`: Verifies user has enough credits
- `generateEmail(prompt)`: Generates email with credit deduction
- `promptForGeneration(prompt)`: Shows modal before generation

---

## Integration Example

### In Dashboard Pages (e.g., Campaign Creation)

```typescript
'use client'

import { useState } from 'react'
import AICreditsModal from '@/components/AICreditsModal'
import { useAIGeneration } from '@/hooks/useAIGeneration'
import toast from 'react-hot-toast'

export default function CampaignNew() {
  const [emailPrompt, setEmailPrompt] = useState('')
  const {
    isGenerating,
    showCreditsModal,
    setShowCreditsModal,
    userCredits,
    generateEmail
  } = useAIGeneration()

  const handleGenerateClick = async () => {
    if (!emailPrompt.trim()) {
      toast.error('Please enter a description for your email')
      return
    }

    // Check credits and show modal
    const hasCredits = await checkCredits()
    
    if (!hasCredits) {
      setShowCreditsModal(true)
      return
    }

    // Show confirmation modal
    setShowCreditsModal(true)
  }

  const handleConfirmGeneration = async () => {
    setShowCreditsModal(false)
    
    const result = await generateEmail(emailPrompt)
    
    if (result.success) {
      toast.success(`Email generated! ${result.creditsRemaining} credits remaining`)
      // Use the generated email data
      console.log(result.data)
    } else {
      toast.error(result.error || 'Failed to generate email')
    }
  }

  return (
    <div>
      <textarea
        value={emailPrompt}
        onChange={(e) => setEmailPrompt(e.target.value)}
        placeholder="Describe your email..."
        rows={4}
      />
      
      <button 
        onClick={handleGenerateClick}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate with AI'}
      </button>

      {/* AI Credits Modal */}
      <AICreditsModal
        isOpen={showCreditsModal}
        onClose={() => {
          setShowCreditsModal(false)
          // Optionally proceed with generation if has credits
          if (userCredits && userCredits.credits >= 3) {
            handleConfirmGeneration()
          }
        }}
        userCredits={userCredits?.credits}
        isPremium={userCredits?.isPremium}
        requiredCredits={3}
      />
    </div>
  )
}
```

---

## User Experience Flow

### Scenario 1: User Has Credits

1. User enters email description
2. Clicks "Generate with AI"
3. **Modal shows:**
   - "AI Email Generation"
   - "You have X generations available"
   - Explains credit system
   - Shows "All templates are free" message
4. User clicks "Continue"
5. Email generates successfully
6. Credits deducted
7. Success toast: "Email generated! X credits remaining"

### Scenario 2: User Has No Credits

1. User enters email description
2. Clicks "Generate with AI"
3. **Modal shows:**
   - "Insufficient Credits"
   - Clear explanation of the problem
   - Premium benefits list
   - Reminder: "Templates are still free!"
4. User has two options:
   - **Option A:** "Use Templates Instead" → Redirects to templates
   - **Option B:** "Upgrade Now" → Goes to pricing page
5. User doesn't feel frustrated because:
   - They know WHY it's not working (credits)
   - They know templates are still available
   - They see clear path forward (upgrade)
   - They understand the value proposition

---

## Key Messages to Users

### ✅ DO Say:

1. **"All 100+ templates are completely free forever"**
   - Emphasizes value
   - No hidden costs

2. **"AI generation costs 3 credits per use"**
   - Clear and specific
   - Sets expectations

3. **"Free users get 10 credits/month (3 AI generations)"**
   - Shows what's included
   - Helps budget usage

4. **"Premium users get 5,000 credits/month"**
   - Shows upgrade value
   - Clear benefit

5. **"You have X AI generations remaining"**
   - User-friendly language
   - Easier to understand than raw credits

### ❌ DON'T Say:

1. ~~"Error: Insufficient credits"~~
   - Sounds like a bug
   - Feels negative

2. ~~"Access Denied"~~
   - Too harsh
   - Discouraging

3. ~~"Upgrade to continue"~~ (alone)
   - Doesn't explain why
   - Feels like paywall

4. ~~"You can't use this feature"~~
   - Negative framing
   - No alternatives offered

---

## Testing Checklist

### Frontend Testing

- [ ] UserStatusCard displays correctly in sidebar (mobile + desktop)
- [ ] Plan badge shows "Free" or "Premium" correctly
- [ ] Credits progress bar updates in real-time
- [ ] Color indicators work (red/orange/yellow)
- [ ] Status messages display appropriate for credit level
- [ ] Upgrade button links to pricing page
- [ ] Billing button links to billing page

### Modal Testing

- [ ] Modal opens when generating with insufficient credits
- [ ] Modal shows correct state (has credits vs no credits)
- [ ] All text is clear and user-friendly
- [ ] "Use Templates Instead" button works
- [ ] "Upgrade Now" button goes to pricing
- [ ] "Continue" button proceeds with generation
- [ ] "Cancel" button closes modal
- [ ] Modal backdrop click closes modal

### API Integration Testing

- [ ] Credit check API returns correct data
- [ ] Credit deduction works after generation
- [ ] Real-time credit updates in UI
- [ ] Error handling for API failures
- [ ] Token authentication works
- [ ] Credit refresh every 30 seconds

### User Flow Testing

- [ ] New user sees 10 credits
- [ ] Credits deduct after AI generation (3 per use)
- [ ] Modal shows when credits = 0
- [ ] Premium users see 5,000 credits
- [ ] Credits reset monthly (if implemented)
- [ ] User can still access templates with 0 credits

---

## Error Handling

### API Errors

```typescript
// If credits API fails
if (!response.ok) {
  // Fallback to default values
  setUserCredits({
    credits: 10, // Free plan default
    isPremium: false,
    creditsUsed: 0,
    creditsLimit: 10
  })
}
```

### Network Errors

```typescript
try {
  const result = await generateEmail(prompt)
} catch (error) {
  toast.error('Network error. Please check your connection and try again.')
}
```

### Token Expiration

```typescript
if (response.status === 401) {
  toast.error('Session expired. Please log in again.')
  router.push('/login')
}
```

---

## Configuration

All credit values are centralized in `lib/config.ts`:

```typescript
credits: {
  freeMonthly: 10,          // Free users get 10/month
  costPerGeneration: 3,     // Each generation costs 3
  premiumMonthly: 5000,     // Premium users get 5000/month
}
```

To change credit amounts, update only this file.

---

## Benefits of This Implementation

### For Users:
✅ Clear understanding of their status (Free/Premium)  
✅ Always know how many generations they have left  
✅ No confusion about why something isn't working  
✅ Clear path to upgrade if needed  
✅ Reassurance that templates are always free  
✅ No feeling of being "blocked" or frustrated  

### For Business:
✅ Increased conversion to Premium (clear value)  
✅ Reduced support tickets (self-explanatory)  
✅ Better user retention (positive UX)  
✅ Transparent pricing (builds trust)  
✅ Encourages template usage (free value)  

---

## Next Steps

1. ✅ Components created and integrated
2. ✅ Hook implemented for easy usage
3. [ ] Test all scenarios
4. [ ] Update pricing page to match credit values
5. [ ] Add analytics tracking for modal interactions
6. [ ] Monitor conversion rates
7. [ ] Gather user feedback
8. [ ] Iterate based on data

---

## Support & Troubleshooting

### Common Issues:

**Q: Modal shows but user has credits**
- Check API response format
- Verify credit calculation logic
- Check for stale localStorage data

**Q: Credits don't update after generation**
- Verify API returns new credit balance
- Check state update logic
- Ensure refresh interval is working

**Q: Premium users see "Upgrade" button**
- Verify isPremium flag in API response
- Check subscription status check
- Review token authentication

---

**Last Updated:** 2024-11-06  
**Version:** 1.0  
**Status:** Ready for Testing

