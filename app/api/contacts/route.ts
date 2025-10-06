import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 静态导出模式：返回模拟联系人数据
    const mockContacts = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'active',
        tags: ['VIP', 'Customer'],
        lastContact: '2024-01-20',
        totalEmails: 15,
        openRate: 85.2
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        status: 'active',
        tags: ['Newsletter'],
        lastContact: '2024-01-19',
        totalEmails: 8,
        openRate: 72.5
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        status: 'active',
        tags: ['Prospect'],
        lastContact: '2024-01-18',
        totalEmails: 5,
        openRate: 60.0
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        status: 'active',
        tags: ['Customer'],
        lastContact: '2024-01-17',
        totalEmails: 12,
        openRate: 78.9
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@example.com',
        status: 'active',
        tags: ['VIP'],
        lastContact: '2024-01-16',
        totalEmails: 20,
        openRate: 92.1
      }
    ]

    return NextResponse.json({
      success: true,
      contacts: mockContacts,
      total: mockContacts.length
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
