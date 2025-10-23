// 使用内置fetch

async function testProductionDebugDetailed() {
  console.log('🔍 详细调试生产环境API...');
  
  // 测试1: 使用campaignData格式
  console.log('\n=== 测试1: campaignData格式 ===');
  const testData1 = {
    campaignData: {
      subject: 'Campaign Data Test Subject',
      body: '<p>Campaign Data Test Content</p>'
    },
    recipients: ['test@example.com'],
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail'
  };
  
  console.log('发送数据:', JSON.stringify(testData1, null, 2));
  
  try {
    const response1 = await fetch('https://novamail.world/api/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData1),
    });

    const responseData1 = await response1.json();
    console.log('状态码:', response1.status);
    console.log('响应:', JSON.stringify(responseData1, null, 2));
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
  
  // 测试2: 使用flat格式
  console.log('\n=== 测试2: flat格式 ===');
  const testData2 = {
    subject: 'Flat Test Subject',
    content: '<p>Flat Test Content</p>',
    recipients: ['test@example.com'],
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail'
  };
  
  console.log('发送数据:', JSON.stringify(testData2, null, 2));
  
  try {
    const response2 = await fetch('https://novamail.world/api/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData2),
    });

    const responseData2 = await response2.json();
    console.log('状态码:', response2.status);
    console.log('响应:', JSON.stringify(responseData2, null, 2));
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
  
  // 测试3: 检查API路由是否存在
  console.log('\n=== 测试3: 检查API路由 ===');
  try {
    const response3 = await fetch('https://novamail.world/api/campaigns/send', {
      method: 'GET',
    });
    console.log('GET请求状态码:', response3.status);
    const text = await response3.text();
    console.log('GET响应:', text.substring(0, 200));
  } catch (error) {
    console.error('❌ GET请求失败:', error);
  }
}

testProductionDebugDetailed();