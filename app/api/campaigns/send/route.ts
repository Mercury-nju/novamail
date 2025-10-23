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
  // 使用固定的Resend API Key
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"
  
  if (!RESEND_API_KEY || RESEND_API_KEY === "re_your-resend-api-key") {
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
  
  // 简化：总是使用别名发送方式，确保邮件能正常发送
  try {
    console.log('Using alias method for reliable email delivery')
    return await sendViaResendWithAlias(subject, content, recipients, senderEmail, senderName)
    
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
  // 使用固定的Resend API Key
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"
  
  console.log('Sending email via Resend API with alias:', {
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
      from: `${senderName} <noreply@novamail.world>`, // 使用验证域名
      to: recipients, // 确保使用正确的字段名
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
  // 使用固定的Resend API Key
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"
  
  console.log('Sending email via Resend API with user email:', {
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
    
    // 调试：打印接收到的数据
    console.log('=== 后端接收数据调试 ===')
    console.log('body:', JSON.stringify(body, null, 2))
    console.log('body.campaignData:', body.campaignData)
    console.log('========================')
    
    // 支持两种数据结构：Workers API 格式和 Next.js API 格式
    let subject, content, recipients, senderEmail, senderName, useUserDomain
    
    if (body.campaignData) {
      // Workers API 格式
      subject = body.campaignData.subject
      content = body.campaignData.body
      recipients = body.recipients
      senderEmail = 'noreply@novamail.world' // 默认值
      senderName = 'NovaMail'
      useUserDomain = false
      console.log('使用 Workers API 格式')
      console.log('subject:', subject)
      console.log('content:', content)
      console.log('recipients:', recipients)
    } else {
      // Next.js API 格式
      subject = body.subject
      content = body.content
      recipients = body.recipients
      senderEmail = body.senderEmail || 'noreply@novamail.world'
      senderName = body.senderName || 'NovaMail'
      useUserDomain = body.useUserDomain || false
      console.log('使用 Next.js API 格式')
      console.log('subject:', subject)
      console.log('content:', content)
      console.log('recipients:', recipients)
    }

    // 验证必需字段
    console.log('=== 验证字段 ===')
    console.log('subject:', subject)
    console.log('content:', content)
    console.log('recipients:', recipients)
    console.log('================')
    
    if (!subject || !content || !recipients) {
      console.log('❌ 验证失败 - 缺少必需字段')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: subject, content, recipients' 
        },
        { status: 400 }
      )
    }
    
    console.log('✅ 验证通过 - 所有字段都存在')

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

    // 发送邮件 - 如果senderEmail为空，使用默认值
    const finalSenderEmail = senderEmail || 'noreply@novamail.world'
    const result = await sendEmail(subject, content, recipients, finalSenderEmail, senderName, useUserDomain)
    
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
