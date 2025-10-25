// 测试注册密码修复是否有效
const testRegistrationFix = async () => {
  try {
    console.log('🔧 测试注册密码修复...');
    
    // 模拟新用户注册流程
    const testEmail = 'testuser@example.com';
    const testPassword = 'TestPassword123!';
    
    // 1. 发送验证码
    console.log('1. 发送验证码...');
    const sendResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail
      })
    });
    
    const sendResult = await sendResponse.json();
    console.log('发送验证码结果:', sendResult.success ? '成功' : '失败');
    
    if (!sendResult.success) {
      console.log('发送验证码失败:', sendResult.error);
      return;
    }
    
    // 2. 验证码验证（包含密码）
    console.log('2. 验证码验证（包含密码）...');
    const verifyResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail,
        code: '123456', // 使用测试验证码
        firstName: 'Test',
        lastName: 'User',
        password: testPassword
      })
    });
    
    const verifyResult = await verifyResponse.json();
    console.log('验证码验证结果:', verifyResult.success ? '成功' : '失败');
    
    if (!verifyResult.success) {
      console.log('验证码验证失败:', verifyResult.error);
      return;
    }
    
    // 3. 测试登录（使用用户设置的密码）
    console.log('3. 测试登录（使用用户设置的密码）...');
    const loginResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });
    
    const loginResult = await loginResponse.json();
    console.log('登录测试结果:', loginResult.success ? '成功' : '失败');
    
    if (loginResult.success) {
      console.log('✅ 注册密码修复验证成功！');
      console.log('用户信息:', {
        email: loginResult.user.email,
        name: loginResult.user.name,
        plan: loginResult.user.plan
      });
    } else {
      console.log('❌ 登录失败:', loginResult.error);
    }
    
    // 4. 测试默认密码是否还能登录（应该失败）
    console.log('4. 测试默认密码是否还能登录（应该失败）...');
    const defaultLoginResponse = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail,
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
    
  } catch (error) {
    console.error('测试失败:', error);
  }
};

testRegistrationFix();
