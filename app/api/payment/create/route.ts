import { NextRequest, NextResponse } from 'next/server'
import { paymentService, PaymentProvider } from '@/lib/payment-service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      planType, 
      billingCycle, 
      paymentMethod,
      returnUrl,
      userRegion 
    } = await request.json()

    console.log('Payment creation request:', { 
      planType, 
      billingCycle, 
      paymentMethod, 
      userId: session.user.id 
    })

    // 验证必需参数
    if (!planType || !billingCycle) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // 计算价格
    const pricing = calculatePrice(planType, billingCycle)
    if (!pricing) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan or billing cycle' },
        { status: 400 }
      )
    }

    // 生成订单ID
    const orderId = generateOrderId(session.user.id, planType, billingCycle)

    // 构建支付请求
    const paymentRequest = {
      amount: pricing.amount, // 以分为单位
      currency: pricing.currency,
      orderId,
      productName: `NovaMail ${planType} Plan - ${billingCycle}`,
      returnUrl: returnUrl || `${process.env.NEXTAUTH_URL}/dashboard/billing?success=true`,
      notifyUrl: `${process.env.NEXTAUTH_URL}/api/payment/notify`,
      userId: session.user.id
    }

    // 确定支付方式
    let provider: PaymentProvider
    if (paymentMethod) {
      provider = paymentMethod as PaymentProvider
    } else {
      // 根据用户地区自动选择
      const recommendedMethods = paymentService.getRecommendedPaymentMethods(userRegion || 'overseas')
      provider = recommendedMethods[0]
    }

    // 创建支付
    const paymentResult = await paymentService.createPayment(paymentRequest, provider)

    if (paymentResult.success) {
      // 保存订单信息到数据库
      await saveOrder({
        orderId,
        userId: session.user.id,
        planType,
        billingCycle,
        amount: pricing.amount,
        currency: pricing.currency,
        paymentMethod: provider,
        status: 'pending'
      })

      return NextResponse.json({
        success: true,
        paymentUrl: paymentResult.paymentUrl,
        orderId: paymentResult.orderId,
        provider,
        amount: pricing.amount,
        currency: pricing.currency
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: paymentResult.error || 'Payment creation failed' 
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// 价格计算
function calculatePrice(planType: string, billingCycle: string) {
  const pricing = {
    starter: {
      monthly: { amount: 1900, currency: 'CNY' }, // ¥19.00
      yearly: { amount: 19000, currency: 'CNY' }   // ¥190.00 (约2个月免费)
    },
    pro: {
      monthly: { amount: 4900, currency: 'CNY' }, // ¥49.00
      yearly: { amount: 49000, currency: 'CNY' }   // ¥490.00 (约2个月免费)
    },
    enterprise: {
      monthly: { amount: 9900, currency: 'CNY' }, // ¥99.00
      yearly: { amount: 99000, currency: 'CNY' }   // ¥990.00 (约2个月免费)
    }
  }

  return pricing[planType]?.[billingCycle] || null
}

// 生成订单ID
function generateOrderId(userId: string, planType: string, billingCycle: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `NM_${userId.substring(0, 8)}_${planType}_${billingCycle}_${timestamp}_${random}`
}

// 保存订单信息
async function saveOrder(orderData: any) {
  try {
    // 这里应该保存到数据库
    // 为了演示，我们只是记录日志
    console.log('Saving order:', orderData)
    
    // 实际项目中应该使用Prisma或其他ORM保存到数据库
    // const order = await prisma.order.create({
    //   data: orderData
    // })
    
    return true
  } catch (error) {
    console.error('Failed to save order:', error)
    throw error
  }
}




