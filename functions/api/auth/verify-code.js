// 验证验证码的Cloudflare Workers函数
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
    var code = data.code;
    var firstName = data.firstName;
    var lastName = data.lastName;
    
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

    // 在实际应用中，这里应该验证验证码是否正确
    // 目前我们接受任何6位数字作为有效验证码
    // 在生产环境中，应该与发送时生成的验证码进行比较
    
    // 创建用户账户（模拟）
    var userId = 'user_' + Date.now();
    var userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    // 发送欢迎邮件
    var welcomeEmailData = {
      from: 'NovaMail <welcome@novamail.com>',
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
              <a href="https://novamail.pages.dev/dashboard" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
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
    return fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(welcomeEmailData)
    }).then(function(response) {
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
    }).catch(function(error) {
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