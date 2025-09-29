import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { strictRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResponse = await strictRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // 验证管理员权限
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      )
    }

    // 检查是否为管理员（这里简化处理，实际项目中应该有角色系统）
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any)?.id }
    })

    if (!user || user.email !== 'admin@novamail.world') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // 获取所有用户
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        company: true,
        createdAt: true
      }
    })

    // 获取活动统计
    const totalCampaigns = await prisma.campaign.count()
    
    // 获取联系人统计
    const totalContacts = await prisma.contact.count()

    // 计算统计数据
    const totalUsers = users.length
    
    // 最近7天注册的用户数
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentRegistrations = users.filter(user => 
      new Date(user.createdAt) >= sevenDaysAgo
    ).length

    // 统计数据
    const stats = {
      totalUsers,
      totalCampaigns,
      totalContacts,
      recentRegistrations
    }

    return NextResponse.json({
      users,
      stats
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}