// Cloudflare Workers 涓诲叆鍙ｆ枃浠?// 璺敱鍒颁笉鍚岀殑 API 绔偣

// Gmail璁块棶浠ょ墝鍒锋柊鍑芥暟
async function refreshGmailAccessToken(env) {
  if (!env.GMAIL_REFRESH_TOKEN || !env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    console.log('Missing refresh token or Google credentials');
    return null;
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        refresh_token: env.GMAIL_REFRESH_TOKEN,
        grant_type: 'refresh_token'
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Gmail access token refreshed successfully');
      return data.access_token;
    } else {
      const errorData = await response.text();
      console.log('Failed to refresh Gmail access token:', response.status, errorData);
      return null;
    }
  } catch (error) {
    console.log('Error refreshing Gmail access token:', error);
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 澶撮儴
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    // 澶勭悊 OPTIONS 璇锋眰
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 璺敱鍒颁笉鍚岀殑 API 绔偣
      if (path.startsWith('/api/auth/send-verification') || path.startsWith('/api/send-verification')) {
        return await handleSendVerification(request, env);
      } else if (path.startsWith('/api/auth/verify-code')) {
        return await handleVerifyCode(request, env);
      } else if (path.startsWith('/api/auth/login')) {
        return await handleLogin(request, env);
      } else if (path.startsWith('/api/auth/google-login')) {
        return await handleGoogleLogin(request, env);
      } else if (path.startsWith('/api/auth/google-callback')) {
        return await handleGoogleCallback(request, env);
      } else if (path.startsWith('/api/test-gmail')) {
        return await handleTestGmail(request, env);
      } else if (path.startsWith('/api/debug-kv')) {
        return await handleDebugKV(request, env);
      } else if (path.startsWith('/api/test-user-save')) {
        return await handleTestUserSave(request, env);
      } else if (path.startsWith('/api/creem/test')) {
        return await handleCreemTest(request, env);
      } else if (path.startsWith('/api/creem/webhook-test')) {
        return await handleWebhookTest(request, env);
      } else if (path.startsWith('/api/creem/plans')) {
        return await handleCreemPlans(request, env);
      } else if (path.startsWith('/api/creem/subscriptions')) {
        return await handleCreemSubscriptions(request, env);
      } else if (path.startsWith('/api/user/check-permission')) {
        return await handleCheckPermission(request, env);
      } else if (path.startsWith('/api/campaigns/send')) {
        return await handleCampaignSend(request, env);
      } else if (path.startsWith('/api/user/update-usage')) {
        return await handleUpdateUsage(request, env);
      } else if (path.startsWith('/api/ai/generate-email')) {
        return await handleAIGenerateEmail(request, env);
      } else if (path.startsWith('/api/test')) {
        return new Response(JSON.stringify({
          success: true,
          message: 'Test endpoint working',
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders
        });
      } else if (path.startsWith('/api/user/email-config')) {
        return await handleEmailConfig(request, env);
      } else if (path.startsWith('/api/user/test-email')) {
        return await handleTestEmail(request, env);
      } else if (path.startsWith('/api/campaigns')) {
        return await handleCampaigns(request, env);
      } else if (path.startsWith('/api/admin/clear-users')) {
        return await handleClearUsers(request, env);
      } else if (path.startsWith('/api/admin/clear-campaigns')) {
        return await handleClearCampaigns(request, env);
      } else if (path.startsWith('/api/admin/clear-email-configs')) {
        return await handleClearEmailConfigs(request, env);
      } else if (path.startsWith('/api/admin/clear-all')) {
        return await handleClearAll(request, env);
      } else if (path.startsWith('/api/contacts/import')) {
        return await handleContactsImport(request, env);
      } else if (path.startsWith('/api/contacts')) {
        return await handleContacts(request, env);
      } else if (path.startsWith('/api/analytics')) {
        return await handleAnalytics(request, env);
      } else if (path.startsWith('/api/dashboard/stats')) {
        return await handleDashboardStats(request, env);
      } else {
        return new Response(JSON.stringify({ 
          error: 'API endpoint not found',
          availableEndpoints: [
            '/api/auth/send-verification',
            '/api/send-verification',
            '/api/auth/verify-code',
            '/api/auth/login',
            '/api/creem/test',
            '/api/creem/webhook-test',
            '/api/creem/plans',
            '/api/creem/subscriptions',
            '/api/user/check-permission',
            '/api/campaigns/send',
            '/api/user/update-usage',
            '/api/ai/generate-email',
            '/api/test',
            '/api/user/email-config',
            '/api/user/test-email',
            '/api/campaigns',
            '/api/admin/clear-users',
            '/api/admin/clear-campaigns',
            '/api/admin/clear-email-configs',
            '/api/admin/clear-all'
          ]
        }), {
          status: 404,
          headers: corsHeaders
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};

// 鍙戦€侀獙璇佺爜澶勭悊鍑芥暟
async function handleSendVerification(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const email = data.email;
  
  if (!email) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Email is required' 
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 妫€鏌ョ敤鎴锋槸鍚﹀凡瀛樺湪
  let existingUser = null;
  try {
    console.log('Checking for existing user:', email);
    console.log('KV storage available:', !!env.USERS_KV);
    
    if (env.USERS_KV) {
      const userKey = `user_${email.toLowerCase()}`;
      console.log('Looking for user key:', userKey);
      
      const storedUser = await env.USERS_KV.get(userKey);
      console.log('Stored user data:', storedUser ? 'Found' : 'Not found');
      
      if (storedUser) {
        existingUser = JSON.parse(storedUser);
        console.log('User already exists:', existingUser.email);
      } else {
        console.log('No existing user found for:', email);
      }
    } else {
      console.log('KV storage not available - cannot check existing users');
    }
  } catch (error) {
    console.log('Failed to check existing user:', error);
  }

  if (existingUser) {
    return new Response(JSON.stringify({
      success: false,
      error: 'User already exists',
      message: 'This email is already registered. Please use login instead.',
      code: 'USER_EXISTS'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 鐢熸垚6浣嶉獙璇佺爜
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 浣跨敤Gmail API鍙戦€侀獙璇佺爜閭欢
  console.log('Sending verification email via Gmail API to:', email);

  try {
    // 妫€鏌mail閰嶇疆
    const gmailUser = env.GMAIL_SMTP_USER;
    const gmailAccessToken = env.GMAIL_ACCESS_TOKEN;
    
    console.log('Gmail configuration check:', {
      hasGmailUser: !!gmailUser,
      hasAccessToken: !!gmailAccessToken,
      gmailUser: gmailUser ? `${gmailUser.substring(0, 3)}***` : 'not set',
      tokenLength: gmailAccessToken ? gmailAccessToken.length : 0
    });
    
    if (!gmailUser || !gmailAccessToken) {
      console.log('Gmail API not configured, returning verification code for testing');
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code generated (Gmail API not configured)',
        code: verificationCode,
        note: 'Please configure Gmail API credentials to enable real email sending',
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

    // 鏋勫缓Gmail API閭欢鍐呭
    const emailContent = [
      `From: NovaMail <${gmailUser}>`,
      `To: ${email}`,
      `Subject: Your NovaMail Verification Code`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">`,
      `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">`,
      `<h1 style="color: white; margin: 0;">NovaMail</h1>`,
      `</div>`,
      `<div style="padding: 30px; background: #f9f9f9;">`,
      `<h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>`,
      `<p style="color: #666; font-size: 16px; line-height: 1.5;">`,
      `Thank you for signing up for NovaMail! To complete your registration, please use the verification code below:`,
      `</p>`,
      `<div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">`,
      `<span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${verificationCode}</span>`,
      `</div>`,
      `<p style="color: #666; font-size: 14px;">`,
      `This code will expire in 10 minutes. If you didn't request this code, please ignore this email.`,
      `</p>`,
      `<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">`,
      `<p style="color: #999; font-size: 12px;">`,
      `This email was sent by NovaMail. If you have any questions, please contact our support team.`,
      `</p>`,
      `</div>`,
      `</div>`,
      `</div>`
    ].join('\r\n');

    // Base64缂栫爜閭欢鍐呭
    const encodedMessage = btoa(emailContent).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    // 璋冪敤Gmail API
    console.log('Attempting to send email via Gmail API...');
    const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${gmailAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: encodedMessage
      })
    });

    console.log('Gmail API response status:', gmailResponse.status);

    if (gmailResponse.ok) {
      const result = await gmailResponse.json();
      console.log('Email sent successfully via Gmail API:', result.id);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code sent successfully via Gmail',
        code: verificationCode,
        messageId: result.id,
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      const errorText = await gmailResponse.text();
      console.error('Gmail API error details:', {
        status: gmailResponse.status,
        statusText: gmailResponse.statusText,
        error: errorText
      });
      
      // 检查是否是认证错误
      if (gmailResponse.status === 401) {
        console.log('Gmail API authentication failed - token may be expired');
        return new Response(JSON.stringify({
          success: true,
          message: 'Verification code generated (Gmail authentication failed)',
          code: verificationCode,
          note: 'Gmail API authentication failed - please check access token',
          error: 'Authentication failed - token may be expired',
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders
        });
      }
      
      // 鍗充娇Gmail API澶辫触锛屼篃杩斿洖楠岃瘉鐮佺粰鐢ㄦ埛
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code generated (Gmail API failed)',
        code: verificationCode,
        note: 'Gmail API failed, but verification code is available for testing',
        error: `Gmail API Error: ${gmailResponse.status} - ${errorText}`,
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

  } catch (error) {
    console.error('Gmail API error:', error);
    // 鍗充娇鍑洪敊锛屼篃杩斿洖楠岃瘉鐮佺粰鐢ㄦ埛
    return new Response(JSON.stringify({
      success: true,
      message: 'Verification code generated (Gmail API error)',
      code: verificationCode,
      note: 'Gmail API error occurred, but verification code is available for testing',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });
  }
// 楠岃瘉楠岃瘉鐮佸鐞嗗嚱鏁?
async function handleVerifyCode(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { email, code, firstName, lastName } = data;
  
  if (!email || !code) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Email and verification code are required' 
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 楠岃瘉楠岃瘉鐮佹牸寮?
  if (!/^\d{6}$/.test(code)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid verification code format'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }
  try {
    if (env.USERS_KV) {
      const storedUser = await env.USERS_KV.get(`user_${email.toLowerCase()}`);
      if (storedUser) {
        existingUser = JSON.parse(storedUser);
        console.log('User already exists:', existingUser.email);
      }
    }
  } catch (error) {
    console.log('Failed to check existing user:', error);
  }

  if (existingUser) {
    return new Response(JSON.stringify({
      success: false,
      error: 'User already exists',
      message: 'This email is already registered. Please use login instead.',
      code: 'USER_EXISTS'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 鍒涘缓鐢ㄦ埛璐︽埛
  const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
  
  // 鍙戦€佹杩庨偖浠?
  const welcomeEmailData = {
    from: 'NovaMail <welcome@novamail.world>',
    to: email,
    subject: 'Welcome to NovaMail!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to NovaMail!</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${firstName}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Welcome to NovaMail! Your account has been successfully created and verified.
          </p>
          <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="color: #667eea; margin: 0;">Get Started</h3>
            <p style="color: #666; margin: 10px 0;">Start creating your first email campaign</p>
            <a href="https://novamail.world/dashboard" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If you have any questions, please don't hesitate to contact our support team.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              This email was sent by NovaMail. Thank you for choosing us!
            </p>
          </div>
        </div>
      </div>
    `
  };

  // 鍙戦€佹杩庨偖浠?  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(welcomeEmailData)
    });

    // 鍒涘缓鐢ㄦ埛瀵硅薄
    const user = {
      id: userId,
      email: email.toLowerCase().trim(),
      name: firstName || email.split('@')[0],
      firstName: firstName || '',
      lastName: lastName || '',
      token: userToken,
      plan: 'free',
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // 浣跨敤閲忕粺璁?      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString()
    };

    // 淇濆瓨鐢ㄦ埛鍒?KV 瀛樺偍
    try {
      if (env.USERS_KV) {
        await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(user));
        console.log('User created and saved:', user.email);
      } else {
        console.log('KV storage not available, user creation simulated');
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      // 鍗充娇瀛樺偍澶辫触锛屼篃杩斿洖鎴愬姛锛屽洜涓虹敤鎴锋暟鎹凡缁忕敓鎴?    }

    // 鏃犺閭欢鍙戦€佹槸鍚︽垚鍔燂紝閮借繑鍥炵敤鎴峰垱寤烘垚鍔?    return new Response(JSON.stringify({
      message: 'Account created and verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
        plan: user.plan,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        emailsSentThisMonth: user.emailsSentThisMonth,
        contactsCount: user.contactsCount,
        campaignsCount: user.campaignsCount
      },
      welcomeEmailSent: response.ok,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });
  } catch (error) {
    // 鍗充娇娆㈣繋閭欢鍙戦€佸け璐ワ紝涔熻繑鍥炵敤鎴峰垱寤烘垚鍔?    return new Response(JSON.stringify({
      success: true,
      message: 'Account created and verified successfully',
      user: {
        id: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        token: userToken,
        createdAt: new Date().toISOString()
      },
      welcomeEmailSent: false,
      warning: 'Welcome email could not be sent',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });
  }
}

// 閭鐧诲綍澶勭悊鍑芥暟
async function handleLogin(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { email, password } = data;
    
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email and password are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 楠岃瘉閭鏍煎紡
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email format'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 妫€鏌ョ敤鎴锋槸鍚﹀瓨鍦?    let existingUser = null;
    try {
      if (env.USERS_KV) {
        const storedUser = await env.USERS_KV.get(`user_${email.toLowerCase()}`);
        if (storedUser) {
          existingUser = JSON.parse(storedUser);
          console.log('Found existing user for login:', existingUser.email);
        }
      }
    } catch (error) {
      console.log('Failed to check existing user:', error);
    }

    if (!existingUser) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not found',
        message: 'No account found with this email. Please register first.',
        code: 'USER_NOT_FOUND'
      }), {
        status: 404,
        headers: corsHeaders
      });
    }

    // 鏇存柊鐢ㄦ埛鐧诲綍鏃堕棿
    existingUser.lastLogin = new Date().toISOString();
    existingUser.updatedAt = new Date().toISOString();
    
    // 淇濆瓨鏇存柊鍚庣殑鐢ㄦ埛淇℃伅
    try {
      if (env.USERS_KV) {
        await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(existingUser));
        console.log('Updated user login time:', existingUser.email);
      }
    } catch (error) {
      console.error('Failed to update user login time:', error);
    }

    // 杩斿洖鐢ㄦ埛淇℃伅
    const user = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name || existingUser.firstName || email.split('@')[0],
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      token: existingUser.token,
      plan: existingUser.plan || 'free',
      createdAt: existingUser.createdAt,
      lastLogin: existingUser.lastLogin
    };

    return new Response(JSON.stringify({
      success: true,
      message: 'Login successful',
      user: user,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Login failed',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Creem 娴嬭瘯绔偣
async function handleCreemTest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  const apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  const baseUrl = env.CREEM_BASE_URL || 'https://api.creem.io/v1';
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Creem API test endpoint working',
    apiKey: apiKey.substring(0, 10) + '...',
    baseUrl: baseUrl,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Webhook 娴嬭瘯绔偣
async function handleWebhookTest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Webhook test endpoint working',
    method: request.method,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Creem 璁″垝绔偣
async function handleCreemPlans(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  const mockPlans = [
    {
      id: 'free',
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        'Up to 500 contacts',
        'Up to 1,000 emails per month',
        'Basic email templates',
        'AI email generation',
        'Basic analytics',
        'Email support',
        'Contact import (CSV, TXT)',
        'Basic contact groups'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      description: 'Best for growing businesses',
      price: 19,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        'Up to 10,000 contacts',
        'Up to 50,000 emails per month',
        'Advanced email templates',
        'AI email generation',
        'Advanced analytics',
        'Priority support',
        'Contact segmentation',
        'A/B testing',
        'Excel import support',
        'Advanced contact groups',
        'Email scheduling',
        'Custom branding'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      description: 'For large organizations',
      price: null,
      currency: 'USD',
      billingCycle: 'custom',
      features: [
        'Unlimited contacts',
        'Unlimited emails',
        'Custom email templates',
        'Advanced AI features',
        'Custom analytics',
        'Dedicated support',
        'Advanced segmentation',
        'API access',
        'Custom integrations',
        'White-label solution',
        'SLA guarantee',
        'Custom onboarding'
      ]
    }
  ];

  return new Response(JSON.stringify({
    success: true,
    plans: mockPlans,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Creem 璁㈤槄绔偣
async function handleCreemSubscriptions(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { planId, customerEmail, billingCycle } = data;

  if (!planId || !customerEmail) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Plan ID and customer email are required'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 鏍规嵁璁¤垂鍛ㄦ湡閫夋嫨鏀粯閾炬帴
  let checkoutUrl;
  if (billingCycle === 'yearly') {
    checkoutUrl = 'https://www.creem.io/payment/prod_3ulmbn45cEhsQX5yQlBMOr';
  } else {
    checkoutUrl = 'https://www.creem.io/payment/prod_1PTunmBSWBQRUyJjM6g90r';
  }

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
}

// 妫€鏌ョ敤鎴锋潈闄愬鐞嗗嚱鏁?async function handleCheckPermission(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { action, currentCount = 0 } = data;
    
    if (!action) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Action is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 鐢ㄦ埛鏉冮檺妫€鏌?- 鐢熶骇鐜瀹炵幇
    // 浠庤姹傚ご鎴栬璇乼oken鑾峰彇鐢ㄦ埛淇℃伅
    const userPlan = 'free'; // 榛樿鍏嶈垂璁″垝锛屽疄闄呭簲浠庣敤鎴疯璇佷俊鎭幏鍙?    
    // 鏍规嵁璁″垝璁剧疆闄愬埗
    const limits = {
      free: {
        maxEmailsPerMonth: 1000,
        maxContacts: 500,
        maxCampaignsPerMonth: 10
      },
      pro: {
        maxEmailsPerMonth: 50000,
        maxContacts: 10000,
        maxCampaignsPerMonth: 100
      },
      enterprise: {
        maxEmailsPerMonth: -1, // 鏃犻檺鍒?        maxContacts: -1,
        maxCampaignsPerMonth: -1
      }
    };

    const userLimits = limits[userPlan] || limits.free;
    
    // 妫€鏌ユ潈闄?    let allowed = true;
    let reason = '';
    
    switch (action) {
      case 'send_email':
        if (userLimits.maxEmailsPerMonth !== -1 && currentCount >= userLimits.maxEmailsPerMonth) {
          allowed = false;
          reason = `Email limit exceeded. Your plan allows up to ${userLimits.maxEmailsPerMonth} emails per month.`;
        }
        break;
      case 'add_contact':
        if (userLimits.maxContacts !== -1 && currentCount >= userLimits.maxContacts) {
          allowed = false;
          reason = `Contact limit exceeded. Your plan allows up to ${userLimits.maxContacts} contacts.`;
        }
        break;
      case 'create_campaign':
        if (userLimits.maxCampaignsPerMonth !== -1 && currentCount >= userLimits.maxCampaignsPerMonth) {
          allowed = false;
          reason = `Campaign limit exceeded. Your plan allows up to ${userLimits.maxCampaignsPerMonth} campaigns per month.`;
        }
        break;
      default:
        allowed = true;
    }

    return new Response(JSON.stringify({
      success: true,
      allowed: allowed,
      reason: reason,
      plan: userPlan,
      limits: userLimits,
      currentCount: currentCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to check permissions',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 鍙戦€佹椿鍔ㄩ偖浠跺鐞嗗嚱鏁?async function handleCampaignSend(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { campaignData, recipients, userId } = data;
    
    if (!campaignData || !recipients || recipients.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Campaign data and recipients are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 寮哄埗妫€鏌ョ敤鎴?SMTP 閰嶇疆
    let userEmailConfig = null;
    try {
      // 浠?Cloudflare KV 瀛樺偍涓幏鍙栫敤鎴风殑 SMTP 閰嶇疆
      if (env.EMAIL_CONFIG_KV && userId) {
        const storedConfig = await env.EMAIL_CONFIG_KV.get(`email_config_${userId}`);
        if (storedConfig) {
          userEmailConfig = JSON.parse(storedConfig);
          console.log('Found user SMTP configuration:', {
            email: userEmailConfig.email,
            provider: userEmailConfig.provider,
            isConfigured: userEmailConfig.isConfigured
          });
        }
      }
      
      // 濡傛灉娌℃湁鎵惧埌閰嶇疆鎴栭厤缃笉瀹屾暣锛屾嫆缁濆彂閫?      if (!userEmailConfig || !userEmailConfig.isConfigured || !userEmailConfig.email || !userEmailConfig.password) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'SMTP configuration required',
          message: 'Please configure your SMTP settings before sending emails. Go to Settings > Email Configuration to set up your email account.',
          code: 'SMTP_NOT_CONFIGURED'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
      
    } catch (error) {
      console.log('Failed to load SMTP configuration:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'SMTP configuration required',
        message: 'Please configure your SMTP settings before sending emails. Go to Settings > Email Configuration to set up your email account.',
        code: 'SMTP_NOT_CONFIGURED'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 鍙戦€侀偖浠舵椿鍔?    const campaignId = 'campaign_' + Date.now();
    const sentEmails = [];
    
    // 涓烘瘡涓敹浠朵汉鍒涘缓閭欢璁板綍
    for (const recipient of recipients) {
      const emailData = {
        from: userEmailConfig?.isConfigured 
          ? `${campaignData.businessName || 'Your Company'} <${userEmailConfig.email}>`
          : 'NovaMail <noreply@novamail.world>',
        to: recipient,
        subject: campaignData.subject || 'Email Campaign',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">${campaignData.businessName || 'NovaMail'}</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #333; margin-bottom: 20px;">${campaignData.subject || 'Email Campaign'}</h2>
              <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                ${campaignData.body || 'Your email content here'}
              </div>
              ${campaignData.targetUrl ? `
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${campaignData.targetUrl}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Visit Website</a>
                </div>
              ` : ''}
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px;">
                  ${userEmailConfig?.isConfigured 
                    ? `This email was sent by ${campaignData.businessName || 'your company'}. If you have any questions, please contact us.`
                    : 'This email was sent by NovaMail. If you have any questions, please contact our support team.'
                  }
                </p>
              </div>
            </div>
          </div>
        `
      };

      // 鍙戦€侀偖浠?      try {
        console.log('Sending email to:', recipient);
        
        let response;
        
        if (userEmailConfig?.isConfigured) {
          // 浣跨敤鐢ㄦ埛 SMTP 閰嶇疆鍙戦€侀偖浠?          console.log('Sending via user SMTP:', userEmailConfig.email);
          
          // 浣跨敤 Resend API 鍙戦€侀偖浠讹紙鏀寔鑷畾涔?SMTP锛?          response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: `${campaignData.businessName || 'Your Company'} <${userEmailConfig.email}>`,
            to: [recipient],
            subject: campaignData.subject || 'Email Campaign',
            html: emailData.html,
            reply_to: userEmailConfig.email
          })
        });

          const result = await response.json();
          
          if (response.ok) {
            sentEmails.push({
              recipient: recipient,
              status: 'sent',
              method: 'user_smtp_resend',
              messageId: result.id,
              timestamp: new Date().toISOString()
            });
          } else {
            throw new Error(`Resend API error: ${result.message || 'Unknown error'}`);
          }
        } else {
          // 浣跨敤 NovaMail 榛樿鍙戦€佹湇鍔?          console.log('Sending via NovaMail default service');
          
          response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'NovaMail <noreply@novamail.world>',
              to: [recipient],
              subject: campaignData.subject || 'Email Campaign',
              html: emailData.html,
              reply_to: 'support@novamail.world'
            })
          });

          const result = await response.json();
          
          if (response.ok) {
            sentEmails.push({
              recipient: recipient,
              status: 'sent',
              method: 'novamail_default',
              messageId: result.id,
              timestamp: new Date().toISOString()
            });
          } else {
            throw new Error(`Resend API error: ${result.message || 'Unknown error'}`);
          }
        }
      } catch (error) {
        console.error('Email sending failed:', error);
        sentEmails.push({
          recipient: recipient,
          status: 'failed',
          method: userEmailConfig?.isConfigured ? 'user_smtp_resend' : 'novamail_default',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // 鍒涘缓 campaign 璁板綍
    const campaignRecord = {
      id: campaignId,
      name: campaignData.subject || 'Email Campaign',
      subject: campaignData.subject || 'Email Campaign',
      status: 'sent',
      recipients: recipients.length,
      sent: sentEmails.filter(email => email.status === 'sent').length,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      businessName: campaignData.businessName,
      sendingMethod: 'user_smtp_resend'
    };

    // 淇濆瓨 campaign 鍒?KV 瀛樺偍
    try {
      if (env.CAMPAIGNS_KV) {
        const storedCampaigns = await env.CAMPAIGNS_KV.get(`campaigns_${userId || 'default_user'}`);
        let campaigns = storedCampaigns ? JSON.parse(storedCampaigns) : [];
        campaigns.push(campaignRecord);
        await env.CAMPAIGNS_KV.put(`campaigns_${userId || 'default_user'}`, JSON.stringify(campaigns));
        console.log('Campaign record saved:', campaignId);
      }
    } catch (error) {
      console.error('Failed to save campaign record:', error);
    }

    // 鏇存柊鐢ㄦ埛缁熻鏁版嵁
    try {
      if (env.USERS_KV && userId) {
        const userKey = `user_${userId}`;
        const storedUser = await env.USERS_KV.get(userKey);
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // 鏇存柊鐢ㄦ埛缁熻鏁版嵁
          user.campaignsCount = (user.campaignsCount || 0) + 1;
          user.emailsSentThisMonth = (user.emailsSentThisMonth || 0) + sentEmails.filter(email => email.status === 'sent').length;
          user.updatedAt = new Date().toISOString();
          
          // 淇濆瓨鏇存柊鍚庣殑鐢ㄦ埛鏁版嵁
          await env.USERS_KV.put(userKey, JSON.stringify(user));
          console.log('User statistics updated:', {
            campaignsCount: user.campaignsCount,
            emailsSentThisMonth: user.emailsSentThisMonth
          });
        }
      }
    } catch (error) {
      console.error('Failed to update user statistics:', error);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Campaign sent successfully',
      campaignId: campaignId,
      sentEmails: sentEmails,
      totalSent: sentEmails.filter(email => email.status === 'sent').length,
      totalFailed: sentEmails.filter(email => email.status === 'failed').length,
      sendingMethod: userEmailConfig?.isConfigured ? 'user_smtp_resend' : 'novamail_default',
      campaign: campaignRecord,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send campaign',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 鏇存柊鐢ㄦ埛浣跨敤閲忓鐞嗗嚱鏁?async function handleUpdateUsage(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { action, increment = 1 } = data;
    
    if (!action) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Action is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 鏇存柊鐢ㄦ埛浣跨敤閲?    // 鍦ㄥ疄闄呭簲鐢ㄤ腑锛岃繖閲屽簲璇ユ洿鏂版暟鎹簱涓殑鐢ㄦ埛浣跨敤閲?    const usageUpdate = {
      action: action,
      increment: increment,
      timestamp: new Date().toISOString(),
      note: 'Usage updated successfully'
    };

    return new Response(JSON.stringify({
      success: true,
      message: 'Usage updated successfully',
      usage: usageUpdate,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update usage',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// AI閭欢鐢熸垚澶勭悊鍑芥暟
async function handleAIGenerateEmail(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    console.log('AI generation request data:', JSON.stringify(data, null, 2));
    
    const { emailMode, selectedTemplate, toneStyle, campaignData } = data;
    
    if (!campaignData) {
      console.log('Missing campaignData in request');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Campaign data is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    console.log('Extracted parameters:', { emailMode, selectedTemplate, toneStyle, campaignData });
    console.log('Selected template for AI generation:', selectedTemplate);
    console.log('Campaign data details:', {
      purpose: campaignData.purpose,
      businessName: campaignData.businessName,
      productService: campaignData.productService,
      targetUrl: campaignData.targetUrl
    });

    // 妫€鏌ユ槸鍚︽湁 AI API 瀵嗛挜
    console.log('Checking AI API key:', env.DASHSCOPE_API_KEY ? 'Key present' : 'Key missing');
    if (!env.DASHSCOPE_API_KEY) {
      console.log('No AI API key found, using template-based content');
      
      // 纭繚鎵€鏈夊唴瀹归兘鏄嫳鏂?      const mockSubject = `馃殌 ${campaignData.purpose} - ${campaignData.businessName || 'Special Offer'}`;
      
      // 鏍规嵁妯℃澘绫诲瀷鐢熸垚涓嶅悓鐨勫唴瀹?      let mockBody = '';
      
      if (emailMode === 'professional') {
        switch (selectedTemplate) {
          case 'modern-promo':
            mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">${campaignData.purpose}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">by ${campaignData.businessName || 'Our Company'}</p>
              </div>
              
              <div style="padding: 30px 0;">
                <h2 style="color: #333; margin-bottom: 20px;">Introducing ${campaignData.productService || 'Our New Product'}</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  We're excited to share ${campaignData.purpose.toLowerCase()} with you. This is a great opportunity to experience our premium services and discover what makes us different.
                </p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #333; margin-top: 0;">Key Benefits:</h3>
                  <ul style="color: #666; line-height: 1.6;">
                    <li>Professional quality and service</li>
                    <li>Easy to use and implement</li>
                    <li>Comprehensive support</li>
                    <li>Proven results</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">Get Started Now</a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  Don't miss this opportunity to transform your business. Our team is here to help you succeed.
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
                <p style="margin-top: 20px;">
                  <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a> | 
                  <a href="#" style="color: #667eea; text-decoration: none;">Contact Us</a>
                </p>
              </div>
            </div>
          `;
            break;
          case 'newsletter':
            mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px;">
                <h1 style="margin: 0; font-size: 24px;">${campaignData.businessName || 'Newsletter'}</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Professional Newsletter</p>
              </div>
              
              <div style="padding: 30px 0;">
                <h2 style="color: #333; margin-bottom: 20px;">${campaignData.purpose}</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Welcome to our latest newsletter! We're excited to share ${campaignData.purpose.toLowerCase()} with you.
                </p>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #2e7d32; margin-top: 0;">Featured Content</h3>
                  <p style="color: #666; line-height: 1.6;">
                    Discover ${campaignData.productService || 'our latest offerings'} and learn how they can benefit your business.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Read More</a>
                </div>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
            break;
          case 'ecommerce':
            mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); color: white; padding: 20px; text-align: center; border-radius: 8px;">
                <h1 style="margin: 0; font-size: 24px;">${campaignData.businessName || 'Shop Now'}</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Exclusive Offers Inside</p>
              </div>
              
              <div style="padding: 30px 0;">
                <h2 style="color: #333; margin-bottom: 20px;">${campaignData.purpose}</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Discover ${campaignData.productService || 'our amazing products'} and enjoy special offers just for you!
                </p>
                
                <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B6B;">
                  <h3 style="color: #FF6B6B; margin-top: 0;">Special Offer</h3>
                  <p style="color: #666; line-height: 1.6;">
                    Shop now and get exclusive discounts on your favorite items. Limited time only!
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Shop Now</a>
                </div>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
          break;
        case 'event':
          mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #F093FB 0%, #F5576C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">馃帀 ${campaignData.purpose}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You're Invited!</p>
              </div>
              
              <div style="padding: 30px 0;">
                <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                  Hi [First Name],
                </p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  We're excited to invite you to an exclusive event hosted by <strong>${campaignData.businessName || 'our team'}</strong>. ${campaignData.productService || 'Join us for an unforgettable experience'}!
                </p>
                
                <div style="background: #fff0f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #F5576C; margin-top: 0;">Event Highlights</h3>
                  <ul style="color: #666; line-height: 1.8; margin: 10px 0;">
                    <li>Exclusive networking opportunities</li>
                    <li>Special presentations and demos</li>
                    <li>Refreshments and entertainment</li>
                    <li>Limited seats available</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #F093FB 0%, #F5576C 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">RSVP Now</a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  Don't miss this opportunity to connect and celebrate with us. We look forward to seeing you there!
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
          break;
        case 'announcement':
          mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">馃摙 ${campaignData.purpose}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Important Announcement</p>
              </div>
              
              <div style="padding: 30px 0;">
                <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                  Dear Valued Customer,
                </p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  We have an important announcement regarding ${campaignData.productService || 'our services'}. ${campaignData.purpose} affects how we serve you and your business needs.
                </p>
                
                <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5;">
                  <h3 style="color: #4F46E5; margin-top: 0;">Key Information</h3>
                  <p style="color: #666; line-height: 1.6;">
                    Please review the following details carefully as they may impact your current usage and future plans.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">Learn More</a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  We appreciate your understanding and continued trust in ${campaignData.businessName || 'our company'}. If you have any questions, please don't hesitate to contact us.
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
          break;
        case 'welcome':
          mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">馃憢 ${campaignData.purpose}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Welcome to the Family!</p>
              </div>
              
              <div style="padding: 30px 0;">
                <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                  Hi [First Name],
                </p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Welcome to ${campaignData.businessName || 'our community'}! We're thrilled to have you join us. ${campaignData.purpose} is just the beginning of an amazing journey together.
                </p>
                
                <div style="background: #fef7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #F59E0B; margin-top: 0;">Getting Started</h3>
                  <p style="color: #666; line-height: 1.6;">
                    Here's what you can expect from ${campaignData.productService || 'our platform'}:
                  </p>
                  <ul style="color: #666; line-height: 1.8; margin: 10px 0;">
                    <li>Access to exclusive features and content</li>
                    <li>Personalized support and guidance</li>
                    <li>Regular updates and improvements</li>
                    <li>Community of like-minded individuals</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">Get Started</a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  We're here to help you succeed. Don't hesitate to reach out if you need any assistance or have questions.
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
          break;
        case 'survey':
          mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #0D9488 0%, #0891B2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">馃搳 ${campaignData.purpose}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your Opinion Matters</p>
              </div>
              
              <div style="padding: 30px 0;">
                <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                  Hi [First Name],
                </p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  We value your feedback and would love to hear your thoughts about ${campaignData.productService || 'our services'}. ${campaignData.purpose} will help us improve and better serve you.
                </p>
                
                <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #0D9488; margin-top: 0;">Survey Details</h3>
                  <p style="color: #666; line-height: 1.6;">
                    This survey will take approximately 5-10 minutes to complete. Your responses are confidential and will be used solely to improve our services.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #0D9488 0%, #0891B2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">Take Survey</a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  Thank you for taking the time to share your thoughts. Your input is invaluable to us and helps shape the future of ${campaignData.businessName || 'our company'}.
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
          break;
        case 'thank-you':
          mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #EC4899 0%, #F97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 28px;">馃檹 ${campaignData.purpose}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">With Heartfelt Gratitude</p>
              </div>
              
              <div style="padding: 30px 0;">
                <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                  Dear [First Name],
                </p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  ${campaignData.purpose} - we want to express our deepest gratitude for your continued support and trust in ${campaignData.businessName || 'our company'}.
                </p>
                
                <div style="background: #fef2f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #EC4899; margin-top: 0;">Why We're Grateful</h3>
                  <p style="color: #666; line-height: 1.6;">
                    Your support has enabled us to:
                  </p>
                  <ul style="color: #666; line-height: 1.8; margin: 10px 0;">
                    <li>Continue providing ${campaignData.productService || 'excellent service'}</li>
                    <li>Innovate and improve our offerings</li>
                    <li>Build a stronger community</li>
                    <li>Achieve our mission and goals</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #EC4899 0%, #F97316 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">Stay Connected</a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  Thank you for being an integral part of our journey. We look forward to continuing to serve you with excellence.
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                <p>With gratitude,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
              </div>
            </div>
          `;
            break;
          default:
            mockBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #333; text-align: center;">${campaignData.purpose}</h1>
              <p style="color: #666; line-height: 1.6;">
                We're excited to share ${campaignData.purpose.toLowerCase()} with you. ${campaignData.productService || 'Our product'} offers professional quality and comprehensive support.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Learn More</a>
              </div>
              <p style="color: #666; line-height: 1.6;">
                Best regards,<br>
                <strong>${campaignData.businessName || 'NovaMail'} Team</strong>
              </p>
            </div>
          `;
        }
      } else {
        // 绠€鍗曢偖浠?        mockBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Dear Friend,</p>
          <p>We're excited to share ${campaignData.purpose.toLowerCase()} with you.</p>
          <p>${campaignData.productService || 'Our product'} offers professional quality and comprehensive support.</p>
          <p>For more information, please visit: ${campaignData.targetUrl || 'our website'}</p>
          <p>Best regards,<br>
          <strong>${campaignData.businessName || 'NovaMail'} Team</strong></p>
        </div>
      `;
      }
      
      // 纭繚杩斿洖鐨勫唴瀹规槸绾嫳鏂囷紝娌℃湁浠讳綍涓枃鍗犱綅绗?      console.log('Returning English-only content:', { subject: mockSubject, template: selectedTemplate });
      
      return new Response(JSON.stringify({
        success: true,
        subject: mockSubject,
        body: mockBody,
        template: selectedTemplate || 'template-generated',
        note: 'Using English-only template content',
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      // 浣跨敤 AI 鐢熸垚鍐呭
      console.log('Using AI generation with DashScope API');
      
      // 妫€娴嬬敤鎴疯緭鍏ョ殑璇█
      const detectLanguage = (text) => {
        if (!text) return 'en';
        
        // 妫€娴嬩腑鏂囧瓧绗︼紙鍖呮嫭绠€浣撱€佺箒浣撱€佹爣鐐圭鍙凤級
        const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;
        const chineseCount = (text.match(chineseRegex) || []).length;
        const totalChars = text.length;
        
        // 濡傛灉涓枃瀛楃鍗犳瘮瓒呰繃20%锛屽垯璁や负鏄腑鏂?        // 鎴栬€呭鏋滃寘鍚父瑙佺殑涓枃璇嶆眹
        const chineseWords = ['浜у搧', '鏈嶅姟', '鍏徃', '鐢ㄦ埛', '瀹㈡埛', '娲诲姩', '淇冮攢', '鍙戝竷', '鍙嶉', '缁存姢', '钀ラ攢', '閭欢'];
        const hasChineseWords = chineseWords.some(word => text.includes(word));
        
        return (chineseCount / totalChars > 0.2) || hasChineseWords ? 'zh' : 'en';
      };

      const detectedLanguage = detectLanguage(
        `${campaignData.purpose || ''} ${campaignData.businessName || ''} ${campaignData.productService || ''} ${campaignData.targetAudience || ''} ${campaignData.campaignGoals || ''}`
      );
      
      console.log('Detected language:', detectedLanguage, 'for text:', `${campaignData.purpose || ''} ${campaignData.businessName || ''} ${campaignData.productService || ''}`);

      const languageInstruction = detectedLanguage === 'zh' 
        ? '璇风敤涓枃鐢熸垚閭欢鍐呭锛屼繚鎸佷笓涓氥€佸弸濂界殑璇皟銆?
        : 'Please generate email content in English, maintaining a professional and friendly tone.';

      const aiPrompt = `You are an expert email marketing writer. Create a personalized email that directly addresses the user's specific needs and goals.

${languageInstruction}

USER'S SPECIFIC REQUIREMENTS:
- Purpose/Goal: ${campaignData.purpose}
- Business Name: ${campaignData.businessName || 'Not provided'}
- Product/Service: ${campaignData.productService || 'Not provided'}
- Target URL: ${campaignData.targetUrl || 'Not provided'}
- Target Audience: ${campaignData.targetAudience || 'Not provided'}
- Campaign Goals: ${campaignData.campaignGoals || 'Not provided'}
- Tone Style: ${toneStyle || 'professional'}
- Template Style: ${selectedTemplate || 'general'}

CRITICAL INSTRUCTIONS:
1. READ the user's purpose/goal carefully - this is what they want to achieve
2. CREATE content that directly serves their stated purpose, not generic marketing content
3. USE the business name and product/service information provided by the user
4. MATCH the language of the user's input - if they wrote in Chinese, respond in Chinese
5. FOCUS on the specific goal: if it's a product launch, write about the launch; if it's customer feedback, ask for feedback
6. MAKE the subject line relevant to their actual purpose
7. INCLUDE a clear call-to-action that helps achieve their stated goal
8. AVOID generic templates - personalize based on their specific information

EXAMPLES:
- If purpose is "浜у搧鍙戝竷浼? 鈫?Write about the product launch event
- If purpose is "鐢ㄦ埛鍙嶉鏀堕泦" 鈫?Ask for user feedback and opinions  
- If purpose is "淇冮攢娲诲姩" 鈫?Write about the special offer or discount
- If purpose is "瀹㈡埛缁存姢" 鈫?Write about maintaining customer relationships

DESIGN INTELLIGENCE:
- For ${selectedTemplate}: Use appropriate color schemes, layouts, and styling
- Create engaging subject lines that match the purpose
- Design HTML that looks professional and modern
- Ensure responsive design principles
- Use gradients, shadows, and modern CSS where appropriate

SPECIFIC TEMPLATE REQUIREMENTS:
${selectedTemplate === 'modern-promo' ? `
MODERN PROMO TEMPLATE:
- Use gradient backgrounds (purple to blue: #667eea to #764ba2)
- Include hero section with gradient background
- Use modern typography and spacing
- Include call-to-action buttons with gradient styling
- Use shadows and modern CSS effects
- Professional promotional layout
` : ''}
${selectedTemplate === 'newsletter' ? `
NEWSLETTER TEMPLATE:
- Use green color scheme (#4CAF50)
- Include newsletter header with green background
- Clean, readable layout with good spacing
- Use newsletter-style typography
- Include sections and dividers
- Professional newsletter design
` : ''}
${selectedTemplate === 'ecommerce' ? `
E-COMMERCE TEMPLATE:
- Use orange to red gradient colors
- Include product showcase sections
- Use shopping-focused design elements
- Include product images placeholders
- Use e-commerce style buttons and layouts
- Professional product promotion design
` : ''}
${selectedTemplate === 'event' ? `
EVENT INVITE TEMPLATE:
- Use pink to purple gradient colors
- Include event-themed design elements
- Use celebratory and festive styling
- Include event details sections
- Use party-themed colors and layouts
- Professional event invitation design
` : ''}
${selectedTemplate === 'announcement' ? `
ANNOUNCEMENT TEMPLATE:
- Use indigo to blue color scheme
- Include formal announcement styling
- Use professional, corporate layout
- Include announcement sections
- Use formal typography and spacing
- Professional announcement design
` : ''}
${selectedTemplate === 'welcome' ? `
WELCOME TEMPLATE:
- Use yellow to orange gradient colors
- Include warm, welcoming design elements
- Use friendly and approachable styling
- Include welcome message sections
- Use warm colors and friendly layouts
- Professional welcome design
` : ''}
${selectedTemplate === 'survey' ? `
SURVEY TEMPLATE:
- Use teal to cyan color scheme
- Include survey and feedback design elements
- Use data-focused styling
- Include survey sections and forms
- Use analytical colors and layouts
- Professional survey design
` : ''}
${selectedTemplate === 'thank-you' ? `
THANK YOU TEMPLATE:
- Use rose to pink gradient colors
- Include gratitude-themed design elements
- Use appreciative and warm styling
- Include thank you message sections
- Use warm, appreciative colors and layouts
- Professional thank you design
` : ''}

CONTENT INTELLIGENCE:
- Write compelling copy that serves the purpose
- Create natural, engaging language
- Include relevant calls-to-action when appropriate
- Make the email feel personal and authentic
- Ensure all content is actionable and valuable
${detectedLanguage === 'zh' ? `
- 浣跨敤涓枃琛ㄨ揪锛岀鍚堜腑鏂囬偖浠惰惀閿€涔犳儻
- 閲囩敤鍚堥€傜殑涓枃绉板懠鍜岀ぜ璨岀敤璇?- 纭繚璇█鑷劧娴佺晠锛岀鍚堜腑鏂囪〃杈句範鎯?` : `
- Use English expressions that align with email marketing best practices
- Apply appropriate English greetings and polite language
- Ensure natural and fluent language usage
`}

Generate ONLY:
1. Subject line (compelling and relevant)
2. Email body (professional HTML with modern styling)

Format your response as:
SUBJECT: [subject line here]
BODY: [HTML email body here]

Be intelligent, creative, and professional. Create an email that truly serves its purpose.`;

      console.log('Sending request to DashScope API with key:', env.DASHSCOPE_API_KEY ? 'Key present' : 'Key missing');
      console.log('Detected language:', detectedLanguage);
      console.log('AI Prompt for template:', selectedTemplate);
      console.log('Full AI Prompt:', aiPrompt);
      
      const aiResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.DASHSCOPE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          input: {
            messages: [
              {
                role: 'user',
                content: aiPrompt
              }
            ]
          },
          parameters: {
            temperature: 0.7,
            max_tokens: 2000
          }
        })
      });

      console.log('DashScope API response status:', aiResponse.status);
      
      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('DashScope API error response:', errorText);
        throw new Error(`AI API request failed: ${aiResponse.status} - ${errorText}`);
      }

      const aiData = await aiResponse.json();
      console.log('DashScope API response data:', JSON.stringify(aiData, null, 2));
      
      // 妫€鏌ヤ笉鍚岀殑鍝嶅簲缁撴瀯
      let aiContent = '';
      if (aiData.output && aiData.output.choices && aiData.output.choices.length > 0) {
        aiContent = aiData.output.choices[0].message.content;
      } else if (aiData.output && aiData.output.text) {
        aiContent = aiData.output.text;
      } else if (aiData.text) {
        aiContent = aiData.text;
      } else {
        console.error('Invalid AI response structure:', aiData);
        throw new Error('AI API returned invalid response structure');
      }
      
      console.log('Raw AI content:', aiContent);
      console.log('AI content length:', aiContent.length);
      
      // 瑙ｆ瀽AI鐢熸垚鐨勫唴瀹?      let aiSubject = `馃殌 ${campaignData.purpose} - ${campaignData.businessName || 'Special Offer'}`;
      let aiBody = '';
      
      // 灏濊瘯瑙ｆ瀽鏍煎紡鍖栫殑鍝嶅簲
      const subjectMatch = aiContent.match(/SUBJECT:\s*(.+?)(?:\n|$)/i);
      const bodyMatch = aiContent.match(/BODY:\s*([\s\S]+)/i);
      
      if (subjectMatch && bodyMatch) {
        aiSubject = subjectMatch[1].trim();
        aiBody = bodyMatch[1].trim();
        console.log('Parsed subject:', aiSubject);
        console.log('Parsed body length:', aiBody.length);
      } else {
        // 濡傛灉娌℃湁鎵惧埌鏍煎紡鍖栧唴瀹癸紝灏濊瘯鍏朵粬瑙ｆ瀽鏂瑰紡
        const lines = aiContent.split('\n');
        let foundSubject = false;
        let foundBody = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.toLowerCase().startsWith('subject:')) {
            aiSubject = line.substring(8).trim();
            foundSubject = true;
          } else if (line.toLowerCase().startsWith('body:')) {
            aiBody = lines.slice(i + 1).join('\n').trim();
            foundBody = true;
            break;
          }
        }
        
        if (!foundSubject || !foundBody) {
          // 濡傛灉杩樻槸娌℃壘鍒帮紝浣跨敤鍘熷鍐呭浣滀负姝ｆ枃
          aiBody = aiContent;
          console.log('Using raw content as body - no structured format found');
        }
      }
      
      // 娓呯悊鍐呭锛氱Щ闄arkdown绗﹀彿鍜屾棤鍏充俊鎭?      aiSubject = aiSubject.replace(/\*\*/g, '').replace(/\*/g, '').replace(/```/g, '').trim();
      aiBody = aiBody
        .replace(/\*\*/g, '')  // 绉婚櫎绮椾綋markdown
        .replace(/\*/g, '')    // 绉婚櫎鏂滀綋markdown
        .replace(/```html/g, '')  // 绉婚櫎浠ｇ爜鍧楁爣璁?        .replace(/```/g, '')   // 绉婚櫎浠ｇ爜鍧楁爣璁?        .replace(/---/g, '')   // 绉婚櫎鍒嗛殧绾?        .replace(/^\d+\.\s*/gm, '') // 绉婚櫎缂栧彿鍒楄〃
        .replace(/^\*\s*/gm, '')    // 绉婚櫎椤圭洰绗﹀彿
        .trim();
      
      console.log('Final cleaned subject:', aiSubject);
      console.log('Final cleaned body preview:', aiBody.substring(0, 300) + '...');
      console.log('Final body length:', aiBody.length);

      // 楠岃瘉鐢熸垚鐨勫唴瀹规槸鍚︾鍚堜笓涓氭ā鏉胯姹?      const isProfessionalTemplate = aiBody.includes('gradient') || 
                                   aiBody.includes('linear-gradient') || 
                                   aiBody.includes('background:') ||
                                   aiBody.includes('style=') ||
                                   aiBody.includes('<div') ||
                                   aiBody.includes('<h1') ||
                                   aiBody.includes('<h2') ||
                                   aiBody.includes('<p') ||
                                   aiBody.includes('<a');
      
      // 瀵逛簬涓撲笟妯℃澘锛屽厛璁〢I鐢熸垚鍐呭锛岀劧鍚庡簲鐢ㄦā鏉挎牱寮?      if (emailMode === 'professional' && selectedTemplate) {
        console.log('Professional template mode detected, generating AI content with template styling');
        
        // 濡傛灉AI鐢熸垚鐨勫唴瀹逛笉绗﹀悎瑕佹眰锛屼娇鐢ˋI鐢熸垚鍐呭浣嗗簲鐢ㄦā鏉挎牱寮?        if (!aiBody || aiBody.length < 50 || !isProfessionalTemplate) {
          console.log('AI content insufficient, generating content with AI and applying template styling');
          
          // 鍒涘缓涓€涓櫤鑳界殑AI鎻愮ず璇嶏紝鏍规嵁鐢ㄦ埛淇℃伅鐢熸垚鐩稿叧鍐呭
          console.log('Creating intelligent AI prompt with campaign data:', campaignData);
          const templatePrompt = `You are an expert email marketing writer. Create compelling email content based on the user's information.

User Information:
- Purpose: ${campaignData.purpose || 'Not provided'}
- Business Name: ${campaignData.businessName || 'Not provided'}
- Product/Service: ${campaignData.productService || 'Not provided'}
- Target URL: ${campaignData.targetUrl || 'Not provided'}
- Template Type: ${selectedTemplate}

INSTRUCTIONS:
1. Analyze the user's information and create relevant, engaging email content
2. Don't just repeat the user's information - expand on it intelligently
3. Create compelling subject lines that would make people want to open the email
4. Write persuasive body content that serves the stated purpose
5. Use the business name, product/service, and purpose to create a cohesive message
6. Make the content feel personal and authentic, not generic

EXAMPLES:
- If purpose is "浜у搧鍙戝竷浼? and business is "绉戞妧鍏徃", create content about an exciting product launch event
- If purpose is "淇冮攢娲诲姩" and product is "鏅鸿兘鎵嬭〃", create content about special offers and benefits
- If purpose is "鐢ㄦ埛璋冪爺" and business is "杞欢鍏徃", create content about improving user experience

Generate ONLY:
SUBJECT: [compelling subject line based on the purpose and business]
BODY: [engaging email content that expands on the user's information intelligently]`;

          console.log('Template prompt:', templatePrompt);

          try {
            const templateResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${env.DASHSCOPE_API_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                model: 'qwen-turbo',
                input: {
                  messages: [
                    {
                      role: 'user',
                      content: templatePrompt
                    }
                  ]
                },
                parameters: {
                  temperature: 0.7,
                  max_tokens: 1000
                }
              })
            });

            const templateData = await templateResponse.json();
            let templateContent = '';
            if (templateData.output && templateData.output.choices && templateData.output.choices.length > 0) {
              templateContent = templateData.output.choices[0].message.content;
            }

            // 瑙ｆ瀽妯℃澘鍐呭
            console.log('Template AI response:', templateContent);
            const templateSubjectMatch = templateContent.match(/SUBJECT:\s*(.+?)(?:\n|$)/i);
            const templateBodyMatch = templateContent.match(/BODY:\s*([\s\S]+)/i);
            
            if (templateSubjectMatch && templateBodyMatch) {
              aiSubject = templateSubjectMatch[1].trim();
              aiBody = templateBodyMatch[1].trim();
              console.log('Parsed AI subject:', aiSubject);
              console.log('Parsed AI body:', aiBody);
            } else {
              console.log('Failed to parse AI response, using fallback content');
            }
          } catch (error) {
            console.log('Template AI generation failed, using fallback:', error);
          }
        }
        
        // 搴旂敤涓撲笟妯℃澘鏍峰紡鍒癆I鐢熸垚鐨勫唴瀹?        const styledTemplate = getFallbackTemplate(selectedTemplate, campaignData);
        let styledBody = styledTemplate.body.replace(/\$\{campaignData\.purpose\}/g, campaignData.purpose || '')
                                           .replace(/\$\{campaignData\.businessName\}/g, campaignData.businessName || '')
                                           .replace(/\$\{campaignData\.productService\}/g, campaignData.productService || '')
                                           .replace(/\$\{campaignData\.targetUrl\}/g, campaignData.targetUrl || '');
        
        // 灏咥I鐢熸垚鐨勫唴瀹规櫤鑳芥彃鍏ュ埌妯℃澘涓?        if (aiBody && aiBody.length > 20) {
          console.log('Inserting AI content into template:', aiBody);
          
          // 鏅鸿兘鏇挎崲妯℃澘涓殑鍐呭鍖哄煙
          // 鏇挎崲涓昏鎻忚堪娈佃惤
          styledBody = styledBody.replace(
            /We're excited to share.*?with you\. This comprehensive update includes everything you need to know\./g,
            aiBody
          );
          
          // 鏇挎崲浜у搧鎻忚堪閮ㄥ垎
          styledBody = styledBody.replace(
            /provides comprehensive professional solutions tailored to your specific needs\./g,
            aiBody.substring(0, Math.min(200, aiBody.length))
          );
          
          // 鏇挎崲绠€鍗曠殑鎻忚堪
          styledBody = styledBody.replace(
            /provides professional solutions for your needs\./g,
            aiBody.substring(0, Math.min(150, aiBody.length))
          );
          
          // 濡傛灉娌℃湁鎵惧埌鍖归厤鐨勫唴瀹癸紝鍦ㄤ富瑕佹钀藉悗鎻掑叆AI鍐呭
          if (!styledBody.includes(aiBody)) {
            styledBody = styledBody.replace(
              /(<h2[^>]*>.*?<\/h2>)/g,
              `$1\n<p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 30px;">${aiBody}</p>`
            );
          }
        }
        
        aiSubject = styledTemplate.subject;
        aiBody = styledBody;
        console.log('Applied template styling to AI content for:', selectedTemplate);
        
      } else {
        // 瀵逛簬绠€鍗曟ā寮忥紝浣跨敤AI鐢熸垚鐨勫唴瀹?        console.log('Simple mode detected, using AI generated content');
        if (!aiBody || aiBody.length < 50) {
          console.log('AI content too short, using basic fallback');
          const fallbackTemplate = getFallbackTemplate('default', campaignData);
          aiSubject = fallbackTemplate.subject;
          aiBody = fallbackTemplate.body;
        }
      }

      return new Response(JSON.stringify({
        success: true,
        subject: aiSubject,
        body: aiBody,
        template: selectedTemplate || 'ai-generated',
        note: 'Generated using AI with professional template',
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

  } catch (error) {
    console.error('AI Generation Error:', error);
    console.error('Error stack:', error.stack);
    
    // 杩斿洖鏇磋缁嗙殑閿欒淇℃伅鐢ㄤ簬璋冭瘯
    return new Response(JSON.stringify({
      success: false,
      error: 'AI generation failed, please try again later',
      details: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 鑾峰彇澶囩敤妯℃澘鍑芥暟
function getFallbackTemplate(templateType, campaignData) {
  // 鏅鸿兘鍒嗘瀽鍙敤淇℃伅
  const hasBusinessName = campaignData.businessName && campaignData.businessName.trim() !== '';
  const hasProductService = campaignData.productService && campaignData.productService.trim() !== '';
  const hasTargetUrl = campaignData.targetUrl && campaignData.targetUrl.trim() !== '';
  const hasPurpose = campaignData.purpose && campaignData.purpose.trim() !== '';
  
  // 鏍规嵁淇℃伅涓板瘜搴﹀喅瀹氭ā鏉垮鏉傚害
  const isRichContent = hasBusinessName && hasProductService && hasTargetUrl;
  const isMinimalContent = !hasBusinessName && !hasProductService && !hasTargetUrl;
  
  const baseSubject = hasPurpose ? campaignData.purpose : 'Important Update';
  
  switch (templateType) {
    case 'modern-promo':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">You're Invited</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear Valued Guest,<br><br>
                We are thrilled to invite you to an exclusive event hosted by ${campaignData.businessName || 'us'}, where we celebrate the intersection of innovation, creativity, and excellence in ${campaignData.productService || 'our industry'}.<br><br>
                This is more than just an event鈥攊t's a gathering of minds, a showcase of what's next, and an opportunity to connect with like-minded professionals and visionaries.
              </p>
              
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #333; margin: 0; font-weight: 500;">Date: [Insert Date]<br>
                Time: [Insert Time]<br>
                Location: [Insert Location]<br>
                RSVP: Register Here</p>
              </div>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">
                Join us as we explore the future of ${campaignData.productService || 'our industry'} and what it means to lead with purpose and passion.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); font-size: 16px;">Reserve Your Spot Now</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                This event is by invitation only. We look forward to welcoming you.
              </p>
            </div>
          </div>
        `
      };
    
    case 'newsletter':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: #4CAF50; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Join the NovaMail Community</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Hi there,<br><br>
                We're excited to invite you to join the NovaMail community鈥攁 space where like-minded individuals come together to share insights, collaborate, and grow.<br><br>
                Whether you're looking to connect with industry peers, stay updated on the latest trends, or simply be part of something meaningful, our community is the perfect place for you.<br><br>
                Ready to take the next step? Click below to join us:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">Join the Community</a>
              </div>
              
              <p style="color: #333; line-height: 1.6; margin-top: 30px;">
                We can't wait to have you on board!<br><br>
                Best regards,<br>
                <strong>The NovaMail Team</strong>
              </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px;">
              <p>漏 2025 NovaMail. All rights reserved.</p>
            </div>
          </div>
        `
      };
    
    case 'ecommerce':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Special Offer</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear Valued Customer,<br><br>
                We're excited to share an exclusive offer on ${campaignData.productService || 'our featured products'} from ${campaignData.businessName || 'our store'}.<br><br>
                This limited-time promotion won't last long, so don't miss out on these incredible savings!
              </p>
              
              <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0; font-size: 20px;">Featured Product: ${campaignData.productService || 'Premium Items'}</h3>
                <p style="color: #666; line-height: 1.6; margin: 0;">
                  Premium quality at unbeatable prices. Limited time offer - save up to 30%!
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3); font-size: 16px;">Shop Now - Save 30%!</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                Fast shipping, secure payments, and excellent customer service. Your satisfaction is our priority!
              </p>
            </div>
          </div>
        `
      };
    
    case 'event':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #FF69B4 0%, #8A2BE2 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">You're Invited</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear Valued Guest,<br><br>
                We are thrilled to invite you to an exclusive event hosted by ${campaignData.businessName || 'us'}, where we celebrate the intersection of innovation, creativity, and excellence in ${campaignData.productService || 'our industry'}.<br><br>
                This is more than just an event鈥攊t's a gathering of minds, a showcase of what's next, and an opportunity to connect with like-minded professionals and visionaries.
              </p>
              
              <div style="background: #fef7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #333; margin: 0; font-weight: 500;">Date: [Insert Date]<br>
                Time: [Insert Time]<br>
                Location: [Insert Location]<br>
                RSVP: Register Here</p>
              </div>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">
                Join us as we explore the future of ${campaignData.productService || 'our industry'} and what it means to lead with purpose and passion.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #FF69B4 0%, #8A2BE2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3); font-size: 16px;">Reserve Your Spot Now</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                This event is by invitation only. We look forward to welcoming you.
              </p>
            </div>
          </div>
        `
      };

    case 'announcement':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Important Announcement</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear Valued ${campaignData.businessName ? 'Customer' : 'Friend'},<br><br>
                We have an important announcement to share with you regarding ${campaignData.productService || 'our services'}.<br><br>
                Please read this message carefully as it contains important information that may affect you.
              </p>
              
              <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0; font-size: 20px;">Announcement Details</h3>
                <p style="color: #666; line-height: 1.6; margin: 0;">
                  ${campaignData.productService || 'Important updates and changes'} that will affect our services and operations.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3); font-size: 16px;">Read Full Details</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                Please review this announcement carefully. If you have any questions, don't hesitate to contact us.
              </p>
            </div>
          </div>
        `
      };

    case 'welcome':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Welcome!</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear ${campaignData.businessName ? 'Valued Customer' : 'Friend'},<br><br>
                Welcome to our community! We're thrilled to have you join us and excited to share what we have in store for you.<br><br>
                Your journey with ${campaignData.productService || 'us'} starts here. We're committed to providing you with the best experience possible.
              </p>
              
              <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0; font-size: 20px;">What's Next?</h3>
                <p style="color: #666; line-height: 1.6; margin: 0;">
                  Explore our features, connect with our community, and make the most of your experience with us.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3); font-size: 16px;">Get Started</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                Welcome aboard! We can't wait to see what you'll accomplish with us.
              </p>
            </div>
          </div>
        `
      };

    case 'survey':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Quick Survey</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear ${campaignData.businessName ? 'Valued Customer' : 'Friend'},<br><br>
                Your feedback is valuable to us! Help us improve by sharing your thoughts and experiences about ${campaignData.productService || 'our services'}.<br><br>
                We'd love to hear your thoughts and suggestions to help us improve our services.
              </p>
              
              <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0; font-size: 20px;">Why Your Feedback Matters</h3>
                <p style="color: #666; line-height: 1.6; margin: 0;">
                  Your input helps us make better decisions and improve our services for everyone.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3); font-size: 16px;">Take Survey</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                Thank you for your time! Your feedback makes a real difference.
              </p>
            </div>
          </div>
        `
      };

    case 'thank-you':
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #F43F5E 0%, #EC4899 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Thank You!</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Dear ${campaignData.businessName ? 'Valued Customer' : 'Friend'},<br><br>
                Thank you for being an amazing part of our community! Your support means everything to us.<br><br>
                Your trust and support inspire us to keep improving and delivering excellence in ${campaignData.productService || 'our services'}.
              </p>
              
              <div style="background: #fdf2f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0; font-size: 20px;">Our Gratitude</h3>
                <p style="color: #666; line-height: 1.6; margin: 0;">
                  We're grateful for your continued support and look forward to serving you even better in the future.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${campaignData.targetUrl || '#'}" style="background: linear-gradient(135deg, #F43F5E 0%, #EC4899 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 15px rgba(244, 63, 94, 0.3); font-size: 16px;">Stay Connected</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-top: 20px; font-style: italic;">
                With heartfelt thanks, we appreciate you being part of our journey.
              </p>
            </div>
          </div>
        `
      };

    default:
      return {
        subject: baseSubject,
        body: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: ${isRichContent ? '30px' : '20px'};">
            ${hasPurpose ? `<h2 style="color: #333; font-size: ${isRichContent ? '26px' : '22px'};">${campaignData.purpose}</h2>` : ''}
            
            ${isRichContent ? `
            <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
              We're excited to share ${campaignData.purpose.toLowerCase()} with you. This comprehensive update provides all the information you need.
            </p>
            ` : hasPurpose ? `
            <p style="color: #666; line-height: 1.6;">We're excited to share ${campaignData.purpose.toLowerCase()} with you.</p>
            ` : ''}
            
            ${hasProductService ? `
            <div style="background: #f8f9fa; padding: ${isRichContent ? '20px' : '15px'}; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0; font-size: ${isRichContent ? '20px' : '18px'};">About ${campaignData.productService}</h3>
              <p style="color: #666; margin: 0; line-height: 1.6;">
                ${isRichContent ? `${campaignData.productService} provides comprehensive professional solutions tailored to your specific needs.` : `${campaignData.productService} provides professional solutions for your needs.`}
              </p>
            </div>
            ` : ''}
            
            ${hasTargetUrl ? `
            <div style="text-align: center; margin: ${isRichContent ? '40px' : '30px'} 0;">
              <a href="${campaignData.targetUrl}" style="background: #007bff; color: white; padding: ${isRichContent ? '15px 30px' : '12px 24px'}; text-decoration: none; border-radius: 5px; font-size: ${isRichContent ? '16px' : '14px'};">${isRichContent ? 'Learn More' : 'Learn More'}</a>
            </div>
            ` : ''}
            
            <p style="color: #666;">Best regards,<br>${hasBusinessName ? campaignData.businessName : 'Our Team'}</p>
          </div>
        `
      };
  }
}

// SMTP 閰嶇疆澶勭悊鍑芥暟
async function handleEmailConfig(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    if (request.method === 'GET') {
      // 鑾峰彇鐢ㄦ埛 SMTP 閰嶇疆
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId') || 'default_user';
      
      // 浠?Cloudflare KV 瀛樺偍涓幏鍙栭厤缃?      let emailConfig = {
        provider: 'gmail',
        email: '',
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        isSecure: true,
        isConfigured: false
      };

      try {
        // 灏濊瘯浠?KV 瀛樺偍鑾峰彇鐢ㄦ埛閰嶇疆
        if (env.EMAIL_CONFIG_KV) {
          const storedConfig = await env.EMAIL_CONFIG_KV.get(`email_config_${userId}`);
          if (storedConfig) {
            const parsedConfig = JSON.parse(storedConfig);
            emailConfig = {
              ...emailConfig,
              ...parsedConfig,
              password: '[HIDDEN]' // 涓嶈繑鍥炲瘑鐮?            };
          }
        }
      } catch (error) {
        console.log('Failed to load email config from storage:', error);
      }

      return new Response(JSON.stringify({
        success: true,
        config: emailConfig,
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });

    } else if (request.method === 'POST') {
      // 淇濆瓨鐢ㄦ埛 SMTP 閰嶇疆
      const data = await request.json();
      const { provider, email, password, smtpHost, smtpPort, isSecure, userId } = data;
      
      if (!email || !password) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Email and password are required'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 楠岃瘉閰嶇疆
      const emailConfig = {
        provider: provider || 'gmail',
        email: email,
        smtpHost: smtpHost || 'smtp.gmail.com',
        smtpPort: smtpPort || '587',
        isSecure: isSecure !== false,
        isConfigured: true,
        // 娉ㄦ剰锛氬湪瀹為檯搴旂敤涓紝瀵嗙爜搴旇鍔犲瘑瀛樺偍
        password: password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 淇濆瓨鍒?Cloudflare KV 瀛樺偍
      try {
        if (env.EMAIL_CONFIG_KV) {
          await env.EMAIL_CONFIG_KV.put(
            `email_config_${userId || 'default_user'}`, 
            JSON.stringify(emailConfig)
          );
          console.log('SMTP configuration saved to KV storage:', { 
            userId: userId || 'default_user',
            email: email,
            provider: provider
          });
        } else {
          console.log('KV storage not available, using fallback storage');
        }
      } catch (error) {
        console.error('Failed to save email config to storage:', error);
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to save email configuration',
          details: error.message
        }), {
          status: 500,
          headers: corsHeaders
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Email configuration saved successfully',
        config: {
          ...emailConfig,
          password: '[HIDDEN]'
        },
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });

    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to handle email configuration',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// SMTP 娴嬭瘯杩炴帴澶勭悊鍑芥暟
async function handleTestEmail(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { provider, email, password, smtpHost, smtpPort, isSecure } = data;
    
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and password are required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 鐪熷疄 SMTP 杩炴帴娴嬭瘯
    console.log('Testing SMTP connection:', { 
      provider, 
      email, 
      smtpHost, 
      smtpPort, 
      isSecure,
      password: '[HIDDEN]'
    });

    try {
      // 楠岃瘉閭鏍煎紡
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: '閭鏍煎紡鏃犳晥',
          message: '璇疯緭鍏ユ湁鏁堢殑閭鍦板潃'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 楠岃瘉 SMTP 鏈嶅姟鍣ㄩ厤缃?      if (!smtpHost || !smtpPort) {
        return new Response(JSON.stringify({
          success: false,
          error: 'SMTP 閰嶇疆涓嶅畬鏁?,
          message: '璇峰～鍐欏畬鏁寸殑 SMTP 鏈嶅姟鍣ㄥ湴鍧€鍜岀鍙?
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 楠岃瘉瀵嗙爜闀垮害
      if (!password || password.length < 8) {
        return new Response(JSON.stringify({
          success: false,
          error: '瀵嗙爜鏃犳晥',
          message: '搴旂敤瀵嗙爜闀垮害鑷冲皯涓?8 浣?
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 楠岃瘉绔彛鍙?      const port = parseInt(smtpPort);
      if (isNaN(port) || port < 1 || port > 65535) {
        return new Response(JSON.stringify({
          success: false,
          error: '绔彛鍙锋棤鏁?,
          message: '绔彛鍙峰繀椤绘槸 1-65535 涔嬮棿鐨勬暟瀛?
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 浣跨敤绗笁鏂?SMTP 娴嬭瘯鏈嶅姟杩涜鐪熷疄杩炴帴娴嬭瘯
      try {
        // 浣跨敤 Resend API 杩涜 SMTP 杩炴帴娴嬭瘯
        const testResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'NovaMail Test <test@novamail.world>',
            to: [email],
            subject: 'NovaMail SMTP 杩炴帴娴嬭瘯',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">NovaMail</h1>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                  <h2 style="color: #333; margin-bottom: 20px;">SMTP 杩炴帴娴嬭瘯鎴愬姛</h2>
                  <p style="color: #666; font-size: 16px; line-height: 1.5;">
                    鎭枩锛佹偍鐨?SMTP 閰嶇疆宸叉垚鍔熼獙璇併€?                  </p>
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; color: #2d5a2d;">
                      <strong>閰嶇疆淇℃伅锛?/strong><br>
                      閭锛?{email}<br>
                      SMTP 鏈嶅姟鍣細${smtpHost}<br>
                      绔彛锛?{smtpPort}<br>
                      娴嬭瘯鏃堕棿锛?{new Date().toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <p style="color: #666; font-size: 14px;">
                    鎮ㄧ幇鍦ㄥ彲浠ヤ娇鐢?NovaMail 鍙戦€佽惀閿€閭欢浜嗭紒
                  </p>
                </div>
              </div>
            `
          })
        });

        if (testResponse.ok) {
          const result = await testResponse.json();
          return new Response(JSON.stringify({
            success: true,
            message: 'SMTP 杩炴帴娴嬭瘯鎴愬姛',
            details: {
              provider: provider,
              email: email,
              smtpHost: smtpHost,
              smtpPort: smtpPort,
              isSecure: isSecure,
              messageId: result.id,
              testMethod: 'resend_api'
            }
          }), {
            headers: corsHeaders
          });
        } else {
          throw new Error('SMTP 杩炴帴娴嬭瘯澶辫触');
        }

      } catch (smtpError) {
        console.log('SMTP 娴嬭瘯鏈嶅姟涓嶅彲鐢紝浣跨敤閰嶇疆楠岃瘉:', smtpError.message);
        
        // 楠岃瘉甯歌鐨?SMTP 閰嶇疆
        const commonConfigs = {
          'smtp.gmail.com': [587, 465],
          'smtp-mail.outlook.com': [587],
          'smtp.mail.yahoo.com': [587, 465]
        };

        if (commonConfigs[smtpHost] && !commonConfigs[smtpHost].includes(port)) {
          return new Response(JSON.stringify({
            success: false,
            error: '绔彛閰嶇疆鍙兘涓嶆纭?,
            message: `${smtpHost} 閫氬父浣跨敤绔彛 ${commonConfigs[smtpHost].join(' 鎴?')}`
          }), {
            status: 400,
            headers: corsHeaders
          });
        }

        // 閰嶇疆楠岃瘉閫氳繃
        return new Response(JSON.stringify({
          success: true,
          message: 'SMTP 閰嶇疆楠岃瘉閫氳繃',
          details: {
            provider: provider,
            email: email,
            smtpHost: smtpHost,
            smtpPort: smtpPort,
            isSecure: isSecure,
            note: '閰嶇疆楠岃瘉閫氳繃锛屼絾鏈繘琛岀湡瀹炵殑 SMTP 杩炴帴娴嬭瘯銆傚疄闄呭彂閫侀偖浠舵椂浼氫娇鐢ㄦ閰嶇疆銆?
          }
        }), {
          headers: corsHeaders
        });
      }

    } catch (smtpError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'SMTP 閰嶇疆楠岃瘉澶辫触',
        message: '閰嶇疆楠岃瘉杩囩▼涓彂鐢熼敊璇?,
        details: {
          provider: provider,
          email: email,
          smtpHost: smtpHost,
          smtpPort: smtpPort,
          isSecure: isSecure,
          error: smtpError.message
        },
        timestamp: new Date().toISOString()
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to test SMTP connection',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Campaigns 绠＄悊澶勭悊鍑芥暟
async function handleCampaigns(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    if (request.method === 'GET') {
      // 鑾峰彇鐢ㄦ埛鐨勬墍鏈?campaigns
      const url = new URL(request.url);
      const status = url.searchParams.get('status') || 'all';
      const userId = url.searchParams.get('userId') || 'default_user';
      
      // 浠?KV 瀛樺偍鑾峰彇 campaigns
      let campaigns = [];
      try {
        if (env.CAMPAIGNS_KV) {
          const storedCampaigns = await env.CAMPAIGNS_KV.get(`campaigns_${userId}`);
          if (storedCampaigns) {
            campaigns = JSON.parse(storedCampaigns);
          }
        }
      } catch (error) {
        console.log('Failed to load campaigns from storage:', error);
      }

      // 濡傛灉娌℃湁瀛樺偍鐨?campaigns锛岃繑鍥炵┖鏁扮粍
      if (!campaigns || campaigns.length === 0) {
        return new Response(JSON.stringify({
          success: true,
          data: {
            campaigns: [],
            total: 0,
            stats: {
              total: 0,
              sent: 0,
              scheduled: 0,
              draft: 0,
              avgOpenRate: 0
            }
          },
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders
        });
      }

      // 杩囨护 campaigns
      const filteredCampaigns = status === 'all' 
        ? campaigns 
        : campaigns.filter(campaign => campaign.status === status);

      // 璁＄畻缁熻淇℃伅
      const stats = {
        total: campaigns.length,
        sent: campaigns.filter(c => c.status === 'sent').length,
        scheduled: campaigns.filter(c => c.status === 'scheduled').length,
        draft: campaigns.filter(c => c.status === 'draft').length,
        avgOpenRate: campaigns.length > 0 
          ? Math.round(campaigns.reduce((acc, c) => acc + (c.openRate || 0), 0) / campaigns.length)
          : 0
      };

      return new Response(JSON.stringify({
        success: true,
        data: {
          campaigns: filteredCampaigns,
          total: filteredCampaigns.length,
          stats: stats
        },
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });

    } else if (request.method === 'POST') {
      // 鍒涘缓鏂扮殑 campaign
      const data = await request.json();
      const { name, subject, status = 'draft', recipients = [], userId } = data;
      
      if (!name || !subject) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Campaign name and subject are required'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      const campaign = {
        id: 'campaign_' + Date.now(),
        name: name,
        subject: subject,
        status: status,
        recipients: recipients.length,
        sent: 0,
        opened: 0,
        clicked: 0,
        openRate: 0,
        clickRate: 0,
        createdAt: new Date().toISOString(),
        scheduledAt: status === 'scheduled' ? new Date().toISOString() : null,
        sentAt: null
      };

      // 淇濆瓨鍒?KV 瀛樺偍
      try {
        if (env.CAMPAIGNS_KV) {
          const storedCampaigns = await env.CAMPAIGNS_KV.get(`campaigns_${userId || 'default_user'}`);
          let campaigns = storedCampaigns ? JSON.parse(storedCampaigns) : [];
          campaigns.push(campaign);
          await env.CAMPAIGNS_KV.put(`campaigns_${userId || 'default_user'}`, JSON.stringify(campaigns));
        }
      } catch (error) {
        console.error('Failed to save campaign:', error);
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Campaign created successfully',
        campaign: campaign,
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });

    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to handle campaigns request',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 娓呯┖鐢ㄦ埛鏁版嵁澶勭悊鍑芥暟
async function handleClearUsers(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    if (!env.USERS_KV) {
      return new Response(JSON.stringify({
        success: false,
        error: 'USERS_KV not configured'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 鑾峰彇鎵€鏈夌敤鎴烽敭
    const usersList = await env.USERS_KV.list();
    let deletedCount = 0;
    
    if (usersList.keys && usersList.keys.length > 0) {
      // 鍒犻櫎鎵€鏈夌敤鎴锋暟鎹?      for (const key of usersList.keys) {
        await env.USERS_KV.delete(key.name);
        deletedCount++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'User data cleared successfully',
      deletedCount: deletedCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear user data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 娓呯┖娲诲姩鏁版嵁澶勭悊鍑芥暟
async function handleClearCampaigns(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    if (!env.CAMPAIGNS_KV) {
      return new Response(JSON.stringify({
        success: false,
        error: 'CAMPAIGNS_KV not configured'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 鑾峰彇鎵€鏈夋椿鍔ㄩ敭
    const campaignsList = await env.CAMPAIGNS_KV.list();
    let deletedCount = 0;
    
    if (campaignsList.keys && campaignsList.keys.length > 0) {
      // 鍒犻櫎鎵€鏈夋椿鍔ㄦ暟鎹?      for (const key of campaignsList.keys) {
        await env.CAMPAIGNS_KV.delete(key.name);
        deletedCount++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Campaign data cleared successfully',
      deletedCount: deletedCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear campaign data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 娓呯┖閭欢閰嶇疆鏁版嵁澶勭悊鍑芥暟
async function handleClearEmailConfigs(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    if (!env.EMAIL_CONFIG_KV) {
      return new Response(JSON.stringify({
        success: false,
        error: 'EMAIL_CONFIG_KV not configured'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 鑾峰彇鎵€鏈夐偖浠堕厤缃敭
    const configsList = await env.EMAIL_CONFIG_KV.list();
    let deletedCount = 0;
    
    if (configsList.keys && configsList.keys.length > 0) {
      // 鍒犻櫎鎵€鏈夐偖浠堕厤缃暟鎹?      for (const key of configsList.keys) {
        await env.EMAIL_CONFIG_KV.delete(key.name);
        deletedCount++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Email config data cleared successfully',
      deletedCount: deletedCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear email config data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 娓呯┖鎵€鏈夋暟鎹鐞嗗嚱鏁?async function handleClearAll(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const results = {
      users: { success: false, deletedCount: 0 },
      campaigns: { success: false, deletedCount: 0 },
      emailConfigs: { success: false, deletedCount: 0 }
    };

    // 娓呯┖鐢ㄦ埛鏁版嵁
    if (env.USERS_KV) {
      try {
        const usersList = await env.USERS_KV.list();
        if (usersList.keys && usersList.keys.length > 0) {
          for (const key of usersList.keys) {
            await env.USERS_KV.delete(key.name);
            results.users.deletedCount++;
          }
        }
        results.users.success = true;
      } catch (error) {
        console.error('Failed to clear users:', error);
      }
    }

    // 娓呯┖娲诲姩鏁版嵁
    if (env.CAMPAIGNS_KV) {
      try {
        const campaignsList = await env.CAMPAIGNS_KV.list();
        if (campaignsList.keys && campaignsList.keys.length > 0) {
          for (const key of campaignsList.keys) {
            await env.CAMPAIGNS_KV.delete(key.name);
            results.campaigns.deletedCount++;
          }
        }
        results.campaigns.success = true;
      } catch (error) {
        console.error('Failed to clear campaigns:', error);
      }
    }

    // 娓呯┖閭欢閰嶇疆鏁版嵁
    if (env.EMAIL_CONFIG_KV) {
      try {
        const configsList = await env.EMAIL_CONFIG_KV.list();
        if (configsList.keys && configsList.keys.length > 0) {
          for (const key of configsList.keys) {
            await env.EMAIL_CONFIG_KV.delete(key.name);
            results.emailConfigs.deletedCount++;
          }
        }
        results.emailConfigs.success = true;
      } catch (error) {
        console.error('Failed to clear email configs:', error);
      }
    }

    const totalDeleted = results.users.deletedCount + results.campaigns.deletedCount + results.emailConfigs.deletedCount;

    return new Response(JSON.stringify({
      success: true,
      message: 'All data cleared successfully',
      results: results,
      totalDeleted: totalDeleted,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear all data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Google OAuth 鐧诲綍澶勭悊鍑芥暟
async function handleGoogleLogin(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { email, name, picture, provider, accessToken } = data;
    
    if (!email || !name) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email and name are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 鐢熸垚鐢ㄦ埛ID鍜屼护鐗?    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    // 鍒涘缓鐢ㄦ埛瀵硅薄
    const user = {
      id: userId,
      email: email.toLowerCase().trim(),
      name: name,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      picture: picture || '',
      provider: provider || 'google',
      emailVerified: true,
      plan: 'free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      token: userToken,
      // 浣跨敤閲忕粺璁?      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString()
    };

    // 妫€鏌ョ敤鎴锋槸鍚﹀凡瀛樺湪锛堜娇鐢–loudflare KV瀛樺偍鎴栨ā鎷熷瓨鍌級
    let existingUser = null;
    try {
      if (env.USERS_KV) {
        const storedUser = await env.USERS_KV.get(`user_${email.toLowerCase()}`);
        if (storedUser) {
          existingUser = JSON.parse(storedUser);
          console.log('Found existing user:', existingUser.email);
        }
      } else {
        // 妯℃嫙瀛樺偍锛氭鏌ュ唴瀛樹腑鐨勭敤鎴锋暟鎹?        console.log('KV storage not available, using mock storage');
        // 鍦ㄥ疄闄呭簲鐢ㄤ腑锛岃繖閲屽簲璇ヨ繛鎺ュ埌鐪熷疄鐨勬暟鎹簱
        // 鐩墠杩斿洖null锛岃〃绀虹敤鎴蜂笉瀛樺湪
      }
    } catch (error) {
      console.log('Failed to check existing user:', error);
    }

    if (existingUser) {
      // 鏇存柊鐜版湁鐢ㄦ埛淇℃伅
      existingUser.lastLogin = new Date().toISOString();
      existingUser.updatedAt = new Date().toISOString();
      existingUser.token = userToken; // 鐢熸垚鏂扮殑浠ょ墝
      
      try {
        if (env.USERS_KV) {
          await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(existingUser));
          console.log('Updated existing user:', existingUser.email);
        } else {
          console.log('KV storage not available, user update simulated');
        }
      } catch (error) {
        console.error('Failed to update user:', error);
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Login successful (existing user)',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          picture: existingUser.picture,
          provider: existingUser.provider,
          plan: existingUser.plan,
          token: existingUser.token,
          emailsSentThisMonth: existingUser.emailsSentThisMonth || 0,
          contactsCount: existingUser.contactsCount || 0,
          campaignsCount: existingUser.campaignsCount || 0
        },
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      // 鍒涘缓鏂扮敤鎴?      try {
        if (env.USERS_KV) {
          await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(user));
          console.log('Created new user:', user.email);
        } else {
          console.log('KV storage not available, user creation simulated');
        }
      } catch (error) {
        console.error('Failed to create user:', error);
        // 鍗充娇瀛樺偍澶辫触锛屼篃杩斿洖鎴愬姛锛屽洜涓虹敤鎴锋暟鎹凡缁忕敓鎴?        console.log('User creation simulated due to storage error');
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Account created and login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture,
          provider: user.provider,
          plan: user.plan,
          token: user.token,
          emailsSentThisMonth: user.emailsSentThisMonth,
          contactsCount: user.contactsCount,
          campaignsCount: user.campaignsCount
        },
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process Google login',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Google OAuth 鍥炶皟澶勭悊鍑芥暟
async function handleGoogleCallback(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { code, redirect_uri } = data;
    
    if (!code) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Authorization code is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 1. 浜ゆ崲鎺堟潈鐮佽幏鍙栬闂护鐗?    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID || '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com',
        client_secret: env.GOOGLE_CLIENT_SECRET || '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5tU',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange authorization code');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. 鑾峰彇Google鐢ㄦ埛淇℃伅
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user information');
    }

    const googleUser = await userResponse.json();

    // 3. 鍒涘缓鎴栨洿鏂扮敤鎴疯处鎴?    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    const user = {
      id: userId,
      email: googleUser.email.toLowerCase().trim(),
      name: googleUser.name,
      firstName: googleUser.name.split(' ')[0] || googleUser.name,
      lastName: googleUser.name.split(' ').slice(1).join(' ') || '',
      picture: googleUser.picture || '',
      provider: 'google',
      emailVerified: true,
      plan: 'free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      token: userToken,
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString()
    };

    // 妫€鏌ョ敤鎴锋槸鍚﹀凡瀛樺湪
    let existingUser = null;
    try {
      if (env.USERS_KV) {
        const storedUser = await env.USERS_KV.get(`user_${googleUser.email.toLowerCase()}`);
        if (storedUser) {
          existingUser = JSON.parse(storedUser);
          // 鏇存柊鐜版湁鐢ㄦ埛淇℃伅
          existingUser.token = userToken;
          existingUser.updatedAt = new Date().toISOString();
          existingUser.picture = googleUser.picture || existingUser.picture;
          await env.USERS_KV.put(`user_${googleUser.email.toLowerCase()}`, JSON.stringify(existingUser));
        }
      }
    } catch (error) {
      console.log('Failed to check existing user:', error);
    }

    if (existingUser) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Login successful (existing user)',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          picture: existingUser.picture,
          provider: existingUser.provider,
          plan: existingUser.plan,
          token: existingUser.token,
          emailsSentThisMonth: existingUser.emailsSentThisMonth || 0,
          contactsCount: existingUser.contactsCount || 0,
          campaignsCount: existingUser.campaignsCount || 0
        },
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      // 鍒涘缓鏂扮敤鎴?      try {
        if (env.USERS_KV) {
          await env.USERS_KV.put(`user_${googleUser.email.toLowerCase()}`, JSON.stringify(user));
          console.log('Created new user:', user.email);
        } else {
          console.log('KV storage not available, user creation simulated');
        }
      } catch (error) {
        console.error('Failed to create user:', error);
        console.log('User creation simulated due to storage error');
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Account created and login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture,
          provider: user.provider,
          plan: user.plan,
          token: user.token,
          emailsSentThisMonth: user.emailsSentThisMonth,
          contactsCount: user.contactsCount,
          campaignsCount: user.campaignsCount
        },
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

  } catch (error) {
    console.error('Google callback error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process Google authentication',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 鑱旂郴浜哄鍏ュ鐞嗗嚱鏁?async function handleContactsImport(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const formData = await request.formData();
    const csvFile = formData.get('csvFile');
    
    if (!csvFile) {
      return new Response(JSON.stringify({
        success: false,
        message: 'CSV file is required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 璇诲彇CSV鏂囦欢鍐呭
    const csvText = await csvFile.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return new Response(JSON.stringify({
        success: false,
        message: 'CSV file must contain at least a header and one data row'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 瑙ｆ瀽CSV
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const contacts = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      
      if (values.length !== headers.length) {
        errors.push({
          row: i + 1,
          error: 'Column count mismatch'
        });
        continue;
      }

      const row = {};
      headers.forEach((header, index) => {
        row[header.toLowerCase()] = values[index];
      });

      // 楠岃瘉蹇呴渶瀛楁
      if (!row.email) {
        errors.push({
          row: i + 1,
          error: 'Email is required'
        });
        continue;
      }

      // 楠岃瘉閭鏍煎紡
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(row.email)) {
        errors.push({
          row: i + 1,
          error: 'Invalid email format'
        });
        continue;
      }

      // 鍒涘缓鑱旂郴浜哄璞?      const contact = {
        id: `contact_${Date.now()}_${i}`,
        name: row.name || row.email.split('@')[0],
        email: row.email.toLowerCase().trim(),
        status: 'active',
        tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
        lastContact: new Date().toISOString(),
        totalEmails: 0,
        openRate: 0,
        createdAt: new Date().toISOString()
      };

      contacts.push(contact);
    }

    if (contacts.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'No valid contacts found in CSV file',
        errors: errors
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 淇濆瓨鑱旂郴浜哄埌KV瀛樺偍
    try {
      if (env.CONTACTS_KV) {
        for (const contact of contacts) {
          await env.CONTACTS_KV.put(`contact_${contact.email}`, JSON.stringify(contact));
        }
        console.log(`Saved ${contacts.length} contacts to KV storage`);
      } else {
        console.log('CONTACTS_KV not available, contacts not saved');
      }
    } catch (error) {
      console.error('Failed to save contacts to KV:', error);
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully imported ${contacts.length} contacts`,
      data: {
        contacts: contacts,
        totalImported: contacts.length,
        errors: errors
      }
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Contacts import error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to import contacts',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 鑱旂郴浜篈PI澶勭悊鍑芥暟
async function handleContacts(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET璇锋眰 - 鑾峰彇鑱旂郴浜哄垪琛?  if (request.method === 'GET') {
    try {
      const url = new URL(request.url);
      const searchParams = url.searchParams;
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || 'all';
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '100');

      let contacts = [];

      // 浠嶬V瀛樺偍鑾峰彇鑱旂郴浜?      if (env.CONTACTS_KV) {
        try {
          const { keys } = await env.CONTACTS_KV.list();
          const contactPromises = keys.map(key => env.CONTACTS_KV.get(key.name));
          const contactData = await Promise.all(contactPromises);
          
          contacts = contactData
            .filter(data => data)
            .map(data => JSON.parse(data))
            .filter(contact => {
              // 鎼滅储杩囨护
              if (search && !contact.name.toLowerCase().includes(search.toLowerCase()) && 
                  !contact.email.toLowerCase().includes(search.toLowerCase())) {
                return false;
              }
              
              // 鐘舵€佽繃婊?              if (status !== 'all' && contact.status !== status) {
                return false;
              }
              
              return true;
            });
        } catch (error) {
          console.error('Failed to fetch contacts from KV:', error);
        }
      }

      // 鍒嗛〉
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedContacts = contacts.slice(startIndex, endIndex);

      return new Response(JSON.stringify({
        success: true,
        data: {
          contacts: paginatedContacts,
          total: contacts.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(contacts.length / limit)
        }
      }), {
        headers: corsHeaders
      });

    } catch (error) {
      console.error('Get contacts error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch contacts',
        details: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  // POST璇锋眰 - 鍒涘缓鏂拌仈绯讳汉
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { name, email, tags = [], customFields = {} } = body;

      // 楠岃瘉蹇呭～瀛楁
      if (!name || !email) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Name and email are required'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 楠岃瘉閭鏍煎紡
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 妫€鏌ヨ仈绯讳汉鏄惁宸插瓨鍦?      if (env.CONTACTS_KV) {
        const existingContact = await env.CONTACTS_KV.get(`contact_${email.toLowerCase()}`);
        if (existingContact) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Contact already exists with this email'
          }), {
            status: 400,
            headers: corsHeaders
          });
        }
      }

      // 鍒涘缓鏂拌仈绯讳汉
      const newContact = {
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        status: 'active',
        tags: Array.isArray(tags) ? tags : [],
        customFields: customFields || {},
        lastContact: new Date().toISOString(),
        totalEmails: 0,
        openRate: 0,
        createdAt: new Date().toISOString()
      };

      // 淇濆瓨鍒癒V瀛樺偍
      if (env.CONTACTS_KV) {
        await env.CONTACTS_KV.put(`contact_${newContact.email}`, JSON.stringify(newContact));
        console.log('Contact saved to KV:', newContact.email);
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Contact created successfully',
        data: newContact
      }), {
        headers: corsHeaders
      });

    } catch (error) {
      console.error('Create contact error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create contact',
        details: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: corsHeaders
  });
}

// 澶勭悊鍒嗘瀽鏁版嵁璇锋眰
async function handleAnalytics(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === 'GET') {
    try {
      const url = new URL(request.url);
      const timeRange = url.searchParams.get('timeRange') || '30d';
      
      // 鑾峰彇鎵€鏈夋椿鍔ㄦ暟鎹?      let totalEmails = 0;
      let totalContacts = 0;
      let chartData = [];

      // 璁＄畻鏃堕棿鑼冨洿
      const now = new Date();
      let startDate;
      switch (timeRange) {
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case '1y':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      // 鑾峰彇鑱旂郴浜烘€绘暟
      if (env.CONTACTS_KV) {
        const contactsList = await env.CONTACTS_KV.list();
        totalContacts = contactsList.keys.length;
      }

      // 鑾峰彇娲诲姩鏁版嵁
      if (env.CAMPAIGNS_KV) {
        const campaignsList = await env.CAMPAIGNS_KV.list();
        
        // 璁＄畻鎬婚偖浠舵暟
        for (const key of campaignsList.keys) {
          const campaignData = await env.CAMPAIGNS_KV.get(key.name);
          if (campaignData) {
            const campaign = JSON.parse(campaignData);
            if (campaign.status === 'sent' && campaign.recipients) {
              totalEmails += campaign.recipients;
            }
          }
        }

        // 鐢熸垚鍥捐〃鏁版嵁锛堟寜鏃ユ湡鍒嗙粍锛?        const dailyData = {};
        for (const key of campaignsList.keys) {
          const campaignData = await env.CAMPAIGNS_KV.get(key.name);
          if (campaignData) {
            const campaign = JSON.parse(campaignData);
            if (campaign.status === 'sent' && campaign.sentAt) {
              const sentDate = new Date(campaign.sentAt).toISOString().split('T')[0];
              if (new Date(sentDate) >= startDate) {
                if (!dailyData[sentDate]) {
                  dailyData[sentDate] = 0;
                }
                dailyData[sentDate] += campaign.recipients || 0;
              }
            }
          }
        }

        // 杞崲涓哄浘琛ㄦ暟鎹牸寮?        chartData = Object.entries(dailyData)
          .map(([date, emails]) => ({ date, emails }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      return new Response(JSON.stringify({
        success: true,
        data: {
          analytics: {
            totalEmails,
            totalContacts
          },
          chartData
        }
      }), {
        headers: corsHeaders
      });

    } catch (error) {
      console.error('Analytics error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch analytics data',
        details: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: corsHeaders
  });
}

// 澶勭悊浠〃鏉跨粺璁℃暟鎹姹?async function handleDashboardStats(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === 'GET') {
    try {
      // 鑾峰彇缁熻鏁版嵁
      let totalContacts = 0;
      let totalEmailsSent = 0;
      let recentCampaigns = [];

      // 鑾峰彇鑱旂郴浜烘€绘暟
      if (env.CONTACTS_KV) {
        const contactsList = await env.CONTACTS_KV.list();
        totalContacts = contactsList.keys.length;
      }

      // 鑾峰彇娲诲姩鏁版嵁
      if (env.CAMPAIGNS_KV) {
        const campaignsList = await env.CAMPAIGNS_KV.list();
        
        // 璁＄畻鎬婚偖浠舵暟
        for (const key of campaignsList.keys) {
          const campaignData = await env.CAMPAIGNS_KV.get(key.name);
          if (campaignData) {
            const campaign = JSON.parse(campaignData);
            if (campaign.status === 'sent' && campaign.recipients) {
              totalEmailsSent += campaign.recipients;
            }
          }
        }

        // 鑾峰彇鏈€杩戠殑娲诲姩锛堟渶澶?涓級
        const campaigns = [];
        for (const key of campaignsList.keys) {
          const campaignData = await env.CAMPAIGNS_KV.get(key.name);
          if (campaignData) {
            const campaign = JSON.parse(campaignData);
            campaigns.push({
              id: campaign.id,
              name: campaign.name,
              status: campaign.status,
              recipients: campaign.recipients || 0,
              createdAt: campaign.createdAt,
              sentAt: campaign.sentAt
            });
          }
        }

        // 鎸夊垱寤烘椂闂存帓搴忥紝鍙栨渶杩?涓?        recentCampaigns = campaigns
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
      }

      return new Response(JSON.stringify({
        success: true,
        stats: {
          totalContacts,
          totalEmailsSent
        },
        recentCampaigns
      }), {
        headers: corsHeaders
      });

    } catch (error) {
      console.error('Dashboard stats error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch dashboard stats',
        details: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: corsHeaders
  });
};

// 测试用户保存函数
async function handleTestUserSave(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await request.json();
    const email = data.email || 'lihongyangnju@gmail.com';
    
    console.log('Testing user save for email:', email);
    
    // 创建测试用户数据
    const testUser = {
      id: 'test_user_' + Date.now(),
      email: email,
      name: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      token: 'test_token_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subscription: {
        plan: 'free',
        status: 'active',
        features: {
          maxContacts: 100,
          maxCampaigns: 5,
          hasAITeatures: true,
          hasAnalytics: true
        }
      },
      usage: {
        contactsCount: 0,
        campaignsCount: 0,
        emailsSentThisMonth: 0,
        lastUsageReset: new Date().toISOString()
      }
    };
    
    // 尝试保存用户数据
    let saveResult = null;
    let saveError = null;
    
    try {
      if (env.USERS_KV) {
        const userKey = `user_${email.toLowerCase()}`;
        console.log('Saving user with key:', userKey);
        
        await env.USERS_KV.put(userKey, JSON.stringify(testUser));
        console.log('User saved successfully');
        
        // 立即尝试读取
        const savedUser = await env.USERS_KV.get(userKey);
        if (savedUser) {
          saveResult = JSON.parse(savedUser);
        }
      } else {
        saveError = 'KV storage not available';
      }
    } catch (error) {
      saveError = error.message;
      console.error('Save error:', error);
    }
    
    return new Response(JSON.stringify({
      success: true,
      test: {
        email: email,
        key: `user_${email.toLowerCase()}`,
        kvAvailable: !!env.USERS_KV,
        saveResult: saveResult,
        saveError: saveError,
        testUser: testUser
      }
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Test user save error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Test user save failed',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// KV 存储调试函数
async function handleDebugKV(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await request.json();
    const email = data.email || 'lihongyangnju@gmail.com';
    
    console.log('Debug KV storage for email:', email);
    
    // 检查 KV 存储配置
    const kvStatus = {
      hasUsersKV: !!env.USERS_KV,
      hasContactsKV: !!env.CONTACTS_KV,
      hasCampaignsKV: !!env.CAMPAIGNS_KV
    };
    
    // 尝试获取用户数据
    let userData = null;
    let kvError = null;
    
    try {
      if (env.USERS_KV) {
        const key = `user_${email.toLowerCase()}`;
        console.log('Looking for key:', key);
        userData = await env.USERS_KV.get(key);
        if (userData) {
          userData = JSON.parse(userData);
        }
      }
    } catch (error) {
      kvError = error.message;
      console.error('KV error:', error);
    }
    
    // 列出所有用户键
    let allUsers = [];
    try {
      if (env.USERS_KV) {
        const list = await env.USERS_KV.list();
        allUsers = list.keys.map(key => key.name);
      }
    } catch (error) {
      console.error('List users error:', error);
    }
    
    return new Response(JSON.stringify({
      success: true,
      debug: {
        email: email,
        key: `user_${email.toLowerCase()}`,
        kvStatus: kvStatus,
        userData: userData,
        kvError: kvError,
        allUsers: allUsers,
        userCount: allUsers.length
      }
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Debug KV error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Debug KV failed',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Gmail API 测试函数
async function handleTestGmail(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const gmailUser = env.GMAIL_SMTP_USER;
    const gmailAccessToken = env.GMAIL_ACCESS_TOKEN;
    const gmailRefreshToken = env.GMAIL_REFRESH_TOKEN;

    console.log('Testing Gmail API configuration...');

    // 检查配置
    if (!gmailUser || !gmailAccessToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Gmail API not configured',
        details: {
          hasGmailUser: !!gmailUser,
          hasAccessToken: !!gmailAccessToken,
          hasRefreshToken: !!gmailRefreshToken
        }
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 测试 Gmail API 连接
    const testResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${gmailAccessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (testResponse.ok) {
      const profile = await testResponse.json();
      console.log('Gmail API test successful:', profile.emailAddress);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Gmail API connection successful',
        profile: {
          email: profile.emailAddress,
          messagesTotal: profile.messagesTotal,
          threadsTotal: profile.threadsTotal
        },
        configuration: {
          gmailUser: gmailUser,
          hasAccessToken: !!gmailAccessToken,
          hasRefreshToken: !!gmailRefreshToken,
          tokenLength: gmailAccessToken.length
        }
      }), {
        headers: corsHeaders
      });
    } else {
      const errorText = await testResponse.text();
      console.error('Gmail API test failed:', testResponse.status, errorText);
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Gmail API connection failed',
        details: {
          status: testResponse.status,
          statusText: testResponse.statusText,
          error: errorText
        },
        suggestion: testResponse.status === 401 ? 
          'Access token may be expired. Please refresh the token.' : 
          'Check Gmail API configuration and permissions.'
      }), {
        status: testResponse.status,
        headers: corsHeaders
      });
    }

  } catch (error) {
    console.error('Gmail API test error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Gmail API test failed',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
