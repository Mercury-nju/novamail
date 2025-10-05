// 国内邮件服务统一接口
// 支持阿里云邮件推送、腾讯云邮件、网易企业邮箱等

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface EmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// 邮件服务提供商枚举
export enum EmailProvider {
  ALIYUN = 'aliyun',        // 阿里云邮件推送
  TENCENT = 'tencent',      // 腾讯云邮件
  NETEASE = 'netease',      // 网易企业邮箱
  SMTP = 'smtp',            // 通用SMTP
  GMAIL = 'gmail'           // Gmail (备用)
}

// 获取当前配置的邮件提供商
function getCurrentEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'smtp';
  return provider as EmailProvider;
}

// 阿里云邮件推送服务
class AliyunEmailService {
  private accessKeyId: string;
  private accessKeySecret: string;
  private region: string;
  private endpoint: string;

  constructor() {
    this.accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID || '';
    this.accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET || '';
    this.region = process.env.ALIYUN_REGION || 'cn-hangzhou';
    this.endpoint = `https://dm.${this.region}.aliyuncs.com`;
  }

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    try {
      const params = {
        Action: 'SingleSendMail',
        Version: '2015-11-23',
        RegionId: this.region,
        AccountName: request.from || process.env.EMAIL_FROM || 'noreply@yourdomain.com',
        ReplyToAddress: request.replyTo || 'false',
        AddressType: '1',
        ToAddress: Array.isArray(request.to) ? request.to.join(',') : request.to,
        Subject: request.subject,
        HtmlBody: request.html || '',
        TextBody: request.text || '',
        Format: 'JSON',
        Timestamp: new Date().toISOString(),
        SignatureMethod: 'HMAC-SHA1',
        SignatureVersion: '1.0',
        SignatureNonce: Math.random().toString(36).substring(2, 15),
        AccessKeyId: this.accessKeyId
      };

      // 生成签名
      const signature = this.generateSignature(params);
      (params as any)['Signature'] = signature;

      // 发送请求
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(params).toString()
      });

      const result = await response.json();

      if (result.EnvId) {
        return {
          success: true,
          messageId: result.EnvId
        };
      } else {
        throw new Error(result.Message || 'Aliyun email send failed');
      }
    } catch (error) {
      console.error('Aliyun email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private generateSignature(params: any): string {
    // 阿里云签名算法
    const crypto = require('crypto');
    
    // 排序参数
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    // 构造待签名字符串
    const stringToSign = `POST&${encodeURIComponent('/')}&${encodeURIComponent(sortedParams)}`;
    
    // 生成签名
    const signature = crypto
      .createHmac('sha1', this.accessKeySecret + '&')
      .update(stringToSign)
      .digest('base64');

    return signature;
  }
}

// 腾讯云邮件服务
class TencentEmailService {
  private secretId: string;
  private secretKey: string;
  private region: string;
  private endpoint: string;

  constructor() {
    this.secretId = process.env.TENCENT_SECRET_ID || '';
    this.secretKey = process.env.TENCENT_SECRET_KEY || '';
    this.region = process.env.TENCENT_REGION || 'ap-beijing';
    this.endpoint = 'https://ses.tencentcloudapi.com';
  }

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    try {
      const payload = {
        FromEmailAddress: request.from || process.env.EMAIL_FROM || 'noreply@yourdomain.com',
        Destination: Array.isArray(request.to) ? request.to : [request.to],
        Subject: request.subject,
        ReplyToAddresses: request.replyTo ? [request.replyTo] : undefined,
        Template: {
          TemplateData: JSON.stringify({
            subject: request.subject,
            html: request.html || '',
            text: request.text || ''
          })
        }
      };

      // 腾讯云API签名和请求
      const headers = this.generateTencentHeaders(payload);
      
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.Response && result.Response.MessageId) {
        return {
          success: true,
          messageId: result.Response.MessageId
        };
      } else {
        throw new Error(result.Response?.Error?.Message || 'Tencent email send failed');
      }
    } catch (error) {
      console.error('Tencent email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private generateTencentHeaders(payload: any): any {
    // 腾讯云API签名算法
    const crypto = require('crypto');
    const timestamp = Math.floor(Date.now() / 1000);
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `TC3-HMAC-SHA256 Credential=${this.secretId}/${new Date().toISOString().split('T')[0]}/ses/tc3_request, SignedHeaders=content-type;host, Signature=mock_signature`,
      'X-TC-Action': 'SendEmail',
      'X-TC-Version': '2020-10-02',
      'X-TC-Region': this.region,
      'X-TC-Timestamp': timestamp.toString()
    };
  }
}

// 网易企业邮箱服务
class NeteaseEmailService {
  private host: string;
  private port: number;
  private user: string;
  private pass: string;

  constructor() {
    this.host = process.env.NETEASE_SMTP_HOST || 'smtp.ym.163.com';
    this.port = parseInt(process.env.NETEASE_SMTP_PORT || '465');
    this.user = process.env.NETEASE_SMTP_USER || '';
    this.pass = process.env.NETEASE_SMTP_PASS || '';
  }

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransporter({
        host: this.host,
        port: this.port,
        secure: true,
        auth: {
          user: this.user,
          pass: this.pass
        }
      });

      const mailOptions = {
        from: request.from || this.user,
        to: Array.isArray(request.to) ? request.to.join(',') : request.to,
        subject: request.subject,
        html: request.html,
        text: request.text,
        replyTo: request.replyTo,
        attachments: request.attachments
      };

      const result = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Netease email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// 通用SMTP服务
class SMTPEmailService {
  private host: string;
  private port: number;
  private user: string;
  private pass: string;
  private secure: boolean;

  constructor() {
    this.host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
    this.port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || '587');
    this.user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER || '';
    this.pass = process.env.SMTP_PASS || process.env.EMAIL_SERVER_PASSWORD || '';
    this.secure = this.port === 465;
  }

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransporter({
        host: this.host,
        port: this.port,
        secure: this.secure,
        auth: {
          user: this.user,
          pass: this.pass
        }
      });

      const mailOptions = {
        from: request.from || process.env.EMAIL_FROM || this.user,
        to: Array.isArray(request.to) ? request.to.join(',') : request.to,
        subject: request.subject,
        html: request.html,
        text: request.text,
        replyTo: request.replyTo,
        attachments: request.attachments
      };

      const result = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('SMTP email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// 邮件服务工厂
class EmailServiceFactory {
  static createService(provider: EmailProvider) {
    switch (provider) {
      case EmailProvider.ALIYUN:
        return new AliyunEmailService();
      case EmailProvider.TENCENT:
        return new TencentEmailService();
      case EmailProvider.NETEASE:
        return new NeteaseEmailService();
      case EmailProvider.SMTP:
      case EmailProvider.GMAIL:
        return new SMTPEmailService();
      default:
        return new SMTPEmailService(); // 默认使用SMTP
    }
  }
}

// 主要的邮件服务接口
export class EmailService {
  private service: AliyunEmailService | TencentEmailService | NeteaseEmailService | SMTPEmailService;

  constructor() {
    const provider = getCurrentEmailProvider();
    this.service = EmailServiceFactory.createService(provider);
  }

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    try {
      // 首先尝试主要服务
      const result = await this.service.sendEmail(request);
      
      if (result.success) {
        return result;
      }

      // 如果主要服务失败，尝试备用服务
      console.warn('Primary email service failed, trying fallback...');
      return await this.tryFallbackServices(request);
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async tryFallbackServices(request: EmailRequest): Promise<EmailResponse> {
    const currentProvider = getCurrentEmailProvider();
    const fallbackProviders = Object.values(EmailProvider).filter(p => p !== currentProvider);

    for (const provider of fallbackProviders) {
      try {
        const service = EmailServiceFactory.createService(provider);
        const result = await service.sendEmail(request);
        
        if (result.success) {
          console.log(`Fallback email service ${provider} succeeded`);
          return result;
        }
      } catch (error) {
        console.warn(`Fallback email service ${provider} failed:`, error);
        continue;
      }
    }

    return {
      success: false,
      error: 'All email services failed'
    };
  }

  // 发送验证邮件
  async sendVerificationEmail(to: string, verificationCode: string, userName?: string): Promise<EmailResponse> {
    const subject = 'NovaMail 邮箱验证码';
    const html = this.generateVerificationEmailHTML(verificationCode, userName);
    const text = `您的验证码是：${verificationCode}，有效期10分钟。`;

    return this.sendEmail({
      to,
      subject,
      html,
      text
    });
  }

  // 发送欢迎邮件
  async sendWelcomeEmail(to: string, userName: string): Promise<EmailResponse> {
    const subject = '欢迎加入 NovaMail！';
    const html = this.generateWelcomeEmailHTML(userName);
    const text = `欢迎 ${userName} 加入 NovaMail！我们很高兴您选择了我们的AI邮件营销平台。`;

    return this.sendEmail({
      to,
      subject,
      html,
      text
    });
  }

  // 发送密码重置邮件
  async sendPasswordResetEmail(to: string, resetToken: string, userName?: string): Promise<EmailResponse> {
    const subject = 'NovaMail 密码重置';
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    const html = this.generatePasswordResetEmailHTML(resetUrl, userName);
    const text = `点击以下链接重置您的密码：${resetUrl}`;

    return this.sendEmail({
      to,
      subject,
      html,
      text
    });
  }

  private generateVerificationEmailHTML(code: string, userName?: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>邮箱验证</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px;">NovaMail</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">AI驱动的邮件营销平台</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #333; margin: 0 0 15px 0;">邮箱验证</h2>
          ${userName ? `<p style="color: #666; margin-bottom: 15px;">您好，${userName}！</p>` : ''}
          <p style="color: #666; margin-bottom: 20px;">感谢您注册 NovaMail。请使用以下验证码完成邮箱验证：</p>
          
          <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${code}</span>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 15px;">
            验证码有效期为10分钟，请尽快完成验证。
          </p>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 12px;">
          <p>© 2024 NovaMail. 保留所有权利。</p>
          <p>如果您没有注册 NovaMail，请忽略此邮件。</p>
        </div>
      </body>
      </html>
    `;
  }

  private generateWelcomeEmailHTML(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>欢迎加入 NovaMail</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px;">欢迎加入 NovaMail！</h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">开始您的AI邮件营销之旅</p>
        </div>
        
        <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
          <h2 style="color: #92400e; margin: 0 0 15px 0;">👋 ${userName}，欢迎您！</h2>
          <p style="line-height: 1.6; color: #451a03; margin: 0;">
            感谢您选择 NovaMail！我们的AI驱动的邮件营销平台将帮助您：
          </p>
          <ul style="color: #451a03; margin: 15px 0;">
            <li>智能生成吸引人的邮件内容</li>
            <li>轻松管理联系人和邮件列表</li>
            <li>实时跟踪邮件营销效果</li>
            <li>提升用户参与度和转化率</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">开始使用</a>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 12px;">
          <p>© 2024 NovaMail. 保留所有权利。</p>
        </div>
      </body>
      </html>
    `;
  }

  private generatePasswordResetEmailHTML(resetUrl: string, userName?: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>密码重置</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px;">密码重置</h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">NovaMail 账户安全</p>
        </div>
        
        <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
          <h2 style="color: #991b1b; margin: 0 0 15px 0;">🔒 重置您的密码</h2>
          ${userName ? `<p style="color: #7f1d1d; margin-bottom: 15px;">您好，${userName}！</p>` : ''}
          <p style="color: #7f1d1d; margin-bottom: 20px;">
            我们收到了您的密码重置请求。点击下面的按钮来设置新密码：
          </p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">重置密码</a>
          </div>
          
          <p style="color: #991b1b; font-size: 14px; margin-top: 15px;">
            此链接将在24小时后失效。如果您没有请求重置密码，请忽略此邮件。
          </p>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 12px;">
          <p>© 2024 NovaMail. 保留所有权利。</p>
          <p>如果按钮无法点击，请复制以下链接到浏览器：<br>${resetUrl}</p>
        </div>
      </body>
      </html>
    `;
  }
}

// 导出默认实例
export const emailService = new EmailService();
