// Cloudflare Worker for Contacts API
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
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
    
    // 处理GET请求 - 获取联系人列表
    if (request.method === 'GET') {
      try {
        // 从URL参数获取筛选条件
        const search = url.searchParams.get('search') || ''
        const status = url.searchParams.get('status') || 'all'
        const page = parseInt(url.searchParams.get('page') || '1')
        const limit = parseInt(url.searchParams.get('limit') || '50')
        
        // 模拟从数据库获取联系人数据
        // 在实际应用中，这里应该连接到真实的数据库
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
    
    // 处理POST请求 - 创建新联系人
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
        
        // 在实际应用中，这里应该保存到数据库
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
    
    // 处理其他请求方法
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }
}
