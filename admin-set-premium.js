#!/usr/bin/env node

/**
 * 管理员脚本：为用户设置1年高级会员
 */

console.log('🔧 管理员脚本：为用户设置1年高级会员\n');

async function adminSetPremium() {
  try {
    const userEmail = '2945235656@qq.com';
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1); // 1年后
    
    console.log('👤 用户邮箱:', userEmail);
    console.log('📅 订阅结束日期:', subscriptionEndDate.toISOString());
    console.log('💎 订阅计划: Premium (50,000 credits/month)');
    console.log('📧 邮件限制: 10,000 emails/month');
    
    // 创建用户数据（如果不存在）
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const userToken = 'token_' + Math.random().toString(36).substr(2, 9);
    
    const user = {
      id: userId,
      email: userEmail.toLowerCase().trim(),
      name: userEmail.split('@')[0],
      firstName: userEmail.split('@')[0],
      lastName: '',
      token: userToken,
      plan: 'premium', // 设置为高级会员
      subscriptionPlan: 'premium',
      subscriptionStatus: 'active',
      subscriptionEndsAt: subscriptionEndDate.toISOString(),
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // 使用量统计
      emailsSentThisMonth: 0,
      contactsCount: 0,
      campaignsCount: 0,
      lastUsageReset: new Date().toISOString(),
      // 高级会员功能
      features: {
        aiAccess: true,
        unlimitedContacts: true,
        unlimitedCampaigns: true,
        professionalTemplates: true,
        prioritySupport: true,
        analyticsDashboard: true
      },
      // 积分系统
      totalCredits: 50000, // 每月50,000积分
      remainingCredits: 50000,
      monthlyCredits: 50000,
      emailLimit: 10000, // 每月10,000封邮件
      emailsSentThisMonth: 0
    };
    
    console.log('\n📤 保存用户数据到Cloudflare Workers...');
    
    // 使用Cloudflare Workers API保存用户数据
    const saveResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/admin/set-user-premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        userData: user
      })
    });
    
    if (saveResponse.ok) {
      const result = await saveResponse.json();
      console.log('✅ 用户已成功设置为高级会员！');
      console.log('📧 用户邮箱:', userEmail);
      console.log('💎 订阅计划: Premium');
      console.log('📅 有效期至:', subscriptionEndDate.toLocaleDateString());
      console.log('💳 每月积分: 50,000 credits');
      console.log('📧 每月邮件: 10,000 emails');
      
      console.log('\n🎉 高级会员功能:');
      console.log('   ✅ AI邮件助手');
      console.log('   ✅ 专业邮件模板');
      console.log('   ✅ 无限联系人');
      console.log('   ✅ 无限活动');
      console.log('   ✅ 优先客服支持');
      console.log('   ✅ 分析仪表板');
      
      console.log('\n📊 用户数据:');
      console.log('   - 用户ID:', user.id);
      console.log('   - 访问令牌:', user.token);
      console.log('   - 订阅状态: active');
      console.log('   - 订阅计划: premium');
      console.log('   - 订阅结束: ' + subscriptionEndDate.toLocaleDateString());
      
    } else {
      const errorText = await saveResponse.text();
      console.log('❌ 保存失败:', errorText);
      
      // 如果API不存在，直接显示用户数据
      console.log('\n📋 用户数据（手动设置）:');
      console.log(JSON.stringify(user, null, 2));
      
      console.log('\n💡 手动设置步骤:');
      console.log('   1. 登录Cloudflare Workers控制台');
      console.log('   2. 找到NovaMail Workers');
      console.log('   3. 在KV存储中添加用户数据');
      console.log('   4. 键名: user_' + userEmail.toLowerCase());
      console.log('   5. 值: ' + JSON.stringify(user));
    }
    
  } catch (error) {
    console.error('❌ 操作失败:', error.message);
    console.log('\n🔧 故障排除:');
    console.log('   1. 检查网络连接');
    console.log('   2. 检查API端点是否可访问');
    console.log('   3. 检查Cloudflare Workers状态');
  }
}

adminSetPremium();
