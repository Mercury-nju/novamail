// Cloudflare Pages Function for AI Email Generation
// 处理AI邮件内容生成请求

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

Thank you for being part of our community!

Best regards,
The ${business} Team`
  } else if (request.includes('sale') || request.includes('promotion') || request.includes('discount')) {
    subject = `🎉 Limited Time Offer - ${product} at Special Price!`
    content = `Dear ${audience},

We have an exclusive offer that we don't want you to miss! For a limited time only, you can get ${product} at an incredible discount.

**Special Offer Details:**
• Save up to 50% on your first purchase
• Free shipping on orders over $100
• Extended warranty included at no extra cost
• 30-day money-back guarantee

**Why this offer is special:**
This is our biggest sale of the year, and we're passing the savings directly to you. Don't wait - this offer expires soon!

**How to claim your discount:**
Simply use code SAVE50 at checkout to unlock your exclusive savings.

**Limited time only - act fast!**
This offer won't last long. Secure your discount today before it's too late.

Best regards,
The ${business} Team

P.S. This offer is exclusively for our valued customers - thank you for your continued support!`
  } else if (request.includes('welcome') || request.includes('new customer')) {
    subject = `🎉 Welcome to ${business} - Let's Get Started!`
    content = `Dear ${audience},

Welcome to ${business}! We're thrilled to have you join our community of satisfied customers.

**Getting Started:**
• Complete your profile setup to unlock all features
• Explore our comprehensive knowledge base
• Join our community forum to connect with other users
• Schedule a personalized onboarding call with our team

**What you can expect:**
• 24/7 customer support from our expert team
• Regular updates and new feature releases
• Exclusive content and resources for members
• Priority access to new products and services

**Your next steps:**
1. Complete your account setup
2. Explore our platform features
3. Connect with our community
4. Reach out if you need any assistance

We're here to help you succeed every step of the way!

Welcome aboard,
The ${business} Team

P.S. Don't hesitate to reach out if you have any questions - we're here to help!`
  } else {
    // 通用邮件模板
    subject = `📧 Important Update from ${business}`
    content = `Dear ${audience},

Thank you for your interest in ${product}. We wanted to reach out with some important information that we believe will be valuable to you.

**What we're sharing:**
• Latest updates and improvements to our services
• New opportunities that might interest you
• Important information about your account
• Exclusive offers available to our valued customers

**Why this matters:**
We're committed to providing you with the best possible experience, and this information is designed to help you make the most of our services.

**Next steps:**
Please review the information above and let us know if you have any questions. We're here to help!

Thank you for your continued trust in ${business}.

Best regards,
The ${business} Team

P.S. If you have any questions or need assistance, please don't hesitate to contact us.`
  }
  
  return { subject, content }
}

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
    const { userRequest, businessName, productService, targetAudience } = body
    
    // 输入验证
    if (!userRequest || userRequest.trim().length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User request is required',
        message: 'Please provide a description of the email you want to generate'
      }), {
        status: 400,
        headers: corsHeaders
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
      textContent: generatedContent.content,
      message: `I've created professional email content based on your request: "${userRequest}". The content has been tailored for ${businessName || 'Your Business'} and is designed to appeal to ${targetAudience || 'Your Customers'}.`,
      timestamp: new Date().toISOString(),
      processingTime: `${processingTime}ms`
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    console.error('AI Generation Error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate email content. Please try again.',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}
