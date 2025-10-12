// Creem支付成功回调处理
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

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    var body = await request.json();
    var email = body.email;
    var subscriptionId = body.subscriptionId;
    var planId = body.planId;
    var amount = body.amount;
    var currency = body.currency;

    if (!email || !subscriptionId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and subscription ID are required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 更新用户订阅状态
    var subscriptionData = {
      email: email,
      subscriptionId: subscriptionId,
      planId: planId || 'pro',
      plan: planId || 'pro',
      status: 'active',
      amount: amount || 19,
      currency: currency || 'USD',
      activatedAt: new Date().toISOString(),
      expiresAt: null, // 买断制，永不过期
      features: {
        maxContacts: 10000,
        maxEmailsPerMonth: 50000,
        hasAdvancedTemplates: true,
        hasAITeatures: true,
        hasAnalytics: true,
        hasAPIAccess: true,
        hasWebhookAccess: true,
        hasCustomBranding: true
      }
    };

    // 在实际应用中，这里应该：
    // 1. 验证支付信息的真实性
    // 2. 更新数据库中的用户订阅状态
    // 3. 发送确认邮件给用户
    // 4. 记录支付日志

    console.log('Payment successful for user:', email, 'Subscription:', subscriptionData);

    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription activated successfully',
      subscription: subscriptionData,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Payment callback error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process payment callback',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
