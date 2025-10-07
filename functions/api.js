// Cloudflare Workers Functions - 处理所有API路由
export function onRequest(context) {
  var request = context.request;
  var env = context.env;
  var url = new URL(request.url);
  
  // 设置CORS头
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

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

  // 默认响应
  return new Response(JSON.stringify({ 
    success: true,
    message: 'API endpoint working',
    path: url.pathname,
    timestamp: new Date().toISOString()
  }), {
    headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
  });
}

// Creem API测试
function handleCreemTest(corsHeaders, env) {
  var apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  var baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Creem API test endpoint working',
    apiKey: apiKey.substring(0, 10) + '...',
    baseUrl: baseUrl,
    timestamp: new Date().toISOString()
  }), {
    headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
  });
}

// Webhook测试
function handleWebhookTest(corsHeaders, request) {
  return new Response(JSON.stringify({
    success: true,
    message: 'Webhook test endpoint working',
    method: request.method,
    timestamp: new Date().toISOString()
  }), {
    headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
  });
}

// Creem计划获取
function handleCreemPlans(corsHeaders, env) {
  var apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  var baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Creem plans endpoint working',
    apiKey: apiKey.substring(0, 10) + '...',
    baseUrl: baseUrl,
    timestamp: new Date().toISOString()
  }), {
    headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
  });
}

