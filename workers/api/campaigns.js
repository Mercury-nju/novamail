// Cloudflare Worker for Campaigns API
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
    
    // 处理GET请求 - 获取活动列表
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
    
    // 处理POST请求 - 创建新活动
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
        
        // 在实际应用中，这里应该保存到数据库
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
}
