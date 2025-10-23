#!/usr/bin/env node

/**
 * 测试修复后的邮件发送功能
 * 验证所有用户都能正常发送邮件
 */

const testEmailSending = async () => {
  console.log('🧪 测试邮件发送功能修复...\n');

  // 测试数据
  const testData = {
    campaignData: {
      subject: '测试邮件 - 功能修复验证',
      body: `
        <h2>🎉 NovaMail 邮件发送功能已修复！</h2>
        <p>亲爱的用户，</p>
        <p>我们很高兴地通知您，NovaMail 的邮件发送功能现在已经完全正常工作了！</p>
        
        <h3>✅ 修复内容：</h3>
        <ul>
          <li>移除了强制SMTP配置要求</li>
          <li>使用Resend API作为默认发送服务</li>
          <li>所有用户都可以直接发送邮件</li>
          <li>支持用户自定义SMTP配置（可选）</li>
        </ul>
        
        <p>现在您可以：</p>
        <ul>
          <li>✅ 直接编辑邮件并发送</li>
          <li>✅ 使用默认的Resend服务</li>
          <li>✅ 配置自己的SMTP（可选）</li>
          <li>✅ 查看发送记录和统计</li>
        </ul>
        
        <p>感谢您使用 NovaMail！</p>
        <p><strong>NovaMail 团队</strong></p>
      `,
      businessName: 'NovaMail'
    },
    recipients: ['lihongyangnju@gmail.com'], // 测试邮箱
    userId: 'test_user_' + Date.now()
  };

  try {
    console.log('📧 发送测试邮件...');
    console.log('收件人:', testData.recipients.join(', '));
    console.log('主题:', testData.campaignData.subject);
    console.log('');

    // 调用邮件发送API
    const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('📊 API 响应状态:', response.status);
    console.log('📊 API 响应结果:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\n✅ 邮件发送成功！');
      console.log('📧 发送方式:', result.data?.method || 'resend_api');
      console.log('📧 消息ID:', result.data?.messageId);
      console.log('📧 收件人数量:', result.data?.recipients);
      console.log('📧 发送时间:', result.data?.sentAt);
      
      if (result.data?.mode === 'simulation') {
        console.log('\n⚠️  注意：当前为模拟发送模式（开发环境）');
        console.log('   在生产环境中，邮件会真实发送');
      } else {
        console.log('\n🎉 邮件已真实发送！请检查收件箱');
      }
    } else {
      console.log('\n❌ 邮件发送失败');
      console.log('错误信息:', result.error);
      console.log('错误代码:', result.code);
    }

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误:', error.message);
    console.error('详细错误:', error);
  }
};

// 运行测试
testEmailSending().then(() => {
  console.log('\n🏁 测试完成');
}).catch(error => {
  console.error('测试失败:', error);
});
