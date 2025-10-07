// Creem API测试脚本
const https = require('https');

// 测试配置
const config = {
  apiKey: 'creem_22oMcuzUH4TeWyWVAVjTes',
  baseUrl: 'https://api.creem.com/v1',
  webhookSecret: 'whsec_5uvCq8f1gQMsqz5rqwdVgZ'
};

// 测试API连接
async function testCreemAPI() {
  console.log('🧪 开始测试Creem API连接...\n');
  
  try {
    // 测试1: 获取计划列表
    console.log('📋 测试1: 获取订阅计划...');
    const plansResponse = await makeRequest('/plans');
    console.log('✅ 计划获取成功:', plansResponse.length, '个计划');
    
    // 显示计划详情
    plansResponse.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.name} - $${plan.price}/${plan.interval}`);
    });
    
    // 测试2: 创建测试客户
    console.log('\n👤 测试2: 创建测试客户...');
    const customerData = {
      email: 'test@novamail.com',
      name: 'NovaMail Test User'
    };
    
    const customerResponse = await makeRequest('/customers', 'POST', customerData);
    console.log('✅ 客户创建成功:', customerResponse.id);
    
    // 测试3: 测试Webhook签名验证
    console.log('\n🔒 测试3: Webhook签名验证...');
    const testPayload = JSON.stringify({
      type: 'subscription.created',
      data: {
        id: 'test_subscription',
        customer: { email: 'test@novamail.com' },
        plan: { name: 'Pro', price: 19 }
      }
    });
    
    const testSignature = generateSignature(testPayload, config.webhookSecret);
    const isValid = verifySignature(testPayload, testSignature, config.webhookSecret);
    console.log('✅ Webhook签名验证:', isValid ? '通过' : '失败');
    
    console.log('\n🎉 所有测试完成！Creem API集成正常。');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.log('\n🔧 可能的解决方案:');
    console.log('1. 检查API密钥是否正确');
    console.log('2. 确认网络连接正常');
    console.log('3. 验证Creem API服务状态');
  }
}

// 发送HTTP请求
function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(config.baseUrl + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NovaMail-Test/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${result.error || body}`));
          }
        } catch (e) {
          reject(new Error(`解析响应失败: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// 生成Webhook签名
function generateSignature(payload, secret) {
  const crypto = require('crypto');
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

// 验证Webhook签名
function verifySignature(payload, signature, secret) {
  const expectedSignature = generateSignature(payload, secret);
  return signature === expectedSignature;
}

// 运行测试
testCreemAPI();
