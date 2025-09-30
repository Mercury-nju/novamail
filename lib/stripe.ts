import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-08-27.basil',
})

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

// Plan configurations
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: {
      maxContacts: 500,
      maxEmailsPerMonth: 1000,
      maxCampaignsPerMonth: 2,
      hasProfessionalTemplates: false,
      hasAdvancedSegmentation: false,
      hasExcelImport: false,
      hasPrioritySupport: false,
      hasCustomBranding: false,
    }
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 19,
    yearlyPrice: 190,
    stripePriceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    },
    features: {
      maxContacts: 5000,
      maxEmailsPerMonth: 25000,
      maxCampaignsPerMonth: -1, // unlimited
      hasProfessionalTemplates: true,
      hasAdvancedSegmentation: true,
      hasExcelImport: true,
      hasPrioritySupport: true,
      hasCustomBranding: true,
    }
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    features: {
      maxContacts: -1, // unlimited
      maxEmailsPerMonth: -1, // unlimited
      maxCampaignsPerMonth: -1, // unlimited
      hasProfessionalTemplates: true,
      hasAdvancedSegmentation: true,
      hasExcelImport: true,
      hasPrioritySupport: true,
      hasCustomBranding: true,
    }
  }
}

// Usage limits based on plan
export const getUsageLimits = (plan: string) => {
  return PLANS[plan as keyof typeof PLANS]?.features || PLANS.free.features
}

// Check if user can perform action based on their plan
export const canPerformAction = (userPlan: string, action: string, currentUsage: number) => {
  const limits = getUsageLimits(userPlan)
  
  switch (action) {
    case 'send_email':
      return limits.maxEmailsPerMonth === -1 || currentUsage < limits.maxEmailsPerMonth
    case 'add_contact':
      return limits.maxContacts === -1 || currentUsage < limits.maxContacts
    case 'create_campaign':
      return limits.maxCampaignsPerMonth === -1 || currentUsage < limits.maxCampaignsPerMonth
    default:
      return true
  }
}
