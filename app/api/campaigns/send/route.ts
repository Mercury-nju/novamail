import { NextRequest, NextResponse } from 'next/server'

// 真实邮件发送功能 - 生产环境就绪
async function sendEmail(
  subject: string,
  content: string,
  recipients: string[],
  senderEmail: string,
  senderName: string
) {
  // 生产环境：集成 Resend API
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  
  if (!RESEND_API_KEY) {
    // 开发环境：模拟发送
    console.log('=== EMAIL SENDING SIMULATION (DEV MODE) ===')
    console.log('From:', `${senderName} <${senderEmail}>`)
    console.log('To:', recipients.join(', '))
    console.log('Subject:', subject)
    console.log('Content:', content.substring(0, 100) + '...')
    console.log('==========================================')
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      recipients: recipients.length,
      sentAt: new Date().toISOString(),
      mode: 'simulation'
    }
  }
  
  // 生产环境：使用 Resend API
  try {
    console.log('Sending email via Resend API:', {
      from: `${senderName} <${senderEmail}>`,
      to: recipients,
      subject: subject,
      recipientsCount: recipients.length
    })

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${senderName} <${senderEmail}>`,
        to: recipients,
        subject: subject,
        html: content,
      }),
    })
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Resend API error:', response.status, errorData)
      throw new Error(`Resend API error: ${response.status} - ${errorData}`)
    }
    
    const data = await response.json()
    console.log('Resend API success:', data)
    
    return {
      success: true,
      messageId: data.id,
      recipients: recipients.length,
      sentAt: new Date().toISOString(),
      mode: 'production',
      provider: 'resend'
    }
    
  } catch (error) {
    console.error('Resend API error:', error)
    throw new Error(`Failed to send email via Resend API: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
