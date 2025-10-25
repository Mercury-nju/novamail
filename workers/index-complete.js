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
        from: 'noreply@novamail.world',
        to: email,
        subject: 'Code', // 简化的主题
        html: `<p>Code: <strong>${verificationCode}</strong></p>`, // 最小化HTML
        text: `Code: ${verificationCode}` // 纯文本版本
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
    const { email, duration } = data;
    
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
        professionalTemplates: true,
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

    // 处理验证码发送
    if (path === '/api/auth/send-verification' && request.method === 'POST') {
      return await handleSendVerification(request, env);
    }

    // 处理管理员设置用户高级会员
    if (path === '/api/admin/set-user-premium' && request.method === 'POST') {
      return await handleAdminSetPremium(request, env);
    }

    // 其他路由
    return new Response(JSON.stringify({
      success: false,
      error: 'Endpoint not found',
      availableEndpoints: [
        '/api/auth/send-verification',
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
