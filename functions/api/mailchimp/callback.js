/**
 * Mailchimp OAuth Callback Handler
 * Handles Mailchimp OAuth callback and stores user tokens
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const data = await request.json();
    const { code, userEmail } = data;
    
    if (!code || !userEmail) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Authorization code and user email are required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Exchange code for access token
    const clientId = env.MAILCHIMP_CLIENT_ID;
    const clientSecret = env.MAILCHIMP_CLIENT_SECRET;
    const redirectUri = env.MAILCHIMP_REDIRECT_URI;
    
    if (!clientId || !clientSecret || !redirectUri) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Mailchimp OAuth not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Call Mailchimp token endpoint
    const tokenUrl = 'https://login.mailchimp.com/oauth2/token';
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    const { access_token, dc } = tokenData;
    
    // Store user token in KV
    const userKey = `user_${userEmail.toLowerCase()}`;
    const userData = await env.USERS_KV.get(userKey);
    
    if (userData) {
      const user = JSON.parse(userData);
      user.mailchimpAccessToken = access_token;
      user.mailchimpDc = dc;
      user.mailchimpConnected = true;
      user.mailchimpConnectedAt = new Date().toISOString();
      
      await env.USERS_KV.put(userKey, JSON.stringify(user));
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Mailchimp account connected successfully'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Mailchimp callback error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to process Mailchimp callback' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
