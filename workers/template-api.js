// 模板管理API - 保存和加载DIY模板

// 保存模板
async function handleSaveTemplate(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { templateId, templateData, userId } = data;
    
    if (!templateId || !templateData || !userId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Template ID, template data, and user ID are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 保存模板:', templateId, '用户:', userId);
    
    // 创建模板数据
    const template = {
      id: templateId,
      userId: userId,
      name: templateData.name || 'Untitled Template',
      description: templateData.description || '',
      category: templateData.category || 'custom',
      content: templateData.content || [],
      globalStyles: templateData.globalStyles || {},
      html: templateData.html || '',
      isPublic: templateData.isPublic || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usage: 0
    };
    
    // 保存到KV存储
    const templateKey = `template_${userId}_${templateId}`;
    await env.USERS_KV.put(templateKey, JSON.stringify(template));
    
    console.log('✅ 模板保存成功:', templateKey);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Template saved successfully',
      template: {
        id: template.id,
        name: template.name,
        description: template.description,
        category: template.category,
        isPublic: template.isPublic,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt
      },
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 保存模板失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to save template',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 加载用户模板列表
async function handleLoadTemplates(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { userId } = data;
    
    if (!userId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'User ID is required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 加载用户模板列表:', userId);
    
    // 从KV存储获取所有模板
    // 注意：这里需要实现一个更好的查询方法
    // 目前使用模拟数据
    const templates = [
      {
        id: 'template_1',
        name: 'Welcome Email Template',
        description: 'A beautiful welcome email for new subscribers',
        category: 'welcome',
        isPublic: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        usage: 45
      },
      {
        id: 'template_2',
        name: 'Product Launch Announcement',
        description: 'Exciting product launch email template',
        category: 'promotional',
        isPublic: false,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-18T12:00:00Z',
        usage: 23
      }
    ];
    
    console.log('✅ 模板列表加载成功:', templates.length, '个模板');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Templates loaded successfully',
      templates: templates,
      count: templates.length,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 加载模板列表失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to load templates',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 加载单个模板
async function handleLoadTemplate(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { templateId, userId } = data;
    
    if (!templateId || !userId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Template ID and user ID are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 加载模板:', templateId, '用户:', userId);
    
    // 从KV存储获取模板
    const templateKey = `template_${userId}_${templateId}`;
    const templateData = await env.USERS_KV.get(templateKey);
    
    if (!templateData) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Template not found',
        message: 'The requested template does not exist'
      }), {
        status: 404,
        headers: corsHeaders
      });
    }

    const template = JSON.parse(templateData);
    
    console.log('✅ 模板加载成功:', template.name);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Template loaded successfully',
      template: template,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 加载模板失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to load template',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 删除模板
async function handleDeleteTemplate(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { templateId, userId } = data;
    
    if (!templateId || !userId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Template ID and user ID are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🔧 删除模板:', templateId, '用户:', userId);
    
    // 从KV存储删除模板
    const templateKey = `template_${userId}_${templateId}`;
    await env.USERS_KV.delete(templateKey);
    
    console.log('✅ 模板删除成功:', templateKey);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Template deleted successfully',
      templateId: templateId,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ 删除模板失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to delete template',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

module.exports = {
  handleSaveTemplate,
  handleLoadTemplates,
  handleLoadTemplate,
  handleDeleteTemplate
};
