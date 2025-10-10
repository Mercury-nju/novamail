# Gmail API 设置指南

## 获取 Gmail API 访问令牌

### 1. 启用 Gmail API
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择你的项目或创建新项目
3. 启用 Gmail API：
   - 转到 "APIs & Services" > "Library"
   - 搜索 "Gmail API"
   - 点击 "Enable"

### 2. 创建 OAuth 2.0 凭据
1. 转到 "APIs & Services" > "Credentials"
2. 点击 "Create Credentials" > "OAuth 2.0 Client IDs"
3. 选择 "Web application"
4. 添加授权重定向 URI：
   - `http://localhost:3000/auth/google/callback`
   - `https://novamail.world/auth/google/callback`

### 3. 获取访问令牌
有两种方式获取访问令牌：

#### 方式 1：使用 OAuth 2.0 Playground（推荐）
1. 访问 [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. 点击右上角设置图标
3. 勾选 "Use your own OAuth credentials"
4. 输入你的 Client ID 和 Client Secret
5. 在左侧选择 "Gmail API v1" > "https://www.googleapis.com/auth/gmail.send"
6. 点击 "Authorize APIs"
7. 登录你的 Gmail 账户并授权
8. 点击 "Exchange authorization code for tokens"
9. 复制 "Access token"（有效期1小时）

#### 方式 2：使用 curl 命令
```bash
# 1. 获取授权码
# 在浏览器中访问以下URL，登录并授权，然后从回调URL中获取code参数
https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=https://www.googleapis.com/auth/gmail.send&response_type=code

# 2. 交换访问令牌
curl -X POST https://oauth2.googleapis.com/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "code=AUTHORIZATION_CODE" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri=urn:ietf:wg:oauth:2.0:oob"
```

### 4. 配置 Cloudflare Worker
1. 在 Cloudflare Dashboard 中打开你的 Worker
2. 转到 "Settings" > "Variables"
3. 添加环境变量：
   - `GMAIL_ACCESS_TOKEN`: 你的访问令牌（Secret 类型）

### 5. 更新 wrangler.toml
```toml
# Gmail API 配置
GMAIL_SMTP_USER = "lihongyangnju@gmail.com"
GMAIL_SMTP_PASSWORD = "zjhk rkmy ysoz dhyi"
GMAIL_ACCESS_TOKEN = "your-actual-access-token"
```

## 注意事项

1. **访问令牌有效期**：访问令牌通常有效期为1小时，需要定期刷新
2. **刷新令牌**：如果需要长期使用，建议获取刷新令牌并实现自动刷新机制
3. **权限范围**：确保请求的权限范围包括 `https://www.googleapis.com/auth/gmail.send`
4. **安全性**：访问令牌是敏感信息，请妥善保管

## 测试
部署后测试发送验证码：
```bash
curl -X POST https://novamail.world/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

