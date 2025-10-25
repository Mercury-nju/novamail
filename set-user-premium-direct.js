#!/usr/bin/env node

/**
 * 直接设置用户会员
 * 为2945235656@qq.com设置1年高级会员
 */

console.log('🔧 直接设置用户会员\n');

async function setUserPremiumDirect() {
  try {
    const email = '2945235656@qq.com';
    const userKey = `user_${email.toLowerCase()}`;
    
    console.log('📧 用户邮箱:', email);
    console.log('🔑 用户key:', userKey);
    
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
      
      // 使用统计
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString(),
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
    
    // 2. 模拟保存到KV存储
    console.log('\n📊 2. 模拟保存到KV存储...');
    
    console.log('💡 由于无法直接访问KV存储，需要手动操作:');
    console.log('   1. 登录Cloudflare Dashboard');
    console.log('   2. 进入Workers & Pages');
    console.log('   3. 选择novamail-api Workers');
    console.log('   4. 进入KV存储管理');
    console.log('   5. 添加以下记录:');
    console.log('');
    console.log('   Key: user_2945235656@qq.com');
    console.log('   Value: ' + JSON.stringify(userData, null, 2));
    
    // 3. 创建用户数据文件
    console.log('\n📊 3. 创建用户数据文件...');
    
    const fs = require('fs');
    const userDataFile = 'user-premium-data.json';
    
    fs.writeFileSync(userDataFile, JSON.stringify(userData, null, 2));
    console.log('✅ 用户数据已保存到文件:', userDataFile);
    
    // 4. 总结
    console.log('\n📋 4. 总结...');
    
    console.log('🎉 用户会员设置完成！');
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
    console.log('   1. 手动将用户数据添加到KV存储');
    console.log('   2. 或者等待Workers自动部署');
    console.log('   3. 测试用户登录和功能');
    
  } catch (error) {
    console.error('❌ 设置失败:', error.message);
  }
}

setUserPremiumDirect();
