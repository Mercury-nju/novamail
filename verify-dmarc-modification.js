#!/usr/bin/env node

/**
 * 验证DMARC记录修改
 * 检查DMARC记录是否正确修改
 */

console.log('🔍 验证DMARC记录修改\n');

async function verifyDMARCModification() {
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
              console.log('   ⚠️ DMARC策略: none (监控模式) - 需要修改');
              console.log('   💡 建议修改为: p=quarantine');
            } else if (record.data.includes('p=quarantine')) {
              console.log('   ✅ DMARC策略: quarantine (隔离模式) - 已正确配置');
            } else if (record.data.includes('p=reject')) {
              console.log('   ✅ DMARC策略: reject (拒绝模式) - 已正确配置');
            }
            
            // 检查报告地址
            if (record.data.includes('rua=mailto:dmarc@novamail.world')) {
              console.log('   ✅ 报告地址: 已配置');
            } else {
              console.log('   💡 建议添加报告地址: rua=mailto:dmarc@novamail.world');
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
    
    // 2. 检查其他DNS记录
    console.log('\n📊 2. 检查其他DNS记录...');
    
    // 检查SPF记录
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
    
    // 检查DKIM记录
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
    
    // 3. 总结和建议
    console.log('\n📋 3. 总结和建议...');
    
    console.log('💡 当前状态:');
    console.log('   - 需要修改DMARC记录策略');
    console.log('   - 从 p=none 改为 p=quarantine');
    console.log('   - 添加报告地址');
    
    console.log('\n🚀 修改步骤:');
    console.log('   1. 登录Cloudflare控制台');
    console.log('   2. 找到DMARC记录（类型：TXT，名称：_dmarc）');
    console.log('   3. 修改记录值为：v=DMARC1; p=quarantine; rua=mailto:dmarc@novamail.world');
    console.log('   4. 保存配置');
    console.log('   5. 等待24-48小时生效');
    
    console.log('\n⏰ 时间线:');
    console.log('   - 立即: 修改DNS记录');
    console.log('   - 24小时: DNS记录开始传播');
    console.log('   - 48小时: DNS记录完全生效');
    console.log('   - 48小时后: 测试邮件发送');
    
  } catch (error) {
    console.error('❌ 验证失败:', error.message);
  }
}

verifyDMARCModification();
