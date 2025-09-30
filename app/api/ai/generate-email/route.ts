import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { emailMode, selectedTemplate, campaignData } = await request.json()

    // 检查是否配置了AI服务
    if (!process.env.TONGYI_API_KEY) {
      console.warn('TONGYI_API_KEY is not configured, AI features will be disabled')
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI service not configured. Please contact administrator.' 
        },
        { status: 503 }
      )
    }

    // 模拟AI生成（实际项目中应该调用真实的AI API）
    const generatedContent = generateFallbackContent(emailMode, selectedTemplate, campaignData)

    return NextResponse.json({
      success: true,
      subject: generatedContent.subject,
      body: generatedContent.body,
      template: selectedTemplate || 'default'
    })

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

function generateFallbackContent(emailMode: string, selectedTemplate: string, campaignData: any) {
  const { purpose, businessName, targetUrl } = campaignData

  let subject: string
  let body: string

  if (emailMode === 'professional') {
    subject = `Professional Update: ${purpose}`
    body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
        <h1 style="color: #333; margin-bottom: 20px;">Dear Valued Partner,</h1>
        <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">
          We hope this message finds you well. We are writing to inform you about an important update regarding ${purpose}.
        </p>
        <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">
          This development represents a significant step forward in our commitment to providing you with the best possible service and solutions.
        </p>
        ${targetUrl ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${targetUrl}" style="background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Learn More</a>
        </div>
        ` : ''}
        <p style="line-height: 1.6; color: #666;">
          We appreciate your continued partnership and look forward to serving you.
        </p>
        <p style="line-height: 1.6; color: #666;">
          Best regards,<br>
          The ${businessName || 'NovaMail'} Team
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <p>© 2024 ${businessName || 'NovaMail'}. All rights reserved.</p>
        </div>
      </div>
    `
  } else {
    subject = `Hey! Check out ${purpose}`
    body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
        <h1 style="color: #333; margin-bottom: 20px;">Hi there! 👋</h1>
        <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">
          Hope you're doing great! We wanted to share something exciting with you about ${purpose}.
        </p>
        <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">
          We think you'll love what we've been working on. It's designed to make your experience even better!
        </p>
        ${targetUrl ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${targetUrl}" style="background: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Check it out! 🚀</a>
        </div>
        ` : ''}
        <p style="line-height: 1.6; color: #666;">
          Thanks for being awesome!<br>
          The ${businessName || 'NovaMail'} Team
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <p>© 2024 ${businessName || 'NovaMail'}. All rights reserved.</p>
        </div>
      </div>
    `
  }

  return { subject, body }
}
