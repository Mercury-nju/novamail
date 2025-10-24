// SMTP功能测试脚本
const testSMTPFunctionality = async () => {
  console.log('🧪 Testing SMTP Functionality...\n');

  const baseUrl = 'https://novamail-api.lihongyangnju.workers.dev';
  const testUserId = 'test_smtp_user';

  // 测试1: 获取SMTP配置
  console.log('1️⃣ Testing GET /api/user/email-config');
  try {
    const getResponse = await fetch(`${baseUrl}/api/user/email-config?userId=${testUserId}`);
    const getData = await getResponse.json();
    console.log('✅ GET Response:', getData);
  } catch (error) {
    console.log('❌ GET Error:', error.message);
  }

  // 测试2: 保存SMTP配置
  console.log('\n2️⃣ Testing POST /api/user/email-config');
  const smtpConfig = {
    provider: 'gmail',
    email: 'test@example.com',
    password: 'test_app_password',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    isSecure: true,
    userId: testUserId
  };

  try {
    const postResponse = await fetch(`${baseUrl}/api/user/email-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smtpConfig)
    });
    const postData = await postResponse.json();
    console.log('✅ POST Response:', postData);
  } catch (error) {
    console.log('❌ POST Error:', error.message);
  }

  // 测试3: 测试SMTP连接
  console.log('\n3️⃣ Testing POST /api/user/test-email');
  const testConfig = {
    provider: 'gmail',
    email: 'test@example.com',
    password: 'test_app_password',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    isSecure: true
  };

  try {
    const testResponse = await fetch(`${baseUrl}/api/user/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testConfig)
    });
    const testData = await testResponse.json();
    console.log('✅ Test Response:', testData);
  } catch (error) {
    console.log('❌ Test Error:', error.message);
  }

  console.log('\n🎉 SMTP functionality testing completed!');
};

// 运行测试
testSMTPFunctionality().catch(console.error);
