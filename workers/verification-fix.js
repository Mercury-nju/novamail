// 简化的验证码发送函数 - 只使用Resend API
async function handleSendVerification(request, env) {
  console.log('handleSendVerification called with method:', request.method);
  
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

module.exports = { handleSendVerification };
