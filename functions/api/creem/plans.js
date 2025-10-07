// Creem计划获取端点
export async function onRequest(context) {
  var env = context.env;
  var apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  var baseUrl = env.CREEM_BASE_URL || 'https://api.creem.com/v1';
  
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // 暂时返回模拟数据，确保功能正常
  var mockPlans = [
    {
      id: 'free',
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        'Up to 500 contacts',
        'Up to 1,000 emails per month',
        'Basic email templates',
        'AI email generation',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      description: 'Best for growing businesses',
      price: 19,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        'Up to 10,000 contacts',
        'Up to 50,000 emails per month',
        'Advanced email templates',
        'AI email generation',
        'Advanced analytics',
        'Priority support',
        'Contact segmentation',
        'A/B testing'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      description: 'For large organizations',
      price: null,
      currency: 'USD',
      billingCycle: 'custom',
      features: [
        'Unlimited contacts',
        'Unlimited emails',
        'Custom email templates',
        'Advanced AI features',
        'Custom analytics',
        'Dedicated support',
        'Advanced segmentation',
        'API access',
        'Custom integrations'
      ]
    }
  ];

  try {
    // 尝试调用Creem API（暂时注释掉）
    /*
    var response = await fetch(baseUrl + '/plans', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Creem API request failed: ' + response.status);
    }

    var data = await response.json();
    */
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Plans retrieved successfully (using mock data)',
      plans: mockPlans,
      note: 'Using mock data while Creem API is being configured',
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    // 如果API调用失败，返回模拟数据
    return new Response(JSON.stringify({
      success: true,
      message: 'Plans retrieved successfully (fallback to mock data)',
      plans: mockPlans,
      note: 'Using mock data due to API error: ' + error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });
  }
}
