/**
 * 多邮件服务商支持
 * 为 SaaS 产品提供灵活的邮件发送解决方案
 */

export interface EmailProvider {
  name: string
  apiKey: string
  baseUrl: string
  sendEmail: (params: EmailParams) => Promise<EmailResult>
}

export interface EmailParams {
  from: string
  to: string[]
  subject: string
  html: string
  replyTo?: string
  headers?: Record<string, string>
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
  provider: string
}

// Resend 邮件服务商
export class ResendProvider implements EmailProvider {
  name = 'resend'
  apiKey: string
  baseUrl = 'https://api.resend.com'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async sendEmail(params: EmailParams): Promise<EmailResult> {
    try {
      const response = await fetch(`${this.baseUrl}/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: params.from,
          to: params.to,
          subject: params.subject,
          html: params.html,
          reply_to: params.replyTo,
          headers: params.headers,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        return {
          success: true,
          messageId: data.id,
          provider: this.name
        }
      } else {
        return {
          success: false,
          error: data.message || 'Unknown error',
          provider: this.name
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        provider: this.name
      }
    }
  }
}

// SendGrid 邮件服务商
export class SendGridProvider implements EmailProvider {
  name = 'sendgrid'
  apiKey: string
  baseUrl = 'https://api.sendgrid.com'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async sendEmail(params: EmailParams): Promise<EmailResult> {
    try {
      const response = await fetch(`${this.baseUrl}/v3/mail/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: params.to.map(email => ({ email })),
            subject: params.subject
          }],
          from: { email: params.from },
          content: [{
            type: 'text/html',
            value: params.html
          }],
          reply_to: params.replyTo ? { email: params.replyTo } : undefined,
          headers: params.headers
        }),
      })

      if (response.ok) {
        return {
          success: true,
          messageId: response.headers.get('X-Message-Id') || 'unknown',
          provider: this.name
        }
      } else {
        const error = await response.text()
        return {
          success: false,
          error: error,
          provider: this.name
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        provider: this.name
      }
    }
  }
}

// 邮件服务商工厂
export class EmailProviderFactory {
  private static providers: Map<string, EmailProvider> = new Map()

  static registerProvider(name: string, provider: EmailProvider) {
    this.providers.set(name, provider)
  }

  static getProvider(name: string): EmailProvider | undefined {
    return this.providers.get(name)
  }

  static getAvailableProviders(): string[] {
    return Array.from(this.providers.keys())
  }
}

// 智能邮件发送器
export class SmartEmailSender {
  private providers: EmailProvider[]
  private fallbackOrder: string[]

  constructor(providers: EmailProvider[], fallbackOrder: string[] = ['resend', 'sendgrid']) {
    this.providers = providers
    this.fallbackOrder = fallbackOrder
    
    // 注册所有服务商
    providers.forEach(provider => {
      EmailProviderFactory.registerProvider(provider.name, provider)
    })
  }

  async sendEmail(params: EmailParams): Promise<EmailResult> {
    // 尝试按顺序使用服务商
    for (const providerName of this.fallbackOrder) {
      const provider = EmailProviderFactory.getProvider(providerName)
      if (!provider) continue

      console.log(`Trying ${providerName}...`)
      const result = await provider.sendEmail(params)
      
      if (result.success) {
        console.log(`Email sent successfully via ${providerName}`)
        return result
      } else {
        console.log(`${providerName} failed:`, result.error)
      }
    }

    return {
      success: false,
      error: 'All email providers failed',
      provider: 'none'
    }
  }
}

// 用户自定义 SMTP 支持
export interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export class SMTPProvider implements EmailProvider {
  name = 'smtp'
  config: SMTPConfig

  constructor(config: SMTPConfig) {
    this.config = config
  }

  async sendEmail(params: EmailParams): Promise<EmailResult> {
    // 这里需要集成 Nodemailer 或其他 SMTP 库
    // 暂时返回模拟结果
    return {
      success: true,
      messageId: `smtp_${Date.now()}`,
      provider: this.name
    }
  }
}
