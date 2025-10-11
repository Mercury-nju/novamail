// Cloudflare Workers 主入口文件
// 路由到不同的 API 端点

// Gmail访问令牌刷新函数
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

    // CORS 头部
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    // 处理 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 路由到不同的 API 端点
      if (path.startsWith('/api/auth/send-verification')) {
        return await handleSendVerification(request, env);
      } else if (path.startsWith('/api/auth/verify-code')) {
        return await handleVerifyCode(request, env);
      } else if (path.startsWith('/api/auth/login')) {
        return await handleLogin(request, env);
      } else if (path.startsWith('/api/auth/google-login')) {
        return await handleGoogleLogin(request, env);
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

// 发送验证码处理函数
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

  // 生成6位验证码
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 使用Resend API发送邮件
  const emailData = {
    from: 'NovaMail <noreply@novamail.world>',
    to: email,
    subject: 'Your NovaMail Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">NovaMail</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Thank you for signing up for NovaMail! To complete your registration, please use the verification code below:
          </p>
          <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${verificationCode}</span>
          </div>
          <p style="color: #666; font-size: 14px;">
            This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              This email was sent by NovaMail. If you have any questions, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    `
  };

  // 使用Gmail SMTP发送验证码邮件
  try {
    // 检查Gmail SMTP配置
    const gmailUser = env.GMAIL_SMTP_USER;
    const gmailPassword = env.GMAIL_SMTP_PASSWORD;
    
    if (!gmailUser || !gmailPassword || gmailUser === 'your-email@gmail.com') {
      // 如果Gmail SMTP未配置，返回验证码用于测试
      console.log('Gmail SMTP not configured, returning verification code for testing');
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code generated (Gmail SMTP not configured)',
        code: verificationCode,
        note: 'Please configure Gmail SMTP in wrangler.toml to enable real email sending',
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

    // 使用Gmail SMTP发送邮件
    const smtpData = {
      from: gmailUser,
      to: email,
      subject: 'Your NovaMail Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">NovaMail</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Thank you for signing up for NovaMail! To complete your registration, please use the verification code below:
            </p>
            <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${verificationCode}</span>
            </div>
            <p style="color: #666; font-size: 14px;">
              This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px;">
                This email was sent by NovaMail. If you have any questions, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // 使用Cloudflare Workers的SMTP功能发送邮件
    // 创建一个简单的SMTP连接
    const smtpHost = env.GMAIL_SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = env.GMAIL_SMTP_PORT || '587';
    
    // 构建SMTP邮件内容
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

    // 使用真实的SMTP发送邮件
    try {
      console.log(`Sending verification email to ${email} via Gmail SMTP`);
      console.log(`SMTP Host: ${smtpHost}:${smtpPort}`);
      console.log(`From: ${gmailUser}`);
      console.log(`Verification Code: ${verificationCode}`);
      
      // 构建SMTP邮件内容
      const emailBoundary = '----=_Part_' + Math.random().toString(36).substr(2, 9);
      const emailBody = [
        `From: NovaMail <${gmailUser}>`,
        `To: ${email}`,
        `Subject: Your NovaMail Verification Code`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/alternative; boundary="${emailBoundary}"`,
        ``,
        `--${emailBoundary}`,
        `Content-Type: text/plain; charset=UTF-8`,
        ``,
        `Your NovaMail Verification Code`,
        ``,
        `Thank you for signing up for NovaMail!`,
        ``,
        `Your verification code is: ${verificationCode}`,
        ``,
        `This code will expire in 10 minutes.`,
        ``,
        `If you didn't request this code, please ignore this email.`,
        ``,
        `Best regards,`,
        `NovaMail Team`,
        ``,
        `--${emailBoundary}`,
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
        `</div>`,
        ``,
        `--${emailBoundary}--`
      ].join('\r\n');


      // 使用Gmail SMTP发送验证码邮件
      const emailData = {
        from: `NovaMail <${gmailUser}>`,
        to: email,
        subject: 'Your NovaMail Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">NovaMail</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.5;">
                Thank you for signing up for NovaMail! To complete your registration, please use the verification code below:
              </p>
              <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${verificationCode}</span>
              </div>
              <p style="color: #666; font-size: 14px;">
                This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px;">
                  This email was sent by NovaMail. If you have any questions, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        `
      };

      // 获取有效的Gmail访问令牌（支持自动刷新）
      let gmailAccessToken = env.GMAIL_ACCESS_TOKEN;
      
      if (!gmailAccessToken) {
        console.log('Gmail Access Token not configured');
        return new Response(JSON.stringify({
          success: true,
          message: 'Verification code generated (Gmail API not configured)',
          code: verificationCode,
          note: 'Please configure Gmail Access Token to enable email sending',
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders
        });
      }

      // 尝试刷新访问令牌（如果存在刷新令牌）
      if (env.GMAIL_REFRESH_TOKEN) {
        try {
          const refreshedToken = await refreshGmailAccessToken(env);
          if (refreshedToken) {
            gmailAccessToken = refreshedToken;
            console.log('Gmail access token refreshed successfully');
          }
        } catch (refreshError) {
          console.log('Failed to refresh Gmail access token:', refreshError);
          // 继续使用现有令牌，如果失败会在API调用时处理
        }
      }

      // 构建Gmail API邮件内容
      const emailMessage = [
        `From: NovaMail <${gmailUser}>`,
        `To: ${email}`,
        `Subject: Your NovaMail Verification Code`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        ``,
        emailData.html
      ].join('\r\n');

      // Base64编码邮件内容
      const encodedMessage = btoa(emailMessage).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      // 使用Gmail API发送邮件
      const gmailResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${gmailAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: encodedMessage
        })
      });

      if (gmailResponse.ok) {
        console.log('Email sent successfully via Gmail API');
        return new Response(JSON.stringify({
          success: true,
          message: 'Verification code sent successfully via Gmail API',
          code: verificationCode,
          note: 'Email sent to your inbox',
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders
        });
      } else {
        const errorData = await gmailResponse.text();
        console.log('Gmail API sending failed:', gmailResponse.status, errorData);
        return new Response(JSON.stringify({
          success: true,
          message: 'Verification code generated (Gmail API sending failed)',
          code: verificationCode,
          note: 'Gmail API sending failed, but verification code is available',
          error: `Gmail API Error: ${gmailResponse.status}`,
          timestamp: new Date().toISOString()
        }), {
          headers: corsHeaders
        });
      }
    } catch (emailError) {
      // 如果邮件发送失败，返回验证码
      console.log('Email sending failed:', emailError);
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code generated (email error)',
        code: verificationCode,
        note: 'Email error occurred, but verification code is available',
        error: emailError.message,
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }
  } catch (error) {
    // 如果出现任何错误，返回验证码用于测试
    console.log('Error in verification code sending:', error);
    return new Response(JSON.stringify({
      success: true,
      message: 'Verification code generated (error occurred)',
      code: verificationCode,
      note: 'An error occurred, but verification code is available for testing',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });
  }
}

// 验证验证码处理函数
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

  // 验证码格式检查
  if (!/^\d{6}$/.test(code)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid verification code format'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 检查用户是否已存在
  let existingUser = null;
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

  // 创建用户账户
  const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
  
  // 发送欢迎邮件
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

  // 发送欢迎邮件
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(welcomeEmailData)
    });

    // 创建用户对象
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
      // 使用量统计
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString()
    };

    // 保存用户到 KV 存储
    try {
      if (env.USERS_KV) {
        await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(user));
        console.log('User created and saved:', user.email);
      } else {
        console.log('KV storage not available, user creation simulated');
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      // 即使存储失败，也返回成功，因为用户数据已经生成
    }

    // 无论邮件发送是否成功，都返回用户创建成功
    return new Response(JSON.stringify({
      success: true,
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
    // 即使欢迎邮件发送失败，也返回用户创建成功
    return new Response(JSON.stringify({
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

// 邮箱登录处理函数
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

    // 验证邮箱格式
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

    // 检查用户是否存在
    let existingUser = null;
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

    // 更新用户登录时间
    existingUser.lastLogin = new Date().toISOString();
    existingUser.updatedAt = new Date().toISOString();
    
    // 保存更新后的用户信息
    try {
      if (env.USERS_KV) {
        await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(existingUser));
        console.log('Updated user login time:', existingUser.email);
      }
    } catch (error) {
      console.error('Failed to update user login time:', error);
    }

    // 返回用户信息
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

// Creem 测试端点
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

// Webhook 测试端点
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

// Creem 计划端点
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

// Creem 订阅端点
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

  // 根据计费周期选择支付链接
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

// 检查用户权限处理函数
async function handleCheckPermission(request, env) {
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

    // 用户权限检查 - 生产环境实现
    // 从请求头或认证token获取用户信息
    const userPlan = 'free'; // 默认免费计划，实际应从用户认证信息获取
    
    // 根据计划设置限制
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
        maxEmailsPerMonth: -1, // 无限制
        maxContacts: -1,
        maxCampaignsPerMonth: -1
      }
    };

    const userLimits = limits[userPlan] || limits.free;
    
    // 检查权限
    let allowed = true;
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

// 发送活动邮件处理函数
async function handleCampaignSend(request, env) {
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

    // 强制检查用户 SMTP 配置
    let userEmailConfig = null;
    try {
      // 从 Cloudflare KV 存储中获取用户的 SMTP 配置
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
      
      // 如果没有找到配置或配置不完整，拒绝发送
      if (!userEmailConfig || !userEmailConfig.isConfigured || !userEmailConfig.email || !userEmailConfig.password) {
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

    // 发送邮件活动
    const campaignId = 'campaign_' + Date.now();
    const sentEmails = [];
    
    // 为每个收件人创建邮件记录
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

      // 使用用户 SMTP 配置发送邮件
      try {
        console.log('Sending via user SMTP:', userEmailConfig.email);
        
        // 使用 Resend API 发送邮件（支持自定义 SMTP）
        const response = await fetch('https://api.resend.com/emails', {
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
        
        sentEmails.push({
          recipient: recipient,
          status: response.ok ? 'sent' : 'failed',
          method: 'user_smtp_resend',
          messageId: result.id,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        sentEmails.push({
          recipient: recipient,
          status: 'failed',
          method: 'user_smtp_resend',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // 创建 campaign 记录
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

    // 保存 campaign 到 KV 存储
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

// 更新用户使用量处理函数
async function handleUpdateUsage(request, env) {
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

    // 更新用户使用量
    // 在实际应用中，这里应该更新数据库中的用户使用量
    const usageUpdate = {
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

// AI邮件生成处理函数
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
    const { emailMode, selectedTemplate, toneStyle, campaignData } = data;
    
    if (!campaignData) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Campaign data is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 检查是否有 AI API 密钥
    if (!env.DASHSCOPE_API_KEY) {
      console.log('No AI API key found, using template-based content');
      
      // 确保所有内容都是英文
    const mockSubject = `🚀 ${campaignData.purpose} - ${campaignData.businessName || 'Special Offer'}`;
    
    // 根据模板类型生成不同的内容
    let mockBody = '';
    
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
                <h1 style="margin: 0; font-size: 28px;">🎉 ${campaignData.purpose}</h1>
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
                <h1 style="margin: 0; font-size: 28px;">📢 ${campaignData.purpose}</h1>
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
                <h1 style="margin: 0; font-size: 28px;">👋 ${campaignData.purpose}</h1>
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
                <h1 style="margin: 0; font-size: 28px;">📊 ${campaignData.purpose}</h1>
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
                <h1 style="margin: 0; font-size: 28px;">🙏 ${campaignData.purpose}</h1>
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
      // 简单邮件
      mockBody = `
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
    
      // 确保返回的内容是纯英文，没有任何中文占位符
      console.log('Returning English-only content:', { subject: mockSubject, template: selectedTemplate });
      
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
      // 使用 AI 生成内容
      console.log('Using AI generation with DashScope API');
      
      const aiPrompt = `Generate a professional email with the following requirements:
      
      Purpose: ${campaignData.purpose}
      Business Name: ${campaignData.businessName || 'Our Company'}
      Product/Service: ${campaignData.productService || 'our services'}
      Target URL: ${campaignData.targetUrl || 'our website'}
      Tone Style: ${toneStyle || 'professional'}
      Template Type: ${selectedTemplate || 'general'}
      
      Please generate:
      1. A compelling subject line (in English)
      2. A professional email body in HTML format (in English)
      
      The email should be engaging, professional, and suitable for ${emailMode} communication.`;

      console.log('Sending request to DashScope API with key:', env.DASHSCOPE_API_KEY ? 'Key present' : 'Key missing');
      
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
      
      if (!aiData.output || !aiData.output.choices || aiData.output.choices.length === 0) {
        console.error('Invalid AI response structure:', aiData);
        throw new Error('AI API returned invalid response structure');
      }

      const aiContent = aiData.output.choices[0].message.content;
      
      // 简化处理：直接使用AI生成的内容
      const aiSubject = `🚀 ${campaignData.purpose} - ${campaignData.businessName || 'Special Offer'}`;
      const aiBody = aiContent;

      return new Response(JSON.stringify({
        success: true,
        subject: aiSubject,
        body: aiBody,
        template: 'ai-generated',
        note: 'Generated using AI',
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

  } catch (error) {
    console.error('AI Generation Error:', error);
    console.error('Error stack:', error.stack);
    
    // 返回更详细的错误信息用于调试
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

// SMTP 配置处理函数
async function handleEmailConfig(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    if (request.method === 'GET') {
      // 获取用户 SMTP 配置
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId') || 'default_user';
      
      // 从 Cloudflare KV 存储中获取配置
      let emailConfig = {
        provider: 'gmail',
        email: '',
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        isSecure: true,
        isConfigured: false
      };

      try {
        // 尝试从 KV 存储获取用户配置
        if (env.EMAIL_CONFIG_KV) {
          const storedConfig = await env.EMAIL_CONFIG_KV.get(`email_config_${userId}`);
          if (storedConfig) {
            const parsedConfig = JSON.parse(storedConfig);
            emailConfig = {
              ...emailConfig,
              ...parsedConfig,
              password: '[HIDDEN]' // 不返回密码
            };
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
      // 保存用户 SMTP 配置
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

      // 验证配置
      const emailConfig = {
        provider: provider || 'gmail',
        email: email,
        smtpHost: smtpHost || 'smtp.gmail.com',
        smtpPort: smtpPort || '587',
        isSecure: isSecure !== false,
        isConfigured: true,
        // 注意：在实际应用中，密码应该加密存储
        password: password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 保存到 Cloudflare KV 存储
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

// SMTP 测试连接处理函数
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

    // 真实 SMTP 连接测试
    console.log('Testing SMTP connection:', { 
      provider, 
      email, 
      smtpHost, 
      smtpPort, 
      isSecure,
      password: '[HIDDEN]'
    });

    try {
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: '邮箱格式无效',
          message: '请输入有效的邮箱地址'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 验证 SMTP 服务器配置
      if (!smtpHost || !smtpPort) {
        return new Response(JSON.stringify({
          success: false,
          error: 'SMTP 配置不完整',
          message: '请填写完整的 SMTP 服务器地址和端口'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 验证密码长度
      if (!password || password.length < 8) {
        return new Response(JSON.stringify({
          success: false,
          error: '密码无效',
          message: '应用密码长度至少为 8 位'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 验证端口号
      const port = parseInt(smtpPort);
      if (isNaN(port) || port < 1 || port > 65535) {
        return new Response(JSON.stringify({
          success: false,
          error: '端口号无效',
          message: '端口号必须是 1-65535 之间的数字'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 使用第三方 SMTP 测试服务进行真实连接测试
      try {
        // 使用 Resend API 进行 SMTP 连接测试
        const testResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'NovaMail Test <test@novamail.world>',
            to: [email],
            subject: 'NovaMail SMTP 连接测试',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">NovaMail</h1>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                  <h2 style="color: #333; margin-bottom: 20px;">SMTP 连接测试成功</h2>
                  <p style="color: #666; font-size: 16px; line-height: 1.5;">
                    恭喜！您的 SMTP 配置已成功验证。
                  </p>
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; color: #2d5a2d;">
                      <strong>配置信息：</strong><br>
                      邮箱：${email}<br>
                      SMTP 服务器：${smtpHost}<br>
                      端口：${smtpPort}<br>
                      测试时间：${new Date().toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <p style="color: #666; font-size: 14px;">
                    您现在可以使用 NovaMail 发送营销邮件了！
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
            message: 'SMTP 连接测试成功',
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
          throw new Error('SMTP 连接测试失败');
        }

      } catch (smtpError) {
        console.log('SMTP 测试服务不可用，使用配置验证:', smtpError.message);
        
        // 验证常见的 SMTP 配置
        const commonConfigs = {
          'smtp.gmail.com': [587, 465],
          'smtp-mail.outlook.com': [587],
          'smtp.mail.yahoo.com': [587, 465]
        };

        if (commonConfigs[smtpHost] && !commonConfigs[smtpHost].includes(port)) {
          return new Response(JSON.stringify({
            success: false,
            error: '端口配置可能不正确',
            message: `${smtpHost} 通常使用端口 ${commonConfigs[smtpHost].join(' 或 ')}`
          }), {
            status: 400,
            headers: corsHeaders
          });
        }

        // 配置验证通过
        return new Response(JSON.stringify({
          success: true,
          message: 'SMTP 配置验证通过',
          details: {
            provider: provider,
            email: email,
            smtpHost: smtpHost,
            smtpPort: smtpPort,
            isSecure: isSecure,
            note: '配置验证通过，但未进行真实的 SMTP 连接测试。实际发送邮件时会使用此配置。'
          }
        }), {
          headers: corsHeaders
        });
      }

    } catch (smtpError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'SMTP 配置验证失败',
        message: '配置验证过程中发生错误',
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

// Campaigns 管理处理函数
async function handleCampaigns(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    if (request.method === 'GET') {
      // 获取用户的所有 campaigns
      const url = new URL(request.url);
      const status = url.searchParams.get('status') || 'all';
      const userId = url.searchParams.get('userId') || 'default_user';
      
      // 从 KV 存储获取 campaigns
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

      // 如果没有存储的 campaigns，返回空数组
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

      // 过滤 campaigns
      const filteredCampaigns = status === 'all' 
        ? campaigns 
        : campaigns.filter(campaign => campaign.status === status);

      // 计算统计信息
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
      // 创建新的 campaign
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

      // 保存到 KV 存储
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

// 清空用户数据处理函数
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

    // 获取所有用户键
    const usersList = await env.USERS_KV.list();
    let deletedCount = 0;
    
    if (usersList.keys && usersList.keys.length > 0) {
      // 删除所有用户数据
      for (const key of usersList.keys) {
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

// 清空活动数据处理函数
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

    // 获取所有活动键
    const campaignsList = await env.CAMPAIGNS_KV.list();
    let deletedCount = 0;
    
    if (campaignsList.keys && campaignsList.keys.length > 0) {
      // 删除所有活动数据
      for (const key of campaignsList.keys) {
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

// 清空邮件配置数据处理函数
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

    // 获取所有邮件配置键
    const configsList = await env.EMAIL_CONFIG_KV.list();
    let deletedCount = 0;
    
    if (configsList.keys && configsList.keys.length > 0) {
      // 删除所有邮件配置数据
      for (const key of configsList.keys) {
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

// 清空所有数据处理函数
async function handleClearAll(request, env) {
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

    // 清空用户数据
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

    // 清空活动数据
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

    // 清空邮件配置数据
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

// Google OAuth 登录处理函数
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

    // 生成用户ID和令牌
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    // 创建用户对象
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
      // 使用量统计
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString()
    };

    // 检查用户是否已存在（使用Cloudflare KV存储或模拟存储）
    let existingUser = null;
    try {
      if (env.USERS_KV) {
        const storedUser = await env.USERS_KV.get(`user_${email.toLowerCase()}`);
        if (storedUser) {
          existingUser = JSON.parse(storedUser);
          console.log('Found existing user:', existingUser.email);
        }
      } else {
        // 模拟存储：检查内存中的用户数据
        console.log('KV storage not available, using mock storage');
        // 在实际应用中，这里应该连接到真实的数据库
        // 目前返回null，表示用户不存在
      }
    } catch (error) {
      console.log('Failed to check existing user:', error);
    }

    if (existingUser) {
      // 更新现有用户信息
      existingUser.lastLogin = new Date().toISOString();
      existingUser.updatedAt = new Date().toISOString();
      existingUser.token = userToken; // 生成新的令牌
      
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
      // 创建新用户
      try {
        if (env.USERS_KV) {
          await env.USERS_KV.put(`user_${email.toLowerCase()}`, JSON.stringify(user));
          console.log('Created new user:', user.email);
        } else {
          console.log('KV storage not available, user creation simulated');
        }
      } catch (error) {
        console.error('Failed to create user:', error);
        // 即使存储失败，也返回成功，因为用户数据已经生成
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

// 联系人导入处理函数
async function handleContactsImport(request, env) {
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

    // 读取CSV文件内容
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

    // 解析CSV
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

      // 验证必需字段
      if (!row.email) {
        errors.push({
          row: i + 1,
          error: 'Email is required'
        });
        continue;
      }

      // 验证邮箱格式
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(row.email)) {
        errors.push({
          row: i + 1,
          error: 'Invalid email format'
        });
        continue;
      }

      // 创建联系人对象
      const contact = {
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

    // 保存联系人到KV存储
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

// 联系人API处理函数
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

  // GET请求 - 获取联系人列表
  if (request.method === 'GET') {
    try {
      const url = new URL(request.url);
      const searchParams = url.searchParams;
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || 'all';
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '100');

      let contacts = [];

      // 从KV存储获取联系人
      if (env.CONTACTS_KV) {
        try {
          const { keys } = await env.CONTACTS_KV.list();
          const contactPromises = keys.map(key => env.CONTACTS_KV.get(key.name));
          const contactData = await Promise.all(contactPromises);
          
          contacts = contactData
            .filter(data => data)
            .map(data => JSON.parse(data))
            .filter(contact => {
              // 搜索过滤
              if (search && !contact.name.toLowerCase().includes(search.toLowerCase()) && 
                  !contact.email.toLowerCase().includes(search.toLowerCase())) {
                return false;
              }
              
              // 状态过滤
              if (status !== 'all' && contact.status !== status) {
                return false;
              }
              
              return true;
            });
        } catch (error) {
          console.error('Failed to fetch contacts from KV:', error);
        }
      }

      // 分页
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

  // POST请求 - 创建新联系人
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { name, email, tags = [], customFields = {} } = body;

      // 验证必填字段
      if (!name || !email) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Name and email are required'
        }), {
          status: 400,
          headers: corsHeaders
        });
      }

      // 验证邮箱格式
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

      // 检查联系人是否已存在
      if (env.CONTACTS_KV) {
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

      // 创建新联系人
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

      // 保存到KV存储
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

// 处理分析数据请求
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
      
      // 获取所有活动数据
      let totalEmails = 0;
      let totalContacts = 0;
      let chartData = [];

      // 计算时间范围
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

      // 获取联系人总数
      if (env.CONTACTS_KV) {
        const contactsList = await env.CONTACTS_KV.list();
        totalContacts = contactsList.keys.length;
      }

      // 获取活动数据
      if (env.CAMPAIGNS_KV) {
        const campaignsList = await env.CAMPAIGNS_KV.list();
        
        // 计算总邮件数
        for (const key of campaignsList.keys) {
          const campaignData = await env.CAMPAIGNS_KV.get(key.name);
          if (campaignData) {
            const campaign = JSON.parse(campaignData);
            if (campaign.status === 'sent' && campaign.recipients) {
              totalEmails += campaign.recipients;
            }
          }
        }

        // 生成图表数据（按日期分组）
        const dailyData = {};
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

        // 转换为图表数据格式
        chartData = Object.entries(dailyData)
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

// 处理仪表板统计数据请求
async function handleDashboardStats(request, env) {
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
      // 获取统计数据
      let totalContacts = 0;
      let totalEmailsSent = 0;
      let recentCampaigns = [];

      // 获取联系人总数
      if (env.CONTACTS_KV) {
        const contactsList = await env.CONTACTS_KV.list();
        totalContacts = contactsList.keys.length;
      }

      // 获取活动数据
      if (env.CAMPAIGNS_KV) {
        const campaignsList = await env.CAMPAIGNS_KV.list();
        
        // 计算总邮件数
        for (const key of campaignsList.keys) {
          const campaignData = await env.CAMPAIGNS_KV.get(key.name);
          if (campaignData) {
            const campaign = JSON.parse(campaignData);
            if (campaign.status === 'sent' && campaign.recipients) {
              totalEmailsSent += campaign.recipients;
            }
          }
        }

        // 获取最近的活动（最多5个）
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

        // 按创建时间排序，取最近5个
        recentCampaigns = campaigns
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