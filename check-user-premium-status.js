#!/usr/bin/env node

/**
 * 检查用户会员状态
 * 验证2945235656@qq.com的会员权益
 */

console.log('🔍 检查用户会员状态\n');

async function checkUserPremiumStatus() {
  try {
    const email = '2945235656@qq.com';
    
    // 1. 检查用户是否存在
    console.log('📊 1. 检查用户是否存在...');
    
    const userKey = `user_${email.toLowerCase()}`;
    console.log('🔑 用户key:', userKey);
    
    // 2. 尝试通过API检查用户状态
    console.log('\n📊 2. 通过API检查用户状态...');
    
    try {
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ 用户信息:', result);
        
        if (result.user) {
          console.log('📋 用户详情:');
          console.log('   - 邮箱:', result.user.email);
          console.log('   - 计划:', result.user.plan);
          console.log('   - 订阅计划:', result.user.subscriptionPlan);
          console.log('   - 订阅状态:', result.user.subscriptionStatus);
          console.log('   - 订阅结束时间:', result.user.subscriptionEndsAt);
          console.log('   - 总积分:', result.user.totalCredits);
          console.log('   - 剩余积分:', result.user.remainingCredits);
          console.log('   - 邮件限制:', result.user.emailLimit);
          console.log('   - 功能:', result.user.features);
        }
      } else {
        const errorText = await response.text();
        console.log('❌ 获取用户信息失败:', errorText);
      }
    } catch (error) {
      console.log('❌ API调用失败:', error.message);
    }
    
    // 3. 尝试设置用户会员
    console.log('\n📊 3. 尝试设置用户会员...');
    
    try {
      const adminResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/admin/set-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          durationInYears: 1
        })
      });
      
      if (adminResponse.ok) {
        const result = await adminResponse.json();
        console.log('✅ 设置会员成功:', result);
        
        if (result.success) {
          console.log('🎉 用户会员设置成功！');
          console.log('📋 会员详情:');
          console.log('   - 邮箱:', result.user.email);
          console.log('   - 计划:', result.user.plan);
          console.log('   - 订阅结束时间:', result.user.subscriptionEndsAt);
          console.log('   - 总积分:', result.user.totalCredits);
          console.log('   - 邮件限制:', result.user.emailLimit);
        }
      } else {
        const errorText = await adminResponse.text();
        console.log('❌ 设置会员失败:', errorText);
      }
    } catch (error) {
      console.log('❌ 设置会员API调用失败:', error.message);
    }
    
    // 4. 再次检查用户状态
    console.log('\n📊 4. 再次检查用户状态...');
    
    try {
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ 更新后的用户信息:', result);
        
        if (result.user) {
          console.log('📋 用户详情:');
          console.log('   - 邮箱:', result.user.email);
          console.log('   - 计划:', result.user.plan);
          console.log('   - 订阅计划:', result.user.subscriptionPlan);
          console.log('   - 订阅状态:', result.user.subscriptionStatus);
          console.log('   - 订阅结束时间:', result.user.subscriptionEndsAt);
          console.log('   - 总积分:', result.user.totalCredits);
          console.log('   - 剩余积分:', result.user.remainingCredits);
          console.log('   - 邮件限制:', result.user.emailLimit);
          console.log('   - 功能:', result.user.features);
        }
      } else {
        const errorText = await response.text();
        console.log('❌ 获取用户信息失败:', errorText);
      }
    } catch (error) {
      console.log('❌ API调用失败:', error.message);
    }
    
    // 5. 总结和建议
    console.log('\n📋 5. 总结和建议...');
    
    console.log('💡 用户会员设置:');
    console.log('   - 邮箱: 2945235656@qq.com');
    console.log('   - 会员期限: 1年');
    console.log('   - 会员权益: 50,000积分, 10,000邮件限制');
    console.log('   - 功能: AI访问, 无限联系人, 无限活动, 专业模板, 优先支持, 分析仪表板');
    
    console.log('\n🚀 如果设置失败，可能的原因:');
    console.log('   1. 管理员API未部署');
    console.log('   2. KV存储配置问题');
    console.log('   3. 用户不存在');
    console.log('   4. API权限问题');
    
    console.log('\n📞 解决方案:');
    console.log('   1. 检查管理员API是否部署');
    console.log('   2. 检查KV存储配置');
    console.log('   3. 手动设置用户会员');
    console.log('   4. 联系技术支持');
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message);
  }
}

checkUserPremiumStatus();
