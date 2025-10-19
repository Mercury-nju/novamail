import { NextRequest, NextResponse } from 'next/server'

// 模拟邮件发送功能
async function sendEmail(
  subject: string,
  content: string,
  recipients: string[],
  senderEmail: string,
  senderName: string
) {
  // 这里可以集成真实的邮件服务，如：
  // - Resend
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP
  
  // 目前使用模拟发送
  console.log('=== EMAIL SENDING SIMULATION ===')
  console.log('From:', `${senderName} <${senderEmail}>`)
  console.log('To:', recipients.join(', '))
  console.log('Subject:', subject)
  console.log('Content:', content)
  console.log('================================')
  
  // 模拟发送延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟发送结果
  return {
    success: true,
    messageId: `msg_${Date.now()}`,
    recipients: recipients.length,
    sentAt: new Date().toISOString()
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
      senderName = 'NovaMail' 
    } = body

    // 验证必需字段
    if (!subject || !content || !recipients || !senderEmail) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: subject, content, recipients, senderEmail' 
        },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = recipients.filter(email => !emailRegex.test(email))
    
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid email addresses: ${invalidEmails.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // 发送邮件
    const result = await sendEmail(subject, content, recipients, senderEmail, senderName)
    
    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${recipients.length} recipient(s)`,
      data: result
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
