import { NextRequest, NextResponse } from 'next/server'
import CreemAPI from '@/lib/creem'

const creem = new CreemAPI({
  apiKey: process.env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes',
  baseUrl: process.env.CREEM_BASE_URL || 'https://api.creem.com/v1',
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET || 'default-webhook-secret',
})

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Creem API connection...')
    console.log('API Key:', process.env.CREEM_API_KEY ? 'Set' : 'Not set')
    console.log('Base URL:', process.env.CREEM_BASE_URL || 'https://api.creem.com/v1')
    
    // 测试获取计划列表
    const plans = await creem.getPlans()
    
    return NextResponse.json({
      success: true,
      message: 'Creem API connection successful!',
      data: {
        plansCount: plans.length,
        plans: plans.map(plan => ({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          currency: plan.currency,
          interval: plan.interval
        }))
      }
    })
  } catch (error) {
    console.error('Creem API test failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Creem API connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
