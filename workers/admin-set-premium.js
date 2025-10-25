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

module.exports = { handleAdminSetPremium };
