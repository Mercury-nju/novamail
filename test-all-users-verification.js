#!/usr/bin/env node

/**
 * 测试所有用户都能收到注册验证码
 */

console.log('🔍 测试所有用户注册验证码发送功能\n');

async function testAllUsersVerification() {
  try {
    // 测试多个不同的邮箱服务商
    const testEmails = [
      'test1@gmail.com',           // Gmail
      'test2@outlook.com',         // Outlook
      'test3@qq.com',              // QQ邮箱
      'test4@163.com',             // 163邮箱
      'test5@yahoo.com',           // Yahoo
      'test6@hotmail.com',         // Hotmail
      'test7@foxmail.com',         // Foxmail
      'test8@sohu.com'             // Sohu
    ];
    
    console.log('📧 测试邮箱列表:', testEmails);
    console.log('🔧 使用Resend API发送验证码\n');
    
    const results = [];
    
    for (let i = 0; i < testEmails.length; i++) {
      const email = testEmails[i];
      console.log(`📤 测试 ${i + 1}/${testEmails.length}: ${email}`);
      
      try {
        const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/send-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          console.log(`✅ ${email} - 发送成功！`);
          console.log(`   🔑 验证码: ${result.code}`);
          console.log(`   📧 邮件ID: ${result.messageId || 'N/A'}`);
          
          results.push({
            email: email,
            status: 'success',
            code: result.code,
            messageId: result.messageId
          });
        } else {
          console.log(`❌ ${email} - 发送失败: ${result.error}`);
          
          results.push({
            email: email,
            status: 'failed',
            error: result.error
          });
        }
        
        // 避免API限制，等待1秒
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${email} - 网络错误: ${error.message}`);
        
        results.push({
          email: email,
          status: 'error',
          error: error.message
        });
      }
    }
    
    // 统计结果
    console.log('\n📊 测试结果统计:');
    const successCount = results.filter(r => r.status === 'success').length;
    const failedCount = results.filter(r => r.status === 'failed').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    console.log(`✅ 成功: ${successCount}/${testEmails.length}`);
    console.log(`❌ 失败: ${failedCount}/${testEmails.length}`);
    console.log(`⚠️ 错误: ${errorCount}/${testEmails.length}`);
    
    // 详细结果
    console.log('\n📋 详细结果:');
    results.forEach((result, index) => {
      const status = result.status === 'success' ? '✅' : '❌';
      console.log(`${status} ${index + 1}. ${result.email} - ${result.status}`);
      if (result.code) {
        console.log(`   🔑 验证码: ${result.code}`);
      }
      if (result.error) {
        console.log(`   ❌ 错误: ${result.error}`);
      }
    });
    
    // 问题分析
    console.log('\n🔍 问题分析:');
    if (successCount === testEmails.length) {
      console.log('🎉 所有邮箱都能正常发送验证码！');
    } else if (successCount > 0) {
      console.log('⚠️ 部分邮箱发送成功，部分失败');
      console.log('💡 可能的原因:');
      console.log('   1. 某些邮箱服务商的过滤机制');
      console.log('   2. 发件人域名信誉问题');
      console.log('   3. 邮件内容被识别为垃圾邮件');
    } else {
      console.log('❌ 所有邮箱发送失败');
      console.log('💡 可能的原因:');
      console.log('   1. Resend API配置问题');
      console.log('   2. 域名验证问题');
      console.log('   3. API密钥问题');
    }
    
    // 解决方案
    console.log('\n🚀 解决方案:');
    console.log('   1. 检查垃圾邮件文件夹');
    console.log('   2. 将发件人添加到白名单');
    console.log('   3. 优化邮件内容');
    console.log('   4. 添加SPF、DKIM记录');
    console.log('   5. 使用专业的邮件模板');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testAllUsersVerification();
