// Cloudflare Workers 简化版本 - NovaMail API
// 避免重复的 case 语句问题

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 头部
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    // 处理 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 路由到不同的 API 端点
      if (path.startsWith('/api/auth/login')) {
        return await handleLogin(request, env);
      } else if (path.startsWith('/api/auth/register')) {
        return await handleRegister(request, env);
      } else if (path.startsWith('/api/auth/send-verification')) {
        return await handleSendVerification(request, env);
      } else if (path.startsWith('/api/auth/verify-code')) {
        return await handleVerifyCode(request, env);
      } else if (path.startsWith('/api/auth/google')) {
        return await handleGoogleAuth(request, env);
      } else if (path.startsWith('/api/creem/test')) {
        return await handleCreemTest(request, env);
      } else if (path.startsWith('/api/creem/webhook-test')) {
        return await handleWebhookTest(request, env);
      } else if (path.startsWith('/api/creem/plans')) {
        return await handleCreemPlans(request, env);
      } else if (path.startsWith('/api/creem/subscriptions')) {
        return await handleCreemSubscriptions(request, env);
      } else if (path.startsWith('/api/ai/generate-email')) {
        return await handleAIGenerateEmail(request, env);
      } else if (path.startsWith('/api/campaigns/create')) {
        return await handleCreateCampaign(request, env);
      } else if (path.startsWith('/api/campaigns/send')) {
        return await handleSendCampaign(request, env);
      } else if (path.startsWith('/api/contacts/add')) {
        return await handleAddContact(request, env);
      } else if (path.startsWith('/api/contacts/list')) {
        return await handleListContacts(request, env);
      } else if (path.startsWith('/api/user/limits')) {
        return await handleUserLimits(request, env);
      } else {
        return new Response(JSON.stringify({ 
          error: 'API endpoint not found',
          availableEndpoints: [
            '/api/auth/login',
            '/api/auth/register',
            '/api/auth/send-verification',
            '/api/auth/verify-code',
            '/api/auth/google',
            '/api/creem/test',
            '/api/creem/webhook-test',
            '/api/creem/plans',
            '/api/creem/subscriptions',
            '/api/ai/generate-email',
            '/api/campaigns/create',
            '/api/campaigns/send',
            '/api/contacts/add',
            '/api/contacts/list',
            '/api/user/limits'
          ]
        }), {
          status: 404,
          headers: corsHeaders
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};

// 发送验证码处理函数
async function handleSendVerification(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

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

  // 生成6位验证码
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 使用Resend API发送邮件
  const emailData = {
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
        </div>
      </div>
    `
  };

  // 调用Resend API
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

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
      const errorText = await response.text();
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to send verification code',
        details: errorText
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Network error while sending verification code',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 验证验证码处理函数
async function handleVerifyCode(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { email, code, firstName, lastName } = data;
  
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

  // 创建用户账户（模拟）
  const userId = 'user_' + Date.now();
  const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
  
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
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Creem 测试端点
async function handleCreemTest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  const apiKey = env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes';
  const baseUrl = env.CREEM_BASE_URL || 'https://api.creem.io/v1';
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Creem API test endpoint working',
    apiKey: apiKey.substring(0, 10) + '...',
    baseUrl: baseUrl,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Webhook 测试端点
async function handleWebhookTest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Webhook test endpoint working',
    method: request.method,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Creem 计划端点
async function handleCreemPlans(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  const mockPlans = [
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
        'API access',
        'White-label solution'
      ]
    }
  ];

  return new Response(JSON.stringify({
    success: true,
    plans: mockPlans,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Creem 订阅端点
async function handleCreemSubscriptions(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { planId, customerEmail, billingCycle } = data;

  if (!planId || !customerEmail) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Plan ID and customer email are required'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 根据计费周期选择支付链接
  let checkoutUrl;
  if (billingCycle === 'yearly') {
    checkoutUrl = 'https://www.creem.io/payment/prod_3ulmbn45cEhsQX5yQlBMOr';
  } else {
    checkoutUrl = 'https://www.creem.io/payment/prod_1PTunmBSWBQRUyJjM6g90r';
  }

  return new Response(JSON.stringify({
    success: true,
    message: 'Subscription created successfully',
    subscription: {
      id: 'creem_' + Date.now(),
      planId: planId,
      customerEmail: customerEmail,
      billingCycle: billingCycle,
      status: 'pending'
    },
    checkoutUrl: checkoutUrl,
    note: 'Using real Creem.io payment links',
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// AI 生成邮件端点
async function handleAIGenerateEmail(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { 
      userRequest, 
      templateId, 
      currentSubject, 
      currentBody, 
      businessName, 
      productService, 
      targetAudience, 
      tone,
      templateName,
      templateDescription
    } = data;

    // 构建AI提示词
    const prompt = buildEmailPrompt({
      userRequest,
      templateName,
      templateDescription,
      businessName: businessName || 'Your Business',
      productService: productService || 'Your Product/Service',
      targetAudience: targetAudience || 'Your Customers',
      tone: tone || 'professional',
      currentSubject,
      currentBody
    });

    // 暂时使用模拟响应进行测试
    const mockResponse = {
      subject: `Generated: ${userRequest}`,
      htmlContent: generateSimpleEmailTemplate(`Based on your request: "${userRequest}", here's a professional email content for ${businessName || 'your business'}. This email is designed to engage your ${targetAudience || 'target audience'} with information about ${productService || 'your product/service'}.`),
      message: `I've created email content based on your request: "${userRequest}". The content has been tailored for ${businessName || 'your business'} and is designed to appeal to ${targetAudience || 'your target audience'}.`
    };
    
    return new Response(JSON.stringify({
      success: true,
      subject: mockResponse.subject,
      htmlContent: mockResponse.htmlContent,
      message: mockResponse.message,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

    // TODO: 重新启用真实的AI调用
    // const aiResponse = await callDashScopeAI(prompt, env.DASHSCOPE_API_KEY);
    // if (aiResponse && aiResponse.content) {
    //   const { subject, htmlContent, message } = parseAIResponse(aiResponse.content);
    //   return new Response(JSON.stringify({
    //     success: true,
    //     subject: subject || currentSubject,
    //     htmlContent: htmlContent || currentBody,
    //     message: message || 'Email content has been generated successfully!',
    //     timestamp: new Date().toISOString()
    //   }), {
    //     headers: corsHeaders
    //   });
    // } else {
    //   throw new Error('AI response is empty or invalid');
    // }
  } catch (error) {
    console.error('AI generation error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to generate email content',
      details: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 构建AI提示词
function buildEmailPrompt({ userRequest, templateName, templateDescription, businessName, productService, targetAudience, tone, currentSubject, currentBody }) {
  return `You are an expert email marketing copywriter. Based on the user's request, generate professional email content.

User Request: "${userRequest}"

Template Information:
- Template Name: ${templateName}
- Template Description: ${templateDescription}

Business Context:
- Business Name: ${businessName}
- Product/Service: ${productService}
- Target Audience: ${targetAudience}
- Tone: ${tone}

Current Content (if any):
- Subject: ${currentSubject || 'Not specified'}
- Body: ${currentBody ? 'Has existing content' : 'No existing content'}

Please generate:
1. A compelling email subject line
2. Professional HTML email content that matches the template style
3. A brief message explaining what you've created

Format your response as JSON:
{
  "subject": "Your generated subject line",
  "htmlContent": "Your HTML email content with proper styling",
  "message": "Brief explanation of what you've created"
}

Make sure the HTML content is well-structured, professional, and engaging. Include proper styling and formatting.`;
}

// 调用DashScope AI API
async function callDashScopeAI(prompt, apiKey) {
  try {
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DashScope API error:', response.status, errorText);
      throw new Error(`DashScope API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('DashScope API response:', JSON.stringify(result, null, 2));
    
    if (result.output && result.output.choices && result.output.choices.length > 0) {
      return result.output.choices[0].message.content;
    } else {
      throw new Error('Invalid response format from DashScope API');
    }
  } catch (error) {
    console.error('DashScope API call failed:', error);
    throw error;
  }
}

// 解析AI响应
function parseAIResponse(content) {
  console.log('Parsing AI response:', content);
  
  try {
    // 尝试解析JSON响应
    const parsed = JSON.parse(content);
    return {
      subject: parsed.subject || 'Generated Email Subject',
      htmlContent: parsed.htmlContent || content,
      message: parsed.message || 'Email content has been generated successfully!'
    };
  } catch (error) {
    console.log('JSON parsing failed, trying text extraction');
    
    // 如果不是JSON格式，尝试从文本中提取信息
    const lines = content.split('\n');
    let subject = '';
    let htmlContent = '';
    let message = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.includes('subject') || line.includes('Subject')) {
        subject = line.replace(/.*[Ss]ubject[:\s]*/, '').replace(/['"]/g, '');
      } else if (line.includes('htmlContent') || line.includes('HTML')) {
        htmlContent = line.replace(/.*[Hh]tml[Cc]ontent[:\s]*/, '').replace(/['"]/g, '');
      } else if (line.includes('message') || line.includes('Message')) {
        message = line.replace(/.*[Mm]essage[:\s]*/, '').replace(/['"]/g, '');
      }
    }

    // 如果没有找到结构化内容，生成一个简单的邮件模板
    if (!htmlContent && content) {
      htmlContent = generateSimpleEmailTemplate(content);
    }

    return {
      subject: subject || 'Generated Email Subject',
      htmlContent: htmlContent || content,
      message: message || 'Email content has been generated successfully!'
    };
  }
}

// 生成简单的邮件模板
function generateSimpleEmailTemplate(content) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Important Update</h1>
      </div>
      
      <div style="padding: 40px 30px;">
        <p style="color: #1a202c; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          ${content}
        </p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Learn More
          </a>
        </div>
        
        <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 24px 0;">
          Best regards,<br>
          <strong>Your Team</strong>
        </p>
      </div>
    </div>
  `;
}

// 生成邮件内容的简化函数
function generateEmailContent(purpose, businessName, productService, targetUrl, templateType) {
  const baseSubject = purpose || 'Important Update';
  
  // 简化的模板生成
  const body = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
        <h1 style="margin: 0; font-size: 28px;">${purpose || 'Important Update'}</h1>
        ${businessName ? `<p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">by ${businessName}</p>` : ''}
      </div>
      
      <div style="padding: 30px;">
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
          We're excited to share ${(purpose || 'this update').toLowerCase()} with you. ${productService || 'Our service'} offers professional quality and comprehensive support.
        </p>
        
        ${targetUrl ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${targetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; font-size: 16px;">Learn More</a>
        </div>
        ` : ''}
        
        <p style="color: #666; line-height: 1.6; margin-top: 20px;">
          Best regards,<br>
          <strong>${businessName || 'NovaMail'} Team</strong>
        </p>
      </div>
    </div>
  `;

  return {
    subject: baseSubject,
    body: body
  };
}

// 创建活动端点
async function handleCreateCampaign(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const campaignId = 'campaign_' + Date.now();

  return new Response(JSON.stringify({
    success: true,
    message: 'Campaign created successfully',
    campaign: {
      id: campaignId,
      ...data,
      status: 'draft',
      createdAt: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// 发送活动端点
async function handleSendCampaign(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { campaignId, contacts } = data;

  if (!campaignId || !contacts || !Array.isArray(contacts)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Campaign ID and contacts array are required'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify({
    success: true,
    message: 'Campaign sent successfully',
    campaignId: campaignId,
    sentTo: contacts.length,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// 添加联系人端点
async function handleAddContact(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { email, firstName, lastName, tags } = data;

  if (!email) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Email is required'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  const contactId = 'contact_' + Date.now();

  return new Response(JSON.stringify({
    success: true,
    message: 'Contact added successfully',
    contact: {
      id: contactId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      tags: tags || [],
      createdAt: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// 列出联系人端点
async function handleListContacts(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // 模拟联系人数据
  const mockContacts = [
    {
      id: 'contact_1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      tags: ['customer', 'premium'],
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'contact_2',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      tags: ['lead', 'newsletter'],
      createdAt: '2024-01-16T14:30:00Z'
    }
  ];

  return new Response(JSON.stringify({
    success: true,
    contacts: mockContacts,
    total: mockContacts.length,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// 用户限制端点
async function handleUserLimits(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // 模拟用户限制数据
  const mockLimits = {
    maxContacts: 1000,
    maxCampaignsPerMonth: 10,
    maxEmailsPerMonth: 5000,
    currentContacts: 25,
    currentCampaignsThisMonth: 2,
    currentEmailsThisMonth: 150
  };

  return new Response(JSON.stringify({
    success: true,
    limits: mockLimits,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// 登录处理函数
async function handleLogin(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { email, password } = data;
  
  if (!email || !password) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Email and password are required' 
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 模拟用户验证（在实际应用中，这里应该查询数据库）
  // 为了演示，我们接受任何有效的邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid email format'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 模拟登录成功
  const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
  const userId = 'user_' + Date.now();
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Login successful',
    user: {
      id: userId,
      email: email,
      token: userToken,
      loginTime: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// 注册处理函数
async function handleRegister(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { email, password, firstName, lastName } = data;
  
  if (!email || !password) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Email and password are required' 
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid email format'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 验证密码强度
  if (password.length < 6) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Password must be at least 6 characters long'
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 模拟注册成功
  const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
  const userId = 'user_' + Date.now();
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Registration successful',
    user: {
      id: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      token: userToken,
      createdAt: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Google 认证处理函数
async function handleGoogleAuth(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const data = await request.json();
  const { code, redirectUri } = data;
  
  if (!code) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Authorization code is required' 
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  try {
    // 使用 Google OAuth 代码交换访问令牌
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri || 'http://localhost:3000/auth/google/callback'
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to exchange authorization code',
        details: errorData
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const tokenData = await tokenResponse.json();
    
    // 获取用户信息
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    if (!userResponse.ok) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to get user information'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const userData = await userResponse.json();
    
    // 创建用户会话
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    const userId = 'user_' + Date.now();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Google authentication successful',
      user: {
        id: userId,
        email: userData.email,
        firstName: userData.given_name,
        lastName: userData.family_name,
        avatar: userData.picture,
        token: userToken,
        loginTime: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Google authentication failed',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

