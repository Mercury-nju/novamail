// 测试密码修复是否有效
const testPasswordFix = async () => {
  try {
    console.log('🔧 测试密码修复...');
    
    // 测试1: 使用您修复后的密码登录
    console.log('1. 测试您修复后的密码登录...');
    const loginResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: '2945235656@qq.com',
        password: 'Lhy321.+'
      })
    });
    
    const loginResult = await loginResponse.json();
    console.log('使用修复后的密码登录:', loginResult.success ? '成功' : '失败');
    
    if (loginResult.success) {
      console.log('✅ 修复后的密码可以正常登录');
      console.log('用户信息:', {
        email: loginResult.user.email,
        name: loginResult.user.name,
        plan: loginResult.user.plan
      });
    } else {
      console.log('❌ 修复后的密码登录失败:', loginResult.error);
    }
    
    // 测试2: 验证默认密码是否还能登录（应该失败）
    console.log('\n2. 测试默认密码是否还能登录（应该失败）...');
    const defaultLoginResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: '2945235656@qq.com',
        password: 'default123'
      })
    });
    
    const defaultLoginResult = await defaultLoginResponse.json();
    console.log('默认密码登录结果:', defaultLoginResult.success ? '成功（错误！）' : '失败（正确！）');
    
    if (!defaultLoginResult.success) {
      console.log('✅ 默认密码已无法登录，修复成功！');
    } else {
      console.log('❌ 默认密码仍能登录，修复失败！');
    }
    
    // 测试3: 测试密码验证逻辑
    console.log('\n3. 测试密码验证逻辑...');
    const testPasswordResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        code: '123456',
        firstName: 'Test',
        lastName: 'User'
        // 注意：这里故意不传递密码
      })
    });
    
    const testPasswordResult = await testPasswordResponse.json();
    console.log('不传递密码的验证结果:', testPasswordResult.success ? '成功（错误！）' : '失败（正确！）');
    
    if (!testPasswordResult.success && testPasswordResult.error === 'Password is required') {
      console.log('✅ 密码验证逻辑正确，必须提供密码！');
    } else {
      console.log('❌ 密码验证逻辑有问题！');
    }
    
    console.log('\n🎉 密码修复验证完成！');
    
  } catch (error) {
    console.error('测试失败:', error);
  }
};

testPasswordFix();
