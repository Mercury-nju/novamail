// Cloudflare Pages Function for Email Sending
// 处理邮件发送请求

export async function onRequest(context) {
  const { request } = context
  
  // 设置CORS头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json; charset=utf-8'
  }
  
  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200, 
      headers: corsHeaders 
    })
  }
  
  // 只处理POST请求
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    }), {
      status: 405,
      headers: corsHeaders
    })
  }
  
  try {
    const body = await request.json()
    const { subject, content, recipients, senderEmail, senderName } = body
    
    // 输入验证
    if (!subject || !content || !recipients || !senderEmail) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields',
        message: 'Subject, content, recipients, and sender email are required'
      }), {
        status: 400,
        headers: corsHeaders
      })
    }
    
    // 验证邮件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const recipientList = Array.isArray(recipients) ? recipients : recipients.split(',').map(email => email.trim())
    
    for (const email of recipientList) {
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid email format',
          message: `Invalid email address: ${email}`
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
    }
    
    if (!emailRegex.test(senderEmail)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid sender email format',
        message: `Invalid sender email address: ${senderEmail}`
      }), {
        status: 400,
        headers: corsHeaders
      })
    }
    
    // 模拟邮件发送（生产环境可以集成真实的邮件服务）
    const emailData = {
      from: `${senderName || 'NovaMail'} <${senderEmail}>`,
      to: recipientList,
      subject: subject,
      html: content,
      timestamp: new Date().toISOString()
    }
    
    // 记录邮件发送（生产环境可以集成Resend、SendGrid等）
    console.log('=== EMAIL SENDING SIMULATION ===')
    console.log(`From: ${emailData.from}`)
    console.log(`To: ${emailData.to.join(', ')}`)
    console.log(`Subject: ${emailData.subject}`)
    console.log(`Content: ${emailData.html}`)
    console.log('================================')
    
    // 模拟发送延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully!',
      emailId: `email_${Date.now()}`,
      recipients: recipientList,
      timestamp: emailData.timestamp
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    console.error('Email Sending Error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: 'Failed to send email. Please try again.',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}
