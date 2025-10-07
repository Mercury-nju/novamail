// 管理员API - 获取联系人数据
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
    
    var mockContacts = [
      {
        id: '1',
        email: 'contact1@example.com',
        firstName: 'Alice',
        lastName: 'Johnson',
        userSegment: 'VIP Customers',
        createdAt: '2024-10-01T10:00:00Z',
        userEmail: 'user1@example.com'
      },
      {
        id: '2',
        email: 'contact2@example.com',
        firstName: 'Bob',
        lastName: 'Wilson',
        userSegment: 'Newsletter',
        createdAt: '2024-10-02T11:30:00Z',
        userEmail: 'user1@example.com'
      },
      {
        id: '3',
        email: 'contact3@example.com',
        firstName: 'Carol',
        lastName: 'Brown',
        userSegment: 'Prospects',
        createdAt: '2024-10-03T09:15:00Z',
        userEmail: 'user2@example.com'
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      message: 'Contacts data retrieved successfully',
      data: mockContacts,
      note: 'Using mock data - connect to real database for production',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch contacts data',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
