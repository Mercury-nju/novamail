/**
 * Mailchimp OAuth Connect Handler
 * Handles Mailchimp connection requests
 */

export async function onRequestPost({ request, env }) {
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const data = await request.json();
    const { userEmail } = data;
    
    if (!userEmail) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'User email is required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 使用 API Key 模式而不是 OAuth
    // Mailchimp API Key 格式: <key>-<dc>
    const apiKey = env.MAILCHIMP_API_KEY;
    
    if (!apiKey) {
      console.error('Mailchimp API Key not configured');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Mailchimp API Key not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 从 API Key 中提取数据中心
    const dc = apiKey.split('-').pop();
    
    console.log('Mailchimp API Key mode:');
    console.log('API Key:', apiKey ? 'Set' : 'Not set');
    console.log('DC:', dc);
    console.log('User Email:', userEmail);
    
    // 返回成功状态，表示可以使用 API Key
    // 前端会直接尝试导出，而不需要 OAuth 授权页面
    return new Response(JSON.stringify({ 
      success: true,
      mode: 'api_key',
      dc: dc,
      message: 'Mailchimp API Key configured. You can now export templates.'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Mailchimp connect error:', error);
    console.error('Error stack:', error.stack);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Failed to connect Mailchimp' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
