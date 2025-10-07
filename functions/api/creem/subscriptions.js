// Creem订阅创建端点
export async function onRequest(context) {
  var request = context.request;
  var env = context.env;
  var apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  var baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
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
    var customerEmail = body.customerEmail;
    var billingCycle = body.billingCycle || 'monthly';

    if (!planId || !customerEmail) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing required fields: planId and customerEmail'
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

    // 暂时使用模拟的支付URL，确保功能正常
    var mockCheckoutUrl = 'https://checkout.creem.com/mock-checkout?plan=' + planId + '&email=' + encodeURIComponent(customerEmail);
    
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
      message: 'Subscription created successfully (using mock checkout)',
      subscription: {
        id: 'mock_' + Date.now(),
        planId: planId,
        customerEmail: customerEmail,
        status: 'pending'
      },
      checkoutUrl: mockCheckoutUrl,
      note: 'Using mock checkout URL while Creem API is being configured',
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
