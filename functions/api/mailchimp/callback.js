/**
 * Mailchimp OAuth Callback Handler
 * Handles Mailchimp OAuth callback and stores user tokens
 */

export async function onRequestPost({ request, env }) {
  
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
    
    console.log('Mailchimp callback - clientId:', clientId ? 'Set' : 'Not set');
    console.log('Mailchimp callback - clientSecret:', clientSecret ? 'Set' : 'Not set');
    console.log('Mailchimp callback - redirectUri:', redirectUri);
    
    if (!clientId || !clientSecret || !redirectUri) {
      console.error('Mailchimp OAuth not configured');
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

    console.log('Exchanging code for token...');
    
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    console.log('Token response status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to exchange code for token:', errorText);
      throw new Error(`Failed to exchange code for token: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Token data received:', { access_token: tokenData.access_token ? 'Set' : 'Not set', dc: tokenData.dc });
    const { access_token, dc } = tokenData;
    
    // Store user token in KV (if KV is available)
    try {
      const userKey = `user_${userEmail.toLowerCase()}`;
      const userData = await env.USERS_KV?.get(userKey);
      
      if (userData) {
        const user = JSON.parse(userData);
        user.mailchimpAccessToken = access_token;
        user.mailchimpDc = dc;
        user.mailchimpConnected = true;
        user.mailchimpConnectedAt = new Date().toISOString();
        
        await env.USERS_KV?.put(userKey, JSON.stringify(user));
      } else {
        // Create new user entry
        const newUser = {
          email: userEmail,
          mailchimpAccessToken: access_token,
          mailchimpDc: dc,
          mailchimpConnected: true,
          mailchimpConnectedAt: new Date().toISOString()
        };
        await env.USERS_KV?.put(userKey, JSON.stringify(newUser));
      }
    } catch (kvError) {
      console.error('KV storage error:', kvError);
      // Continue anyway - the important part is returning success
    }
    
    // Return token to be stored in browser localStorage
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Mailchimp account connected successfully',
      access_token: access_token,
      dc: dc,
      userEmail: userEmail
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Mailchimp callback error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Failed to process Mailchimp callback' 
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
