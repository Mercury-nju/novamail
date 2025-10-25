#!/usr/bin/env node

/**
 * 为用户设置1年高级会员
 */

console.log('🔧 为用户设置1年高级会员\n');

async function setPremiumUser() {
  try {
    const userEmail = '2945235656@qq.com';
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1); // 1年后
    
    console.log('👤 用户邮箱:', userEmail);
    console.log('📅 订阅结束日期:', subscriptionEndDate.toISOString());
    console.log('💎 订阅计划: Premium (50,000 credits/month)');
    console.log('📧 邮件限制: 10,000 emails/month');
    
    // 1. 检查用户是否存在
    console.log('\n📤 检查用户是否存在...');
    
    const checkResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/check-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail
      })
    });
    
    const checkResult = await checkResponse.json();
    console.log('📊 用户检查结果:', checkResult);
    
    if (!checkResult.exists) {
      console.log('❌ 用户不存在，需要先注册');
      console.log('💡 请用户先注册账户，然后再设置高级会员');
      return;
    }
    
    // 2. 设置用户为高级会员
    console.log('\n📤 设置用户为高级会员...');
    
    const premiumData = {
      email: userEmail,
      subscriptionPlan: 'premium',
      subscriptionStatus: 'active',
      subscriptionEndsAt: subscriptionEndDate.toISOString(),
      monthlyCredits: 50000, // 50,000 credits per month
      emailLimit: 10000, // 10,000 emails per month
      features: {
        aiAccess: true,
        unlimitedContacts: true,
        unlimitedCampaigns: true,
        professionalTemplates: true,
        prioritySupport: true,
        analyticsDashboard: true
      }
    };
    
    const setPremiumResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/set-premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(premiumData)
    });
    
    const premiumResult = await setPremiumResponse.json();
    console.log('📊 设置结果:', premiumResult);
    
    if (premiumResult.success) {
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
      
    } else {
      console.log('❌ 设置失败:', premiumResult.error);
    }
    
  } catch (error) {
    console.error('❌ 操作失败:', error.message);
    console.log('\n🔧 故障排除:');
    console.log('   1. 检查网络连接');
    console.log('   2. 检查API端点是否可访问');
    console.log('   3. 检查Cloudflare Workers状态');
  }
}

setPremiumUser();
