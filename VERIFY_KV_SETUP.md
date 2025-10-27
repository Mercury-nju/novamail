# Cloudflare KV 配置验证和故障排除指南

## 🔍 验证 KV Binding 是否配置

### 步骤 1: 登录 Cloudflare Dashboard

访问 https://dash.cloudflare.com/ 并登录

### 步骤 2: 导航到 Pages 项目

1. 点击左侧菜单 **"Workers & Pages"**
2. 点击 **"Pages"** 标签
3. 找到并点击 **"NovaMail"** 项目

### 步骤 3: 检查 Functions 配置

1. 在 NovaMail 项目页面，点击 **"Settings"** 标签（左侧菜单）
2. 滚动到 **"Functions"** 部分
3. 找到 **"KV Namespace Bindings"**

### 步骤 4: 验证 KV Binding

你应该看到类似以下内容：

```
Variable name: USERS_KV
KV namespace: NovaMail-Users (41bca314c98c4db580f450fb2e2c37bd)
```

**如果看不到 USERS_KV binding** → 需要手动配置（见下方"手动配置 KV Binding"）

## 🔧 手动配置 KV Binding

### 如果 KV Binding 不存在：

1. 在 **KV Namespace Bindings** 部分，点击 **"Add binding"** 或 **"Edit bindings"**
2. 填写以下信息：
   - **Variable name**: `USERS_KV`
   - **KV namespace**: 选择 `NovaMail-Users` 或输入 ID: `41bca314c98c4db580f450fb2e2c37bd`
3. 点击 **"Save"** 或 **"Continue"**
4. 等待自动重新部署

## 🐛 故障排除

### 问题 1: "env.USERS_KV is undefined" 错误

**症状**: 在 Cloudflare Pages Functions 中无法访问 `env.USERS_KV`

**可能原因**:
- KV binding 未在 Cloudflare Dashboard 中配置
- KV binding 名称与代码中不一致

**解决步骤**:
1. 按照上方"手动配置 KV Binding"步骤操作
2. 确保变量名是 `USERS_KV`（完全匹配）
3. 重新部署项目

### 问题 2: "Cannot read properties of undefined (reading 'get')"

**症状**: 在 Functions 中调用 `env.USERS_KV.get()` 时报错

**可能原因**:
- KV binding 未正确配置
- Pages Functions 环境变量未更新

**解决步骤**:
1. 在 Cloudflare Dashboard 中验证 KV binding
2. 如果 binding 存在但仍有错误，尝试：
   - 重新部署项目
   - 清除 Cloudflare 缓存
3. 检查 `wrangler.toml` 中的 KV namespace ID 是否正确

### 问题 3: Export 功能失败（"Failed to export template"）

**症状**: 用户点击 Export 按钮后收到错误提示

**调试步骤**:
1. 打开浏览器开发者工具（F12）
2. 查看 Console 日志，查找以下信息：
   - `ESP: mailchimp`
   - `User Email: xxx@example.com`
   - `Access Token provided: true/false`
   - `Looking for user in KV, key: user_xxx@example.com`
   - `User data from KV: Found/Not found`

**如果看到 "Access Token provided: false"**:
- 用户需要重新连接 Mailchimp
- 点击 "Connect Mailchimp" 按钮完成 OAuth 授权

**如果看到 "User data from KV: Not found"**:
- KV binding 可能未配置
- 用户 token 未存储到 KV
- OAuth callback 未成功执行

## 📝 调试日志清单

当用户报告 Export 失败时，请检查以下日志：

```
=== Export Request Received ===
ESP: mailchimp
Name: My Template
User Email: user@example.com
HTML length: 1234
Access Token provided: true/false ← 关键
DC provided: us20
Initial token check: { hasToken: true/false, hasDc: true/false } ← 关键
Looking for user in KV, key: user_user@example.com ← 关键
User data from KV: Found/Not found ← 关键
Using token from request ← 表示使用 localStorage token
No token in request, checking KV... ← 表示尝试从 KV 读取
```

## ✅ 配置检查清单

在部署前，请确认：

- [ ] `wrangler.toml` 中有 KV namespace binding 配置
- [ ] Cloudflare Dashboard 中 Functions 配置了 KV binding
- [ ] `functions/api/mailchimp/callback.js` 中有存储 token 到 KV 的逻辑
- [ ] `functions/api/export.js` 中有从 KV 读取 token 的逻辑
- [ ] 前端代码已更新以发送 `accessToken` 和 `dc` 在 request body

## 🚀 重新部署和验证

### 部署代码更改

```bash
git add -A
git commit -m "Fix KV binding and export functionality"
git push origin main
```

### 验证部署

1. 等待 Cloudflare Pages 自动部署完成（约 1-2 分钟）
2. 访问 https://dash.cloudflare.com/
3. 进入 Workers & Pages → Pages → NovaMail
4. 查看最新部署状态
5. 点击最新部署 → "View Functions"
6. 确认 Functions 正常加载

### 测试 Export 功能

1. 访问邮件编辑器页面
2. 点击 "Export to ESP"
3. 点击 "Connect Mailchimp"（如果未连接）
4. 选择 Mailchimp 并点击 "Export"
5. 查看浏览器控制台日志
6. 如果成功，应该跳转到 Mailchimp 编辑页面

## 📞 需要帮助？

如果问题仍然存在，请提供：

1. Cloudflare Dashboard 中 KV binding 的截图
2. 浏览器控制台的完整日志
3. Cloudflare Pages Functions 的日志（在 Cloudflare Dashboard → Pages → NovaMail → Logs）

