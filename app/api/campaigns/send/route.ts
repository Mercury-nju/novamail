import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { campaignData, recipients } = await request.json()

    // 静态导出模式：模拟邮件发送
    console.log('Sending campaign:', {
      subject: campaignData.subject,
      recipients: recipients.length,
      businessName: campaignData.businessName
    })

    // 模拟发送延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟发送结果
    const successCount = Math.floor(recipients.length * 0.95) // 95% 成功率
    const failedCount = recipients.length - successCount

    return NextResponse.json({
      success: true,
      message: `Campaign sent successfully`,
      stats: {
        total: recipients.length,
        sent: successCount,
        failed: failedCount,
        deliveryRate: (successCount / recipients.length * 100).toFixed(1)
      }
    })

  } catch (error) {
    console.error('Send campaign error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send campaign' 
      },
      { status: 500 }
    )
  }
}
