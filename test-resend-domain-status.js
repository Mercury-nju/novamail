// 使用内置fetch

async function testResendDomainStatus() {
  console.log('🔍 检查Resend域名验证状态...');
  
  const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
  
  try {
    // 检查域名状态
    const domainsResponse = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const domainsData = await domainsResponse.json();
    console.log('域名列表:', JSON.stringify(domainsData, null, 2));
    
    // 检查是否有 novamail.world 域名
    const novamailDomain = domainsData.data?.find(domain => domain.name === 'novamail.world');
    
    if (novamailDomain) {
      console.log('✅ 找到 novamail.world 域名');
      console.log('域名状态:', novamailDomain.status);
      console.log('验证状态:', novamailDomain.verification);
      
      if (novamailDomain.status === 'verified') {
        console.log('🎉 域名已验证，可以发送到任意邮箱！');
      } else {
        console.log('⚠️ 域名未验证，需要完成验证步骤');
      }
    } else {
      console.log('❌ 未找到 novamail.world 域名');
      console.log('请确保在 Resend Dashboard 中添加了域名');
    }
    
  } catch (error) {
    console.error('❌ 检查域名状态失败:', error);
  }
}

testResendDomainStatus();
