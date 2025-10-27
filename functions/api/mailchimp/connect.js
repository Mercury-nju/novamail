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

    // Generate OAuth URL
    const clientId = env.MAILCHIMP_CLIENT_ID;
    // 使用实际的域名
    const redirectUri = env.MAILCHIMP_REDIRECT_URI || 'https://novamail.world/api/mailchimp/callback';
    
    console.log('Mailchimp OAuth config check:');
    console.log('Client ID:', clientId ? 'Set' : 'Not set');
    console.log('Redirect URI:', redirectUri);
    console.log('User Email:', userEmail);
    
    if (!clientId) {
      console.error('Mailchimp OAuth not configured - missing client ID');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Mailchimp OAuth not configured. Please contact support.', 
        debug: {
          clientIdSet: !!clientId,
          redirectUri: redirectUri
        }
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'templates'
    });
    
    const authUrl = `https://login.mailchimp.com/oauth2/authorize?${params.toString()}`;
    
    console.log('Generated auth URL:', authUrl);
    
    return new Response(JSON.stringify({ 
      success: true,
      auth_url: authUrl
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Mailchimp connect error:', error);
    console.error('Error stack:', error.stack);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Failed to generate Mailchimp auth URL' 
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
