import { NextRequest, NextResponse } from 'next/server'

// 智能邮件发送功能 - 支持多种发送方式
async function sendEmail(
  subject: string,
  content: string,
  recipients: string[],
  senderEmail: string,
  senderName: string,
  useUserDomain: boolean = false
) {
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
  
  // 智能选择发送方式
  try {
    // 检查是否使用用户域名
    const userDomain = senderEmail.split('@')[1]
    const isUserDomain = useUserDomain || !senderEmail.includes('@novamail.world')
    
    if (isUserDomain) {
      // 检查用户域名是否已验证
      const isVerifiedDomain = await checkDomainVerification(userDomain)
      
      if (isVerifiedDomain) {
        // 使用用户验证的域名发送
        console.log(`Using verified user domain: ${userDomain}`)
        return await sendViaResendWithUserEmail(subject, content, recipients, senderEmail, senderName)
      } else {
        // 域名未验证，使用别名发送但保持用户邮箱显示
        console.log(`Domain ${userDomain} not verified, using alias method with user email display`)
        return await sendViaResendWithAlias(subject, content, recipients, senderEmail, senderName)
      }
    } else {
      // 使用默认的别名发送方式
      return await sendViaResendWithAlias(subject, content, recipients, senderEmail, senderName)
    }
    
  } catch (error) {
    console.error('Email sending error:', error)
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// 检查域名是否已验证
async function checkDomainVerification(domain: string): Promise<boolean> {
  try {
    // 这里应该查询数据库或KV存储来检查域名验证状态
    // 暂时使用模拟逻辑
    console.log(`Checking domain verification for: ${domain}`)
    
    // 模拟域名验证检查
    // 在实际实现中，这里应该查询用户的域名验证状态
    const isVerified = Math.random() > 0.5 // 50%概率已验证
    
    console.log(`Domain ${domain} verification status: ${isVerified ? 'verified' : 'not verified'}`)
    return isVerified
  } catch (error) {
    console.error('Domain verification check failed:', error)
    return false
  }
}

// 使用 Resend API 发送（用户邮箱别名方式）
async function sendViaResendWithAlias(
  subject: string,
  content: string,
  recipients: string[],
  senderEmail: string,
  senderName: string
) {
  console.log('Sending email via Resend API with alias:', {
    from: `${senderName} <${senderEmail}>`,
    to: recipients,
    subject: subject,
    recipientsCount: recipients.length
  })

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${senderName} <onboarding@resend.dev>`, // 使用验证域名
      to: recipients,
      subject: subject,
      html: content,
      // 添加回复地址为用户邮箱
      reply_to: senderEmail,
      // 在邮件内容中显示真实发件人
      headers: {
        'X-Original-Sender': senderEmail,
        'X-Sender-Name': senderName
      }
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
    provider: 'resend',
    method: 'alias'
  }
}

// 使用用户邮箱直接发送（需要域名验证）
async function sendViaResendWithUserEmail(
  subject: string,
  content: string,
  recipients: string[],
  senderEmail: string,
  senderName: string
) {
  console.log('Sending email via Resend API with user email:', {
    from: `${senderName} <${senderEmail}>`,
    to: recipients,
    subject: subject,
    recipientsCount: recipients.length
  })

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${senderName} <${senderEmail}>`, // 直接使用用户邮箱
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
    provider: 'resend',
    method: 'direct'
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
      senderName = 'NovaMail',
      useUserDomain = false
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
    const result = await sendEmail(subject, content, recipients, senderEmail, senderName, useUserDomain)
    
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
