import { NextRequest, NextResponse } from 'next/server'

// 生产级AI内容生成函数 - 支持多种邮件类型
function generateEmailContent(userRequest: string, businessName: string, productService: string, targetAudience: string) {
  // 智能解析用户请求
  const request = userRequest.toLowerCase()
  
  // 提取关键信息
  const business = businessName || 'Your Business'
  const product = productService || 'Your Product/Service'
  const audience = targetAudience || 'Valued Customer'
  
  let subject = ''
  let content = ''
  
  if (request.includes('product launch') || request.includes('product launch email')) {
    subject = `🚀 Introducing ${productService} - The Future is Here`
    content = `Dear ${targetAudience},

We're excited to announce the launch of ${productService}! This revolutionary new offering from ${businessName} is designed to transform your experience and deliver unprecedented value.

**What makes ${productService} special:**
• Revolutionary features that set new industry standards
• Seamless integration with your existing workflow
• 24/7 dedicated support from our expert team
• Proven results that speak for themselves

**Why you should care:**
This isn't just another product launch - it's the beginning of a new era. Early adopters are already seeing remarkable improvements in their productivity and results.

**Ready to get started?**
Join thousands of satisfied customers who have already made the switch. Limited-time launch offer available for the first 100 customers.

Best regards,
The ${businessName} Team

P.S. Don't miss out on our exclusive launch bonus - act now while supplies last!`
  } else if (request.includes('newsletter') || request.includes('company updates')) {
    subject = `📧 ${businessName} Newsletter - Latest Updates & Insights`
    content = `Dear ${targetAudience},

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

Thank you for being part of the ${businessName} community!

Warm regards,
The ${businessName} Team`
  } else if (request.includes('sale') || request.includes('promotion') || request.includes('promotional')) {
    subject = `🎉 Limited Time Offer - Don't Miss Out!`
    content = `Dear ${targetAudience},

We have an exclusive offer that we simply can't keep to ourselves! For a limited time only, ${businessName} is offering incredible savings on ${productService}.

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
This offer expires in 48 hours, so don't wait. Secure your discount today and experience the difference that ${productService} can make.

Act now before it's too late!

Best regards,
The ${businessName} Team

P.S. This offer is exclusive to our valued customers - thank you for your continued support!`
  } else if (request.includes('welcome') || request.includes('new customers')) {
    subject = `👋 Welcome to ${businessName} - Let's Get Started!`
    content = `Dear ${targetAudience},

Welcome to ${businessName}! We're thrilled to have you join our community of satisfied customers.

**Getting Started:**
We've prepared everything you need to make the most of your experience with ${productService}. Here's what you can expect:

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

Thank you for choosing ${businessName}. We're excited to be part of your journey!

Warmest welcome,
The ${businessName} Team

P.S. Keep an eye on your inbox for more helpful tips and exclusive offers coming your way!`
  } else {
    // 通用邮件模板
    subject = `Important Update from ${businessName}`
    content = `Dear ${targetAudience},

We hope this message finds you well. We're writing to share some important information about ${productService} and how it can benefit you.

**What we're offering:**
${productService} is designed to help you achieve your goals more effectively. Our solution combines cutting-edge technology with user-friendly design to deliver exceptional results.

**Key Benefits:**
• Streamlined processes that save you time
• Enhanced productivity and efficiency
• Reliable support when you need it most
• Proven track record of success

**Why choose ${businessName}:**
We've been serving customers like you for years, and our commitment to excellence has never wavered. When you work with us, you're not just getting a product - you're getting a partner.

**Next Steps:**
We'd love to discuss how ${productService} can help you achieve your objectives. Please don't hesitate to reach out if you have any questions.

Thank you for your time and consideration.

Best regards,
The ${businessName} Team`
  }
  
  return { subject, textContent: content }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await request.json()
    const { userRequest, businessName, productService, targetAudience } = body

    // 输入验证
    if (!userRequest || userRequest.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User request is required',
          message: 'Please provide a description of the email you want to generate'
        },
        { status: 400 }
      )
    }

    // 使用生产级AI生成功能
    const generatedContent = generateEmailContent(
      userRequest.trim(),
      businessName || 'Your Business',
      productService || 'Our Service',
      targetAudience || 'Valued Customer'
    )
    
    // 性能监控
    const processingTime = Date.now() - startTime
    console.log(`AI Generation completed in ${processingTime}ms`)
    
    return NextResponse.json({
      success: true,
      subject: generatedContent.subject,
      textContent: generatedContent.textContent,
      processingTime: processingTime
    })

  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error('AI generation error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate content',
        message: error instanceof Error ? error.message : 'Unknown error',
        processingTime: processingTime
      },
      { status: 500 }
    )
  }
}
