// 开发者API - 获取用户活动数据
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
    
    var mockActivities = [
      {
        userId: '1',
        userEmail: 'john.doe@example.com',
        action: 'Login',
        details: 'User logged in via Google OAuth',
        timestamp: '2024-10-07T08:30:00Z'
      },
      {
        userId: '1',
        userEmail: 'john.doe@example.com',
        action: 'Campaign Created',
        details: 'Created "Welcome Campaign" with 150 recipients',
        timestamp: '2024-10-07T09:15:00Z'
      },
      {
        userId: '2',
        userEmail: 'jane.smith@startup.com',
        action: 'Subscription Upgrade',
        details: 'Upgraded to Pro plan ($19/month)',
        timestamp: '2024-10-07T10:20:00Z'
      },
      {
        userId: '2',
        userEmail: 'jane.smith@startup.com',
        action: 'Email Sent',
        details: 'Sent "Product Launch" campaign to 5000 recipients',
        timestamp: '2024-10-07T11:45:00Z'
      },
      {
        userId: '3',
        userEmail: 'mike.wilson@business.com',
        action: 'Contact Import',
        details: 'Imported 500 contacts from CSV file',
        timestamp: '2024-10-06T14:30:00Z'
      },
      {
        userId: '3',
        userEmail: 'mike.wilson@business.com',
        action: 'Campaign Sent',
        details: 'Sent "Monthly Newsletter" to 1800 recipients',
        timestamp: '2024-10-06T16:45:00Z'
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      message: 'Developer activities data retrieved successfully',
      data: mockActivities,
      note: 'Using mock data - connect to real database for production',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch developer activities data',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
