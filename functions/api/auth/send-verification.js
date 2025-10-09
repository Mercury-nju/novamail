// 发送验证码的Cloudflare Workers函数
export function onRequest(context) {
  var request = context.request;
  var env = context.env;
  
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  return request.json().then(function(data) {
    var email = data.email;
    
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
    var verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 使用Resend API发送邮件
    var emailData = {
      from: 'NovaMail <noreply@novamail.com>',
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
    return fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    }).then(function(response) {
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
        return response.text().then(function(errorText) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Failed to send verification code',
            details: errorText
          }), {
            status: 500,
            headers: corsHeaders
          });
        });
      }
    }).catch(function(error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Network error while sending verification code',
        details: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    });
  }).catch(function(error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid request data',
      details: error.message
    }), {
      status: 400,
      headers: corsHeaders
    });
  });
}