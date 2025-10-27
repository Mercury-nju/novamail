# Mailchimp OAuth配置 - 每个用户独立账户

## 🎯 为什么使用OAuth

NovaMail现在采用OAuth模式，让每个用户使用自己的Mailchimp账户导出模板。这样确保：
- ✅ **数据隔离** - 每个用户的模板在自己的Mailchimp账户中
- ✅ **权限独立** - 用户自己控制模板访问
- ✅ **安全合规** - 符合企业级安全要求

## 🔧 配置步骤

### 1. 创建Mailchimp OAuth应用

1. 访问 [Mailchimp Developer](https://developer.mailchimp.com/)
2. 登录你的Mailchimp账户
3. 点击 "Your Apps" → "Create App"
4. 填写应用信息：
   - **App Name**: `NovaMail Integration`
   - **Description**: `Email template export for NovaMail users`
   - **Website URL**: `https://novamail.pages.dev`
   - **Redirect URI**: `https://novamail.pages.dev/mailchimp/callback`

### 2. 获取OAuth凭据

创建应用后，你会得到：
- **Client ID** - 复制保存
- **Client Secret** - 复制保存（只显示一次）

### 3. 配置Cloudflare Workers Secrets

运行以下命令配置环境变量：

```bash
# 设置Cloudflare API Token（如果还没设置）
set CLOUDFLARE_API_TOKEN=你的Cloudflare_API_Token

# 配置Mailchimp OAuth
echo "你的Client ID" | wrangler pages secret put MAILCHIMP_CLIENT_ID
echo "你的Client Secret" | wrangler pages secret put MAILCHIMP_CLIENT_SECRET  
echo "https://novamail.pages.dev/mailchimp/callback" | wrangler pages secret put MAILCHIMP_REDIRECT_URI
```

### 4. 验证配置

```bash
wrangler pages secret list
```

应该看到：
- ✅ MAILCHIMP_CLIENT_ID
- ✅ MAILCHIMP_CLIENT_SECRET
- ✅ MAILCHIMP_REDIRECT_URI

## 🔄 用户使用流程

### 首次使用：

1. **用户登录NovaMail**
2. **设计邮件模板**
3. **点击"Export to ESP"**
4. **选择Mailchimp**
5. **点击"Connect Mailchimp"**（首次需要）
6. **在新窗口中完成Mailchimp OAuth授权**
7. **授权完成后，自动返回NovaMail**
8. **点击"Export"导出模板**
9. **模板创建在用户自己的Mailchimp账户中**

### 后续使用：

1. **用户登录NovaMail**
2. **设计邮件模板**
3. **点击"Export to ESP"**
4. **选择Mailchimp**
5. **直接点击"Export"**（已授权，无需再次连接）
6. **模板创建在用户自己的Mailchimp账户中**

## 🔑 Token存储

用户的Mailchimp OAuth token存储在KV存储中：

```javascript
{
  "mailchimpAccessToken": "用户的access_token",
  "mailchimpDc": "数据中心标识",
  "mailchimpConnected": true,
  "mailchimpConnectedAt": "2024-01-01T00:00:00Z"
}
```

## 🔒 安全和隐私

- ✅ **OAuth 2.0标准** - 行业标准的授权方式
- ✅ **Token安全存储** - 存储在Cloudflare KV中
- ✅ **自动过期检测** - Token过期时自动提示重新授权
- ✅ **用户数据隔离** - 每个用户只能访问自己的模板

## 🧪 测试流程

1. **访问测试页面**: https://novamail.pages.dev/test-esp
2. **点击"Test Mailchimp"**
3. **首次会弹出Mailchimp授权窗口**
4. **完成授权后自动返回**
5. **模板成功创建在用户自己的Mailchimp账户中**

## 📋 故障排除

### 问题：授权窗口无法打开
**解决方案**: 检查浏览器是否阻止弹窗

### 问题：授权后token没有保存
**解决方案**: 检查`/api/mailchimp/callback`端点是否正常

### 问题：Token过期
**解决方案**: 系统会自动提示，点击"Connect Mailchimp"重新授权

## ✅ 完成

配置完成后，每个NovaMail用户都可以：
- 使用自己的Mailchimp账户
- 独立管理自己的模板
- 享受完整的数据安全保护
