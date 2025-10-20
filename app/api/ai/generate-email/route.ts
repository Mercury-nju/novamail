import { NextRequest, NextResponse } from 'next/server'

// 调用DashScope AI API
async function callDashScopeAI(userRequest: string, businessName: string, productService: string, targetAudience: string) {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY || 'sk-9bf19547ddbd4be1a87a7a43cf251097';
    
    const prompt = `你是一个专业的AI助手，擅长回答各种问题。请直接回答用户的问题，提供准确、有用的信息。

用户问题：${userRequest}

请根据用户的具体问题提供准确、详细的回答。如果问题涉及邮件营销，请提供专业建议；如果是其他问题，请根据你的知识给出最佳答案。`;

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'enable'
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`DashScope API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.output && data.output.choices && data.output.choices[0]) {
      return {
        message: data.output.choices[0].message.content
      };
    } else {
      throw new Error('Invalid response format from DashScope API');
    }
    
  } catch (error) {
    console.error('DashScope AI call failed:', error);
    // 回退到本地生成
    const fallbackResponse = generateAIResponse(userRequest, businessName, productService, targetAudience);
    return {
      message: fallbackResponse.response
    };
  }
}

// AI对话响应生成函数（备用）
function generateAIResponse(userRequest: string, businessName: string, productService: string, targetAudience: string) {
  // 智能解析用户请求
  const request = userRequest.toLowerCase()
  
  // 提取关键信息
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

export async function POST(request: NextRequest) {
  try {
    // 性能监控
    const startTime = Date.now()
    
    // 解析请求体
    const body = await request.json()
    const { userRequest, businessName, productService, targetAudience } = body
    
    // 输入验证
    if (!userRequest || userRequest.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'User request is required',
        message: 'Please provide a description of what you want to know about email marketing'
      }, { status: 400 })
    }
    
    // 调用DashScope AI API
    const aiResponse = await callDashScopeAI(
      userRequest.trim(),
      businessName || 'Your Business',
      productService || 'Our Service',
      targetAudience || 'Valued Customer'
    )
    
    // 性能监控
    const processingTime = Date.now() - startTime
    
    // 返回响应
    return NextResponse.json({
      success: true,
      message: aiResponse.message,
      timestamp: new Date().toISOString(),
      processingTime: `${processingTime}ms`
    })
    
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate AI response. Please try again.',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
