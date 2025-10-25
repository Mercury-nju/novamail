// 🔧 只使用Gmail SMTP发送验证码 - 确保投递成功

// 使用Gmail SMTP发送邮件
async function sendViaGmailSMTP(email, verificationCode, env) {
  try {
    console.log('📤 使用Gmail SMTP发送验证码邮件');
    
    // 检查Gmail配置
    if (!env.GMAIL_SMTP_USER || !env.GMAIL_SMTP_PASS) {
      throw new Error('Gmail SMTP not configured');
    }
    
    // 使用Gmail SMTP发送邮件
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: env.GMAIL_SMTP_USER,
        pass: env.GMAIL_SMTP_PASS
      }
    });
    
    const mailOptions = {
      from: env.GMAIL_SMTP_USER,
      to: email,
      subject: 'Verification Code',
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
      text: `Your verification code is: ${verificationCode}`
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Gmail SMTP发送成功:', result.messageId);
    
    return {
      success: true,
      id: result.messageId,
      provider: 'Gmail SMTP'
    };
    
  } catch (error) {
    console.log('❌ Gmail SMTP发送失败:', error.message);
    return {
      success: false,
      error: error.message,
      provider: 'Gmail SMTP'
    };
  }
}

// 简化的验证码发送函数 - 只使用Gmail SMTP
async function handleSendVerification(request, env) {
  console.log('🔧 Gmail SMTP验证码发送函数');
  
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
      existingUser = await env.USERS_KV.get(email);
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
    
    console.log('🔧 使用Gmail SMTP发送验证码邮件');
    console.log('📧 收件人:', email);
    console.log('🔑 验证码:', verificationCode);
    
    // 使用Gmail SMTP发送邮件
    const result = await sendViaGmailSMTP(email, verificationCode, env);
    
    if (result.success) {
      console.log('🎉 验证码邮件通过Gmail SMTP发送成功');
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code sent via Gmail SMTP',
        code: verificationCode,
        provider: 'Gmail SMTP'
      }), {
        headers: corsHeaders
      });
    } else {
      console.log('❌ Gmail SMTP发送失败');
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Gmail SMTP failed',
        details: result.error,
        code: verificationCode // 仍然返回验证码供测试使用
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
    
  } catch (error) {
    console.error('❌ 验证码发送错误:', error);
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

// 主处理函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 验证码发送
    if (url.pathname === '/api/auth/send-verification') {
      return handleSendVerification(request, env);
    }
    
    // 其他API路由...
    
    return new Response('Not Found', { status: 404 });
  }
};
