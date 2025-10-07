// Creem计划获取端点
export async function onRequest(context) {
  var env = context.env;
  var apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  var baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    // 调用Creem API获取计划
    var response = await fetch(baseUrl + '/plans', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Creem API request failed: ' + response.status);
    }

    var data = await response.json();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Creem plans retrieved successfully',
      plans: data.plans || [],
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to fetch Creem plans',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
