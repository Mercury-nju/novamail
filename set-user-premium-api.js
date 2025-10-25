#!/usr/bin/env node

/**
 * 使用Cloudflare API直接设置用户会员
 * 绕过Workers部署，直接操作KV存储
 */

console.log('🔧 使用Cloudflare API直接设置用户会员\n');

async function setUserPremiumAPI() {
  try {
    const API_TOKEN = "zydRr500RPYtoSSDx_VpAj1M-MJEikK5acArNabB";
    const ACCOUNT_ID = "8b0131a99f0fbfe479670ecaef6b4448";
    const NAMESPACE_ID = "41bca314c98c4db580f450fb2e2c37bd"; // USERS_KV
    
    const email = '2945235656@qq.com';
    const userKey = `user_${email.toLowerCase()}`;
    
    console.log('📧 用户邮箱:', email);
    console.log('🔑 用户key:', userKey);
    console.log('🏢 账户ID:', ACCOUNT_ID);
    console.log('📦 命名空间ID:', NAMESPACE_ID);
    
    // 1. 创建用户数据
    console.log('\n📊 1. 创建用户数据...');
    
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    // 计算订阅结束时间（1年后）
    const subscriptionEndsAt = new Date();
    subscriptionEndsAt.setFullYear(subscriptionEndsAt.getFullYear() + 1);
    
    const userData = {
      id: userId,
      email: email.toLowerCase(),
      name: email.split('@')[0],
      firstName: email.split('@')[0],
      lastName: '',
      token: userToken,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString(),
      
      // 高级会员设置
      plan: 'premium',
      subscriptionPlan: 'premium',
      subscriptionStatus: 'active',
      subscriptionEndsAt: subscriptionEndsAt.toISOString(),
      
      // 高级会员功能和限制
      features: {
        aiAccess: true,
        unlimitedContacts: true,
        unlimitedCampaigns: true,
        professionalTemplates: true,
        prioritySupport: true,
        analyticsDashboard: true,
      },
      
      // 积分和限制
      totalCredits: 50000,
      remainingCredits: 50000,
      monthlyCredits: 50000,
      emailLimit: 10000,
    };
    
    console.log('✅ 用户数据创建成功');
    console.log('📋 用户详情:');
    console.log('   - 邮箱:', userData.email);
    console.log('   - 计划:', userData.plan);
    console.log('   - 订阅计划:', userData.subscriptionPlan);
    console.log('   - 订阅状态:', userData.subscriptionStatus);
    console.log('   - 订阅结束时间:', userData.subscriptionEndsAt);
    console.log('   - 总积分:', userData.totalCredits);
    console.log('   - 剩余积分:', userData.remainingCredits);
    console.log('   - 邮件限制:', userData.emailLimit);
    console.log('   - 功能:', userData.features);
    
    // 2. 使用Cloudflare API设置KV存储
    console.log('\n📊 2. 使用Cloudflare API设置KV存储...');
    
    const kvUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${userKey}`;
    
    try {
      const response = await fetch(kvUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(userData)
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('✅ 用户数据设置成功！');
        console.log('📊 API响应:', result);
        
        console.log('\n🎉 用户会员设置完成！');
        console.log('📧 用户邮箱: 2945235656@qq.com');
        console.log('⏰ 会员期限: 1年');
        console.log('💎 会员权益:');
        console.log('   - 50,000积分');
        console.log('   - 10,000邮件限制');
        console.log('   - AI访问');
        console.log('   - 无限联系人');
        console.log('   - 无限活动');
        console.log('   - 专业模板');
        console.log('   - 优先支持');
        console.log('   - 分析仪表板');
        
        console.log('\n🚀 下一步:');
        console.log('   1. 等待2-3分钟让数据生效');
        console.log('   2. 用户登录: https://novamail.world');
        console.log('   3. 检查是否显示高级会员状态');
        console.log('   4. 测试AI功能和专业模板');
        
      } else {
        const errorText = await response.text();
        console.log('❌ 设置失败:', errorText);
        console.log('💡 可能的原因:');
        console.log('   1. API token权限不足');
        console.log('   2. 命名空间ID不正确');
        console.log('   3. 账户ID不正确');
        
        console.log('\n🚀 替代方案:');
        console.log('   1. 使用手动设置方法');
        console.log('   2. 检查API token权限');
        console.log('   3. 联系技术支持');
      }
    } catch (error) {
      console.log('❌ API调用失败:', error.message);
      console.log('💡 可能的原因:');
      console.log('   1. 网络连接问题');
      console.log('   2. API token无效');
      console.log('   3. 权限不足');
    }
    
  } catch (error) {
    console.error('❌ 设置失败:', error.message);
  }
}

setUserPremiumAPI();
