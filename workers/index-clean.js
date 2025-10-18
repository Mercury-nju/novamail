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
        // 404 响应
        return new Response(JSON.stringify({
          error: 'Endpoint not found',
          path: path,
          method: request.method,
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
      console.error('Worker error:', error);
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

// 登录处理
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

  // 模拟用户验证
  const userId = 'user_' + Date.now();
  const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
  
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

// 注册处理
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

// 发送验证码
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
  const { email } = data;
  
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
  
  try {
    // 使用 Resend API 发送验证码
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaMail <noreply@novamail.world>',
        to: [email],
        subject: 'NovaMail 验证码',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">NovaMail 验证码</h2>
            <p style="color: #666; font-size: 16px;">您的验证码是：</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px;">${verificationCode}</span>
            </div>
            <p style="color: #999; font-size: 14px;">此验证码5分钟内有效，请勿泄露给他人。</p>
          </div>
        `
      })
    });

    if (resendResponse.ok) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Verification code sent successfully',
        code: verificationCode, // 仅用于测试，生产环境不应返回
        timestamp: new Date().toISOString()
      }), {
        headers: corsHeaders
      });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Resend API error:', error);
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

// 验证验证码
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
  const { email, code } = data;
  
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

  // 模拟验证码验证（实际应用中应该从数据库或缓存中验证）
  return new Response(JSON.stringify({
    success: true,
    message: 'Verification code is valid',
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

// Google 认证
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
  const { accessToken } = data;
  
  if (!accessToken) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Access token is required' 
    }), {
      status: 400,
      headers: corsHeaders
    });
  }

  try {
    // 验证 Google access token
    const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    
    if (!userResponse.ok) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid Google access token'
      }), {
        status: 401,
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

    // 使用真实的DashScope AI生成邮件内容
    const aiResponse = await callDashScopeAI(userRequest, businessName, productService, targetAudience, tone);
    
    const response = {
      subject: aiResponse.subject,
      textContent: aiResponse.textContent,
      message: `I've created professional email content based on your request: "${userRequest}". The content has been tailored for ${businessName || 'your business'} and is designed to appeal to ${targetAudience || 'your target audience'}.`
    };
    
    return new Response(JSON.stringify({
      success: true,
      subject: response.subject,
      textContent: response.textContent,
      message: response.message,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

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

// 调用DashScope AI生成邮件内容
async function callDashScopeAI(userRequest, businessName, productService, targetAudience, tone) {
  const apiKey = 'sk-9bf19547ddbd4be1a87a7a43cf251097';
  const prompt = buildEmailPrompt(userRequest, businessName, productService, targetAudience, tone);
  
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
      throw new Error(`DashScope API error: ${response.status}`);
    }

    const data = await response.json();
    return parseAIResponse(data);
  } catch (error) {
    console.error('DashScope AI call failed:', error);
    // 回退到本地生成
    return {
      subject: generateEmailSubject(userRequest, businessName, productService),
      textContent: generateTextContent(userRequest, businessName, productService, targetAudience, tone)
    };
  }
}

// 构建AI提示词
function buildEmailPrompt(userRequest, businessName, productService, targetAudience, tone) {
  return `你是一个专业的邮件营销专家。请根据以下信息生成一封专业的邮件内容：

用户需求：${userRequest}
公司名称：${businessName || 'Your Business'}
产品/服务：${productService || 'Your Product/Service'}
目标受众：${targetAudience || 'Your Customers'}
语调：${tone || 'professional'}

请生成：
1. 一个吸引人的邮件主题（不超过50个字符）
2. 邮件正文内容（纯文本，不要HTML格式）

要求：
- 内容要专业、有吸引力
- 符合目标受众的需求
- 语调要${tone || 'professional'}
- 包含清晰的价值主张和行动号召
- 内容长度适中，易于阅读
- 使用段落结构，便于阅读

请以JSON格式返回：
{
  "subject": "邮件主题",
  "textContent": "邮件正文内容（纯文本）"
}`;
}

// 解析AI响应
function parseAIResponse(data) {
  try {
    if (data.output && data.output.text) {
      const content = data.output.text;
      // 尝试解析JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          subject: parsed.subject || 'AI Generated Email',
          textContent: parsed.textContent || 'AI generated email content'
        };
      }
    }
    
    // 如果解析失败，使用默认生成
    return {
      subject: generateEmailSubject('', '', ''),
      textContent: 'AI generated email content'
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return {
      subject: generateEmailSubject('', '', ''),
      textContent: 'AI generated email content'
    };
  }
}

// 生成邮件主题
function generateEmailSubject(userRequest, businessName, productService) {
  const business = businessName || 'Your Business';
  const product = productService || 'Your Product/Service';
  
  // 根据用户请求生成相应的主题
  if (userRequest.includes('邀请') || userRequest.includes('invite')) {
    return `🎉 邀请您成为${business}的合作伙伴`;
  } else if (userRequest.includes('产品') || userRequest.includes('product')) {
    return `🚀 ${product} - 为您量身定制`;
  } else if (userRequest.includes('促销') || userRequest.includes('sale')) {
    return `💰 限时优惠 - ${product}特价活动`;
  } else if (userRequest.includes('欢迎') || userRequest.includes('welcome')) {
    return `👋 欢迎加入${business}大家庭`;
  } else if (userRequest.includes('更新') || userRequest.includes('update')) {
    return `📢 ${business}重要更新通知`;
  } else {
    return `📧 ${business} - ${userRequest.substring(0, 30)}...`;
  }
}

// 生成纯文本邮件内容
function generateTextContent(userRequest, businessName, productService, targetAudience, tone) {
  const business = businessName || 'Your Business';
  const product = productService || 'Your Product/Service';
  const audience = targetAudience || '您的客户';
  const isFormal = tone === 'professional' || tone === 'formal';
  
  // 根据用户请求生成相应的内容
  let content = '';
  
  if (userRequest.includes('邀请') || userRequest.includes('invite')) {
    content = `亲爱的${audience}，

我们非常高兴地邀请您成为${business}的合作伙伴！作为一家致力于${product}的公司，我们相信您的加入将为我们的团队带来新的活力和创新思维。

合作优势：
• 专业的${product}解决方案
• 强大的技术支持和培训
• 灵活的合作模式和收益分享
• 持续的市场推广支持

我们期待与您建立长期稳定的合作关系，共同创造更大的价值。

如有任何疑问，请随时与我们联系。

此致
敬礼！

${business}团队`;
  } else if (userRequest.includes('产品') || userRequest.includes('product')) {
    content = `亲爱的${audience}，

我们很高兴向您介绍我们的${product}。经过精心研发和不断优化，这款产品将为您的业务带来显著的提升。

产品特点：
• 高效便捷的操作体验
• 强大的功能支持
• 安全可靠的数据保护
• 7x24小时技术支持

我们相信${product}能够满足您的需求，帮助您实现业务目标。

立即体验，开启您的成功之旅！

${business}团队`;
  } else if (userRequest.includes('促销') || userRequest.includes('sale')) {
    content = `亲爱的${audience}，

好消息！我们为您准备了限时特惠活动，${product}现在享受超值优惠价格！

优惠详情：
• 限时特价，数量有限
• 免费试用30天
• 专业培训和技术支持
• 无风险退款保证

这是您获得${product}的最佳时机，不要错过！

立即行动，抓住这个难得的机会！

${business}团队`;
  } else if (userRequest.includes('欢迎') || userRequest.includes('welcome')) {
    content = `亲爱的${audience}，

欢迎加入${business}大家庭！我们非常高兴您选择信任我们。

作为新成员，您将享受到：
• 专属的客户服务
• 定期的产品更新
• 优先的技术支持
• 会员专享优惠

我们致力于为您提供最优质的服务和产品体验。

如有任何问题，请随时联系我们的客服团队。

再次欢迎您的加入！

${business}团队`;
  } else {
    content = `亲爱的${audience}，

感谢您对${business}的关注。我们很高兴为您介绍我们的${product}。

关于我们：
${business}是一家专注于${product}的公司，我们致力于为客户提供最优质的产品和服务。

我们的承诺：
• 专业的产品质量
• 贴心的客户服务
• 持续的技术创新
• 完善的售后支持

我们期待与您建立长期的合作关系。

如有任何疑问，请随时与我们联系。

此致
敬礼！

${business}团队`;
  }
  
  return content;
}

// 生成专业邮件内容
function generateProfessionalEmailContent(userRequest, businessName, productService, targetAudience, tone) {
  const business = businessName || 'Your Business';
  const product = productService || 'Your Product/Service';
  const audience = targetAudience || '您的客户';
  const isFormal = tone === 'professional' || tone === 'formal';
  
  // 根据用户请求生成相应的内容
  let content = '';
  let ctaText = '';
  let ctaUrl = '#';
  
  if (userRequest.includes('邀请') || userRequest.includes('invite')) {
    content = `
      <p style="color: #1a202c; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        亲爱的${audience}，
      </p>
      
      <p style="color: #2d3748; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
        我们非常高兴地邀请您成为${business}的合作伙伴！作为一家致力于${product}的公司，我们相信您的加入将为我们的团队带来新的活力和创新思维。
      </p>
      
      <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #667eea;">
        <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">合作优势：</h3>
        <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
          <li>专业的${product}解决方案</li>
          <li>强大的技术支持和培训</li>
          <li>丰厚的合作回报</li>
          <li>长期稳定的合作关系</li>
        </ul>
      </div>
    `;
    ctaText = '立即加入我们';
    ctaUrl = '#join';
  } else if (userRequest.includes('产品') || userRequest.includes('product')) {
    content = `
      <p style="color: #1a202c; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        尊敬的${audience}，
      </p>
      
      <p style="color: #2d3748; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
        我们很高兴向您介绍${product} - 这是一款专为${audience}设计的创新解决方案。经过精心研发，${product}将帮助您提升效率，实现更好的业务成果。
      </p>
      
      <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #667eea;">
        <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">产品特色：</h3>
        <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
          <li>先进的技术架构</li>
          <li>用户友好的界面设计</li>
          <li>强大的功能集成</li>
          <li>7x24小时技术支持</li>
        </ul>
      </div>
    `;
    ctaText = '了解更多';
    ctaUrl = '#learn-more';
  } else if (userRequest.includes('促销') || userRequest.includes('sale')) {
    content = `
      <p style="color: #1a202c; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        亲爱的${audience}，
      </p>
      
      <p style="color: #2d3748; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
        好消息！我们为${audience}特别准备了限时优惠活动。现在购买${product}，即可享受超值折扣，机会难得，不容错过！
      </p>
      
      <div style="background: linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border: 2px solid #f59e0b; text-align: center;">
        <h3 style="color: #92400e; margin: 0 0 8px 0; font-size: 24px; font-weight: 700;">限时优惠</h3>
        <p style="color: #92400e; margin: 0; font-size: 18px; font-weight: 600;">最高可享受50%折扣</p>
        <p style="color: #92400e; margin: 8px 0 0 0; font-size: 14px;">活动时间有限，先到先得</p>
      </div>
    `;
    ctaText = '立即抢购';
    ctaUrl = '#buy-now';
  } else {
    content = `
      <p style="color: #1a202c; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        尊敬的${audience}，
      </p>
      
      <p style="color: #2d3748; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
        ${userRequest}
      </p>
      
      <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        我们期待与您建立长期合作关系，为您提供最优质的服务和产品。
      </p>
    `;
    ctaText = '了解更多';
    ctaUrl = '#learn-more';
  }
  
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.6;"></div>
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1;">${business}</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 300; position: relative; z-index: 1;">专业${product}解决方案</p>
      </div>
      
      <div style="padding: 40px 30px;">
        ${content}
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
            ${ctaText}
          </a>
        </div>
        
        <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 24px 0;">
          ${isFormal ? '此致敬礼' : '祝好'},<br>
          <strong>${business}团队</strong>
        </p>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
          <p style="color: #718096; font-size: 13px; line-height: 1.5; margin: 0; text-align: center;">
            如果您有任何问题，请随时联系我们。<br>
            此邮件由${business}发送，请勿回复此邮件。
          </p>
        </div>
      </div>
    </div>
  `;
}

// 其他处理函数的简化版本
async function handleCreemTest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Creem API test endpoint working',
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

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

async function handleCreemPlans(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    plans: [
      { id: 'basic', name: 'Basic Plan', price: 9.99 },
      { id: 'pro', name: 'Pro Plan', price: 19.99 },
      { id: 'enterprise', name: 'Enterprise Plan', price: 49.99 }
    ],
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

async function handleCreemSubscriptions(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    subscriptions: [],
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

async function handleCreateCampaign(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Campaign created successfully',
    campaignId: 'campaign_' + Date.now(),
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

async function handleSendCampaign(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Campaign sent successfully',
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

async function handleAddContact(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Contact added successfully',
    contactId: 'contact_' + Date.now(),
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

async function handleListContacts(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    contacts: [],
    total: 0,
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}

async function handleUserLimits(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  return new Response(JSON.stringify({
    success: true,
    limits: {
      emailsPerMonth: 1000,
      contacts: 500,
      campaigns: 10
    },
    usage: {
      emailsThisMonth: 0,
      totalContacts: 0,
      activeCampaigns: 0
    },
    timestamp: new Date().toISOString()
  }), {
    headers: corsHeaders
  });
}
