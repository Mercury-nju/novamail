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
        // 返回可用端点列表
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

// AI邮件生成处理函数
async function handleAIGenerateEmail(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const data = await request.json();
    const { userRequest, businessName, productService, targetAudience } = data;

    if (!userRequest || typeof userRequest !== 'string') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid request: userRequest is required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 生成AI对话响应
    const aiResponse = generateAIResponse(userRequest, businessName, productService, targetAudience);
    
    return new Response(JSON.stringify({
      success: true,
      message: aiResponse.response,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate email content. Please try again.',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// AI对话响应生成函数
function generateAIResponse(userRequest, businessName, productService, targetAudience) {
  const request = userRequest.toLowerCase()
  
  const business = businessName || 'Your Business'
  const product = productService || 'Your Product/Service'
  const audience = targetAudience || 'Valued Customer'
  
  let response = ''
  
  if (request.includes('subject line') || request.includes('subject lines')) {
    response = `Great question about email subject lines! Here are some proven strategies to improve your open rates:

**Power Words That Work:**
• "Exclusive" - creates urgency and FOMO
• "Free" - always catches attention
• "New" - suggests fresh content
• "Limited" - creates scarcity
• "You" - personalizes the message

**Best Practices:**
• Keep it under 50 characters for mobile
• Use numbers and emojis sparingly
• A/B test different approaches
• Avoid spam trigger words
• Make it relevant to your audience

**Examples for ${business}:**
• "Exclusive: New ${product} Features (Just for You)"
• "Limited Time: 50% Off ${product}"
• "You're Invited: ${business} VIP Event"

Would you like me to help you create specific subject lines for your upcoming campaign?`
  } else if (request.includes('marketing strateg') || request.includes('strategies')) {
    response = `Excellent question! Here are the most effective email marketing strategies for ${business}:

**1. Segmentation is Key:**
• Divide your list by demographics, behavior, and preferences
• Send targeted content to each segment
• Personalize subject lines and content

**2. Automation Workflows:**
• Welcome series for new subscribers
• Abandoned cart recovery
• Birthday and anniversary emails
• Re-engagement campaigns

**3. Content Strategy:**
• 80% valuable content, 20% promotional
• Educational content builds trust
• User-generated content increases engagement
• Behind-the-scenes content humanizes your brand

**4. Timing & Frequency:**
• Test different send times for your audience
• Tuesday-Thursday typically perform best
• Start with weekly, adjust based on engagement
• Respect unsubscribe requests immediately

**5. Mobile Optimization:**
• 60%+ of emails are opened on mobile
• Use single-column layouts
• Large, tappable buttons
• Short, scannable content

What specific aspect of email marketing would you like to dive deeper into?`
  } else if (request.includes('open rate') || request.includes('open rates')) {
    response = `Great question! Here are proven strategies to boost your email open rates:

**Immediate Improvements:**
• Clean your email list regularly (remove inactive subscribers)
• Use double opt-in to ensure quality subscribers
• Segment your audience for targeted messaging
• Test different send times (Tuesday-Thursday, 10-11 AM often work best)

**Subject Line Optimization:**
• Keep it under 50 characters
• Use personalization (first name, location)
• Create urgency without being spammy
• Ask questions to spark curiosity
• Use emojis strategically (not in every email)

**Sender Reputation:**
• Use a consistent "From" name and email
• Maintain a clean IP reputation
• Avoid spam trigger words
• Include clear unsubscribe options
• Monitor bounce rates and complaints

**Content Quality:**
• Deliver value in every email
• Match subject line to content
• Use preview text effectively
• Mobile-optimize everything
• Test different content formats

**Industry Benchmarks:**
• Average open rate: 20-25%
• Good open rate: 25-30%
• Excellent open rate: 30%+

What's your current open rate, and which area would you like to focus on improving first?`
  } else if (request.includes('content idea') || request.includes('content ideas')) {
    response = `Here are some engaging email content ideas for ${business}:

**Educational Content:**
• "How-to" guides related to ${product}
• Industry insights and trends
• Case studies and success stories
• Tips and best practices
• FAQ series addressing common questions

**Behind-the-Scenes:**
• Team introductions and company culture
• Product development process
• Office tours or virtual events
• Customer testimonials and reviews
• Company milestones and achievements

**Interactive Content:**
• Polls and surveys
• Quizzes related to your industry
• Contests and giveaways
• User-generated content features
• Interactive product demos

**Seasonal & Event-Based:**
• Holiday-themed content
• Industry conference recaps
• Seasonal product recommendations
• Anniversary celebrations
• New year goal-setting content

**Value-Driven Content:**
• Exclusive discounts and offers
• Early access to new features
• Free resources and templates
• Webinar invitations
• Industry reports and whitepapers

**Pro Tips:**
• Mix content types to keep subscribers engaged
• Use storytelling to make content memorable
• Include clear calls-to-action
• Test different content formats
• Track engagement metrics

What type of content resonates most with your audience? I can help you develop specific ideas!`
  } else {
    // 通用对话响应
    response = `Thanks for reaching out! I'm here to help you with email marketing strategies and content ideas for ${business}.

Here are some ways I can assist you:

**Email Marketing Strategy:**
• Subject line optimization
• List segmentation advice
• Automation workflow planning
• A/B testing recommendations

**Content Creation:**
• Email template suggestions
• Content calendar planning
• Engagement tactics
• Industry best practices

**Performance Optimization:**
• Open rate improvement
• Click-through rate enhancement
• Deliverability tips
• Analytics interpretation

**Quick Wins:**
• Mobile optimization checklist
• Spam filter avoidance
• Personalization techniques
• Timing optimization

What specific aspect of email marketing would you like to explore? Feel free to ask me anything about:
• Writing compelling subject lines
• Creating engaging content
• Building effective campaigns
• Measuring success metrics

I'm here to help you succeed with your email marketing efforts! 🚀`
  }
  
  return { response }
}

// 其他处理函数的简化版本
async function handleLogin(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({
    success: true,
    message: 'Login endpoint - implementation needed'
  }), {
    headers: corsHeaders
  });
}

async function handleRegister(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({
    success: true,
    message: 'Register endpoint - implementation needed'
  }), {
    headers: corsHeaders
  });
}

async function handleSendVerification(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({
    success: true,
    message: 'Send verification endpoint - implementation needed'
  }), {
    headers: corsHeaders
  });
}

async function handleVerifyCode(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({
    success: true,
    message: 'Verify code endpoint - implementation needed'
  }), {
    headers: corsHeaders
  });
}

async function handleGoogleAuth(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({
    success: true,
    message: 'Google auth endpoint - implementation needed'
  }), {
    headers: corsHeaders
  });
}

async function handleCreemTest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({
    success: true,
    message: 'Creem test endpoint - implementation needed'
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
    message: 'Webhook test endpoint - implementation needed'
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
    message: 'Creem plans endpoint - implementation needed'
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
    message: 'Creem subscriptions endpoint - implementation needed'
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
    message: 'Create campaign endpoint - implementation needed'
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
    message: 'Send campaign endpoint - implementation needed'
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
    message: 'Add contact endpoint - implementation needed'
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
    message: 'List contacts endpoint - implementation needed'
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
    message: 'User limits endpoint - implementation needed'
  }), {
    headers: corsHeaders
  });
}
