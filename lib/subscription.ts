import { PrismaClient } from '@prisma/client'
import { getUsageLimits, canPerformAction } from './stripe'

const prisma = new PrismaClient()

export interface UserSubscription {
  plan: string
  status: string
  endsAt?: Date
  isActive: boolean
  isTrial: boolean
  canCancel: boolean
}

export interface UsageStats {
  emailsSent: number
  contactsCount: number
  campaignsCount: number
  emailsLimit: number
  contactsLimit: number
  campaignsLimit: number
}

// Get user subscription info
export async function getUserSubscription(userId: string): Promise<UserSubscription> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionPlan: true,
      subscriptionStatus: true,
      subscriptionEndsAt: true,
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const plan = user.subscriptionPlan || 'free'
  const status = user.subscriptionStatus || 'free'
  const endsAt = user.subscriptionEndsAt

  return {
    plan,
    status,
    endsAt: endsAt || undefined,
    isActive: status === 'active',
    isTrial: false, // You can implement trial logic here
    canCancel: status === 'active' && plan !== 'free'
  }
}

// Get user usage statistics
export async function getUserUsage(userId: string): Promise<UsageStats> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      emailsSentThisMonth: true,
      contactsCount: true,
      campaignsCount: true,
      subscriptionPlan: true,
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const plan = user.subscriptionPlan || 'free'
  const limits = getUsageLimits(plan)

  return {
    emailsSent: user.emailsSentThisMonth || 0,
    contactsCount: user.contactsCount || 0,
    campaignsCount: user.campaignsCount || 0,
    emailsLimit: limits.maxEmailsPerMonth,
    contactsLimit: limits.maxContacts,
    campaignsLimit: limits.maxCampaignsPerMonth,
  }
}

// Check if user can perform an action
export async function checkUserPermission(
  userId: string, 
  action: string, 
  currentCount?: number
): Promise<{ allowed: boolean; reason?: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionPlan: true,
      subscriptionStatus: true,
      emailsSentThisMonth: true,
      contactsCount: true,
      campaignsCount: true,
    }
  })

  if (!user) {
    return { allowed: false, reason: 'User not found' }
  }

  const plan = user.subscriptionPlan || 'free'
  const status = user.subscriptionStatus || 'free'

  // Check subscription status
  if (status === 'canceled' || status === 'past_due') {
    return { allowed: false, reason: 'Subscription inactive' }
  }

  // Check usage limits
  let currentUsage = 0
  switch (action) {
    case 'send_email':
      currentUsage = user.emailsSentThisMonth || 0
      break
    case 'add_contact':
      currentUsage = user.contactsCount || 0
      break
    case 'create_campaign':
      currentUsage = user.campaignsCount || 0
      break
    default:
      currentUsage = currentCount || 0
  }

  const allowed = canPerformAction(plan, action, currentUsage)
  
  if (!allowed) {
    const limits = getUsageLimits(plan)
    let limit = 0
    switch (action) {
      case 'send_email':
        limit = limits.maxEmailsPerMonth
        break
      case 'add_contact':
        limit = limits.maxContacts
        break
      case 'create_campaign':
        limit = limits.maxCampaignsPerMonth
        break
    }
    return { 
      allowed: false, 
      reason: `Usage limit exceeded. ${action} limit: ${limit === -1 ? 'unlimited' : limit}` 
    }
  }

  return { allowed: true }
}

// Update usage counters
export async function updateUsage(userId: string, action: string, increment: number = 1) {
  const updateData: any = {}
  
  switch (action) {
    case 'send_email':
      updateData.emailsSentThisMonth = { increment }
      break
    case 'add_contact':
      updateData.contactsCount = { increment }
      break
    case 'create_campaign':
      updateData.campaignsCount = { increment }
      break
    default:
      return
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData
  })
}

// Reset monthly usage (call this monthly)
export async function resetMonthlyUsage(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      emailsSentThisMonth: 0,
      lastUsageReset: new Date()
    }
  })
}

// Get subscription features
export function getSubscriptionFeatures(plan: string) {
  const features = {
    free: {
      maxContacts: 500,
      maxEmailsPerMonth: 1000,
      maxCampaignsPerMonth: 2,
      hasProfessionalTemplates: false,
      hasAdvancedSegmentation: false,
      hasExcelImport: false,
      hasPrioritySupport: false,
      hasCustomBranding: false,
    },
    pro: {
      maxContacts: 5000,
      maxEmailsPerMonth: 25000,
      maxCampaignsPerMonth: -1, // unlimited
      hasProfessionalTemplates: true,
      hasAdvancedSegmentation: true,
      hasExcelImport: true,
      hasPrioritySupport: true,
      hasCustomBranding: true,
    },
    enterprise: {
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

  return features[plan as keyof typeof features] || features.free
}
