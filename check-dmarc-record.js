#!/usr/bin/env node

/**
 * 检查DMARC记录配置
 * 验证DMARC记录是否正确配置
 */

console.log('🔍 检查DMARC记录配置\n');

async function checkDMARCRecord() {
  try {
    // 1. 检查DMARC记录
    console.log('📊 1. 检查DMARC记录...');
    
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
            
            // 分析DMARC记录
            if (record.data.includes('p=none')) {
              console.log('   💡 DMARC策略: none (监控模式)');
            } else if (record.data.includes('p=quarantine')) {
              console.log('   💡 DMARC策略: quarantine (隔离模式)');
            } else if (record.data.includes('p=reject')) {
              console.log('   💡 DMARC策略: reject (拒绝模式)');
            }
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
    
    // 2. 检查SPF记录
    console.log('\n📊 2. 检查SPF记录...');
    
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
        }
      } else {
        console.log('   ❌ 没有找到SPF记录');
      }
    }
    
    // 3. 检查DKIM记录
    console.log('\n📊 3. 检查DKIM记录...');
    
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
        }
      } else {
        console.log('   ❌ 没有找到DKIM记录');
      }
    }
    
    // 4. 问题分析和解决方案
    console.log('\n🔍 4. 问题分析和解决方案...');
    
    console.log('💡 从Resend控制台看到:');
    console.log('   ✅ DKIM记录: 已验证');
    console.log('   ✅ SPF记录: 已验证');
    console.log('   ✅ MX记录: 已验证');
    console.log('   ⚠️ DMARC记录: 状态为空');
    
    console.log('\n🚀 解决方案:');
    console.log('   1. 检查DMARC记录是否正确配置');
    console.log('   2. 确保DMARC记录包含正确的策略');
    console.log('   3. 等待DNS记录完全生效（24-48小时）');
    console.log('   4. 重新验证域名状态');
    
    console.log('\n📋 推荐的DMARC记录配置:');
    console.log('   类型: TXT');
    console.log('   名称: _dmarc');
    console.log('   值: v=DMARC1; p=quarantine; rua=mailto:dmarc@novamail.world');
    
    console.log('\n⚠️ 注意事项:');
    console.log('   1. DMARC记录需要24-48小时生效');
    console.log('   2. 建议先使用p=quarantine策略');
    console.log('   3. 监控DMARC报告以了解投递情况');
    
  } catch (error) {
    console.error('❌ DMARC记录检查失败:', error.message);
  }
}

checkDMARCRecord();
