// 清空用户数据的脚本
// 这个脚本会清空 Cloudflare KV 存储中的所有用户数据

const CLEAR_USER_DATA_SCRIPT = `
// Cloudflare Workers 清空用户数据脚本
export default {
  async fetch(request, env, ctx) {
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
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders
      });
    }

    try {
      const url = new URL(request.url);
      const action = url.pathname.split('/').pop();
      
      if (action === 'clear-users') {
        return await clearUserData(env, corsHeaders);
      } else if (action === 'clear-campaigns') {
        return await clearCampaignData(env, corsHeaders);
      } else if (action === 'clear-email-configs') {
        return await clearEmailConfigData(env, corsHeaders);
      } else if (action === 'clear-all') {
        return await clearAllData(env, corsHeaders);
      } else {
        return new Response(JSON.stringify({ 
          error: 'Invalid action',
          availableActions: ['clear-users', 'clear-campaigns', 'clear-email-configs', 'clear-all']
        }), {
          status: 400,
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

// 清空用户数据
async function clearUserData(env, corsHeaders) {
  try {
    if (!env.USERS_KV) {
      return new Response(JSON.stringify({
        success: false,
        error: 'USERS_KV not configured'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 获取所有用户键
    const usersList = await env.USERS_KV.list();
    let deletedCount = 0;
    
    if (usersList.keys && usersList.keys.length > 0) {
      // 删除所有用户数据
      for (const key of usersList.keys) {
        await env.USERS_KV.delete(key.name);
        deletedCount++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'User data cleared successfully',
      deletedCount: deletedCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear user data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 清空活动数据
async function clearCampaignData(env, corsHeaders) {
  try {
    if (!env.CAMPAIGNS_KV) {
      return new Response(JSON.stringify({
        success: false,
        error: 'CAMPAIGNS_KV not configured'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 获取所有活动键
    const campaignsList = await env.CAMPAIGNS_KV.list();
    let deletedCount = 0;
    
    if (campaignsList.keys && campaignsList.keys.length > 0) {
      // 删除所有活动数据
      for (const key of campaignsList.keys) {
        await env.CAMPAIGNS_KV.delete(key.name);
        deletedCount++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Campaign data cleared successfully',
      deletedCount: deletedCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear campaign data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 清空邮件配置数据
async function clearEmailConfigData(env, corsHeaders) {
  try {
    if (!env.EMAIL_CONFIG_KV) {
      return new Response(JSON.stringify({
        success: false,
        error: 'EMAIL_CONFIG_KV not configured'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 获取所有邮件配置键
    const configsList = await env.EMAIL_CONFIG_KV.list();
    let deletedCount = 0;
    
    if (configsList.keys && configsList.keys.length > 0) {
      // 删除所有邮件配置数据
      for (const key of configsList.keys) {
        await env.EMAIL_CONFIG_KV.delete(key.name);
        deletedCount++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Email config data cleared successfully',
      deletedCount: deletedCount,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear email config data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 清空所有数据
async function clearAllData(env, corsHeaders) {
  try {
    const results = {
      users: { success: false, deletedCount: 0 },
      campaigns: { success: false, deletedCount: 0 },
      emailConfigs: { success: false, deletedCount: 0 }
    };

    // 清空用户数据
    if (env.USERS_KV) {
      try {
        const usersList = await env.USERS_KV.list();
        if (usersList.keys && usersList.keys.length > 0) {
          for (const key of usersList.keys) {
            await env.USERS_KV.delete(key.name);
            results.users.deletedCount++;
          }
        }
        results.users.success = true;
      } catch (error) {
        console.error('Failed to clear users:', error);
      }
    }

    // 清空活动数据
    if (env.CAMPAIGNS_KV) {
      try {
        const campaignsList = await env.CAMPAIGNS_KV.list();
        if (campaignsList.keys && campaignsList.keys.length > 0) {
          for (const key of campaignsList.keys) {
            await env.CAMPAIGNS_KV.delete(key.name);
            results.campaigns.deletedCount++;
          }
        }
        results.campaigns.success = true;
      } catch (error) {
        console.error('Failed to clear campaigns:', error);
      }
    }

    // 清空邮件配置数据
    if (env.EMAIL_CONFIG_KV) {
      try {
        const configsList = await env.EMAIL_CONFIG_KV.list();
        if (configsList.keys && configsList.keys.length > 0) {
          for (const key of configsList.keys) {
            await env.EMAIL_CONFIG_KV.delete(key.name);
            results.emailConfigs.deletedCount++;
          }
        }
        results.emailConfigs.success = true;
      } catch (error) {
        console.error('Failed to clear email configs:', error);
      }
    }

    const totalDeleted = results.users.deletedCount + results.campaigns.deletedCount + results.emailConfigs.deletedCount;

    return new Response(JSON.stringify({
      success: true,
      message: 'All data cleared successfully',
      results: results,
      totalDeleted: totalDeleted,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear all data',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
`;

console.log('清空用户数据脚本已创建');
console.log('使用方法：');
console.log('1. 将脚本部署到 Cloudflare Workers');
console.log('2. 访问以下端点清空数据：');
console.log('   - POST /api/clear-users - 清空用户数据');
console.log('   - POST /api/clear-campaigns - 清空活动数据');
console.log('   - POST /api/clear-email-configs - 清空邮件配置数据');
console.log('   - POST /api/clear-all - 清空所有数据');


