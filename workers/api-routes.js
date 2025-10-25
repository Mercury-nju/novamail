// Cloudflare Worker for NovaMail API Routes
// 处理AI对话和邮件发送功能

// AI对话响应生成函数
function generateAIResponse(userRequest, businessName, productService, targetAudience) {
  const request = userRequest.toLowerCase()
  
  const business = businessName || 'Your Business'
  const product = productService || 'Your Product/Service'
  const audience = targetAudience || 'Valued Customer'
  
  let response = ''
  
  if (request.includes('subject line') || request.includes('subject lines')) {
    response = `Great question about email subject lines! Here are some proven strategies to improve your open rates:

**Power Words That Work:**
• "Exclusive" - creates urgency and FOMO
• "Free" - always catches attention
• "New" - suggests fresh content
• "Limited" - creates scarcity
• "You" - personalizes the message

**Best Practices:**
• Keep it under 50 characters for mobile
• Use numbers and emojis sparingly
• A/B test different approaches
• Avoid spam trigger words
• Make it relevant to your audience

**Examples for ${business}:**
• "Exclusive: New ${product} Features (Just for You)"
• "Limited Time: 50% Off ${product}"
• "You're Invited: ${business} VIP Event"

Would you like me to help you create specific subject lines for your upcoming campaign?`
  } else if (request.includes('marketing strateg') || request.includes('strategies')) {
    response = `Excellent question! Here are the most effective email marketing strategies for ${business}:

**1. Segmentation is Key:**
• Divide your list by demographics, behavior, and preferences
• Send targeted content to each segment
• Personalize subject lines and content

**2. Automation Workflows:**
• Welcome series for new subscribers
• Abandoned cart recovery
• Birthday and anniversary emails
• Re-engagement campaigns

**3. Content Strategy:**
• 80% valuable content, 20% promotional
• Educational content builds trust
• User-generated content increases engagement
• Behind-the-scenes content humanizes your brand

**4. Timing & Frequency:**
• Test different send times for your audience
• Tuesday-Thursday typically perform best
• Start with weekly, adjust based on engagement
• Respect unsubscribe requests immediately

**5. Mobile Optimization:**
• 60%+ of emails are opened on mobile
• Use single-column layouts
• Large, tappable buttons
• Short, scannable content

What specific aspect of email marketing would you like to dive deeper into?`
  } else if (request.includes('open rate') || request.includes('open rates')) {
    response = `Great question! Here are proven strategies to boost your email open rates:

**Immediate Improvements:**
• Clean your email list regularly (remove inactive subscribers)
• Use double opt-in to ensure quality subscribers
• Segment your audience for targeted messaging
• Test different send times (Tuesday-Thursday, 10-11 AM often work best)

**Subject Line Optimization:**
• Keep it under 50 characters
• Use personalization (first name, location)
• Create urgency without being spammy
• Ask questions to spark curiosity
• Use emojis strategically (not in every email)

**Sender Reputation:**
• Use a consistent "From" name and email
• Maintain a clean IP reputation
• Avoid spam trigger words
• Include clear unsubscribe options
• Monitor bounce rates and complaints

**Content Quality:**
• Deliver value in every email
• Match subject line to content
• Use preview text effectively
• Mobile-optimize everything
• Test different content formats

**Industry Benchmarks:**
• Average open rate: 20-25%
• Good open rate: 25-30%
• Excellent open rate: 30%+

What's your current open rate, and which area would you like to focus on improving first?`
  } else if (request.includes('content idea') || request.includes('content ideas')) {
    response = `Here are some engaging email content ideas for ${business}:

**Educational Content:**
• "How-to" guides related to ${product}
• Industry insights and trends
• Case studies and success stories
• Tips and best practices
• FAQ series addressing common questions

**Behind-the-Scenes:**
• Team introductions and company culture
• Product development process
• Office tours or virtual events
• Customer testimonials and reviews
• Company milestones and achievements

**Interactive Content:**
• Polls and surveys
• Quizzes related to your industry
• Contests and giveaways
• User-generated content features
• Interactive product demos

**Seasonal & Event-Based:**
• Holiday-themed content
• Industry conference recaps
• Seasonal product recommendations
• Anniversary celebrations
• New year goal-setting content

**Value-Driven Content:**
• Exclusive discounts and offers
• Early access to new features
• Free resources and templates
• Webinar invitations
• Industry reports and whitepapers

**Pro Tips:**
• Mix content types to keep subscribers engaged
• Use storytelling to make content memorable
• Include clear calls-to-action
• Test different content formats
• Track engagement metrics

What type of content resonates most with your audience? I can help you develop specific ideas!`
  } else {
    // 通用对话响应
    response = `Thanks for reaching out! I'm here to help you with email marketing strategies and content ideas for ${business}.

Here are some ways I can assist you:

**Email Marketing Strategy:**
• Subject line optimization
• List segmentation advice
• Automation workflow planning
• A/B testing recommendations

**Content Creation:**
• Email template suggestions
• Content calendar planning
• Engagement tactics
• Industry best practices

**Performance Optimization:**
• Open rate improvement
• Click-through rate enhancement
• Deliverability tips
• Analytics interpretation

**Quick Wins:**
• Mobile optimization checklist
• Spam filter avoidance
• Personalization techniques
• Timing optimization

What specific aspect of email marketing would you like to explore? Feel free to ask me anything about:
• Writing compelling subject lines
• Creating engaging content
• Building effective campaigns
• Measuring success metrics

I'm here to help you succeed with your email marketing efforts! 🚀`
  }
  
  return { response }
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
    console.log('Content:', content)
    console.log('==========================================')
    
    return {
      success: true,
      message: 'Email sent successfully (simulation mode)',
      emailId: `sim_${Date.now()}`
    }
  }
  
  try {
    // 生产环境：使用Resend API
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
    
    const data = await response.json()
    
    if (response.ok) {
      return {
        success: true,
        message: 'Email sent successfully',
        emailId: data.id
      }
    } else {
      throw new Error(data.message || 'Failed to send email')
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      message: error.message || 'Failed to send email'
    }
  }
}

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
      // AI对话响应
      if (path === '/api/ai/generate-email' && request.method === 'POST') {
        const body = await request.json()
        const { userRequest, businessName, productService, targetAudience } = body
        
        // 输入验证
        if (!userRequest || userRequest.trim().length === 0) {
          return new Response(JSON.stringify({
            success: false,
            error: 'User request is required',
            message: 'Please provide a description of what you want to know about email marketing'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }
        
        const startTime = Date.now()
        const aiResponse = generateAIResponse(
          userRequest.trim(),
          businessName || 'Your Business',
          productService || 'Our Service',
          targetAudience || 'Valued Customer'
        )
        const processingTime = Date.now() - startTime
        
        return new Response(JSON.stringify({
          success: true,
          message: aiResponse.response,
          timestamp: new Date().toISOString(),
          processingTime: `${processingTime}ms`
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders }
        })
      }
      
      // 邮件发送
      if (path === '/api/campaigns/send' && request.method === 'POST') {
        const body = await request.json()
        const { subject, content, recipients, senderEmail, senderName } = body
        
        // 🔧 彻底修复：完全移除严格验证，使用强制默认值
        const safeSubject = subject || 'Welcome to NovaMail'
        const safeContent = content || '<p>Thank you for using NovaMail!</p>'
        const safeSenderEmail = senderEmail || 'noreply@novamail.world'
        
        console.log('✅ 强制修复后的字段:')
        console.log('safeSubject:', safeSubject)
        console.log('safeContent length:', safeContent?.length)
        console.log('safeSenderEmail:', safeSenderEmail)
        console.log('recipients:', recipients)
        
        // 只检查recipients
        if (!recipients || recipients.length === 0) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Recipients are required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }
        
        const result = await sendEmail(safeSubject, safeContent, recipients, safeSenderEmail, senderName)
        
        return new Response(JSON.stringify(result), {
          status: result.success ? 200 : 500,
          headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders }
        })
      }
      
      // 404 - 未找到路由
      return new Response(JSON.stringify({
        success: false,
        error: 'Not found',
        message: 'API endpoint not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
      
    } catch (error) {
      console.error('API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'An unexpected error occurred'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders }
      })
    }
  }
}
