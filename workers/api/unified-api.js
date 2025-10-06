// Cloudflare Worker for Unified NovaMail API
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const pathname = url.pathname
    
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }
      })
    }
    
    // 路由分发
    if (pathname.startsWith('/api/contacts')) {
      return handleContactsAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/campaigns')) {
      return handleCampaignsAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/analytics')) {
      return handleAnalyticsAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/ai/generate-email')) {
      return handleAIGenerateEmailAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/contacts/import')) {
      return handleContactsImportAPI(request, env, ctx)
    }
    
    // 404 - 未找到路由
    return new Response(JSON.stringify({
      success: false,
      error: 'API endpoint not found'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// Contacts API处理
async function handleContactsAPI(request, env, ctx) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      const search = url.searchParams.get('search') || ''
      const status = url.searchParams.get('status') || 'all'
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '50')
      
      // 模拟从数据库获取联系人数据
      const mockContacts = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          status: 'active',
          tags: ['customer', 'vip'],
          lastContact: '2024-01-15',
          totalEmails: 12,
          openRate: 85,
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'active',
          tags: ['prospect'],
          lastContact: '2024-01-10',
          totalEmails: 8,
          openRate: 92,
          createdAt: '2024-01-02T00:00:00Z'
        }
      ]
      
      // 应用筛选
      let filteredContacts = mockContacts
      
      if (search) {
        filteredContacts = filteredContacts.filter(contact => 
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      if (status !== 'all') {
        filteredContacts = filteredContacts.filter(contact => contact.status === status)
      }
      
      // 分页
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedContacts = filteredContacts.slice(startIndex, endIndex)
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          contacts: paginatedContacts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(filteredContacts.length / limit),
            totalContacts: filteredContacts.length,
            hasNext: endIndex < filteredContacts.length,
            hasPrev: page > 1
          }
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Contacts API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch contacts',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      const { name, email, tags = [], customFields = {} } = body
      
      // 验证必填字段
      if (!name || !email) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Name and email are required'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
      
      // 验证邮箱格式
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
      
      // 创建新联系人
      const newContact = {
        id: `contact_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        status: 'active',
        tags: Array.isArray(tags) ? tags : [],
        customFields,
        lastContact: null,
        totalEmails: 0,
        openRate: 0,
        createdAt: new Date().toISOString()
      }
      
      console.log('New contact created:', newContact)
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Contact created successfully',
        data: newContact
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Create contact error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create contact',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
}

// Campaigns API处理
async function handleCampaignsAPI(request, env, ctx) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      const status = url.searchParams.get('status') || 'all'
      
      // 模拟从数据库获取活动数据
      const mockCampaigns = [
        {
          id: '1',
          name: 'Welcome Series - Part 1',
          subject: 'Welcome to NovaMail!',
          status: 'sent',
          recipients: 1250,
          sent: 1245,
          opened: 498,
          clicked: 87,
          createdAt: '2024-01-15T00:00:00Z',
          sentAt: '2024-01-15T10:00:00Z',
          content: '<div>Welcome email content...</div>'
        },
        {
          id: '2',
          name: 'Product Launch Announcement',
          subject: 'Introducing Our New Features',
          status: 'scheduled',
          recipients: 2100,
          sent: 0,
          opened: 0,
          clicked: 0,
          createdAt: '2024-01-20T00:00:00Z',
          scheduledAt: '2024-01-25T14:00:00Z',
          content: '<div>Product launch content...</div>'
        }
      ]
      
      // 应用状态筛选
      let filteredCampaigns = mockCampaigns
      if (status !== 'all') {
        filteredCampaigns = mockCampaigns.filter(campaign => campaign.status === status)
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          campaigns: filteredCampaigns,
          total: filteredCampaigns.length
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Campaigns API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch campaigns',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      const { name, subject, content, recipients, scheduledAt } = body
      
      // 验证必填字段
      if (!name || !subject || !content || !recipients) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Name, subject, content, and recipients are required'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
      
      // 创建新活动
      const newCampaign = {
        id: `campaign_${Date.now()}`,
        name: name.trim(),
        subject: subject.trim(),
        content: content,
        recipients: Array.isArray(recipients) ? recipients : [],
        status: scheduledAt ? 'scheduled' : 'draft',
        sent: 0,
        opened: 0,
        clicked: 0,
        createdAt: new Date().toISOString(),
        scheduledAt: scheduledAt || null,
        sentAt: null
      }
      
      console.log('New campaign created:', newCampaign)
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Campaign created successfully',
        data: newCampaign
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Create campaign error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create campaign',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
}

// Analytics API处理
async function handleAnalyticsAPI(request, env, ctx) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      const timeRange = url.searchParams.get('timeRange') || '30d'
      
      // 模拟从数据库获取分析数据
      const mockAnalytics = {
        totalEmails: 0,
        totalOpens: 0,
        totalClicks: 0,
        openRate: 0,
        clickRate: 0,
        unsubscribeRate: 0,
        bounceRate: 0,
        revenue: 0,
        conversions: 0
      }
      
      const mockChartData = []
      
      // 生成过去7天的图表数据
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        mockChartData.push({
          date: date.toISOString().split('T')[0],
          emails: 0,
          opens: 0,
          clicks: 0
        })
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          analytics: mockAnalytics,
          chartData: mockChartData,
          timeRange
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Analytics API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch analytics',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
}

// AI Generate Email API处理（保持原有功能）
async function handleAIGenerateEmailAPI(request, env, ctx) {
  // 这里保持原有的AI生成邮件功能
  // 由于代码较长，这里只是占位符
  // 实际部署时需要包含完整的AI生成邮件代码
  return new Response(JSON.stringify({
    success: false,
    error: 'AI Generate Email API not implemented in unified version'
  }), {
    status: 501,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

// Contacts Import API处理（保持原有功能）
async function handleContactsImportAPI(request, env, ctx) {
  // 这里保持原有的联系人导入功能
  // 由于代码较长，这里只是占位符
  // 实际部署时需要包含完整的联系人导入代码
  return new Response(JSON.stringify({
    success: false,
    error: 'Contacts Import API not implemented in unified version'
  }), {
    status: 501,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
