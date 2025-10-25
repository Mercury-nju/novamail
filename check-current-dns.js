#!/usr/bin/env node

/**
 * 检查当前DNS记录状态
 * 验证SPF、DKIM、DMARC记录是否正确配置
 */

console.log('🔍 检查当前DNS记录状态\n');

async function checkCurrentDNS() {
  try {
    // 1. 检查SPF记录
    console.log('📊 1. 检查SPF记录...');
    
    const spfResponse = await fetch('https://dns.google/resolve?name=novamail.world&type=TXT');
    if (spfResponse.ok) {
      const spfData = await spfResponse.json();
      console.log('📋 SPF记录:');
      
      if (spfData.Answer && spfData.Answer.length > 0) {
        let spfFound = false;
        spfData.Answer.forEach(record => {
          if (record.data.includes('v=spf1')) {
            console.log(`   ✅ SPF记录: ${record.data}`);
            spfFound = true;
          }
        });
        
        if (!spfFound) {
          console.log('   ❌ 没有找到SPF记录');
          console.log('   💡 需要添加: v=spf1 include:_spf.resend.com ~all');
        }
      } else {
        console.log('   ❌ 没有找到SPF记录');
        console.log('   💡 需要添加: v=spf1 include:_spf.resend.com ~all');
      }
    }
    
    // 2. 检查DKIM记录
    console.log('\n📊 2. 检查DKIM记录...');
    
    const dkimResponse = await fetch('https://dns.google/resolve?name=resend._domainkey.novamail.world&type=TXT');
    if (dkimResponse.ok) {
      const dkimData = await dkimResponse.json();
      console.log('📋 DKIM记录:');
      
      if (dkimData.Answer && dkimData.Answer.length > 0) {
        let dkimFound = false;
        dkimData.Answer.forEach(record => {
          if (record.data.includes('v=DKIM1')) {
            console.log(`   ✅ DKIM记录: ${record.data.substring(0, 50)}...`);
            dkimFound = true;
          }
        });
        
        if (!dkimFound) {
          console.log('   ❌ 没有找到DKIM记录');
          console.log('   💡 需要在Resend控制台获取DKIM记录');
        }
      } else {
        console.log('   ❌ 没有找到DKIM记录');
        console.log('   💡 需要在Resend控制台获取DKIM记录');
      }
    }
    
    // 3. 检查DMARC记录
    console.log('\n📊 3. 检查DMARC记录...');
    
    const dmarcResponse = await fetch('https://dns.google/resolve?name=_dmarc.novamail.world&type=TXT');
    if (dmarcResponse.ok) {
      const dmarcData = await dmarcResponse.json();
      console.log('📋 DMARC记录:');
      
      if (dmarcData.Answer && dmarcData.Answer.length > 0) {
        let dmarcFound = false;
        dmarcData.Answer.forEach(record => {
          if (record.data.includes('v=DMARC1')) {
            console.log(`   ✅ DMARC记录: ${record.data}`);
            dmarcFound = true;
          }
        });
        
        if (!dmarcFound) {
          console.log('   ❌ 没有找到DMARC记录');
          console.log('   💡 需要添加: v=DMARC1; p=quarantine; rua=mailto:dmarc@novamail.world');
        }
      } else {
        console.log('   ❌ 没有找到DMARC记录');
        console.log('   💡 需要添加: v=DMARC1; p=quarantine; rua=mailto:dmarc@novamail.world');
      }
    }
    
    // 4. 总结
    console.log('\n📋 4. DNS记录总结:');
    console.log('💡 如果DNS记录配置正确，应该看到:');
    console.log('   ✅ SPF记录: v=spf1 include:_spf.resend.com ~all');
    console.log('   ✅ DKIM记录: v=DKIM1 ...');
    console.log('   ✅ DMARC记录: v=DMARC1; p=quarantine; ...');
    
    console.log('\n🚀 如果DNS记录缺失，需要:');
    console.log('   1. 在域名注册商处添加DNS记录');
    console.log('   2. 等待24-48小时生效');
    console.log('   3. 重新测试邮件发送');
    
    console.log('\n📞 操作步骤:');
    console.log('   1. 登录域名注册商控制台');
    console.log('   2. 进入DNS管理页面');
    console.log('   3. 添加上述DNS记录');
    console.log('   4. 等待DNS记录生效');
    console.log('   5. 在Resend控制台重新验证域名');
    
  } catch (error) {
    console.error('❌ DNS记录检查失败:', error.message);
  }
}

checkCurrentDNS();
