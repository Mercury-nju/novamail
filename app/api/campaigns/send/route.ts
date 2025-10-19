import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      subject, 
      content, 
      recipients, 
      senderEmail, 
      senderName = 'NovaMail' 
    } = body

    // 验证必需字段
    if (!subject || !content || !recipients || !senderEmail) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: subject, content, recipients, senderEmail' 
        },
        { status: 400 }
      )
    }

    // 调用Cloudflare Worker API发送邮件
    const workerResponse = await fetch('https://novamail-api.zhuanz.workers.dev/api/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        content,
        recipients,
        senderEmail,
        senderName
      })
    })

    if (!workerResponse.ok) {
      const errorData = await workerResponse.json()
      throw new Error(errorData.error || `Worker API error: ${workerResponse.status}`)
    }

    const data = await workerResponse.json()
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data
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
