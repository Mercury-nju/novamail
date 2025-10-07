import { NextRequest, NextResponse } from 'next/server'
import CreemAPI from '@/lib/creem'

const creem = new CreemAPI({
  apiKey: process.env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes',
  baseUrl: process.env.CREEM_BASE_URL || 'https://api.creem.com/v1',
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET || 'whsec_5uvCq8f1gQMsqz5rqwdVgZ',
})

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Webhook测试端点被调用')
    
    // 获取请求头
    const headers = Object.fromEntries(request.headers.entries())
    console.log('📋 请求头:', headers)
    
    // 获取请求体
    const body = await request.text()
    console.log('📦 请求体:', body)
    
    // 验证签名
    const signature = request.headers.get('creem-signature')
    console.log('🔒 签名:', signature)
    
    if (signature) {
      const isValid = creem.verifyWebhookSignature(body, signature)
      console.log('✅ 签名验证:', isValid ? '通过' : '失败')
    }
    
    // 解析事件数据
    let event
    try {
      event = JSON.parse(body)
      console.log('📊 事件类型:', event.type)
      console.log('📊 事件数据:', event.data)
    } catch (e) {
      console.log('❌ 解析事件数据失败:', e instanceof Error ? e.message : 'Unknown error')
    }
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Webhook测试成功',
      received: {
        headers,
        body,
        signature,
        eventType: event?.type,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('❌ Webhook测试失败:', error)
    return NextResponse.json({
      success: false,
      error: 'Webhook测试失败',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Creem Webhook测试端点',
    instructions: [
      '1. 在Creem控制台配置Webhook URL',
      '2. 发送测试事件到这个端点',
      '3. 检查服务器日志查看详细信息'
    ],
    webhookUrl: '/api/creem/webhook-test',
    timestamp: new Date().toISOString()
  })
}
