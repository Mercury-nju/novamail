// Paddle 配置 - 暂时禁用，等待API修复
const paddleConfig = {
  key: process.env.PADDLE_API_KEY || '',
  sandbox: process.env.PADDLE_ENVIRONMENT !== 'production'
}

// 产品配置
export const PADDLE_PRODUCTS = {
  pro: {
    name: 'NovaMail Pro',
    description: 'Professional email marketing plan',
    monthlyPrice: {
      amount: '1900', // $19.00 in cents
      currency: 'USD'
    },
    yearlyPrice: {
      amount: '19000', // $190.00 in cents
      currency: 'USD'
    }
  }
}

// 创建订阅 - 暂时禁用，等待API修复
export async function createSubscription(
  customerEmail: string,
  plan: 'pro',
  billingCycle: 'monthly' | 'yearly'
) {
  return {
    success: false,
    error: 'Paddle integration temporarily disabled'
  }
}

// 获取或创建客户 - 暂时禁用
async function getOrCreateCustomer(email: string) {
  return 'temp-customer-id'
}

// 获取价格ID
async function getPriceId(plan: string, billingCycle: string) {
  // 这里需要根据您在Paddle Dashboard中创建的价格ID来配置
  const priceIds = {
    pro: {
      monthly: process.env.PADDLE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.PADDLE_PRO_YEARLY_PRICE_ID
    }
  }

  return priceIds[plan as keyof typeof priceIds]?.[billingCycle as keyof typeof priceIds.pro]
}

// 取消订阅 - 暂时禁用
export async function cancelSubscription(subscriptionId: string) {
  return {
    success: false,
    error: 'Paddle integration temporarily disabled'
  }
}

// 重新激活订阅 - 暂时禁用
export async function reactivateSubscription(subscriptionId: string) {
  return {
    success: false,
    error: 'Paddle integration temporarily disabled'
  }
}

// 获取订阅详情 - 暂时禁用
export async function getSubscription(subscriptionId: string) {
  return {
    success: false,
    error: 'Paddle integration temporarily disabled'
  }
}

// 验证 Webhook 签名
export function verifyWebhookSignature(payload: string, signature: string) {
  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', process.env.PADDLE_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex')
  
  return signature === expectedSignature
}

export default paddleConfig


