# Cloudflare KV Binding 配置指南

## 问题背景

Cloudflare Pages Functions 需要正确绑定 KV namespace 才能访问 `env.USERS_KV`。

根据 Cloudflare Dashboard 的提示："此项目的绑定正在通过 wrangler.toml 进行管理"，`wrangler.toml` 中的 KV 配置应该在 Cloudflare Dashboard 中生效。

## 已完成的配置

### 1. wrangler.toml 配置

已在 `wrangler.toml` 中配置 KV namespace binding：

```toml
[[kv_namespaces]]
binding = "USERS_KV"
id = "41bca314c98c4db580f450fb2e2c37bd"
```

### 2. Functions 代码更新

- **functions/api/mailchimp/callback.js**: 已在 callback 时存储 token 到 KV
- **functions/api/export.js**: 已在导出时从 KV 读取 token

## 部署流程

### 1. 通过 Cloudflare Dashboard 部署

1. 进入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 Workers & Pages → Pages → NovaMail 项目
3. 在 Git 集成设置中，确保绑定 KV namespace `USERS_KV`
4. 如果未绑定，在项目设置中手动绑定：
   - 进入 **Settings** → **Functions** → **KV Namespace Bindings**
   - 添加 KV namespace binding：
     - **Variable name**: `USERS_KV`
     - **KV namespace**: `41bca314c98c4db580f450fb2e2c37bd` (NovaMail-Users)

### 2. 验证配置

部署成功后，在 Cloudflare Dashboard 中查看：

1. **Settings** → **Functions** → **KV Namespace Bindings**
2. 确认 `USERS_KV` 已绑定到 `NovaMail-Users` namespace

## 代码逻辑

### Mailchimp OAuth Callback (functions/api/mailchimp/callback.js)

```javascript
// 存储 user token 到 KV
const userKey = `user_${userEmail.toLowerCase()}`;
const userData = await env.USERS_KV.get(userKey);

if (userData) {
  const user = JSON.parse(userData);
  user.mailchimpAccessToken = access_token;
  user.mailchimpDc = dc;
  user.mailchimpConnected = true;
  await env.USERS_KV.put(userKey, JSON.stringify(user));
} else {
  const newUser = {
    email: userEmail,
    mailchimpAccessToken: access_token,
    mailchimpDc: dc,
    mailchimpConnected: true
  };
  await env.USERS_KV.put(userKey, JSON.stringify(newUser));
}
```

### ESP Export (functions/api/export.js)

```javascript
// 从 KV 读取 user token
const userKey = `user_${userEmail.toLowerCase()}`;
const userData = await env.USERS_KV.get(userKey);

if (userData) {
  const user = JSON.parse(userData);
  mailchimpAccessToken = user.mailchimpAccessToken;
  mailchimpDc = user.mailchimpDc;
}
```

## 测试步骤

### 1. 测试 Mailchimp OAuth 连接

1. 打开 `/dashboard/campaigns/edit?template=modern-gradient`
2. 点击 **Export to ESP**
3. 选择 **Mailchimp**
4. 点击 **Connect Mailchimp**
5. 完成 OAuth 授权
6. 检查浏览器控制台日志：
   - `KV available: true`
   - `Storing user token in KV, key: user_xxx@example.com`
   - `Updated existing user in KV` 或 `Created new user in KV`

### 2. 测试 Export 功能

1. 连接 Mailchimp 后，点击 **Export**
2. 检查浏览器控制台日志：
   - `Looking for user in KV, key: user_xxx@example.com`
   - `User data from KV: Found`
   - `User token found in KV`
3. 成功导出后应跳转到 Mailchimp 编辑页面

## 故障排查

### 问题：`env.USERS_KV is undefined`

**原因**: KV namespace 未正确绑定到 Pages Functions。

**解决方案**:
1. 确认 Cloudflare Dashboard 中的 KV binding 配置
2. 重新部署项目
3. 检查 `wrangler.toml` 中的 KV namespace ID 是否正确

### 问题：`User token found in KV` 但导出失败

**原因**: Token 已过期或无效。

**解决方案**:
1. 用户需要重新连接 Mailchimp
2. 检查 Mailchimp API 日志
3. 验证 `access_token` 和 `dc` 是否有效

### 问题：`Cannot read properties of undefined (reading 'get')`

**原因**: `env.USERS_KV` 未定义，表示 KV binding 未生效。

**解决方案**:
1. 在 Cloudflare Dashboard 中手动配置 KV binding
2. 确认 binding 名称与代码中一致（`USERS_KV`）
3. 重新部署项目

## 生产环境注意事项

1. **KV namespace 容量**: 单条记录最大 25MB，适合存储用户 OAuth tokens
2. **读取性能**: KV 是 eventually consistent，读取可能有延迟
3. **安全性**: 确保只有已登录用户才能访问 KV 中的 token
4. **Token 过期**: Mailchimp OAuth token 可能过期，需要 refresh token 机制

## 后续改进

- [ ] 实现 OAuth token refresh 机制
- [ ] 添加 token 过期检测和自动重新授权
- [ ] 支持多个 ESP 账户的 token 管理
- [ ] 实现用户级别的 token 加密存储

