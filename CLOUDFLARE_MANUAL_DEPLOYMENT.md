# Cloudflare Workers 手动部署指南

## 🚀 部署概述

由于 API 令牌权限限制，我们需要通过 Cloudflare Dashboard 手动部署 Workers。以下是详细的部署步骤。

## 📋 部署信息

- **API Token**: `o1CH8v-fJgNZh7OHScY02oYpbxWpYiF8sdMq7Bwl`
- **Account ID**: `8b0131a99f0fbfe479670ecaef6b4448`
- **Account Name**: `Lihongyangnju@gmail.com's Account`
- **Worker Name**: `novamail-api`

## 🔧 部署步骤

### 第一步：登录 Cloudflare Dashboard

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 使用您的账户登录
3. 确认您可以看到账户 `Lihongyangnju@gmail.com's Account`

### 第二步：创建 Workers

1. 在左侧菜单中点击 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Workers** 标签
4. 点击 **Create a Worker**
5. 输入项目名称：`novamail-api`
6. 点击 **Create Worker**

### 第三步：配置 Workers 代码

1. 在 Workers 编辑器中找到默认的代码
2. 删除所有默认代码
3. 复制 `workers/index-simple.js` 文件的完整内容
4. 粘贴到编辑器中
5. 点击 **Save and deploy** 按钮

### 第四步：配置环境变量

1. 在 Workers 详情页中，点击 **Settings** 标签
2. 在左侧菜单中点击 **Variables**
3. 点击 **Add variable** 按钮，添加以下环境变量：

#### 必需的环境变量：

1. **CREEM_API_KEY**
   - 值：`creem_22oMcuzUH4TeWyWVAVjTes`
   - 描述：Creem 支付 API 密钥

2. **CREEM_BASE_URL**
   - 值：`https://api.creem.io/v1`
   - 描述：Creem API 基础 URL

3. **CREEM_WEBHOOK_SECRET**
   - 值：`whsec_5uvCq8f1gQMsqz5rqwdVgZ`
   - 描述：Creem Webhook 密钥

4. **RESEND_API_KEY**
   - 值：`re_PCbEHboB...`
   - 描述：Resend 邮件服务 API 密钥

5. **DASHSCOPE_API_KEY**
   - 值：`sk-9bf19547ddbd4be1a87a7a43cf251097`
   - 描述：DashScope AI API 密钥

6. **GMAIL_SMTP_USER**
   - 值：`lihongyangnju@gmail.com`
   - 描述：Gmail 邮箱地址

7. **GMAIL_SMTP_PASSWORD**
   - 值：`zjhk rkmy ysoz dhyi`
   - 描述：Gmail 应用专用密码

8. **GMAIL_SMTP_HOST**
   - 值：`smtp.gmail.com`
   - 描述：Gmail SMTP 主机

9. **GMAIL_SMTP_PORT**
   - 值：`587`
   - 描述：Gmail SMTP 端口

10. **GMAIL_REFRESH_TOKEN**
    - 值：`1//04FWiY69BwVHbCgYIARAAGAQSNwF-L9IrZeOSGrUTkpP5iwxbNiR27XmP7fcSOg2AWpjRh55RUIlzrUI3nDHecaJV29bkosRLxrU`
    - 描述：Gmail 刷新令牌

11. **GOOGLE_CLIENT_ID**
    - 值：`3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com`
    - 描述：Google OAuth 客户端 ID

12. **GOOGLE_CLIENT_SECRET**
    - 值：`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`
    - 描述：Google OAuth 客户端密钥

### 第五步：保存环境变量

1. 添加完所有环境变量后，点击 **Save** 按钮
2. 等待保存完成

### 第六步：获取 Workers URL

1. 在 Workers 详情页中，点击 **Triggers** 标签
2. 找到 **Custom domain** 或 **Workers subdomain**
3. 复制 Workers URL，格式类似：`https://novamail-api.your-subdomain.workers.dev`

### 第七步：测试 API 端点

使用以下 URL 测试各个 API 端点：

1. **Creem 测试端点**：
   ```
   https://novamail-api.your-subdomain.workers.dev/api/creem/test
   ```

2. **Webhook 测试端点**：
   ```
   https://novamail-api.your-subdomain.workers.dev/api/creem/webhook-test
   ```

3. **计划端点**：
   ```
   https://novamail-api.your-subdomain.workers.dev/api/creem/plans
   ```

4. **用户限制端点**：
   ```
   https://novamail-api.your-subdomain.workers.dev/api/user/limits
   ```

## 📊 可用的 API 端点

部署完成后，以下 API 端点将可用：

- `POST /api/auth/send-verification` - 发送验证码
- `POST /api/auth/verify-code` - 验证验证码
- `GET /api/creem/test` - Creem API 测试
- `GET /api/creem/webhook-test` - Webhook 测试
- `GET /api/creem/plans` - 获取计划列表
- `POST /api/creem/subscriptions` - 创建订阅
- `POST /api/ai/generate-email` - AI 生成邮件
- `POST /api/campaigns/create` - 创建活动
- `POST /api/campaigns/send` - 发送活动
- `POST /api/contacts/add` - 添加联系人
- `GET /api/contacts/list` - 列出联系人
- `GET /api/user/limits` - 获取用户限制

## 🔧 故障排除

### 常见问题

#### 1. API 端点返回 404
**原因**：Workers URL 不正确
**解决方案**：检查 Workers URL 是否正确配置

#### 2. 邮件发送失败
**原因**：Resend API 密钥无效
**解决方案**：检查 API 密钥是否正确设置

#### 3. CORS 错误
**原因**：跨域请求被阻止
**解决方案**：代码中已包含 CORS 头部，无需额外配置

### 调试技巧

#### 1. 查看 Workers 日志
1. 在 Workers 详情页中，点击 **Logs** 标签
2. 查看实时日志和错误信息

#### 2. 测试 API 端点
使用浏览器或 Postman 测试各个 API 端点

#### 3. 检查环境变量
确保所有必需的环境变量都已正确设置

## ✅ 部署完成

部署完成后，您将拥有：

- ✅ 完整的 API 端点
- ✅ 真实验证码发送功能
- ✅ 用户注册和验证
- ✅ Creem 支付集成
- ✅ AI 邮件生成
- ✅ 活动管理
- ✅ 联系人管理
- ✅ 用户限制检查

## 🔄 下一步

1. 测试所有 API 端点
2. 更新前端代码中的 API URL
3. 配置域名（可选）
4. 监控 Workers 性能

现在您的 NovaMail 应用已经具备完整的后端 API 功能！🎉

