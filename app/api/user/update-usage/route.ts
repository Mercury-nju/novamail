import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action, increment } = await request.json()

    // 静态导出模式：模拟使用量更新
    // 在实际应用中，这里会更新数据库中的用户使用量
    console.log(`Updating usage: ${action} by ${increment}`)

    return NextResponse.json({
      success: true,
      message: 'Usage updated successfully'
    })

  } catch (error) {
    console.error('Update usage error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update usage' 
      },
      { status: 500 }
    )
  }
}
