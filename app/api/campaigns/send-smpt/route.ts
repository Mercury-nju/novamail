import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * 用户自定义 SMTP 邮件发送
 * 支持用户使用自己的邮箱服务器发送邮件
 */

interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface SMTPEmailRequest {
  subject: string
  content: string
  recipients: string[]
  senderEmail: string
  senderName: string
  smtpConfig: SMTPConfig
}

async function sendEmailViaSMTP(
  subject: string,
  content: string,
  recipients: string[],
  senderEmail: string,
  senderName: string,
  smtpConfig: SMTPConfig
) {
  try {
    // 创建 SMTP 传输器
    const transporter = nodemailer.createTransporter({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: smtpConfig.auth,
      // 添加 TLS 配置
      tls: {
        rejectUnauthorized: false
      }
    })

    // 验证连接
    await transporter.verify()

    // 发送邮件
    const result = await transporter.sendMail({
      from: `${senderName} <${senderEmail}>`,
      to: recipients,
      subject: subject,
      html: content,
      replyTo: senderEmail
    })

    return {
      success: true,
      messageId: result.messageId,
      recipients: recipients.length,
      sentAt: new Date().toISOString(),
      provider: 'smtp',
      method: 'user_smtp'
    }

  } catch (error) {
    console.error('SMTP sending error:', error)
    throw new Error(`SMTP sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      subject, 
      content, 
      recipients, 
      senderEmail, 
      senderName,
      smtpConfig
    } = body as SMTPEmailRequest

    // 验证必需字段
    if (!subject || !content || !recipients || !senderEmail || !smtpConfig) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: subject, content, recipients, senderEmail, smtpConfig' 
        },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = recipients.filter((email: string) => !emailRegex.test(email))
    
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid email addresses: ${invalidEmails.join(', ')}` 
        },
        { status: 400 }
      )
    }

    if (!emailRegex.test(senderEmail)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid sender email address' 
        },
        { status: 400 }
      )
    }

    // 发送邮件
    const result = await sendEmailViaSMTP(subject, content, recipients, senderEmail, senderName, smtpConfig)
    
    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${recipients.length} recipient(s) via user SMTP`,
      data: result
    })

  } catch (error) {
    console.error('SMTP email sending error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email via SMTP',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
