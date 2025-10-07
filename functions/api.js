// Cloudflare Workers Functions - 处理所有API路由
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // 设置CORS头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 路由处理
    if (url.pathname === '/api/creem/test') {
      return handleCreemTest(corsHeaders, env);
    }
    
    if (url.pathname === '/api/creem/webhook-test') {
      return handleWebhookTest(corsHeaders, request);
    }
    
    if (url.pathname === '/api/creem/plans') {
      return handleCreemPlans(corsHeaders, env);
    }
    
    if (url.pathname === '/api/creem/subscriptions') {
      return handleCreemSubscriptions(corsHeaders, request, env);
    }
    
    if (url.pathname === '/api/creem/webhook') {
      return handleCreemWebhook(corsHeaders, request, env);
    }

    // 默认响应
    return new Response(JSON.stringify({ 
      error: 'API endpoint not found',
      path: url.pathname 
    }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Creem API测试
async function handleCreemTest(corsHeaders, env) {
  const apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  const baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  try {
    const response = await fetch(`${baseUrl}/plans`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Creem API connection successful',
      plansCount: data.plans ? data.plans.length : 0,
      apiKey: apiKey.substring(0, 10) + '...',
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Creem API connection failed',
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Webhook测试
async function handleWebhookTest(corsHeaders, request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body || '{}');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Webhook test successful',
      receivedData: data,
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Webhook test failed',
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Creem计划获取
async function handleCreemPlans(corsHeaders, env) {
  const apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  const baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  try {
    const response = await fetch(`${baseUrl}/plans`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return new Response(JSON.stringify({
      success: true,
      plans: data.plans || [],
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Creem订阅处理
async function handleCreemSubscriptions(corsHeaders, request, env) {
  const apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  const baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  if (request.method === 'GET') {
    // 获取订阅
    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription fetch endpoint - implement as needed',
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (request.method === 'POST') {
    // 创建订阅
    const body = await request.json();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription creation endpoint - implement as needed',
      data: body,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({
    error: 'Method not allowed'
  }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Creem Webhook处理
async function handleCreemWebhook(corsHeaders, request, env) {
  const webhookSecret = env.CREEM_WEBHOOK_SECRET || 'whsec_5uvCq8f1gQMsqz5rqwdVgZ';
  
  try {
    const body = await request.text();
    const signature = request.headers.get('creem-signature');
    
    // 简单的签名验证（实际应该使用HMAC）
    const isValid = signature && signature.includes('sha256=');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Webhook received',
      signatureValid: isValid,
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
