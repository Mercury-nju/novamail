// Creem API集成
export interface CreemConfig {
  apiKey: string
  baseUrl: string
  webhookSecret: string
}

export interface CreemPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  limits: {
    contacts: number
    emails: number
  }
}

export interface CreemSubscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  trialEnd?: string
}

export interface CreemCustomer {
  id: string
  email: string
  name?: string
  createdAt: string
}

export interface CreemPaymentMethod {
  id: string
  type: 'card'
  card: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
}

class CreemAPI {
  private config: CreemConfig

  constructor(config: CreemConfig) {
    this.config = config
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Creem API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // 获取所有可用计划
  async getPlans(): Promise<CreemPlan[]> {
    return this.request('/plans')
  }

  // 创建客户
  async createCustomer(email: string, name?: string): Promise<CreemCustomer> {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    })
  }

  // 获取客户信息
  async getCustomer(customerId: string): Promise<CreemCustomer> {
    return this.request(`/customers/${customerId}`)
  }

  // 创建订阅
  async createSubscription(
    customerId: string,
    planId: string,
    trialDays?: number
  ): Promise<CreemSubscription> {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({
        customerId,
        planId,
        trialDays,
      }),
    })
  }

  // 获取订阅信息
  async getSubscription(subscriptionId: string): Promise<CreemSubscription> {
    return this.request(`/subscriptions/${subscriptionId}`)
  }

  // 更新订阅
  async updateSubscription(
    subscriptionId: string,
    planId: string
  ): Promise<CreemSubscription> {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ planId }),
    })
  }

  // 取消订阅
  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true
  ): Promise<CreemSubscription> {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ cancelAtPeriodEnd }),
    })
  }

  // 获取支付方式
  async getPaymentMethods(customerId: string): Promise<CreemPaymentMethod[]> {
    return this.request(`/customers/${customerId}/payment-methods`)
  }

  // 创建支付方式
  async createPaymentMethod(
    customerId: string,
    paymentMethodData: any
  ): Promise<CreemPaymentMethod> {
    return this.request(`/customers/${customerId}/payment-methods`, {
      method: 'POST',
      body: JSON.stringify(paymentMethodData),
    })
  }

  // 验证Webhook签名
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', this.config.webhookSecret)
      .update(payload)
      .digest('hex')
    
    return signature === expectedSignature
  }
}

export default CreemAPI
