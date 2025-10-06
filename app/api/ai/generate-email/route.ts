import { NextRequest, NextResponse } from 'next/server'

// 通义千问API配置
const TONGYI_API_KEY = process.env.TONGYI_API_KEY

if (!TONGYI_API_KEY) {
  console.warn('TONGYI_API_KEY is not configured, AI features will be disabled')
}
const TONGYI_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'

export async function POST(request: NextRequest) {
  try {
    // 检查API密钥
    if (!TONGYI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'AI service is not configured. Please contact administrator.',
        fallback: true
      }, { status: 503 })
    }

    const body = await request.json()
    const { 
      emailMode, 
      selectedTemplate, 
      campaignData 
    } = body

    const {
      purpose: campaignPurpose,
      businessName,
      productService,
      targetUrl
    } = campaignData

    // 构建AI提示词
    let systemPrompt = ""
    let userPrompt = ""

    if (emailMode === 'professional') {
      // 专业模板提示词
      const templateInstructions = {
        'modern-promo': {
          style: "modern promotional advertising style with gradients and bold design",
          tone: "exciting and urgent",
          structure: "gradient header, prominent headline, key benefits list, strong call-to-action button",
          goal: "drive immediate action through limited-time offers",
          colors: "blue to purple gradients, white text on colored backgrounds",
          elements: "gradient backgrounds, bold headlines, benefit boxes, prominent CTA buttons"
        },
        'newsletter': {
          style: "professional newsletter format with clean sections",
          tone: "informative and engaging",
          structure: "header with title, featured content sections, industry insights, read more links",
          goal: "share valuable information and maintain engagement",
          colors: "green and blue accents, clean white backgrounds",
          elements: "sectioned content, article previews, professional layout"
        },
        'ecommerce': {
          style: "product-focused e-commerce design with product showcases",
          tone: "appealing and persuasive",
          structure: "product showcase grid, pricing highlights, shopping incentives, discount banners",
          goal: "increase product awareness and sales conversions",
          colors: "orange and red gradients, product-focused design",
          elements: "product grids, discount badges, shopping CTAs, pricing highlights"
        },
        'event': {
          style: "invitation and event-focused design with welcoming elements",
          tone: "welcoming and excited",
          structure: "invitation header with emoji, event details box, RSVP buttons, welcoming design",
          goal: "attract attendance and generate RSVPs",
          colors: "pink and purple gradients, warm inviting colors",
          elements: "invitation cards, event detail boxes, RSVP buttons, welcoming emojis"
        },
        'announcement': {
          style: "formal announcement format with structured information",
          tone: "professional and authoritative",
          structure: "announcement header, structured content sections, important details box, call-to-action",
          goal: "communicate important information clearly and professionally",
          colors: "indigo and blue gradients, professional color scheme",
          elements: "announcement cards, structured sections, professional layout, clear CTAs"
        },
        'welcome': {
          style: "warm welcome message with onboarding elements",
          tone: "welcoming and encouraging",
          structure: "welcome header, getting started guide, feature highlights, next steps",
          goal: "welcome new users and guide them through onboarding",
          colors: "yellow and orange gradients, warm welcoming colors",
          elements: "welcome cards, feature highlights, step-by-step guides, encouraging CTAs"
        },
        'survey': {
          style: "feedback collection format with survey elements",
          tone: "engaging and appreciative",
          structure: "survey introduction, question previews, time estimate, participation incentives",
          goal: "encourage survey participation and feedback collection",
          colors: "teal and cyan gradients, engaging survey colors",
          elements: "survey cards, question previews, time indicators, participation CTAs"
        },
        'thank-you': {
          style: "gratitude and appreciation format",
          tone: "grateful and warm",
          structure: "thank you header, appreciation message, next steps, continued engagement",
          goal: "express gratitude and maintain customer relationship",
          colors: "rose and pink gradients, warm appreciation colors",
          elements: "thank you cards, appreciation messages, next steps, relationship CTAs"
        }
      }

      const templateInfo = templateInstructions[selectedTemplate as keyof typeof templateInstructions]

      systemPrompt = `You are an expert email marketing designer. Generate ONLY the email body content (no DOCTYPE, html, head, or body tags) in ${templateInfo.style}. 
      Create an email that achieves the goal: ${templateInfo.goal}.
      
      Requirements:
      - Generate ONLY the email body content (div container with content)
      - Use professional HTML email formatting with inline CSS
      - Follow email-safe design practices (max-width: 600px, web-safe fonts)
      - Use ${templateInfo.tone} tone of voice
      - Structure: ${templateInfo.structure}
      - Include proper email client compatibility
      - Make it mobile-responsive with appropriate styling
      - Start with <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      - End with </div>
      - Use ${templateInfo.colors} for color scheme
      - Include ${templateInfo.elements} as specified
      - Make it visually appealing and professional
      - Use modern email design with gradients, colors, and visual elements
      - Include call-to-action buttons with proper styling
      
      Generate ONLY the email body HTML content, no explanations or full HTML document.`

      userPrompt = `Create a natural, engaging ${templateInfo.style} email based on this information:
      
      Campaign Purpose: ${campaignPurpose}
      Business Name: ${businessName || 'Not specified'}
      Product/Service: ${productService || 'General offerings'}
      Target URL: ${targetUrl || 'No specific link'}
      
      Template Type: ${selectedTemplate}
      
      IMPORTANT: 
      - Write natural, engaging email content that flows well
      - Don't just list the information above - create a compelling narrative
      - Use the campaign purpose to craft an interesting story
      - Make it sound professional but conversational
      - Include relevant details about the business and offerings
      - Create a natural call-to-action that fits the context
      - Use the business name throughout the email naturally
      - Incorporate the product/service description into the content
      - Make the target URL feel natural in the call-to-action
      
      CRITICAL: You MUST create a ${selectedTemplate} template with these specific elements:
      ${selectedTemplate === 'modern-promo' ? `
      - Gradient header background (blue to purple)
      - Bold promotional headline with emoji
      - Key benefits list in styled boxes
      - Prominent call-to-action button
      - Urgent/limited-time messaging
      - Professional footer` : ''}
      ${selectedTemplate === 'newsletter' ? `
      - Clean header with newsletter title
      - Featured article sections
      - Industry insights boxes
      - Professional layout with borders
      - Read more links
      - Clean footer` : ''}
      ${selectedTemplate === 'ecommerce' ? `
      - Product showcase with grid layout
      - Discount banners and pricing
      - Shopping call-to-action buttons
      - Product-focused design
      - Orange/red color scheme
      - E-commerce footer` : ''}
      ${selectedTemplate === 'event' ? `
      - Invitation header with emoji
      - Event details in styled box
      - RSVP buttons (Yes/Maybe)
      - Welcoming design
      - Pink/purple color scheme
      - Event footer` : ''}
      ${selectedTemplate === 'announcement' ? `
      - Formal announcement header
      - Structured content sections
      - Important details in highlighted box
      - Professional call-to-action
      - Indigo/blue color scheme
      - Formal footer` : ''}
      ${selectedTemplate === 'welcome' ? `
      - Warm welcome header with emoji
      - Getting started guide sections
      - Feature highlights
      - Encouraging call-to-action
      - Yellow/orange color scheme
      - Welcoming footer` : ''}
      ${selectedTemplate === 'survey' ? `
      - Survey introduction header
      - Question preview sections
      - Time estimate indicator
      - Participation call-to-action
      - Teal/cyan color scheme
      - Survey footer` : ''}
      ${selectedTemplate === 'thank-you' ? `
      - Gratitude header with emoji
      - Appreciation message
      - Next steps section
      - Relationship call-to-action
      - Rose/pink color scheme
      - Thank you footer` : ''}
      
      Use the target URL for call-to-action buttons if provided.
      Make it visually appealing with proper styling, colors, and layout.`

    } else {
      // 简单邮件提示词
      systemPrompt = `You are an expert email writer. Create ONLY the email body content (no DOCTYPE, html, head, or body tags) that follows proper email format. 
      
      Requirements:
      - Generate ONLY the email body content (div container with content)
      - Use proper email structure: greeting, body paragraphs, closing, signature
      - Use clean HTML email formatting with inline CSS
      - Keep it simple but professional (max-width: 600px)
      - Use web-safe fonts (Arial, sans-serif)
      - Include proper greeting (Dear [Name], or Hello,)
      - Include proper sign-off (Best regards, Sincerely, etc.)
      - Make it mobile-friendly
      - Start with <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      - End with </div>
      - NO buttons, NO call-to-action elements, NO fancy styling
      - Use proper paragraph breaks with <p> tags
      - Just clean, simple text content with basic formatting
      
      Generate ONLY the email body HTML content, no explanations or full HTML document.`

      userPrompt = `Write a natural, engaging simple email based on this information:
      
      Campaign Purpose: ${campaignPurpose}
      Business Name: ${businessName || 'Not specified'}
      Product/Service: ${productService || 'General offerings'}
      Target URL: ${targetUrl || 'No specific link'}
      
      IMPORTANT: 
      - Follow proper email format: greeting, body paragraphs, closing, signature
      - Start with a proper greeting (Dear [Name], or Hello,)
      - Write natural, engaging email content that flows well
      - Don't just list the information above - create a compelling narrative
      - Use the campaign purpose to craft an interesting story
      - Make it sound professional but conversational
      - Include relevant details about the business and offerings
      - Use the business name naturally throughout the email
      - Incorporate the product/service description into the content naturally
      - End with proper closing (Best regards, Sincerely, etc.) and signature
      - NO buttons, NO call-to-action elements, NO fancy styling
      - Use proper paragraph breaks with <p> tags
      - Just clean, simple text content with basic formatting
      - If you need to mention a link, just include it as plain text
      
      Create a straightforward email that clearly communicates the ${campaignPurpose}. Keep it simple and text-based with proper email structure.`
    }

    // 调用通义千问API生成邮件内容
    const contentResponse = await fetch(TONGYI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TONGYI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    })

    if (!contentResponse.ok) {
      throw new Error(`Tongyi API error: ${contentResponse.status}`)
    }

    const contentResult = await contentResponse.json()
    let generatedContent = contentResult.output?.text

    if (!generatedContent) {
      throw new Error('No content generated from Tongyi')
    }

        // 清理HTML内容，确保只返回body内容
        generatedContent = generatedContent.trim()
        
        // 如果包含完整的HTML文档，提取body内容
        if (generatedContent.includes('<!DOCTYPE') || generatedContent.includes('<html')) {
          const bodyMatch = generatedContent.match(/<body[^>]*>([\s\S]*?)<\/body>/)
          if (bodyMatch) {
            generatedContent = bodyMatch[1].trim()
          }
        }
        
        // 清理不兼容的HTML标签，特别是标题中的font标签
        generatedContent = generatedContent
          .replace(/<h([1-6])[^>]*><font[^>]*>/gi, '<h$1>')
          .replace(/<\/font><\/h([1-6])>/gi, '</h$1>')
          .replace(/<font[^>]*>/gi, '<span>')
          .replace(/<\/font>/gi, '</span>')
          .replace(/<center[^>]*>/gi, '<div style="text-align: center;">')
          .replace(/<\/center>/gi, '</div>')
        
        // 如果内容不是以div开始，包装在div中
        if (!generatedContent.startsWith('<div')) {
          generatedContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">${generatedContent}</div>`
        }

    // 生成主题行
    const subjectResponse = await fetch(TONGYI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TONGYI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            { 
              role: "system", 
              content: `你是一个专业的邮件主题行写作专家。生成吸引人、简洁的主题行来提高打开率。
              创建1个简短、吸引人的主题行（50字符以内）。
              只返回主题行，不要解释。` 
            },
            { 
              role: "user", 
              content: `为以下邮件写一个吸引人的主题行：
              邮件目的：${campaignPurpose}
              业务名称：${businessName || '普通业务'}
              产品服务：${productService || '通用服务'}
              模板风格：${emailMode === 'professional' ? selectedTemplate : 'simple'}
              
              请根据邮件目的和业务特点，生成一个吸引人、简洁的主题行（50字符以内）。`
            }
          ]
        },
        parameters: {
          temperature: 0.8,
          max_tokens: 100
        }
      })
    })

    if (!subjectResponse.ok) {
      throw new Error(`Tongyi API error: ${subjectResponse.status}`)
    }

    const subjectResult = await subjectResponse.json()
    const generatedSubject = subjectResult.output?.text?.trim() || `关于${campaignPurpose}的消息`

    return NextResponse.json({
      success: true,
      subject: generatedSubject,
      body: generatedContent,
      template: emailMode === 'professional' ? selectedTemplate : 'simple',
      generatedBy: '通义千问 qwen-turbo'
    })

  } catch (error) {
    console.error('AI Generation Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate email content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}