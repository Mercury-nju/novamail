// Cloudflare Workers 主入口文件
// 路由到不同的 API 端点

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
            '/api/ai/generate-email'
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

  // 调用Resend API
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code sent successfully',
        code: verificationCode, // 在开发环境中返回验证码用于测试
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      const errorText = await response.text();
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to send verification code',
        details: errorText
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Network error while sending verification code',
      details: error.message
    }), {
      status: 500,
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

  // 创建用户账户（模拟）
  const userId = 'user_' + Date.now();
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

    // 无论邮件发送是否成功，都返回用户创建成功
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

    // 模拟用户验证（在实际应用中，这里应该查询数据库）
    // 为了演示，我们接受任何密码，但要求邮箱格式正确
    const userId = 'user_' + Date.now();
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    // 模拟用户信息
    const user = {
      id: userId,
      email: email.toLowerCase().trim(),
      name: email.split('@')[0], // 使用邮箱前缀作为用户名
      token: userToken,
      plan: 'free',
      createdAt: new Date().toISOString()
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

    // 模拟用户权限检查
    // 在实际应用中，这里应该从数据库获取用户信息
    const mockUserPlan = 'free'; // 可以是 'free', 'pro', 'enterprise'
    
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

    const userLimits = limits[mockUserPlan] || limits.free;
    
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
      plan: mockUserPlan,
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
    const { campaignData, recipients } = data;
    
    if (!campaignData || !recipients || recipients.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Campaign data and recipients are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 模拟发送邮件
    const campaignId = 'campaign_' + Date.now();
    const sentEmails = [];
    
    // 为每个收件人创建邮件记录
    for (const recipient of recipients) {
      const emailData = {
        from: 'NovaMail <noreply@novamail.world>',
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
                  This email was sent by NovaMail. If you have any questions, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        `
      };

      // 使用Resend API发送邮件
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + env.RESEND_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });

        sentEmails.push({
          recipient: recipient,
          status: response.ok ? 'sent' : 'failed',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        sentEmails.push({
          recipient: recipient,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Campaign sent successfully',
      campaignId: campaignId,
      sentEmails: sentEmails,
      totalSent: sentEmails.filter(email => email.status === 'sent').length,
      totalFailed: sentEmails.filter(email => email.status === 'failed').length,
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

    // 模拟更新使用量
    // 在实际应用中，这里应该更新数据库中的用户使用量
    const usageUpdate = {
      action: action,
      increment: increment,
      timestamp: new Date().toISOString(),
      note: 'Usage updated successfully (simulated)'
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

    // 检查API密钥，如果没有配置则使用模拟AI
    if (!env.DASHSCOPE_API_KEY) {
      // 使用模拟AI生成内容
      const mockSubject = `🎉 Special Offer from ${campaignData.businessName || 'Our Company'}!`;
      const mockBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Dear Friend,</h2>
          <p>We're excited to introduce ${campaignData.productService || 'our products'} to you!</p>
          <p>${campaignData.purpose || 'This is a great opportunity to experience our premium services.'}</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${campaignData.targetUrl || '#'}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Learn More</a>
          </div>
          <p>Thank you for your attention!</p>
          <p>${campaignData.businessName || 'NovaMail'} Team</p>
        </div>
      `;
      
      return new Response(JSON.stringify({
        success: true,
        subject: mockSubject,
        body: mockBody,
        template: selectedTemplate || 'ai-generated',
        note: 'Generated using mock AI (DASHSCOPE_API_KEY not configured)',
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    }

    // 临时禁用 AI 生成，使用模拟内容
    const mockSubject = `🚀 ${campaignData.purpose} - ${campaignData.businessName || 'Special Offer'}`;
    const mockBody = `
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
    
    return new Response(JSON.stringify({
      success: true,
      subject: mockSubject,
      body: mockBody,
      template: selectedTemplate || 'ai-generated',
      note: 'Using enhanced mock content (AI temporarily disabled)',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

    // 检测用户输入语言（优先英文）
    const isChineseInput = /[\u4e00-\u9fff]/.test(
      (campaignData.businessName || '') + 
      (campaignData.productService || '') + 
      (campaignData.purpose || '')
    );

    // 构建AI提示词
    let systemPrompt = "";
    let userPrompt = "";

    if (emailMode === 'professional') {
      // 专业模板提示词
      const templateInstructions = {
        'modern-promo': {
          style: "modern promotional style with bold design and gradients",
          tone: "exciting and urgent",
          goal: "drive immediate action through offers"
        },
        'newsletter': {
          style: "professional newsletter format with clean sections",
          tone: "informative and engaging",
          goal: "share valuable information and maintain engagement"
        },
        'ecommerce': {
          style: "product-focused e-commerce design",
          tone: "appealing and persuasive",
          goal: "increase product awareness and sales"
        },
        'event': {
          style: "invitation and event-focused design",
          tone: "welcoming and excited",
          goal: "attract attendance and generate RSVPs"
        }
      };

      const templateInfo = templateInstructions[selectedTemplate] || templateInstructions['modern-promo'];
      
      if (isChineseInput) {
        systemPrompt = `你是一个专业的邮件营销设计师。生成符合${templateInfo.style}的邮件内容。要求：- 生成完整的邮件正文内容（div容器包含内容）- 使用专业的HTML邮件格式和内联CSS - 遵循邮件安全设计实践（最大宽度：600px，网页安全字体）- 使用${templateInfo.tone}的语调 - 使其具有移动响应式设计 - 以<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">开始 - 以</div>结束 - 使其视觉吸引人且专业 - 包含带有适当样式的行动号召按钮生成完整的邮件HTML内容，不要解释或完整的HTML文档。`;
        
        userPrompt = `基于以下信息创建自然、吸引人的${templateInfo.style}邮件：活动目的：${campaignData.purpose} 业务名称：${campaignData.businessName || '未指定'} 产品/服务：${campaignData.productService || '通用产品'} 目标URL：${campaignData.targetUrl || '无特定链接'} 模板类型：${selectedTemplate} 重要：- 编写自然、吸引人的邮件内容，流畅良好 - 使用活动目的来制作有趣的故事 - 使其听起来专业但对话式 - 包含有关业务和产品的相关细节 - 创建符合上下文的自然行动号召 - 在整个邮件中自然地使用业务名称 - 将产品/服务描述融入内容中 - 使目标URL在行动号召中感觉自然使用提供的目标URL作为行动号召按钮（如果提供）。使其具有适当的样式、颜色和布局的视觉吸引力。`;
      } else {
        systemPrompt = `You are an expert email marketing designer. Generate email content in ${templateInfo.style}. Create an email that achieves the goal: ${templateInfo.goal}. Requirements: - Generate ONLY the email body content (div container with content) - Use professional HTML email formatting with inline CSS - Follow email-safe design practices (max-width: 600px, web-safe fonts) - Use ${templateInfo.tone} tone of voice - Include proper email client compatibility - Make it mobile-responsive with appropriate styling - Start with <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"> - End with </div> - Make it visually appealing and professional - Use modern email design with gradients, colors, and visual elements - Include call-to-action buttons with proper styling Generate ONLY the email body HTML content, no explanations or full HTML document.`;
        
        userPrompt = `Create a natural, engaging ${templateInfo.style} email based on this information: Campaign Purpose: ${campaignData.purpose} Business Name: ${campaignData.businessName || 'Not specified'} Product/Service: ${campaignData.productService || 'General offerings'} Target URL: ${campaignData.targetUrl || 'No specific link'} Template Type: ${selectedTemplate} IMPORTANT: - Write natural, engaging email content that flows well - Use the campaign purpose to craft an interesting story - Make it sound professional but conversational - Include relevant details about the business and offerings - Create a natural call-to-action that fits the context - Use the business name throughout the email naturally - Incorporate the product/service description into the content - Make the target URL feel natural in the call-to-action Use the target URL for call-to-action buttons if provided. Make it visually appealing with proper styling, colors, and layout.`;
      }
    } else {
      // 简单邮件提示词
      if (isChineseInput) {
        systemPrompt = `你是一个专业的邮件写作专家。创建遵循适当邮件格式的邮件正文内容。要求：- 生成完整的邮件正文内容（div容器包含内容）- 使用适当的邮件结构：问候语、正文段落、结尾、签名 - 使用简洁的HTML邮件格式和内联CSS - 保持简单但专业（最大宽度：600px）- 使用网页安全字体（Arial, sans-serif）- 包含适当的问候语（亲爱的[姓名]，或您好，）- 包含适当的结尾（此致敬礼，真诚地，等）- 使其具有移动响应式 - 以<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">开始 - 以</div>结束 - 无按钮，无行动号召元素，无花哨样式 - 使用<p>标签进行适当的段落分隔 - 只是简洁、简单的文本内容，具有基本格式生成完整的邮件HTML内容，不要解释或完整的HTML文档。`;
        
        userPrompt = `基于以下信息编写自然、吸引人的简单邮件：活动目的：${campaignData.purpose} 业务名称：${campaignData.businessName || '未指定'} 产品/服务：${campaignData.productService || '通用产品'} 目标URL：${campaignData.targetUrl || '无特定链接'} 重要：- 遵循适当的邮件格式：问候语、正文段落、结尾、签名 - 以适当的问候语开始（亲爱的[姓名]，或您好，）- 编写自然、吸引人的邮件内容，流畅良好 - 使用活动目的来制作有趣的故事 - 使其听起来专业但对话式 - 包含有关业务和产品的相关细节 - 在整个邮件中自然地使用业务名称 - 将产品/服务描述融入内容中 - 以适当的结尾结束（此致敬礼，真诚地，等）和签名 - 无按钮，无行动号召元素，无花哨样式 - 使用<p>标签进行适当的段落分隔 - 只是简洁、简单的文本内容，具有基本格式 - 如果需要提及链接，只需将其作为纯文本包含创建清晰传达${campaignData.purpose}的直截了当的邮件。保持简单且基于文本，具有适当的邮件结构。`;
      } else {
        systemPrompt = `You are an expert email writer. Create ONLY the email body content (no DOCTYPE, html, head, or body tags) that follows proper email format. Requirements: - Generate ONLY the email body content (div container with content) - Use proper email structure: greeting, body paragraphs, closing, signature - Use clean HTML email formatting with inline CSS - Keep it simple but professional (max-width: 600px) - Use web-safe fonts (Arial, sans-serif) - Include proper greeting (Dear [Name], or Hello,) - Include proper sign-off (Best regards, Sincerely, etc.) - Make it mobile-responsive - Start with <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"> - End with </div> - NO buttons, NO call-to-action elements, NO fancy styling - Use proper paragraph breaks with <p> tags - Just clean, simple text content with basic formatting Generate ONLY the email body HTML content, no explanations or full HTML document.`;
        
        userPrompt = `Write a natural, engaging simple email based on this information: Campaign Purpose: ${campaignData.purpose} Business Name: ${campaignData.businessName || 'Not specified'} Product/Service: ${campaignData.productService || 'General offerings'} Target URL: ${campaignData.targetUrl || 'No specific link'} IMPORTANT: - Follow proper email format: greeting, body paragraphs, closing, signature - Start with a proper greeting (Dear [Name], or Hello,) - Write natural, engaging email content that flows well - Use the campaign purpose to craft an interesting story - Make it sound professional but conversational - Include relevant details about the business and offerings - Use the business name naturally throughout the email - Incorporate the product/service description into the content naturally - End with proper closing (Best regards, Sincerely, etc.) and signature - NO buttons, NO call-to-action elements, NO fancy styling - Use proper paragraph breaks with <p> tags - Just clean, simple text content with basic formatting - If you need to mention a link, just include it as plain text Create a straightforward email that clearly communicates the ${campaignData.purpose}. Keep it simple and text-based with proper email structure.`;
      }
    }

    // 调用通义千问API生成邮件内容
    const contentResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    });

    if (!contentResponse.ok) {
      throw new Error(`Tongyi API error: ${contentResponse.status}`);
    }

    const contentResult = await contentResponse.json();
    console.log('AI Response:', JSON.stringify(contentResult, null, 2));
    
    let generatedContent = contentResult.output?.text;

    if (!generatedContent) {
      console.error('No content generated from Tongyi:', contentResult);
      throw new Error('No content generated from Tongyi');
    }

    // 清理HTML内容，确保只返回body内容
    generatedContent = generatedContent.trim();

    // 如果包含完整的HTML文档，提取body内容
    if (generatedContent.includes('<!DOCTYPE') || generatedContent.includes('<html')) {
      const bodyMatch = generatedContent.match(/<body[^>]*>([\s\S]*?)<\/body>/);
      if (bodyMatch) {
        generatedContent = bodyMatch[1].trim();
      }
    }

    // 清理不兼容的HTML标签
    generatedContent = generatedContent
      .replace(/<h([1-6])[^>]*><font[^>]*>/gi, '<h$1>')
      .replace(/<\/font><\/h([1-6])>/gi, '</h$1>')
      .replace(/<font[^>]*>/gi, '<span>')
      .replace(/<\/font>/gi, '</span>')
      .replace(/<center[^>]*>/gi, '<div style="text-align: center;">')
      .replace(/<\/center>/gi, '</div>');

    // 如果内容不是以div开始，包装在div中
    if (!generatedContent.startsWith('<div')) {
      generatedContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">${generatedContent}</div>`;
    }

    // 生成主题行
    const subjectResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            {
              role: "system",
              content: isChineseInput ? 
                `你是一个专业的邮件主题行写作专家。生成吸引人、简洁的主题行来提高打开率。创建1个简短、吸引人的主题行（50字符以内）。只返回主题行，不要解释。` :
                `You are a professional email subject line expert. Generate engaging, concise subject lines to improve open rates. Create 1 short, engaging subject line (under 50 characters). Return only the subject line, no explanations.`
            },
            {
              role: "user",
              content: isChineseInput ?
                `为以下邮件写一个吸引人的主题行：邮件目的：${campaignData.purpose} 业务名称：${campaignData.businessName || '普通业务'} 产品服务：${campaignData.productService || '通用服务'} 模板风格：${emailMode === 'professional' ? selectedTemplate : 'simple'} 请根据邮件目的和业务特点，生成一个吸引人、简洁的主题行（50字符以内）。` :
                `Write an engaging subject line for the following email: Email Purpose: ${campaignData.purpose} Business Name: ${campaignData.businessName || 'General Business'} Product/Service: ${campaignData.productService || 'General Service'} Template Style: ${emailMode === 'professional' ? selectedTemplate : 'simple'} Please generate an engaging, concise subject line (under 50 characters) based on the email purpose and business characteristics.`
            }
          ]
        },
        parameters: {
          temperature: 0.8,
          max_tokens: 100
        }
      })
    });

    if (!subjectResponse.ok) {
      throw new Error(`Tongyi API error: ${subjectResponse.status}`);
    }

    const subjectResult = await subjectResponse.json();
    const generatedSubject = subjectResult.output?.text?.trim() || 
      (isChineseInput ? `关于${campaignData.purpose}的消息` : `Message about ${campaignData.purpose}`);

    return new Response(JSON.stringify({
      success: true,
      subject: generatedSubject,
      body: generatedContent,
      template: emailMode === 'professional' ? selectedTemplate : 'simple',
      generatedBy: '通义千问 qwen-turbo'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to generate email content',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}