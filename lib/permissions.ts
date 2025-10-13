// 用户权限检查工具函数

export interface UserSubscription {
  email: string
  plan: string
  status: string
  activatedAt?: string
  expiresAt?: string
  features?: {
    maxContacts: number
    maxEmailsPerMonth: number
    hasAdvancedTemplates: boolean
    hasAITeatures: boolean
    hasAnalytics: boolean
    hasAPIAccess: boolean
    hasWebhookAccess: boolean
    hasCustomBranding: boolean
  }
}

// 获取用户订阅状态
export function getUserSubscription(): UserSubscription | null {
  if (typeof window === 'undefined') return null
  
  try {
    const subscriptionData = localStorage.getItem('user-subscription')
    if (subscriptionData) {
      return JSON.parse(subscriptionData)
    }
  } catch (error) {
    console.error('Error parsing subscription data:', error)
  }
  
  return null
}

// 从API获取用户订阅状态
export async function fetchUserSubscription(email: string): Promise<UserSubscription | null> {
  try {
    const response = await fetch('https://novamail.world/api/user/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success && data.subscription) {
        // 保存到localStorage
        updateUserSubscription(data.subscription)
        return data.subscription
      }
    }
  } catch (error) {
    console.error('Error fetching subscription from API:', error)
  }
  
  return null
}

// 检查用户是否有 Pro 权限
export function hasProAccess(): boolean {
  const subscription = getUserSubscription()
  return subscription?.status === 'active' && 
         (subscription?.plan === 'pro' || subscription?.plan === 'enterprise')
}

// 检查用户是否有特定功能权限
export function hasFeatureAccess(feature: string): boolean {
  const subscription = getUserSubscription()
  
  if (!subscription || subscription.status !== 'active') {
    return false
  }
  
  // 免费用户功能
  if (subscription.plan === 'free') {
    const freeFeatures = ['hasAITeatures', 'hasAnalytics']
    return freeFeatures.includes(feature)
  }
  
  // Pro 和 Enterprise 用户拥有所有功能
  if (subscription.plan === 'pro' || subscription.plan === 'enterprise') {
    const featureValue = subscription.features?.[feature as keyof typeof subscription.features]
    // 如果是数字类型（如 maxContacts），转换为 boolean
    if (typeof featureValue === 'number') {
      return featureValue > 0
    }
    // 如果是 boolean 类型，直接返回
    return Boolean(featureValue)
  }
  
  return false
}

// 获取用户使用限制
export function getUserLimits() {
  const subscription = getUserSubscription()
  
  if (!subscription || subscription.status !== 'active') {
    return {
      maxContacts: 500,
      maxEmailsPerMonth: 1000,
      maxCampaignsPerMonth: 10
    }
  }
  
  switch (subscription.plan) {
    case 'pro':
      return {
        maxContacts: 10000,
        maxEmailsPerMonth: 50000,
        maxCampaignsPerMonth: 100
      }
    case 'enterprise':
      return {
        maxContacts: -1, // 无限制
        maxEmailsPerMonth: -1,
        maxCampaignsPerMonth: -1
      }
    default:
      return {
        maxContacts: 500,
        maxEmailsPerMonth: 1000,
        maxCampaignsPerMonth: 10
      }
  }
}

// 更新用户订阅状态
export function updateUserSubscription(subscription: UserSubscription) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('user-subscription', JSON.stringify(subscription))
  } catch (error) {
    console.error('Error updating subscription data:', error)
  }
}
