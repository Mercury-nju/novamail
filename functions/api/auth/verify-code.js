// 验证码验证端点
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
    var code = body.code;
    var userData = body.userData;

    if (!email || !code) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and verification code are required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 在实际应用中，这里应该：
    // 1. 从数据库或缓存中获取存储的验证码
    // 2. 检查验证码是否匹配
    // 3. 检查验证码是否过期
    // 4. 创建用户账户
    
    // 暂时使用模拟验证（接受任何6位数字）
    var isValidCode = /^\d{6}$/.test(code);
    
    if (!isValidCode) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid verification code format'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 模拟验证成功
    var userId = 'user_' + Date.now();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Account created successfully',
      user: {
        id: userId,
        email: email,
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        company: userData?.company || '',
        createdAt: new Date().toISOString()
      },
      token: 'demo_token_' + Date.now(), // 在实际应用中应该是JWT token
      note: 'This is a demo. In production, user data would be stored in database.',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Verify code error:', error);
    
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
