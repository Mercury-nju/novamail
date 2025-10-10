# 手动部署 Workers 指南

## 🚨 紧急部署 - Google OAuth 修复

由于缺少 Cloudflare API Token，我们需要手动部署 Workers 代码来修复 Google OAuth 用户数据持久化问题。

## 📋 部署步骤

### 第一步：登录 Cloudflare Dashboard

1. **访问 Cloudflare Dashboard**
   - 打开 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
   - 登录你的 Cloudflare 账户

2. **进入 Workers 页面**
   - 在左侧菜单中点击 "Workers & Pages"
   - 点击 "Workers" 选项卡

### 第二步：编辑 Workers 代码

1. **找到 NovaMail Workers**
   - 在 Workers 列表中找到 `novamail-api`
   - 点击 "Edit" 按钮

2. **更新代码**
   - 复制 `workers/index.js` 文件的完整内容
   - 粘贴到 Workers 编辑器中
   - 点击 "Save and Deploy" 按钮

### 第三步：创建 KV 命名空间

1. **进入 KV 存储页面**
   - 在左侧菜单中点击 "Workers & Pages"
   - 点击 "KV" 选项卡

2. **创建命名空间**
   - 点击 "Create a namespace"
   - 名称: `NovaMail-Users`
   - 点击 "Add"
   - **重要**: 复制命名空间ID

3. **重复创建其他命名空间**
   - `NovaMail-EmailConfig`
   - `NovaMail-Campaigns`

### 第四步：绑定 KV 命名空间

1. **进入 Workers 设置**
   - 在 Workers 页面中点击 `novamail-api`
   - 点击 "Settings" 选项卡
   - 点击 "Variables" 部分

2. **添加 KV 绑定**
   - 点击 "Add binding"
   - 类型: KV namespace
   - 变量名: `USERS_KV`
   - KV namespace: 选择 `NovaMail-Users`
   - 点击 "Save"

3. **重复添加其他绑定**
   - `EMAIL_CONFIG_KV` → `NovaMail-EmailConfig`
   - `CAMPAIGNS_KV` → `NovaMail-Campaigns`

### 第五步：测试部署

1. **测试 Google OAuth API**
   ```bash
   curl -X POST https://novamail.world/api/auth/google-login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User","provider":"google"}'
   ```

2. **测试 Google OAuth 登录**
   - 访问 [https://novamail.world](https://novamail.world)
   - 点击 "Continue with Google"
   - 完成认证流程

## 🔧 配置详情

### Workers 代码更新

主要更新内容：
- 添加 `handleGoogleLogin` 函数
- 实现用户数据持久化
- 添加 KV 存储支持
- 完善错误处理

### KV 存储配置

需要创建的命名空间：
1. **USERS_KV** - 用户数据存储
2. **EMAIL_CONFIG_KV** - 邮件配置存储
3. **CAMPAIGNS_KV** - 营销活动存储

### 环境变量配置

在 Workers 设置中添加：
- `RESEND_API_KEY` - Resend API 密钥
- `GMAIL_SMTP_USER` - Gmail SMTP 用户名
- `GMAIL_SMTP_PASSWORD` - Gmail SMTP 密码

## 🧪 测试验证

### 功能测试

1. **Google OAuth 登录**
   - 测试新用户注册
   - 测试现有用户登录
   - 验证用户数据保存

2. **数据持久化**
   - 创建测试数据
   - 登出后重新登录
   - 验证数据仍然存在

3. **认证状态检查**
   - 未登录用户访问 dashboard
   - 验证重定向到登录页

### API 测试

```bash
# 测试 Google OAuth 登录
curl -X POST https://novamail.world/api/auth/google-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "picture": "https://example.com/avatar.jpg",
    "provider": "google",
    "accessToken": "mock_token"
  }'

# 测试验证码发送
curl -X POST https://novamail.world/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## 🔍 故障排除

### 常见问题

1. **API 端点未找到**
   - 检查 Workers 代码是否正确部署
   - 确认路由配置正确

2. **KV 存储错误**
   - 检查 KV 命名空间是否创建
   - 确认绑定配置正确

3. **Google OAuth 失败**
   - 检查 Google 客户端配置
   - 确认重定向 URI 正确

### 调试方法

1. **查看 Workers 日志**
   - 在 Cloudflare Dashboard 中查看 Workers 日志
   - 检查错误信息和调试输出

2. **测试 API 端点**
   - 使用 curl 或 Postman 测试 API
   - 验证请求和响应格式

3. **检查 KV 存储**
   - 在 Cloudflare Dashboard 中查看 KV 数据
   - 确认数据已正确保存

## 📊 部署状态

### 当前状态
- ✅ Workers 代码已更新
- ✅ Google OAuth 流程已修复
- ✅ 用户数据持久化已实现
- ⏳ KV 存储需要配置
- ⏳ Workers 需要手动部署

### 下一步
1. 手动部署 Workers 代码
2. 创建 KV 命名空间
3. 配置 KV 绑定
4. 测试所有功能

## 🎯 完成检查清单

- [ ] 登录 Cloudflare Dashboard
- [ ] 更新 Workers 代码
- [ ] 创建 KV 命名空间
- [ ] 配置 KV 绑定
- [ ] 测试 Google OAuth 登录
- [ ] 验证用户数据持久化
- [ ] 测试 dashboard 认证检查
- [ ] 验证登出功能

---

**重要**: 这个手动部署是修复 Google OAuth 用户数据持久化 bug 的关键步骤，确保用户登录后数据能够正确保存和恢复。
