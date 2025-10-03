import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { emailMode, selectedTemplate, toneStyle, campaignData } = await request.json()

    console.log('AI API received:', { emailMode, selectedTemplate, toneStyle, campaignData })

    // 检查是否配置了AI服务
    const hasAIConfig = process.env.OPENAI_API_KEY || 
                       process.env.DASHSCOPE_API_KEY || 
                       process.env.BAIDU_API_KEY || 
                       process.env.ZHIPU_API_KEY;

    if (!hasAIConfig) {
      console.warn('No AI service configured, using fallback content generation')
      const generatedContent = generateFallbackContent(emailMode, selectedTemplate, toneStyle, campaignData)
      return NextResponse.json({
        success: true,
        subject: generatedContent.subject,
        body: generatedContent.body,
        template: selectedTemplate || 'default'
      })
    }

    // 使用AI服务生成内容
    const aiResult = await aiService.generateEmail({
      emailMode,
      selectedTemplate,
      toneStyle,
      campaignData
    })

    if (aiResult.success && aiResult.content) {
      // 解析AI生成的内容
      const parsedContent = parseAIContent(aiResult.content, campaignData)
      
      return NextResponse.json({
        success: true,
        subject: parsedContent.subject,
        body: parsedContent.body,
        template: selectedTemplate || 'default'
      })
    } else {
      // AI服务失败，使用备用内容
      console.warn('AI service failed, using fallback content:', aiResult.error)
      const generatedContent = generateFallbackContent(emailMode, selectedTemplate, toneStyle, campaignData)
      
      return NextResponse.json({
        success: true,
        subject: generatedContent.subject,
        body: generatedContent.body,
        template: selectedTemplate || 'default'
      })
    }

  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate email content. Please try again.' 
      },
      { status: 500 }
    )
  }
}

// 解析AI生成的内容
function parseAIContent(content: string, campaignData: any) {
  const lines = content.split('\n').filter(line => line.trim());
  
  let subject = '';
  let body = '';
  
  // 查找主题行
  const subjectLine = lines.find(line => line.startsWith('主题：') || line.startsWith('Subject:'));
  if (subjectLine) {
    subject = subjectLine.replace(/^(主题：|Subject:)\s*/, '');
  } else {
    // 如果没有找到主题行，使用第一行或默认主题
    subject = lines[0] || `来自${campaignData.businessName || 'NovaMail'}的重要消息`;
  }
  
  // 获取正文内容（排除主题行）
  const bodyLines = lines.filter(line => 
    !line.startsWith('主题：') && 
    !line.startsWith('Subject:') &&
    line.trim() !== ''
  );
  
  if (bodyLines.length > 0) {
    body = bodyLines.join('\n\n');
  } else {
    body = content; // 如果解析失败，使用原始内容
  }
  
  // 简单的HTML格式化
  body = body
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
  
  return { subject, body };
}

function generateFallbackContent(emailMode: string, selectedTemplate: string, toneStyle: string, campaignData: any) {
  const { purpose, businessName, productService, targetUrl } = campaignData

  // AI个性化内容生成逻辑
  const generatePersonalizedContent = (tone: string, purpose: string, businessName: string, productService: string) => {
    // 分析活动目的，生成相关内容
    const purposeAnalysis = analyzePurpose(purpose)
    
    // 根据语气风格和业务信息生成个性化内容
    switch (tone) {
      case 'friendly':
        return {
          greeting: `Hi there! 😊`,
          opening: generateFriendlyOpening(purposeAnalysis, businessName),
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'friendly'),
          closing: 'Thanks for being awesome!',
          signature: 'Warm regards',
          subjectPrefix: 'Friendly Update'
        }
      case 'professional':
        return {
          greeting: 'Dear Valued Partner,',
          opening: generateProfessionalOpening(purposeAnalysis, businessName),
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'professional'),
          closing: 'We appreciate your continued partnership and look forward to serving you.',
          signature: 'Best regards',
          subjectPrefix: 'Professional Update'
        }
      case 'casual':
        return {
          greeting: 'Hey! 😎',
          opening: generateCasualOpening(purposeAnalysis, businessName),
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'casual'),
          closing: 'Catch you later!',
          signature: 'Cheers',
          subjectPrefix: 'Quick Update'
        }
      case 'enthusiastic':
        return {
          greeting: 'Exciting News! 🚀',
          opening: generateEnthusiasticOpening(purposeAnalysis, businessName),
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'enthusiastic'),
          closing: 'We can\'t wait to see what you think!',
          signature: 'With excitement',
          subjectPrefix: '🚀 Exciting News!'
        }
      case 'persuasive':
        return {
          greeting: 'You won\'t want to miss this! 💡',
          opening: generatePersuasiveOpening(purposeAnalysis, businessName),
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'persuasive'),
          closing: 'Don\'t miss out on this amazing opportunity!',
          signature: 'Sincerely',
          subjectPrefix: 'Limited Time Opportunity'
        }
      case 'informative':
        return {
          greeting: 'Important Information 📚',
          opening: generateInformativeOpening(purposeAnalysis, businessName),
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'informative'),
          closing: 'We hope this information is helpful to you.',
          signature: 'Best regards',
          subjectPrefix: 'Important Information'
        }
      default:
        return {
          greeting: 'Hello!',
          opening: `We wanted to share some information with you about ${purpose}.`,
          mainContent: generateMainContent(purposeAnalysis, productService, businessName, 'neutral'),
          closing: 'Thank you for your attention.',
          signature: 'Best regards',
          subjectPrefix: 'Update'
        }
    }
  }

  // 分析活动目的，提取关键信息
  function analyzePurpose(purpose: string) {
    const lowerPurpose = purpose.toLowerCase()
    
    // 检测活动类型
    if (lowerPurpose.includes('sale') || lowerPurpose.includes('discount') || lowerPurpose.includes('promotion') || lowerPurpose.includes('优惠') || lowerPurpose.includes('促销')) {
      return { type: 'promotion', keywords: ['special offer', 'limited time', 'exclusive deal'] }
    } else if (lowerPurpose.includes('product') || lowerPurpose.includes('launch') || lowerPurpose.includes('new') || lowerPurpose.includes('产品') || lowerPurpose.includes('新品')) {
      return { type: 'product_launch', keywords: ['new product', 'innovative', 'cutting-edge'] }
    } else if (lowerPurpose.includes('event') || lowerPurpose.includes('meeting') || lowerPurpose.includes('webinar') || lowerPurpose.includes('活动') || lowerPurpose.includes('会议')) {
      return { type: 'event', keywords: ['exclusive event', 'networking', 'learning opportunity'] }
    } else if (lowerPurpose.includes('newsletter') || lowerPurpose.includes('update') || lowerPurpose.includes('news') || lowerPurpose.includes('资讯') || lowerPurpose.includes('更新')) {
      return { type: 'newsletter', keywords: ['latest updates', 'industry insights', 'trending topics'] }
    } else if (lowerPurpose.includes('survey') || lowerPurpose.includes('feedback') || lowerPurpose.includes('opinion') || lowerPurpose.includes('调查') || lowerPurpose.includes('反馈')) {
      return { type: 'survey', keywords: ['your opinion', 'valuable feedback', 'help us improve'] }
    } else {
      return { type: 'general', keywords: ['important update', 'exciting news', 'valuable information'] }
    }
  }

  // 生成不同语气的开头
  function generateFriendlyOpening(analysis: any, businessName: string) {
    const business = businessName || 'our team'
    switch (analysis.type) {
      case 'promotion':
        return `Hope you're doing great! We've got some exciting news from ${business} that we think you'll love!`
      case 'product_launch':
        return `Hi there! We're thrilled to share something special from ${business} that we've been working on!`
      case 'event':
        return `Hey! We have an amazing opportunity from ${business} that we'd love for you to be part of!`
      case 'newsletter':
        return `Hope you're having a wonderful day! We wanted to share some interesting updates from ${business}!`
      case 'survey':
        return `Hi! We value your opinion and would love to hear your thoughts about ${business}!`
      default:
        return `Hope you're doing great! We wanted to share some exciting news from ${business}!`
    }
  }

  function generateProfessionalOpening(analysis: any, businessName: string) {
    const business = businessName || 'our organization'
    switch (analysis.type) {
      case 'promotion':
        return `We hope this message finds you well. We are pleased to present a special opportunity from ${business}.`
      case 'product_launch':
        return `We are excited to announce a significant development from ${business} that we believe will be of interest to you.`
      case 'event':
        return `We would like to extend an invitation to a professional event hosted by ${business}.`
      case 'newsletter':
        return `We hope this message finds you well. We are writing to share important updates from ${business}.`
      case 'survey':
        return `We value your professional opinion and would appreciate your participation in our research from ${business}.`
      default:
        return `We hope this message finds you well. We are writing to inform you about an important update from ${business}.`
    }
  }

  function generateCasualOpening(analysis: any, businessName: string) {
    const business = businessName || 'our crew'
    switch (analysis.type) {
      case 'promotion':
        return `What's up! ${business} has something cool to share with you!`
      case 'product_launch':
        return `Hey! We've been working on something awesome at ${business} and wanted to show you!`
      case 'event':
        return `Yo! ${business} is throwing something fun and you're invited!`
      case 'newsletter':
        return `Hey there! We've got some interesting stuff from ${business} to share!`
      case 'survey':
        return `Hey! We'd love to hear what you think about ${business}!`
      default:
        return `Hey! We've got some cool news from ${business} to share!`
    }
  }

  function generateEnthusiasticOpening(analysis: any, businessName: string) {
    const business = businessName || 'our amazing team'
    switch (analysis.type) {
      case 'promotion':
        return `We're absolutely thrilled to share this incredible opportunity from ${business}!`
      case 'product_launch':
        return `We're bursting with excitement to reveal what ${business} has been creating!`
      case 'event':
        return `We're over the moon to invite you to this spectacular event from ${business}!`
      case 'newsletter':
        return `We're super excited to share these amazing updates from ${business}!`
      case 'survey':
        return `We're incredibly excited to hear your thoughts about ${business}!`
      default:
        return `We're absolutely thrilled to share this exciting news from ${business}!`
    }
  }

  function generatePersuasiveOpening(analysis: any, businessName: string) {
    const business = businessName || 'our organization'
    switch (analysis.type) {
      case 'promotion':
        return `You won't want to miss this exclusive opportunity from ${business} - it's truly exceptional!`
      case 'product_launch':
        return `This is your chance to be among the first to experience what ${business} has created!`
      case 'event':
        return `This exclusive event from ${business} is an opportunity you simply cannot afford to miss!`
      case 'newsletter':
        return `The insights from ${business} in this update could be game-changing for you!`
      case 'survey':
        return `Your opinion about ${business} is crucial and could shape the future!`
      default:
        return `This important update from ${business} could significantly impact your success!`
    }
  }

  function generateInformativeOpening(analysis: any, businessName: string) {
    const business = businessName || 'our organization'
    switch (analysis.type) {
      case 'promotion':
        return `We would like to provide you with detailed information about a special offer from ${business}.`
      case 'product_launch':
        return `We are pleased to share comprehensive information about a new development from ${business}.`
      case 'event':
        return `We would like to inform you about an upcoming event hosted by ${business}.`
      case 'newsletter':
        return `We are sharing important updates and insights from ${business} for your information.`
      case 'survey':
        return `We are conducting research and would value your input regarding ${business}.`
      default:
        return `We would like to provide you with important information from ${business}.`
    }
  }

  // 生成主要内容
  function generateMainContent(analysis: any, productService: string, businessName: string, tone: string) {
    const business = businessName || 'our organization'
    const product = productService || 'our services'
    
    let content = ''
    
    switch (analysis.type) {
      case 'promotion':
        if (tone === 'professional') {
          content = `We are pleased to offer you an exclusive opportunity that provides exceptional value. This special promotion has been carefully designed to benefit our valued partners like yourself.`
        } else if (tone === 'enthusiastic') {
          content = `This is absolutely incredible! We've put together an amazing deal that you're going to love! It's packed with value and designed to give you the best experience possible!`
        } else if (tone === 'persuasive') {
          content = `This limited-time offer represents an exceptional opportunity that provides significant value. The benefits are substantial, and the timing is perfect for maximizing your success.`
        } else {
          content = `We've got something special for you! This offer is designed to give you great value and an amazing experience with ${product}.`
        }
        break
        
      case 'product_launch':
        if (tone === 'professional') {
          content = `We are excited to introduce our latest innovation in ${product}. This new development represents a significant advancement in our commitment to providing cutting-edge solutions.`
        } else if (tone === 'enthusiastic') {
          content = `We're absolutely thrilled to unveil our newest creation! This amazing new ${product} is going to blow your mind with its incredible features and capabilities!`
        } else if (tone === 'persuasive') {
          content = `This revolutionary new ${product} offers unprecedented advantages that could transform your experience. Being among the first to access this innovation provides you with a significant competitive edge.`
        } else {
          content = `We've been working hard on something new and exciting! Our latest ${product} is ready and we think you're going to love what we've created!`
        }
        break
        
      case 'event':
        if (tone === 'professional') {
          content = `We are hosting a professional event that provides excellent networking and learning opportunities. This event has been designed to deliver valuable insights and meaningful connections.`
        } else if (tone === 'enthusiastic') {
          content = `We're throwing an amazing event that you absolutely have to be part of! It's going to be packed with fun, learning, and incredible networking opportunities!`
        } else if (tone === 'persuasive') {
          content = `This exclusive event offers unparalleled opportunities for growth, networking, and professional development. Attending could open doors to new possibilities and valuable connections.`
        } else {
          content = `We've got a great event coming up that we'd love for you to join! It's going to be a fantastic opportunity to learn, network, and have a great time!`
        }
        break
        
      case 'newsletter':
        if (tone === 'professional') {
          content = `In this update, we share important industry insights, recent developments, and valuable information that may be relevant to your interests and professional growth.`
        } else if (tone === 'enthusiastic') {
          content = `We've got some amazing updates to share! This newsletter is packed with exciting news, interesting insights, and cool information that we think you'll find fascinating!`
        } else if (tone === 'persuasive') {
          content = `The information in this update could provide you with valuable insights and opportunities. Staying informed about these developments could give you a significant advantage.`
        } else {
          content = `We've put together some interesting updates and news that we think you'll find valuable and engaging!`
        }
        break
        
      case 'survey':
        if (tone === 'professional') {
          content = `Your professional opinion is highly valued and plays a crucial role in helping us improve our services. Your feedback will directly influence our future developments.`
        } else if (tone === 'enthusiastic') {
          content = `We're super excited to hear what you think! Your opinion is incredibly important to us and helps us make everything even better!`
        } else if (tone === 'persuasive') {
          content = `Your input is essential and could shape the future of our services. By sharing your thoughts, you're directly contributing to improvements that benefit everyone.`
        } else {
          content = `We'd really love to hear your thoughts! Your opinion helps us understand what you need and how we can make things better for you!`
        }
        break
        
      default:
        if (tone === 'professional') {
          content = `We are pleased to share this important information with you. This update contains valuable details that may be relevant to your interests.`
        } else if (tone === 'enthusiastic') {
          content = `We're excited to share this news with you! It's something we think you'll find really interesting and valuable!`
        } else if (tone === 'persuasive') {
          content = `This information could be highly beneficial to you. Taking the time to review these details could provide you with valuable opportunities.`
        } else {
          content = `We've got some news to share that we think you'll find interesting and helpful!`
        }
    }
    
    return content
  }

  const personalizedContent = generatePersonalizedContent(toneStyle, purpose, businessName, productService)

  let subject: string
  let body: string

  // 生成个性化主题行
  subject = `${personalizedContent.subjectPrefix}: ${purpose}`

  // 根据模板类型生成不同的邮件结构
  console.log('Template decision:', { emailMode, selectedTemplate, isProfessional: emailMode === 'professional', hasTemplate: !!selectedTemplate })
  
  if (emailMode === 'professional' && selectedTemplate) {
    // 专业模板
    console.log('Using professional template:', selectedTemplate)
    body = generateProfessionalTemplate(personalizedContent, targetUrl, businessName, selectedTemplate)
  } else {
    // 简单邮件
    console.log('Using simple email template')
    body = generateSimpleEmail(personalizedContent, targetUrl, businessName)
  }

  return { subject, body }
}

// 生成专业模板
function generateProfessionalTemplate(content: any, targetUrl: string, businessName: string, template: string) {
  const business = businessName || 'NovaMail'
  
  switch (template) {
    case 'modern-promo':
      return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.greeting}</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">${content.opening}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <p style="line-height: 1.6; color: #333; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
        ${targetUrl ? `
        <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Learn More</a>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
            <p>© 2024 ${business}. All rights reserved.</p>
          </div>
        </div>
      `
    
    case 'newsletter':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0; font-size: 24px;">${content.greeting}</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">${content.opening}</p>
          </div>
          
          <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">📰 Featured Content</h2>
            <p style="line-height: 1.6; color: #333; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
          ${targetUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Read More</a>
        </div>
        ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
        </div>
      </div>
    `
    
    case 'event':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.greeting}</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">${content.opening}</p>
          </div>
          
          <div style="background: #fff5f5; border: 2px solid #ff6b6b; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #d63031; margin: 0 0 15px 0; font-size: 20px;">🎉 Event Details</h2>
            <p style="line-height: 1.6; color: #333; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
          ${targetUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Join Event</a>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
            <p>© 2024 ${business}. All rights reserved.</p>
          </div>
        </div>
      `
    
    case 'announcement':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.greeting}</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">${content.opening}</p>
          </div>
          
          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">📢 Important Announcement</h2>
            <p style="line-height: 1.6; color: #334155; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
          ${targetUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Learn More</a>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
            <p>© 2024 ${business}. All rights reserved.</p>
          </div>
        </div>
      `
    
    case 'welcome':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.greeting}</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">${content.opening}</p>
          </div>
          
          <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 20px;">👋 Welcome to Our Community</h2>
            <p style="line-height: 1.6; color: #451a03; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
          ${targetUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Get Started</a>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
            <p>© 2024 ${business}. All rights reserved.</p>
          </div>
        </div>
      `
    
    case 'survey':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.greeting}</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">${content.opening}</p>
          </div>
          
          <div style="background: #f0fdfa; border: 2px solid #0d9488; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #134e4a; margin: 0 0 15px 0; font-size: 20px;">📊 Your Opinion Matters</h2>
            <p style="line-height: 1.6; color: #0f766e; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
          ${targetUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Take Survey</a>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
            <p>© 2024 ${business}. All rights reserved.</p>
          </div>
        </div>
      `
    
    case 'thank-you':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          <div style="background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${content.greeting}</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">${content.opening}</p>
          </div>
          
          <div style="background: #fdf2f8; border: 2px solid #f43f5e; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #be185d; margin: 0 0 15px 0; font-size: 20px;">🙏 Thank You</h2>
            <p style="line-height: 1.6; color: #831843; margin: 0; font-size: 16px;">${content.mainContent}</p>
          </div>
          
          ${targetUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${targetUrl}" style="background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Continue</a>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 14px;">${content.closing}</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              ${content.signature},<br>
              The ${business} Team
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
            <p>© 2024 ${business}. All rights reserved.</p>
          </div>
        </div>
      `
    
    default:
      return generateSimpleEmail(content, targetUrl, businessName)
  }
}

// 生成简单邮件
function generateSimpleEmail(content: any, targetUrl: string, businessName: string) {
  const business = businessName || 'NovaMail'
  
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
      <h1 style="color: #333; margin-bottom: 20px; font-size: 24px;">${content.greeting}</h1>
      <p style="line-height: 1.6; color: #666; margin-bottom: 20px; font-size: 16px;">
        ${content.opening}
      </p>
      <p style="line-height: 1.6; color: #666; margin-bottom: 20px; font-size: 16px;">
        ${content.mainContent}
        </p>
        ${targetUrl ? `
        <div style="text-align: center; margin: 30px 0;">
        <a href="${targetUrl}" style="background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Learn More</a>
        </div>
        ` : ''}
      <p style="line-height: 1.6; color: #666; margin-bottom: 20px; font-size: 16px;">
        ${content.closing}
      </p>
      <p style="line-height: 1.6; color: #666; font-size: 16px;">
        ${content.signature},<br>
        The ${business} Team
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
        <p>© 2024 ${business}. All rights reserved.</p>
        </div>
      </div>
    `
}
