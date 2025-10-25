// 🔧 修复版Cloudflare Workers - 包含管理员API

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
        status: 400,
        headers: corsHeaders
      });
    }

    // 生成6位验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log('🔧 使用Resend API发送验证码邮件');
    console.log('📧 收件人:', email);
    console.log('🔑 验证码:', verificationCode);
    
    // 直接使用Resend API发送验证码邮件
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@novamail.world',
        to: email,
        subject: 'Code',
        html: `<p>Code: <strong>${verificationCode}</strong></p>`,
        text: `Code: ${verificationCode}`
      })
    });
    
    if (resendResponse.ok) {
      const result = await resendResponse.json();
      console.log('✅ 验证码邮件通过Resend API发送成功:', result.id);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code sent successfully via Resend API',
        code: verificationCode,
        messageId: result.id,
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      const errorText = await resendResponse.text();
      console.error('❌ Resend API错误:', resendResponse.status, errorText);
      
      // 如果Resend失败，返回错误信息
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to send verification code via Resend API',
        details: `Resend API Error: ${resendResponse.status} - ${errorText}`,
        code: verificationCode,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  } catch (error) {
    console.error('❌ Resend API发送验证码失败:', error);
    
    // 如果Resend API失败，返回错误信息
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send verification code via Resend API',
      details: error.message,
      timestamp: new Date().toISOString()
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
    const { email, userData } = data;
    
    if (!email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 管理员设置用户高级会员:', email);
    
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

// 简化的主函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 处理验证码发送
    if (path === '/api/auth/send-verification' && request.method === 'POST') {
      return await handleSendVerification(request, env);
    }

    // 处理管理员设置用户高级会员
    if (path === '/api/admin/set-premium' && request.method === 'POST') {
      return await handleAdminSetPremium(request, env);
    }

    // 其他路由保持不变
    return new Response(JSON.stringify({
      success: false,
      error: 'Endpoint not found',
      availableEndpoints: [
        '/api/auth/send-verification',
        '/api/admin/set-premium'
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
