#!/usr/bin/env node

/**
 * 检查DNS记录配置
 */

console.log('🔍 检查DNS记录配置\n');

async function checkDNSRecords() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 获取域名记录
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名:', domain.name);
        console.log('📊 状态:', domain.status);
        
        // 获取DNS记录
        const recordsResponse = await fetch(`https://api.resend.com/domains/${domain.id}/records`, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`
          }
        });
        
        if (recordsResponse.ok) {
          const records = await recordsResponse.json();
          console.log('\n📋 DNS记录:');
          
          if (records.data && records.data.length > 0) {
            records.data.forEach(record => {
              console.log(`   - ${record.type}: ${record.name} = ${record.value}`);
            });
          } else {
            console.log('❌ 没有找到DNS记录！');
            console.log('💡 这可能是邮件无法投递的原因！');
          }
        }
      }
    }
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message);
  }
}

checkDNSRecords();
