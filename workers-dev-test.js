// 临时开发测试版本 - 跳过Resend调用
// 在 handleSendVerificationAPI 函数中替换以下代码：

// 临时跳过Resend API调用，直接返回成功
return new Response(JSON.stringify({
  success: true,
  message: 'Verification code sent successfully (dev mode)',
  code: verificationCode, // 返回验证码用于测试
  timestamp: new Date().toISOString(),
  note: 'Development mode - email not actually sent'
}), {
  headers: { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

// 注释掉原来的Resend API调用代码：
/*
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + env.RESEND_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(emailData)
})
*/

