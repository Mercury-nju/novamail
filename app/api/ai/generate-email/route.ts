import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userRequest, businessName, productService, targetAudience } = body

    // 调用Cloudflare Worker API
    const workerResponse = await fetch('https://novamail-api.zhuanz.workers.dev/api/ai/generate-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userRequest,
        businessName,
        productService,
        targetAudience
      })
    })

    if (!workerResponse.ok) {
      throw new Error(`Worker API error: ${workerResponse.status}`)
    }

    const data = await workerResponse.json()
    
    return NextResponse.json({
      success: true,
      subject: data.subject || 'New Email Campaign',
      textContent: data.textContent || 'Generated content will appear here.'
    })

  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate content',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
