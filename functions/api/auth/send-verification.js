// 验证码发送端点
export async function onRequest(context) {
  var request = context.request;
  var env = context.env;
  
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
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
    var body = await request.json();
    var email = body.email;

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
    
    // 在实际应用中，这里应该：
    // 1. 发送邮件到用户邮箱
    // 2. 将验证码存储到数据库或缓存中
    // 3. 设置过期时间（如10分钟）
    
    // 暂时使用模拟发送
    console.log('Verification code for ' + email + ': ' + verificationCode);
    
    // 模拟邮件发送延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(JSON.stringify({
      success: true,
      message: 'Verification code sent successfully',
      email: email,
      code: verificationCode, // 在实际应用中不应该返回验证码
      note: 'This is a demo. In production, the code would be sent via email.',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Send verification error:', error);
    
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
