import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 强制动态渲染
export const dynamic = 'force-dynamic'

// 获取当前用户ID的辅助函数
async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  try {
    // 从cookie获取session
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
    if (sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true }
      })
      return session?.userId || null
    }
    return null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // 获取当前用户ID
    const userId = await getCurrentUserId(request)
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User not authenticated'
      }, { status: 401 })
    }

    // 从数据库获取真实联系人数据
    const contacts = await prisma.contact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    // 格式化联系人数据
    const formattedContacts = contacts.map(contact => ({
      id: contact.id,
      name: `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unknown',
      email: contact.email,
      status: 'active',
      tags: contact.userSegment ? [contact.userSegment] : [],
      lastContact: contact.updatedAt.toISOString().split('T')[0],
      totalEmails: 0, // TODO: 从邮件发送记录中计算
      openRate: 0 // TODO: 从邮件统计中计算
    }))

    return NextResponse.json({
      success: true,
      contacts: formattedContacts,
      total: formattedContacts.length
    })

  } catch (error) {
    console.error('Contacts API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contacts' 
      },
      { status: 500 }
    )
  }
}
