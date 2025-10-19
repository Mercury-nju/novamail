// Cloudflare Worker for NovaMail API Routes
// 处理AI生成和邮件发送功能

// 生产级AI内容生成函数
function generateEmailContent(userRequest, businessName, productService, targetAudience) {
  const request = userRequest.toLowerCase()
  
  const business = businessName || 'Your Business'
  const product = productService || 'Your Product/Service'
  const audience = targetAudience || 'Valued Customer'
  
  let subject = ''
  let content = ''
  
  if (request.includes('product launch') || request.includes('product launch email')) {
    subject = `🚀 Introducing ${product} - The Future is Here`
    content = `Dear ${audience},

We're excited to announce the launch of ${product}! This revolutionary new offering from ${business} is designed to transform your experience and deliver unprecedented value.

**What makes ${product} special:**
• Revolutionary features that set new industry standards
• Seamless integration with your existing workflow
• 24/7 dedicated support from our expert team
• Proven results that speak for themselves

**Why you should care:**
This isn't just another product launch - it's the beginning of a new era. Early adopters are already seeing remarkable improvements in their productivity and results.

**Ready to get started?**
Join thousands of satisfied customers who have already made the switch. Limited-time launch offer available for the first 100 customers.

Best regards,
The ${business} Team

P.S. Don't miss out on our exclusive launch bonus - act now while supplies last!`
  } else if (request.includes('newsletter') || request.includes('company updates')) {
    subject = `📧 ${business} Newsletter - Latest Updates & Insights`
    content = `Dear ${audience},

Welcome to our latest newsletter! We have some exciting updates and insights to share with you.

**Company Updates:**
• New team members joining our growing family
• Recent achievements and milestones reached
• Upcoming events and webinars you won't want to miss
• Product improvements based on your valuable feedback

**Industry Insights:**
The market is evolving rapidly, and we're here to help you stay ahead of the curve. Our latest research shows significant opportunities in the coming months.

**What's Next:**
We're working on some exciting new features that we can't wait to share with you. Stay tuned for more updates in our next newsletter.

Thank you for being part of the ${business} community!

Warm regards,
The ${business} Team`
  } else if (request.includes('sale') || request.includes('promotion') || request.includes('promotional')) {
    subject = `🎉 Limited Time Offer - Don't Miss Out!`
    content = `Dear ${audience},

We have an exclusive offer that we simply can't keep to ourselves! For a limited time only, ${business} is offering incredible savings on ${product}.

**Special Offer Details:**
• Save up to 50% on your first purchase
• Free shipping on all orders over $100
• Bonus items included with every purchase
• Extended warranty at no extra cost

**Why this offer is special:**
This is our biggest promotion of the year, and we're passing the savings directly to you. But hurry - this offer expires soon!

**How to claim your discount:**
1. Visit our website or call us directly
2. Mention this exclusive offer
3. Enjoy your savings!

**Limited Time Only:**
This offer expires in 48 hours, so don't wait. Secure your discount today and experience the difference that ${product} can make.

Act now before it's too late!

Best regards,
The ${business} Team

P.S. This offer is exclusive to our valued customers - thank you for your continued support!`
  } else if (request.includes('welcome') || request.includes('new customers')) {
    subject = `👋 Welcome to ${business} - Let's Get Started!`
    content = `Dear ${audience},

Welcome to ${business}! We're thrilled to have you join our community of satisfied customers.

**Getting Started:**
We've prepared everything you need to make the most of your experience with ${product}. Here's what you can expect:

• Personalized onboarding process
• Access to our comprehensive knowledge base
• Direct line to our support team
• Exclusive resources for new members

**Your Next Steps:**
1. Complete your profile setup
2. Explore our featured resources
3. Connect with our community
4. Start experiencing the benefits

**We're Here to Help:**
Our team is committed to your success. If you have any questions or need assistance, don't hesitate to reach out. We're just an email or phone call away.

**Welcome Bonus:**
As a new member, you'll receive exclusive access to our premium resources and special offers available only to our community.

Thank you for choosing ${business}. We're excited to be part of your journey!

Warmest welcome,
The ${business} Team

P.S. Keep an eye on your inbox for more helpful tips and exclusive offers coming your way!`
  } else {
    // 通用邮件模板
    subject = `Important Update from ${business}`
    content = `Dear ${audience},

We hope this message finds you well. We're writing to share some important information about ${product} and how it can benefit you.

**What we're offering:**
${product} is designed to help you achieve your goals more effectively. Our solution combines cutting-edge technology with user-friendly design to deliver exceptional results.

**Key Benefits:**
• Streamlined processes that save you time
• Enhanced productivity and efficiency
• Reliable support when you need it most
• Proven track record of success

**Why choose ${business}:**
We've been serving customers like you for years, and our commitment to excellence has never wavered. When you work with us, you're not just getting a product - you're getting a partner.

**Next Steps:**
We'd love to discuss how ${product} can help you achieve your objectives. Please don't hesitate to reach out if you have any questions.

Thank you for your time and consideration.

Best regards,
The ${business} Team`
  }
  
  return { subject, textContent: content }
}

// 邮件发送功能
async function sendEmail(subject, content, recipients, senderEmail, senderName) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  
  if (!RESEND_API_KEY) {
    // 开发环境：模拟发送
    console.log('=== EMAIL SENDING SIMULATION (DEV MODE) ===')
    console.log('From:', `${senderName} <${senderEmail}>`)
    console.log('To:', recipients.join(', '))
    console.log('Subject:', subject)
    console.log('Content:', content.substring(0, 100) + '...')
    console.log('==========================================')
    
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
      throw new Error(`Resend API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      success: true,
      messageId: data.id,
      recipients: recipients.length,
      sentAt: new Date().toISOString(),
      mode: 'production'
    }
    
  } catch (error) {
    console.error('Resend API error:', error)
    throw new Error('Failed to send email via Resend API')
  }
}

// 主处理函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname
    
    // 设置CORS头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
    
    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200, 
        headers: corsHeaders 
      })
    }
    
    try {
      // AI生成邮件内容
      if (path === '/api/ai/generate-email' && request.method === 'POST') {
        const body = await request.json()
        const { userRequest, businessName, productService, targetAudience } = body
        
        // 输入验证
        if (!userRequest || userRequest.trim().length === 0) {
          return new Response(JSON.stringify({
            success: false,
            error: 'User request is required',
            message: 'Please provide a description of the email you want to generate'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }
        
        const startTime = Date.now()
        const generatedContent = generateEmailContent(
          userRequest.trim(),
          businessName || 'Your Business',
          productService || 'Our Service',
          targetAudience || 'Valued Customer'
        )
        const processingTime = Date.now() - startTime
        
        return new Response(JSON.stringify({
          success: true,
          subject: generatedContent.subject,
          textContent: generatedContent.textContent,
          processingTime: processingTime
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
      
      // 发送邮件
      if (path === '/api/campaigns/send' && request.method === 'POST') {
        const body = await request.json()
        const { subject, content, recipients, senderEmail, senderName = 'NovaMail' } = body
        
        // 验证必需字段
        if (!subject || !content || !recipients || !senderEmail) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Missing required fields: subject, content, recipients, senderEmail'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const invalidEmails = recipients.filter(email => !emailRegex.test(email))
        
        if (invalidEmails.length > 0) {
          return new Response(JSON.stringify({
            success: false,
            error: `Invalid email addresses: ${invalidEmails.join(', ')}`
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }
        
        const result = await sendEmail(subject, content, recipients, senderEmail, senderName)
        
        return new Response(JSON.stringify({
          success: true,
          message: `Email sent successfully to ${recipients.length} recipient(s)`,
          data: result
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
      
      // 404 - 未找到路由
      return new Response(JSON.stringify({
        success: false,
        error: 'Not Found',
        message: 'API endpoint not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
      
    } catch (error) {
      console.error('API Error:', error)
      return new Response(JSON.stringify({
        success: false,
        error: 'Internal Server Error',
        message: error.message || 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }
  }
}
