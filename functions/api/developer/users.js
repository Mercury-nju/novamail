// 开发者API - 获取用户数据
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
        email: 'john.doe@example.com',
        name: 'John Doe',
        company: 'Tech Corp',
        subscriptionPlan: 'free',
        subscriptionStatus: 'active',
        emailsSentThisMonth: 150,
        contactsCount: 250,
        campaignsCount: 3,
        createdAt: '2024-01-15T10:00:00Z',
        lastLogin: '2024-10-07T08:30:00Z',
        totalEmailsSent: 1250,
        totalRevenue: 0
      },
      {
        id: '2',
        email: 'jane.smith@startup.com',
        name: 'Jane Smith',
        company: 'Startup Inc',
        subscriptionPlan: 'pro',
        subscriptionStatus: 'active',
        emailsSentThisMonth: 2500,
        contactsCount: 5000,
        campaignsCount: 12,
        createdAt: '2024-02-20T14:30:00Z',
        lastLogin: '2024-10-07T09:15:00Z',
        totalEmailsSent: 15000,
        totalRevenue: 19
      },
      {
        id: '3',
        email: 'mike.wilson@business.com',
        name: 'Mike Wilson',
        company: 'Business Solutions',
        subscriptionPlan: 'pro',
        subscriptionStatus: 'active',
        emailsSentThisMonth: 1800,
        contactsCount: 3500,
        campaignsCount: 8,
        createdAt: '2024-03-10T11:20:00Z',
        lastLogin: '2024-10-06T16:45:00Z',
        totalEmailsSent: 8500,
        totalRevenue: 19
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      message: 'Developer users data retrieved successfully',
      data: mockUsers,
      note: 'Using mock data - connect to real database for production',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch developer users data',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
