import { NextRequest, NextResponse } from 'next/server'
import { paymentService, PaymentProvider } from '@/lib/payment-service'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let params: any = {}

    // 根据Content-Type解析请求体
    if (contentType.includes('application/json')) {
      params = await request.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      params = Object.fromEntries(formData.entries())
    } else {
      // 可能是XML格式（微信支付）
      const text = await request.text()
      params = parseXMLToObject(text)
    }

    console.log('Payment notification received:', params)

    // 确定支付提供商
    let provider: PaymentProvider
    if (params.app_id || params.seller_id) {
      provider = PaymentProvider.ALIPAY
    } else if (params.appid || params.mch_id) {
      provider = PaymentProvider.WECHAT
    } else if (params.type === 'payment_intent.succeeded') {
      provider = PaymentProvider.STRIPE
    } else {
      console.error('Unknown payment provider in notification')
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // 验证签名
    const isValid = await paymentService.verifyPayment(params, provider)
    if (!isValid) {
      console.error('Invalid payment notification signature')
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // 处理支付结果
    const result = await handlePaymentNotification(params, provider)

    if (result.success) {
      // 返回成功响应
      if (provider === PaymentProvider.ALIPAY) {
        return new Response('success', { status: 200 })
      } else if (provider === PaymentProvider.WECHAT) {
        return new Response(
          '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>',
          { 
            status: 200,
            headers: { 'Content-Type': 'application/xml' }
          }
        )
      } else {
        return NextResponse.json({ received: true })
      }
    } else {
      return NextResponse.json({ success: false }, { status: 500 })
    }

  } catch (error) {
    console.error('Payment notification error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

// 处理支付通知
async function handlePaymentNotification(params: any, provider: PaymentProvider) {
  try {
    let orderId: string
    let paymentStatus: string
    let transactionId: string

    // 根据不同支付提供商解析参数
    switch (provider) {
      case PaymentProvider.ALIPAY:
        orderId = params.out_trade_no
        paymentStatus = params.trade_status
        transactionId = params.trade_no
        break
      
      case PaymentProvider.WECHAT:
        orderId = params.out_trade_no
        paymentStatus = params.result_code === 'SUCCESS' ? 'TRADE_SUCCESS' : 'TRADE_FAILED'
        transactionId = params.transaction_id
        break
      
      case PaymentProvider.STRIPE:
        orderId = params.data?.object?.metadata?.orderId
        paymentStatus = params.data?.object?.status === 'succeeded' ? 'TRADE_SUCCESS' : 'TRADE_FAILED'
        transactionId = params.data?.object?.id
        break
      
      default:
        throw new Error('Unknown payment provider')
    }

    console.log('Processing payment:', { orderId, paymentStatus, transactionId, provider })

    // 检查订单是否存在
    const order = await getOrder(orderId)
    if (!order) {
      console.error('Order not found:', orderId)
      return { success: false, error: 'Order not found' }
    }

    // 检查订单是否已经处理过
    if (order.status === 'completed') {
      console.log('Order already processed:', orderId)
      return { success: true, message: 'Order already processed' }
    }

    // 处理支付成功
    if (paymentStatus === 'TRADE_SUCCESS') {
      await updateOrderStatus(orderId, 'completed', transactionId)
      await activateSubscription(order)
      
      console.log('Payment successful:', orderId)
      return { success: true, message: 'Payment processed successfully' }
    } else {
      await updateOrderStatus(orderId, 'failed', transactionId)
      
      console.log('Payment failed:', orderId)
      return { success: true, message: 'Payment failed processed' }
    }

  } catch (error) {
    console.error('Payment notification processing error:', error)
    return { success: false, error: error.message }
  }
}

// 解析XML为对象
function parseXMLToObject(xml: string): any {
  const result: any = {}
  const regex = /<(\w+)><!\[CDATA\[(.*?)\]\]><\/\w+>/g
  let match

  while ((match = regex.exec(xml)) !== null) {
    result[match[1]] = match[2]
  }

  return result
}

// 获取订单信息
async function getOrder(orderId: string) {
  try {
    // 这里应该从数据库查询订单
    // 为了演示，返回模拟数据
    console.log('Getting order:', orderId)
    
    // 实际项目中应该使用Prisma查询
    // const order = await prisma.order.findUnique({
    //   where: { orderId }
    // })
    
    return {
      orderId,
      userId: 'user123',
      planType: 'pro',
      billingCycle: 'monthly',
      amount: 4900,
      status: 'pending'
    }
  } catch (error) {
    console.error('Failed to get order:', error)
    return null
  }
}

// 更新订单状态
async function updateOrderStatus(orderId: string, status: string, transactionId: string) {
  try {
    console.log('Updating order status:', { orderId, status, transactionId })
    
    // 实际项目中应该使用Prisma更新
    // await prisma.order.update({
    //   where: { orderId },
    //   data: { 
    //     status, 
    //     transactionId,
    //     completedAt: new Date()
    //   }
    // })
    
    return true
  } catch (error) {
    console.error('Failed to update order status:', error)
    throw error
  }
}

// 激活订阅
async function activateSubscription(order: any) {
  try {
    console.log('Activating subscription for order:', order.orderId)
    
    // 计算订阅到期时间
    const now = new Date()
    const expiresAt = new Date(now)
    
    if (order.billingCycle === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else if (order.billingCycle === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    // 实际项目中应该更新用户订阅状态
    // await prisma.subscription.upsert({
    //   where: { userId: order.userId },
    //   update: {
    //     planType: order.planType,
    //     status: 'active',
    //     expiresAt
    //   },
    //   create: {
    //     userId: order.userId,
    //     planType: order.planType,
    //     status: 'active',
    //     expiresAt
    //   }
    // })

    console.log('Subscription activated:', { 
      userId: order.userId, 
      planType: order.planType, 
      expiresAt 
    })
    
    return true
  } catch (error) {
    console.error('Failed to activate subscription:', error)
    throw error
  }
}




