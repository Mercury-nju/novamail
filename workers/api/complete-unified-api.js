// Cloudflare Worker for Complete Unified NovaMail API
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const pathname = url.pathname
    
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }
      })
    }
    
    // 路由分发
    if (pathname.startsWith('/api/contacts') && !pathname.includes('/import')) {
      return handleContactsAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/campaigns')) {
      return handleCampaignsAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/analytics')) {
      return handleAnalyticsAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/ai/generate-email')) {
      return handleAIGenerateEmailAPI(request, env, ctx)
    } else if (pathname.startsWith('/api/contacts/import')) {
      return handleContactsImportAPI(request, env, ctx)
    }
    
    // 404 - 未找到路由
    return new Response(JSON.stringify({
      success: false,
      error: 'API endpoint not found'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// Contacts API处理
async function handleContactsAPI(request, env, ctx) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      const search = url.searchParams.get('search') || ''
      const status = url.searchParams.get('status') || 'all'
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '50')
      
      // 模拟从数据库获取联系人数据
      const mockContacts = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          status: 'active',
          tags: ['customer', 'vip'],
          lastContact: '2024-01-15',
          totalEmails: 12,
          openRate: 85,
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'active',
          tags: ['prospect'],
          lastContact: '2024-01-10',
          totalEmails: 8,
          openRate: 92,
          createdAt: '2024-01-02T00:00:00Z'
        }
      ]
      
      // 应用筛选
      let filteredContacts = mockContacts
      
      if (search) {
        filteredContacts = filteredContacts.filter(contact => 
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      if (status !== 'all') {
        filteredContacts = filteredContacts.filter(contact => contact.status === status)
      }
      
      // 分页
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedContacts = filteredContacts.slice(startIndex, endIndex)
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          contacts: paginatedContacts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(filteredContacts.length / limit),
            totalContacts: filteredContacts.length,
            hasNext: endIndex < filteredContacts.length,
            hasPrev: page > 1
          }
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Contacts API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch contacts',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      const { name, email, tags = [], customFields = {} } = body
      
      // 验证必填字段
      if (!name || !email) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Name and email are required'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
      
      // 验证邮箱格式
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
      
      // 创建新联系人
      const newContact = {
        id: `contact_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        status: 'active',
        tags: Array.isArray(tags) ? tags : [],
        customFields,
        lastContact: null,
        totalEmails: 0,
        openRate: 0,
        createdAt: new Date().toISOString()
      }
      
      console.log('New contact created:', newContact)
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Contact created successfully',
        data: newContact
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Create contact error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create contact',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
}

// Campaigns API处理
async function handleCampaignsAPI(request, env, ctx) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      const status = url.searchParams.get('status') || 'all'
      
      // 模拟从数据库获取活动数据
      const mockCampaigns = [
        {
          id: '1',
          name: 'Welcome Series - Part 1',
          subject: 'Welcome to NovaMail!',
          status: 'sent',
          recipients: 1250,
          sent: 1245,
          opened: 498,
          clicked: 87,
          createdAt: '2024-01-15T00:00:00Z',
          sentAt: '2024-01-15T10:00:00Z',
          content: '<div>Welcome email content...</div>'
        },
        {
          id: '2',
          name: 'Product Launch Announcement',
          subject: 'Introducing Our New Features',
          status: 'scheduled',
          recipients: 2100,
          sent: 0,
          opened: 0,
          clicked: 0,
          createdAt: '2024-01-20T00:00:00Z',
          scheduledAt: '2024-01-25T14:00:00Z',
          content: '<div>Product launch content...</div>'
        }
      ]
      
      // 应用状态筛选
      let filteredCampaigns = mockCampaigns
      if (status !== 'all') {
        filteredCampaigns = mockCampaigns.filter(campaign => campaign.status === status)
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          campaigns: filteredCampaigns,
          total: filteredCampaigns.length
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Campaigns API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch campaigns',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      const { name, subject, content, recipients, scheduledAt } = body
      
      // 验证必填字段
      if (!name || !subject || !content || !recipients) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Name, subject, content, and recipients are required'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
      
      // 创建新活动
      const newCampaign = {
        id: `campaign_${Date.now()}`,
        name: name.trim(),
        subject: subject.trim(),
        content: content,
        recipients: Array.isArray(recipients) ? recipients : [],
        status: scheduledAt ? 'scheduled' : 'draft',
        sent: 0,
        opened: 0,
        clicked: 0,
        createdAt: new Date().toISOString(),
        scheduledAt: scheduledAt || null,
        sentAt: null
      }
      
      console.log('New campaign created:', newCampaign)
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Campaign created successfully',
        data: newCampaign
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Create campaign error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create campaign',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
}

// Analytics API处理
async function handleAnalyticsAPI(request, env, ctx) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      const timeRange = url.searchParams.get('timeRange') || '30d'
      
      // 模拟从数据库获取分析数据
      const mockAnalytics = {
        totalEmails: 0,
        totalOpens: 0,
        totalClicks: 0,
        openRate: 0,
        clickRate: 0,
        unsubscribeRate: 0,
        bounceRate: 0,
        deliveryRate: 0,
        spamRate: 0
      }
      
      const mockChartData = []
      
      // 生成过去7天的图表数据
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        mockChartData.push({
          date: date.toISOString().split('T')[0],
          emails: 0,
          opens: 0,
          clicks: 0
        })
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          analytics: mockAnalytics,
          chartData: mockChartData,
          timeRange
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      
    } catch (error) {
      console.error('Analytics API Error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch analytics',
        details: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  // 处理 /api/billing 路由
  if (pathname === '/api/billing') {
    if (request.method === 'GET') {
      try {
        // 模拟从数据库获取用户订阅数据
        // 实际应用中应该根据用户ID查询数据库
        const mockBilling = {
          currentPlan: 'Free',
          monthlyEmails: 1000,
          emailsUsed: 0,
          nextBillingDate: '',
          amount: 0,
          status: 'active'
        }
        
        const mockInvoices = []
        
        return new Response(JSON.stringify({
          success: true,
          data: {
            billing: mockBilling,
            invoices: mockInvoices
          }
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to fetch billing data'
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      }
    }
  }
  
  return new Response('Method not allowed', { 
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
}

// AI Generate Email API处理（完整功能）
async function handleAIGenerateEmailAPI(request, env, ctx) {
  // 只处理POST请求
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const body = await request.json()
    const { 
      emailMode, 
      selectedTemplate, 
      campaignData 
    } = body

    const {
      purpose: campaignPurpose,
      businessName,
      productService,
      targetUrl
    } = campaignData

    // 检查API密钥
    if (!env.DASHSCOPE_API_KEY) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AI service is not configured. Please contact administrator.',
        fallback: true
      }), {
        status: 503,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // 构建AI提示词
    let systemPrompt = ""
    let userPrompt = ""

    if (emailMode === 'professional') {
      // 专业模板提示词
      const templateInstructions = {
        'modern-promo': {
          style: "modern promotional advertising style with gradients and bold design",
          tone: "exciting and urgent",
          structure: "gradient header, prominent headline, key benefits list, strong call-to-action button",
          goal: "drive immediate action through limited-time offers",
          colors: "blue to purple gradients, white text on colored backgrounds",
          elements: "gradient backgrounds, bold headlines, benefit boxes, prominent CTA buttons"
        },
        'newsletter': {
          style: "professional newsletter format with clean sections",
          tone: "informative and engaging",
          structure: "header with title, featured content sections, industry insights, read more links",
          goal: "share valuable information and maintain engagement",
          colors: "green and blue accents, clean white backgrounds",
          elements: "sectioned content, article previews, professional layout"
        },
        'ecommerce': {
          style: "product-focused e-commerce design with product showcases",
          tone: "appealing and persuasive",
          structure: "product showcase grid, pricing highlights, shopping incentives, discount banners",
          goal: "increase product awareness and sales conversions",
          colors: "orange and red gradients, product-focused design",
          elements: "product grids, discount badges, shopping CTAs, pricing highlights"
        },
        'event': {
          style: "invitation and event-focused design with welcoming elements",
          tone: "welcoming and excited",
          structure: "invitation header with emoji, event details box, RSVP buttons, welcoming design",
          goal: "attract attendance and generate RSVPs",
          colors: "pink and purple gradients, warm inviting colors",
          elements: "invitation cards, event detail boxes, RSVP buttons, welcoming emojis"
        }
      }

      const templateInfo = templateInstructions[selectedTemplate] || templateInstructions['modern-promo']

      systemPrompt = `You are an expert email marketing designer. Generate ONLY the email body content (no DOCTYPE, html, head, or body tags) in ${templateInfo.style}. 
      Create an email that achieves the goal: ${templateInfo.goal}.
      
      Requirements:
      - Generate ONLY the email body content (div container with content)
      - Use professional HTML email formatting with inline CSS
      - Follow email-safe design practices (max-width: 600px, web-safe fonts)
      - Use ${templateInfo.tone} tone of voice
      - Structure: ${templateInfo.structure}
      - Include proper email client compatibility
      - Make it mobile-responsive with appropriate styling
      - Start with <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      - End with </div>
      - Use ${templateInfo.colors} for color scheme
      - Include ${templateInfo.elements} as specified
      - Make it visually appealing and professional
      - Use modern email design with gradients, colors, and visual elements
      - Include call-to-action buttons with proper styling
      
      Generate ONLY the email body HTML content, no explanations or full HTML document.`

      userPrompt = `Create a natural, engaging ${templateInfo.style} email based on this information:
      
      Campaign Purpose: ${campaignPurpose}
      Business Name: ${businessName || 'Not specified'}
      Product/Service: ${productService || 'General offerings'}
      Target URL: ${targetUrl || 'No specific link'}
      
      Template Type: ${selectedTemplate}
      
      IMPORTANT: 
      - Write natural, engaging email content that flows well
      - Don't just list the information above - create a compelling narrative
      - Use the campaign purpose to craft an interesting story
      - Make it sound professional but conversational
      - Include relevant details about the business and offerings
      - Create a natural call-to-action that fits the context
      - Use the business name throughout the email naturally
      - Incorporate the product/service description into the content
      - Make the target URL feel natural in the call-to-action
      
      Use the target URL for call-to-action buttons if provided.
      Make it visually appealing with proper styling, colors, and layout.`

    } else {
      // 简单邮件提示词
      systemPrompt = `You are an expert email writer. Create ONLY the email body content (no DOCTYPE, html, head, or body tags) that follows proper email format. 
      
      Requirements:
      - Generate ONLY the email body content (div container with content)
      - Use proper email structure: greeting, body paragraphs, closing, signature
      - Use clean HTML email formatting with inline CSS
      - Keep it simple but professional (max-width: 600px)
      - Use web-safe fonts (Arial, sans-serif)
      - Include proper greeting (Dear [Name], or Hello,)
      - Include proper sign-off (Best regards, Sincerely, etc.)
      - Make it mobile-friendly
      - Start with <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      - End with </div>
      - NO buttons, NO call-to-action elements, NO fancy styling
      - Use proper paragraph breaks with <p> tags
      - Just clean, simple text content with basic formatting
      
      Generate ONLY the email body HTML content, no explanations or full HTML document.`

      userPrompt = `Write a natural, engaging simple email based on this information:
      
      Campaign Purpose: ${campaignPurpose}
      Business Name: ${businessName || 'Not specified'}
      Product/Service: ${productService || 'General offerings'}
      Target URL: ${targetUrl || 'No specific link'}
      
      IMPORTANT: 
      - Follow proper email format: greeting, body paragraphs, closing, signature
      - Start with a proper greeting (Dear [Name], or Hello,)
      - Write natural, engaging email content that flows well
      - Don't just list the information above - create a compelling narrative
      - Use the campaign purpose to craft an interesting story
      - Make it sound professional but conversational
      - Include relevant details about the business and offerings
      - Use the business name naturally throughout the email
      - Incorporate the product/service description into the content naturally
      - End with proper closing (Best regards, Sincerely, etc.) and signature
      - NO buttons, NO call-to-action elements, NO fancy styling
      - Use proper paragraph breaks with <p> tags
      - Just clean, simple text content with basic formatting
      - If you need to mention a link, just include it as plain text
      
      Create a straightforward email that clearly communicates the ${campaignPurpose}. Keep it simple and text-based with proper email structure.`
    }

    // 调用通义千问API生成邮件内容
    const contentResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    })

    if (!contentResponse.ok) {
      throw new Error(`Tongyi API error: ${contentResponse.status}`)
    }

    const contentResult = await contentResponse.json()
    let generatedContent = contentResult.output?.text

    if (!generatedContent) {
      throw new Error('No content generated from Tongyi')
    }

    // 清理HTML内容，确保只返回body内容
    generatedContent = generatedContent.trim()
    
    // 如果包含完整的HTML文档，提取body内容
    if (generatedContent.includes('<!DOCTYPE') || generatedContent.includes('<html')) {
      const bodyMatch = generatedContent.match(/<body[^>]*>([\s\S]*?)<\/body>/)
      if (bodyMatch) {
        generatedContent = bodyMatch[1].trim()
      }
    }
    
    // 清理不兼容的HTML标签，特别是标题中的font标签
    generatedContent = generatedContent
      .replace(/<h([1-6])[^>]*><font[^>]*>/gi, '<h$1>')
      .replace(/<\/font><\/h([1-6])>/gi, '</h$1>')
      .replace(/<font[^>]*>/gi, '<span>')
      .replace(/<\/font>/gi, '</span>')
      .replace(/<center[^>]*>/gi, '<div style="text-align: center;">')
      .replace(/<\/center>/gi, '</div>')
    
    // 如果内容不是以div开始，包装在div中
    if (!generatedContent.startsWith('<div')) {
      generatedContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">${generatedContent}</div>`
    }

    // 生成主题行
    const subjectResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            { 
              role: "system", 
              content: `你是一个专业的邮件主题行写作专家。生成吸引人、简洁的主题行来提高打开率。
              创建1个简短、吸引人的主题行（50字符以内）。
              只返回主题行，不要解释。` 
            },
            { 
              role: "user", 
              content: `为以下邮件写一个吸引人的主题行：
              邮件目的：${campaignPurpose}
              业务名称：${businessName || '普通业务'}
              产品服务：${productService || '通用服务'}
              模板风格：${emailMode === 'professional' ? selectedTemplate : 'simple'}
              
              请根据邮件目的和业务特点，生成一个吸引人、简洁的主题行（50字符以内）。`
            }
          ]
        },
        parameters: {
          temperature: 0.8,
          max_tokens: 100
        }
      })
    })

    if (!subjectResponse.ok) {
      throw new Error(`Tongyi API error: ${subjectResponse.status}`)
    }

    const subjectResult = await subjectResponse.json()
    const generatedSubject = subjectResult.output?.text?.trim() || `关于${campaignPurpose}的消息`

    return new Response(JSON.stringify({
      success: true,
      subject: generatedSubject,
      body: generatedContent,
      template: emailMode === 'professional' ? selectedTemplate : 'simple',
      generatedBy: '通义千问 qwen-turbo'
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

  } catch (error) {
    console.error('AI Generation Error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to generate email content',
      details: error.message
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// Contacts Import API处理（完整功能）
async function handleContactsImportAPI(request, env, ctx) {
  // 只处理POST请求
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const formData = await request.formData()
    const csvFile = formData.get('csvFile')
    
    if (!csvFile) {
      return new Response(JSON.stringify({
        success: false,
        message: 'CSV file is required'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // 读取CSV文件内容
    const csvText = await csvFile.text()
    const lines = csvText.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return new Response(JSON.stringify({
        success: false,
        message: 'CSV file must contain at least a header and one data row'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // 解析CSV
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const contacts = []
    const errors = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const row = {}
      
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })

      // 验证必填字段
      if (!row.email || !row.name) {
        errors.push({
          row: row,
          error: 'Missing required fields (name, email)'
        })
        continue
      }

      // 验证邮箱格式
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(row.email)) {
        errors.push({
          row: row,
          error: 'Invalid email format'
        })
        continue
      }

      contacts.push({
        name: row.name.trim(),
        email: row.email.toLowerCase().trim(),
        tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
        customFields: Object.keys(row)
          .filter(key => !['name', 'email', 'tags'].includes(key))
          .reduce((obj, key) => {
            obj[key] = row[key]
            return obj
          }, {})
      })
    }

    if (contacts.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'No valid contacts found in CSV file',
        errors
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // 模拟创建联系人（在实际应用中，这里应该保存到数据库）
    const createdContacts = contacts.map((contact, index) => ({
      id: `contact_${Date.now()}_${index}`,
      ...contact,
      status: 'active',
      createdAt: new Date().toISOString(),
      source: 'csv_import'
    }))

    return new Response(JSON.stringify({
      success: true,
      message: 'CSV import completed',
      data: {
        totalProcessed: contacts.length,
        created: createdContacts.length,
        duplicates: 0,
        errors: errors.length,
        contacts: createdContacts,
        duplicateEmails: [],
        importErrors: errors
      }
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

  } catch (error) {
    console.error('CSV import error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to import contacts from CSV',
      error: error.message
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
