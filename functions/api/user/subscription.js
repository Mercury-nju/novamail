// 用户订阅状态检查端点
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
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    var url = new URL(request.url);
    var email = url.searchParams.get('email') || (request.method === 'POST' ? (await request.json()).email : null);

    if (!email) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email is required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 检查用户订阅状态
    // 在实际应用中，这里应该从数据库查询用户的真实订阅状态
    var userSubscription = {
      email: email,
      plan: 'free', // 默认免费用户
      status: 'active',
      activatedAt: null,
      expiresAt: null,
      features: {
        maxContacts: 500,
        maxEmailsPerMonth: 1000,
        hasAdvancedTemplates: false,
        hasAITeatures: true,
        hasAnalytics: true,
        hasAPIAccess: false,
        hasWebhookAccess: false,
        hasCustomBranding: false
      }
    };

    // 检查localStorage中的订阅状态（模拟）
    // 在实际应用中，这应该从服务器端数据库查询
    var localStorageData = request.headers.get('x-user-subscription');
    if (localStorageData) {
      try {
        var subscription = JSON.parse(localStorageData);
        if (subscription.status === 'active') {
          userSubscription = subscription;
        }
      } catch (e) {
        console.log('Invalid subscription data in localStorage');
      }
    }

    return new Response(JSON.stringify({
      success: true,
      subscription: userSubscription,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Subscription check error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to check subscription status',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
