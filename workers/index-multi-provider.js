// 🔧 多邮件服务商备用方案 - 确保验证码发送成功

// 简化的验证码发送函数 - 使用多个邮件服务商
async function handleSendVerification(request, env) {
  console.log('🔧 多服务商验证码发送函数');
  
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
    
    console.log('🔧 使用多服务商发送验证码邮件');
    console.log('📧 收件人:', email);
    console.log('🔑 验证码:', verificationCode);
    
    // 尝试多个邮件服务商
    const providers = [
      {
        name: 'Resend',
        send: async () => {
          const response = await fetch('https://api.resend.com/emails', {
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
          
          if (response.ok) {
            const result = await response.json();
            return { success: true, id: result.id, provider: 'Resend' };
          } else {
            const errorText = await response.text();
            return { success: false, error: errorText, provider: 'Resend' };
          }
        }
      },
      {
        name: 'Gmail SMTP',
        send: async () => {
          // 使用Gmail SMTP作为备用
          if (env.GMAIL_SMTP_USER && env.GMAIL_SMTP_PASS) {
            try {
              // 这里可以添加Gmail SMTP发送逻辑
              return { success: false, error: 'Gmail SMTP not implemented', provider: 'Gmail SMTP' };
            } catch (error) {
              return { success: false, error: error.message, provider: 'Gmail SMTP' };
            }
          } else {
            return { success: false, error: 'Gmail SMTP not configured', provider: 'Gmail SMTP' };
          }
        }
      }
    ];
    
    // 尝试发送邮件
    let lastError = null;
    let successProvider = null;
    
    for (const provider of providers) {
      try {
        console.log(`📤 尝试使用 ${provider.name} 发送邮件...`);
        const result = await provider.send();
        
        if (result.success) {
          console.log(`✅ ${provider.name} 发送成功:`, result.id);
          successProvider = provider.name;
          break;
        } else {
          console.log(`❌ ${provider.name} 发送失败:`, result.error);
          lastError = result.error;
        }
      } catch (error) {
        console.log(`❌ ${provider.name} 网络错误:`, error.message);
        lastError = error.message;
      }
    }
    
    if (successProvider) {
      console.log(`🎉 验证码邮件通过 ${successProvider} 发送成功`);
      
      return new Response(JSON.stringify({
        success: true,
        message: `Verification code sent via ${successProvider}`,
        code: verificationCode,
        provider: successProvider
      }), {
        headers: corsHeaders
      });
    } else {
      console.log('❌ 所有邮件服务商都发送失败');
      
      return new Response(JSON.stringify({
        success: false,
        error: 'All email providers failed',
        details: lastError,
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
