// 更新用户密码脚本
const updateUserPassword = async () => {
  try {
    console.log('🔧 更新用户密码...');
    
    // 使用管理员API更新用户密码
    const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/admin/set-user-premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: '2945235656@qq.com',
        password: 'Lhy321.+', // 设置您注册时的密码
        action: 'update_password'
      })
    });
    
    const result = await response.json();
    console.log('密码更新结果:');
    console.log(JSON.stringify(result, null, 2));
    
    // 测试新密码登录
    console.log('\n🔧 测试新密码登录...');
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
    console.log('登录测试结果:');
    console.log(JSON.stringify(loginResult, null, 2));
    
  } catch (error) {
    console.error('更新失败:', error);
  }
};

updateUserPassword();
