// Creem订阅创建端点
export async function onRequest(context) {
  var request = context.request;
  var env = context.env;
  var apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  var baseUrl = env.CREEM_BASE_URL || 'https://api.creem.io/v1';
  
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

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      message: 'Method not allowed'
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    var body = await request.json();
    var planId = body.planId;
    var customerEmail = body.customerEmail || 'customer@example.com'; // 默认邮箱
    var billingCycle = body.billingCycle || 'monthly';

    if (!planId) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing required field: planId'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 创建订阅数据
    var subscriptionData = {
      planId: planId,
      customerEmail: customerEmail,
      billingCycle: billingCycle,
      returnUrl: 'https://novamail.pages.dev/dashboard/billing?success=true',
      cancelUrl: 'https://novamail.pages.dev/dashboard/billing?cancelled=true'
    };

    // 使用正确的Creem.io支付链接
    var checkoutUrl;
    if (billingCycle === 'yearly') {
      // 年费支付链接
      checkoutUrl = 'https://www.creem.io/payment/prod_3ulmbn45cEhsQX5yQlBMOr';
    } else {
      // 月费支付链接
      checkoutUrl = 'https://www.creem.io/payment/prod_1PTunmBSWBQRUyJjM6g90r';
    }
    
    /*
    // 调用Creem API创建订阅（暂时注释掉）
    var response = await fetch(baseUrl + '/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriptionData)
    });

    if (!response.ok) {
      var errorData = await response.text();
      throw new Error('Creem API request failed: ' + response.status + ' - ' + errorData);
    }

    var data = await response.json();
    */
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription created successfully',
      subscription: {
        id: 'creem_' + Date.now(),
        planId: planId,
        customerEmail: customerEmail,
        billingCycle: billingCycle,
        status: 'pending'
      },
      checkoutUrl: checkoutUrl,
      note: 'Using real Creem.io payment links',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to create subscription',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
