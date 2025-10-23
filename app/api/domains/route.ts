import { NextRequest, NextResponse } from 'next/server'

// 获取用户域名列表
export async function GET(request: NextRequest) {
  try {
    // 这里应该从数据库或KV存储中获取用户的域名列表
    // 暂时返回模拟数据
    const domains = [
      {
        id: 'domain_1',
        domain: 'example.com',
        status: 'verified',
        verificationRecords: {
          spf: true,
          dkim: true,
          dmarc: true
        },
        emailAliases: ['noreply@example.com', 'support@example.com'],
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json({
      success: true,
      domains
    })
  } catch (error) {
    console.error('Failed to fetch domains:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch domains' },
      { status: 500 }
    )
  }
}

// 添加新域名
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { domain } = body

    if (!domain) {
      return NextResponse.json(
        { success: false, error: 'Domain is required' },
        { status: 400 }
      )
    }

    // 验证域名格式
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { success: false, error: 'Invalid domain format' },
        { status: 400 }
      )
    }

    // 这里应该保存域名到数据库或KV存储
    // 暂时返回成功响应
    const newDomain = {
      id: `domain_${Date.now()}`,
      domain,
      status: 'pending',
      verificationRecords: {
        spf: false,
        dkim: false,
        dmarc: false
      },
      emailAliases: [],
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      domain: newDomain,
      message: 'Domain added successfully. Please configure DNS records.'
    })
  } catch (error) {
    console.error('Failed to add domain:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add domain' },
      { status: 500 }
    )
  }
}
