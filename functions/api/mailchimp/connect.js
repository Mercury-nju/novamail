/**
 * Mailchimp OAuth Connect Handler
 * Handles Mailchimp OAuth connection requests
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

    // 使用 API Key 作为 OAuth Client ID 的临时方案
    // 真正的 OAuth 需要创建 OAuth App
    const apiKey = env.MAILCHIMP_API_KEY;
    const dc = apiKey ? apiKey.split('-').pop() : 'us20';
    
    console.log('Mailchimp OAuth config:');
    console.log('API Key:', apiKey ? 'Set' : 'Not set');
    console.log('DC:', dc);
    console.log('User Email:', userEmail);
    
    // 使用临时的 OAuth URL，实际需要创建正确的 OAuth App
    const redirectUri = `${request.headers.get('origin') || 'https://novamail.world'}/mailchimp/callback`;
    const state = btoa(JSON.stringify({ userEmail, timestamp: Date.now() }));
    
    // 构建 OAuth URL - 注意这里需要正确的 Client ID
    const authUrl = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${apiKey}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=templates&state=${encodeURIComponent(state)}`;
    
    console.log('Generated auth URL:', authUrl.substring(0, 200) + '...');
    
    return new Response(JSON.stringify({ 
      success: true,
      auth_url: authUrl,
      dc: dc
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
