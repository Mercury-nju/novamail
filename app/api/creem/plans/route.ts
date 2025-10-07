import { NextRequest, NextResponse } from 'next/server'
import CreemAPI from '@/lib/creem'

const creem = new CreemAPI({
  apiKey: process.env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes',
  baseUrl: process.env.CREEM_BASE_URL || 'https://api.creem.com/v1',
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET || 'default-webhook-secret',
})

export async function GET(request: NextRequest) {
  try {
    const plans = await creem.getPlans()
    
    return NextResponse.json({
      success: true,
      data: plans
    })
  } catch (error) {
    console.error('Failed to fetch Creem plans:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch plans'
    }, { status: 500 })
  }
}
