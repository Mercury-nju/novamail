// 测试前端验证逻辑
console.log('=== 前端验证逻辑测试 ===');

// 模拟 campaignData 状态
const campaignData = {
  subject: '',
  body: ''
};

// 模拟 currentTemplate
const currentTemplate = {
  subject: '🚀 Introducing [Product Name] - The Future is Here',
  htmlContent: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #333;">🚀 Introducing [Product Name] - The Future is Here</h1><p>This is a test email content.</p></div>'
};

// 模拟 sendForm
const sendForm = {
  recipients: 'lihongyangnju@gmail.com',
  senderEmail: '', // 空的显示邮箱
  senderName: 'NovaMail'
};

console.log('初始状态:');
console.log('campaignData.subject:', campaignData.subject);
console.log('campaignData.body:', campaignData.body);
console.log('sendForm.recipients:', sendForm.recipients);
console.log('sendForm.senderEmail:', sendForm.senderEmail);

// 检查收件人
if (!sendForm.recipients) {
  console.log('❌ 错误: 缺少收件人');
} else {
  console.log('✅ 收件人验证通过');
}

// 使用模板默认内容作为后备
const finalSubject = campaignData.subject || currentTemplate?.subject || 'Default Subject';
const finalBody = campaignData.body || currentTemplate?.htmlContent || '<p>Default content</p>';

console.log('最终内容:');
console.log('finalSubject:', finalSubject);
console.log('finalBody length:', finalBody?.length);

// 检查最终内容
if (!finalSubject || !finalBody) {
  console.log('❌ 错误: 缺少主题或内容');
} else {
  console.log('✅ 内容验证通过');
}

// 验证邮箱格式
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recipientList = sendForm.recipients.split(',').map(email => email.trim());
const invalidEmails = recipientList.filter(email => !emailRegex.test(email));

if (invalidEmails.length > 0) {
  console.log('❌ 错误: 无效邮箱地址:', invalidEmails.join(', '));
} else {
  console.log('✅ 邮箱格式验证通过');
}

// 如果用户填写了显示邮箱，则验证格式
if (sendForm.senderEmail && !emailRegex.test(sendForm.senderEmail)) {
  console.log('❌ 错误: 无效的显示邮箱地址');
} else {
  console.log('✅ 显示邮箱验证通过');
}

console.log('=== 测试完成 ===');
