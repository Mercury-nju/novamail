// 管理员API - 获取活动数据
export async function onRequest(context) {
  var request = context.request;
  var env = context.env;
  
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({
      success: false,
      message: 'Method not allowed'
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    // 这里需要连接到真实的数据库
    // 暂时返回模拟数据，实际应该查询数据库
    
    var mockCampaigns = [
      {
        id: '1',
        name: 'Welcome Campaign',
        subject: 'Welcome to NovaMail!',
        status: 'sent',
        recipients: 150,
        openRate: 25.5,
        clickRate: 8.2,
        createdAt: '2024-10-01T10:00:00Z',
        userEmail: 'user1@example.com'
      },
      {
        id: '2',
        name: 'Product Launch',
        subject: 'New Features Available',
        status: 'sent',
        recipients: 5000,
        openRate: 32.1,
        clickRate: 12.5,
        createdAt: '2024-10-05T14:30:00Z',
        userEmail: 'user2@example.com'
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      message: 'Campaigns data retrieved successfully',
      data: mockCampaigns,
      note: 'Using mock data - connect to real database for production',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch campaigns data',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
