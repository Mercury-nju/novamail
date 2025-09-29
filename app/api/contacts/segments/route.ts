import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// 默认用户分层
const defaultSegments = [
  { id: 'new-users', name: '新用户' },
  { id: 'silent-users', name: '沉默用户' },
  { id: 'paid-users', name: '付费用户' },
  { id: 'active-users', name: '活跃用户' },
  { id: 'churned-users', name: '流失用户' }
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: '未登录'
      }, { status: 401 })
    }

    // 暂时返回默认分层，后续可以扩展为用户自定义分层
    return NextResponse.json({
      success: true,
      segments: defaultSegments
    })

  } catch (error) {
    console.error('Get segments error:', error)
    
    return NextResponse.json({
      success: false,
      error: '获取用户分层失败'
    }, { status: 500 })
  }
}

