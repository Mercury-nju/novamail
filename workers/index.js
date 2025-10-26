// 🔧 完整版Cloudflare Workers - 包含所有API和管理员功能

// 简化的验证码发送函数 - 只使用Resend API
async function handleSendVerification(request, env) {
  console.log('🔧 修复版验证码发送函数 - 只使用Resend API');
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
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

    // 检查用户是否已存在
    let existingUser = null;
    try {
      const userKey = `user_${email.toLowerCase()}`;
      existingUser = await env.USERS_KV.get(userKey);
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
        status: 409,
        headers: corsHeaders
      });
    }

    // 生成验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('🔧 生成的验证码:', verificationCode);

    // 使用Resend API发送验证码
    console.log('📧 使用Resend API发送验证码到:', email);
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaMail <noreply@novamail.world>',
        to: email,
        subject: 'NovaMail 验证码 - 完成您的注册',
        html: `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NovaMail 验证码</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
        }
        .title {
            font-size: 24px;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
        }
        .verification-section {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .verification-title {
            color: white;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .verification-code {
            background: white;
            color: #1f2937;
            font-size: 32px;
            font-weight: bold;
            padding: 15px 30px;
            border-radius: 8px;
            letter-spacing: 4px;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .instructions {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .instructions h3 {
            color: #1f2937;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .instructions ul {
            margin: 0;
            padding-left: 20px;
        }
        .instructions li {
            margin-bottom: 8px;
            color: #4b5563;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .security-note {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            color: #92400e;
        }
        .security-note strong {
            color: #b45309;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">NovaMail</div>
            <h1 class="title">欢迎加入 NovaMail！</h1>
            <p class="subtitle">请使用以下验证码完成您的注册</p>
        </div>
        
        <div class="verification-section">
            <div class="verification-title">您的验证码</div>
            <div class="verification-code">${verificationCode}</div>
        </div>
        
        <div class="instructions">
            <h3>📋 使用说明：</h3>
            <ul>
                <li>请在注册页面输入上述验证码</li>
                <li>验证码有效期为 10 分钟</li>
                <li>如果验证码过期，请重新发送</li>
                <li>请勿将验证码告诉他人</li>
            </ul>
        </div>
        
        <div class="security-note">
            <strong>🔒 安全提示：</strong> 如果您没有注册 NovaMail 账户，请忽略此邮件。验证码仅用于账户验证，请勿泄露给他人。
        </div>
        
        <div class="footer">
            <p>此邮件由 NovaMail 系统自动发送，请勿回复。</p>
            <p>如有问题，请联系我们的客服团队。</p>
        </div>
    </div>
</body>
</html>`,
        text: `
NovaMail 验证码

欢迎加入 NovaMail！

您的验证码是：${verificationCode}

使用说明：
- 请在注册页面输入上述验证码
- 验证码有效期为 10 分钟
- 如果验证码过期，请重新发送
- 请勿将验证码告诉他人

安全提示：如果您没有注册 NovaMail 账户，请忽略此邮件。

此邮件由 NovaMail 系统自动发送，请勿回复。
如有问题，请联系我们的客服团队。
        `
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.log('❌ Resend API发送失败:', errorText);
      throw new Error(`Resend API error: ${errorText}`);
    }

    const resendResult = await resendResponse.json();
    console.log('✅ Resend API发送成功:', resendResult);

    // 保存验证码到KV存储
    const verificationKey = `verification_${email.toLowerCase()}`;
    const verificationData = {
      code: verificationCode,
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      attempts: 0,
      maxAttempts: 3
    };

    await env.USERS_KV.put(verificationKey, JSON.stringify(verificationData));
    console.log('✅ 验证码已保存到KV存储');

    return new Response(JSON.stringify({
      success: true,
      message: 'Verification code sent successfully',
      email: email,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 发送验证码失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send verification code',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 验证码验证函数
async function handleVerifyCode(request, env) {
  console.log('🔧 验证码验证函数');
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { email, code, firstName, lastName, password } = data;
    
    if (!email || !code) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email and verification code are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    if (!password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Password is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 验证验证码:', email, code);
    
    // 从KV存储获取验证码数据
    const verificationKey = `verification_${email.toLowerCase()}`;
    const verificationDataStr = await env.USERS_KV.get(verificationKey);
    
    if (!verificationDataStr) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Verification code not found or expired',
        message: 'Please request a new verification code'
      }), {
        status: 404,
        headers: corsHeaders
      });
    }

    const verificationData = JSON.parse(verificationDataStr);
    
    // 检查验证码是否匹配
    if (verificationData.code !== code) {
      // 增加尝试次数
      verificationData.attempts += 1;
      
      if (verificationData.attempts >= verificationData.maxAttempts) {
        // 超过最大尝试次数，删除验证码
        await env.USERS_KV.delete(verificationKey);
        return new Response(JSON.stringify({
          success: false,
          error: 'Too many failed attempts',
          message: 'Please request a new verification code'
        }), {
          status: 429,
          headers: corsHeaders
        });
      }
      
      // 更新尝试次数
      await env.USERS_KV.put(verificationKey, JSON.stringify(verificationData));
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid verification code',
        message: `Incorrect code. ${verificationData.maxAttempts - verificationData.attempts} attempts remaining`
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 验证码正确，创建用户账户
    console.log('✅ 验证码验证成功，创建用户账户');
    
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    const userData = {
      id: userId,
      email: email.toLowerCase(),
      name: firstName ? `${firstName} ${lastName || ''}`.trim() : email.split('@')[0],
      firstName: firstName || email.split('@')[0],
      lastName: lastName || '',
      password: password, // 保存用户设置的密码
      token: userToken,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString(),
      
      // 默认免费计划
      plan: 'free',
      subscriptionPlan: 'free',
      subscriptionStatus: 'active',
      subscriptionEndsAt: null,
      
      // 免费计划功能和限制
      features: {
        aiAccess: false,
        unlimitedContacts: false,
        unlimitedCampaigns: false,
        prioritySupport: false,
        analyticsDashboard: false,
      },
      
      // 积分和限制
      totalCredits: 1000,
      remainingCredits: 1000,
      monthlyCredits: 1000,
      emailLimit: 100,
    };
    
    // 保存用户数据到KV存储
    const userKey = `user_${email.toLowerCase()}`;
    await env.USERS_KV.put(userKey, JSON.stringify(userData));
    
    // 删除验证码数据
    await env.USERS_KV.delete(verificationKey);
    
    console.log('✅ 用户账户创建成功:', userKey);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        token: userData.token,
        plan: userData.plan,
        features: userData.features,
        totalCredits: userData.totalCredits,
        emailLimit: userData.emailLimit
      },
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 验证码验证失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to verify code',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 用户登录函数
async function handleLogin(request, env) {
  console.log('🔧 用户登录函数');
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
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

    console.log('🔧 用户登录:', email);
    
    // 从KV存储获取用户数据
    const userKey = `user_${email.toLowerCase()}`;
    const userDataStr = await env.USERS_KV.get(userKey);
    
    if (!userDataStr) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not found',
        message: 'Please register first'
      }), {
        status: 404,
        headers: corsHeaders
      });
    }

    const userData = JSON.parse(userDataStr);
    
    // 简单的密码验证（实际应用中应该使用哈希）
    if (userData.password !== password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid password',
        message: 'Incorrect password'
      }), {
        status: 401,
        headers: corsHeaders
      });
    }

    console.log('✅ 用户登录成功:', email);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Login successful',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        token: userData.token,
        plan: userData.plan,
        features: userData.features,
        totalCredits: userData.totalCredits,
        emailLimit: userData.emailLimit
      },
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 用户登录失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to login',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Google OAuth回调函数
async function handleGoogleCallback(request, env) {
  console.log('🔧 Google OAuth回调函数');
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
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

    console.log('🔧 Google OAuth回调处理:', code);
    
    // 这里应该处理Google OAuth token交换
    // 为了简化，我们创建一个模拟的用户账户
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    const userEmail = 'google.user@example.com'; // 实际应用中应该从Google API获取
    
    const userData = {
      id: userId,
      email: userEmail,
      name: 'Google User',
      firstName: 'Google',
      lastName: 'User',
      token: userToken,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString(),
      
      // 默认免费计划
      plan: 'free',
      subscriptionPlan: 'free',
      subscriptionStatus: 'active',
      subscriptionEndsAt: null,
      
      // 免费计划功能和限制
      features: {
        aiAccess: false,
        unlimitedContacts: false,
        unlimitedCampaigns: false,
        prioritySupport: false,
        analyticsDashboard: false,
      },
      
      // 积分和限制
      totalCredits: 1000,
      remainingCredits: 1000,
      monthlyCredits: 1000,
      emailLimit: 100,
    };
    
    // 保存用户数据到KV存储
    const userKey = `user_${userEmail.toLowerCase()}`;
    await env.USERS_KV.put(userKey, JSON.stringify(userData));
    
    console.log('✅ Google OAuth用户创建成功:', userKey);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Google OAuth login successful',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        token: userData.token,
        plan: userData.plan,
        features: userData.features,
        totalCredits: userData.totalCredits,
        emailLimit: userData.emailLimit
      },
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ Google OAuth回调失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process Google OAuth',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Creem订阅函数
async function handleCreemSubscriptions(request, env) {
  console.log('🔧 Creem订阅函数');
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { planId, customerEmail, billingCycle } = data;
    
    console.log('🔧 创建Creem订阅:', { planId, customerEmail, billingCycle });
    
    // 模拟Creem API调用
    const checkoutUrl = `https://creem.io/checkout?plan=${planId}&email=${customerEmail}&cycle=${billingCycle}`;
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription checkout URL generated',
      checkoutUrl: checkoutUrl,
      planId: planId,
      customerEmail: customerEmail,
      billingCycle: billingCycle,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ Creem订阅失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to create subscription',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 管理员API：设置用户高级会员权限
async function handleAdminSetPremium(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { email, duration, password, action } = data;
    
    if (!email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 管理员设置用户高级会员:', email, '期限:', duration || 365, '天');
    
    // 检查是否是密码更新操作
    if (action === 'update_password' && password) {
      console.log('🔧 更新用户密码:', email);
      
      // 查找现有用户
      const userKey = `user_${email.toLowerCase()}`;
      const existingUserData = await env.USERS_KV.get(userKey);
      
      if (existingUserData) {
        const user = JSON.parse(existingUserData);
        user.password = password;
        user.updatedAt = new Date().toISOString();
        
        await env.USERS_KV.put(userKey, JSON.stringify(user));
        
        console.log('✅ 用户密码更新成功:', email);
        
        return new Response(JSON.stringify({
          success: true,
          message: 'Password updated successfully',
          user: {
            email: user.email,
            name: user.name,
            plan: user.plan
          }
        }), {
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({
          success: false,
          error: 'User not found'
        }), {
          status: 404,
          headers: corsHeaders
        });
      }
    }
    
    // 创建用户数据
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    // 计算订阅结束时间
    const subscriptionEndsAt = new Date();
    subscriptionEndsAt.setDate(subscriptionEndsAt.getDate() + (duration || 365));
    
    const userData = {
      id: userId,
      email: email.toLowerCase(),
      name: email.split('@')[0],
      firstName: email.split('@')[0],
      lastName: '',
      password: 'default123', // 设置默认密码
      token: userToken,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString(),
      
      // 高级会员设置
      plan: 'premium',
      subscriptionPlan: 'premium',
      subscriptionStatus: 'active',
      subscriptionEndsAt: subscriptionEndsAt.toISOString(),
      
      // 高级会员功能和限制
      features: {
        aiAccess: true,
        unlimitedContacts: true,
        unlimitedCampaigns: true,
        prioritySupport: true,
        analyticsDashboard: true,
      },
      
      // 积分和限制
      totalCredits: 50000,
      remainingCredits: 50000,
      monthlyCredits: 50000,
      emailLimit: 10000,
    };
    
    // 保存用户数据到KV存储
    if (env.USERS_KV) {
      const userKey = `user_${email.toLowerCase()}`;
      await env.USERS_KV.put(userKey, JSON.stringify(userData));
      console.log('✅ 用户数据已保存到KV存储:', userKey);
    } else {
      console.log('⚠️ KV存储不可用，用户数据未保存');
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'User premium membership set successfully',
      user: {
        email: userData.email,
        plan: userData.plan,
        subscriptionPlan: userData.subscriptionPlan,
        subscriptionStatus: userData.subscriptionStatus,
        subscriptionEndsAt: userData.subscriptionEndsAt,
        monthlyCredits: userData.monthlyCredits,
        emailLimit: userData.emailLimit
      },
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });
    
  } catch (error) {
    console.error('❌ 设置用户高级会员失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to set user premium membership',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 主函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 处理CORS预检请求
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // 处理验证码发送
    if (path === '/api/auth/send-verification' && method === 'POST') {
      return await handleSendVerification(request, env);
    }

    // 处理验证码验证
    if (path === '/api/auth/verify-code' && method === 'POST') {
      return await handleVerifyCode(request, env);
    }

    // 处理用户登录
    if (path === '/api/auth/login' && method === 'POST') {
      return await handleLogin(request, env);
    }

    // 处理Google OAuth回调
    if (path === '/api/auth/google-callback' && method === 'POST') {
      return await handleGoogleCallback(request, env);
    }

    // 处理Creem订阅
    if (path === '/api/creem/subscriptions' && method === 'POST') {
      return await handleCreemSubscriptions(request, env);
    }

    // 处理管理员设置用户高级会员
    if (path === '/api/admin/set-user-premium' && method === 'POST') {
      return await handleAdminSetPremium(request, env);
    }

    // 其他路由
    return new Response(JSON.stringify({
      success: false,
      error: 'Endpoint not found',
      availableEndpoints: [
        '/api/auth/send-verification',
        '/api/auth/verify-code',
        '/api/auth/login',
        '/api/auth/google-callback',
        '/api/creem/subscriptions',
        '/api/admin/set-user-premium'
      ]
    }), {
      status: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }
};
