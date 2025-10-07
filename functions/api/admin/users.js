// 管理员API - 获取用户数据
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
    
    var mockUsers = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'John Doe',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Example Corp',
        subscriptionPlan: 'free',
        subscriptionStatus: 'active',
        emailsSentThisMonth: 150,
        contactsCount: 250,
        campaignsCount: 3,
        createdAt: '2024-01-15T10:00:00Z',
        lastUsageReset: '2024-10-01T00:00:00Z'
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'Jane Smith',
        firstName: 'Jane',
        lastName: 'Smith',
        company: 'Tech Startup',
        subscriptionPlan: 'pro',
        subscriptionStatus: 'active',
        emailsSentThisMonth: 2500,
        contactsCount: 5000,
        campaignsCount: 12,
        createdAt: '2024-02-20T14:30:00Z',
        lastUsageReset: '2024-10-01T00:00:00Z'
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      message: 'Users data retrieved successfully',
      data: mockUsers,
      note: 'Using mock data - connect to real database for production',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch users data',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
