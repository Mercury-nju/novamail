import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 获取当前用户ID（这里需要根据实际的认证系统获取）
    // 暂时使用一个默认用户ID，实际应该从session或token中获取
    const userId = 'default-user-id' // TODO: 从认证系统获取真实用户ID

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
