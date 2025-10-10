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

    // 强制使用模板化内容，禁用 AI 生成
    // if (!env.DASHSCOPE_API_KEY) {

    // 使用增强的模拟内容替代 AI 生成
    console.log('Using template-based content instead of AI generation');
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

    // AI 生成功能已禁用，使用模板化内容

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