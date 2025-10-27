/**
 * 测试 Mailchimp OAuth 连接状态
 * 在浏览器控制台中运行此脚本来检查连接状态
 */

function checkMailchimpConnection() {
  console.log('=== Mailchimp Connection Status ===\n')
  
  // Check localStorage
  const mailchimpToken = localStorage.getItem('mailchimp_access_token')
  const mailchimpDc = localStorage.getItem('mailchimp_dc')
  const mailchimpConnected = localStorage.getItem('mailchimp_connected')
  
  console.log('1. Access Token:', mailchimpToken ? `✅ Found (${mailchimpToken.substring(0, 20)}...)` : '❌ Not found')
  console.log('2. DC:', mailchimpDc ? `✅ Found (${mailchimpDc})` : '❌ Not found')
  console.log('3. Connected:', mailchimpConnected ? `✅ ${mailchimpConnected}` : '❌ Not connected')
  
  // Check user email
  const userEmail = localStorage.getItem('user-email') || sessionStorage.getItem('user-email') || localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
  console.log('4. User Email:', userEmail ? `✅ ${userEmail}` : '❌ Not found')
  
  if (!mailchimpToken || !mailchimpDc) {
    console.log('\n⚠️ Mailchimp 未连接')
    console.log('请点击 "Export to ESP" → "Connect Mailchimp" 来连接您的账户')
  } else {
    console.log('\n✅ Mailchimp 已连接，可以尝试导出')
  }
  
  return {
    hasToken: !!mailchimpToken,
    token: mailchimpToken,
    dc: mailchimpDc,
    connected: mailchimpConnected === 'true',
    userEmail: userEmail
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.checkMailchimpConnection = checkMailchimpConnection
  console.log('\n提示: 在浏览器控制台中运行 checkMailchimpConnection() 来检查连接状态')
}

// Run automatically in Node.js
if (typeof window === 'undefined') {
  console.log('\n此脚本需要在浏览器控制台中运行')
  console.log('请在网站中打开开发者工具 (F12)，然后运行:')
  console.log('checkMailchimpConnection()')
}

