/**
 * 验证 Cloudflare KV 配置
 * 运行此脚本来检查 KV namespace binding 是否正确配置
 */

const accountId = 'your-account-id' // 请在 Cloudflare Dashboard 中获取
const namespaceId = '41bca314c98c4db580f450fb2e2c37bd'

async function checkKVBinding() {
  console.log('=== Cloudflare KV Configuration Check ===\n')
  
  console.log('1. KV Namespace ID:', namespaceId)
  console.log('2. 请在 Cloudflare Dashboard 中验证以下内容:\n')
  
  console.log('步骤 1: 登录 https://dash.cloudflare.com/')
  console.log('步骤 2: 进入 Workers & Pages → Pages → NovaMail')
  console.log('步骤 3: 点击 Settings → Functions')
  console.log('步骤 4: 检查 "KV Namespace Bindings" 部分')
  console.log('\n预期看到:')
  console.log('- Variable name: USERS_KV')
  console.log('- KV namespace: NovaMail-Users 或 ID:', namespaceId)
  
  console.log('\n\n=== 如果 KV Binding 不存在，请手动配置 ===\n')
  console.log('1. 在 KV Namespace Bindings 部分点击 "Edit bindings" 或 "Add binding"')
  console.log('2. 添加新的 binding:')
  console.log('   - Variable name: USERS_KV')
  console.log('   - KV namespace: 选择 NovaMail-Users 或输入 ID:', namespaceId)
  console.log('3. 点击保存')
  console.log('4. 等待自动重新部署')
  
  console.log('\n\n=== 测试 KV 是否可访问 ===\n')
  console.log('部署后，请在浏览器控制台中测试 Export 功能')
  console.log('查看以下日志:')
  console.log('- Access Token provided: true/false')
  console.log('- User data from KV: Found/Not found')
  
  console.log('\n\n=== 常见问题 ===\n')
  console.log('Q: "env.USERS_KV is undefined" 错误')
  console.log('A: KV binding 未在 Cloudflare Dashboard 中配置')
  console.log('   按照上方步骤在 Dashboard 中手动添加 binding\n')
  
  console.log('Q: "Cannot read properties of undefined (reading get)" 错误')
  console.log('A: 确保变量名是 USERS_KV（完全匹配），重新部署\n')
  
  console.log('Q: Export 失败，显示 "Please connect your Mailchimp account first"')
  console.log('A: 检查浏览器控制台中的 "Access Token provided" 日志')
  console.log('   - 如果是 false，需要重新连接 Mailchimp')
  console.log('   - 如果是 true，检查 Mailchimp API 日志\n')
}

checkKVBinding()

