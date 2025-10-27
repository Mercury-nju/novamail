# 直接修复 Cloudflare KV Binding 问题

## 问题确认

通过代码分析确认：
1. `functions/api/export.js` 第51行：`await env.USERS_KV.get(userKey)` 
2. `functions/api/mailchimp/callback.js` 第88行：`await env.USERS_KV.get(userKey)`

这些代码期望 `env.USERS_KV` 存在，但 Cloudflare Pages Functions 中 `env.USERS_KV` 为 `undefined`。

## 根本原因

**Cloudflare Pages Functions 的 KV binding 必须在 Dashboard 中手动配置**，`wrangler.toml` 配置不会自动应用到 Pages Functions。

## 立即修复步骤

### 1. 登录 Cloudflare Dashboard
访问：https://dash.cloudflare.com/

### 2. 导航到 Pages 项目
- Workers & Pages → Pages → NovaMail

### 3. 配置 KV Binding
- Settings → Functions → KV Namespace Bindings
- 点击 "Edit bindings" 或 "Add binding"
- 添加：
  - **Variable name**: `USERS_KV`
  - **KV namespace**: `NovaMail-Users` 或 ID: `41bca314c98c4db580f450fb2e2c37bd`

### 4. 保存并等待重新部署
- 点击保存
- 等待自动重新部署（1-2分钟）

## 验证修复

部署完成后，访问 `/api/kv-status` 应该返回：
```json
{
  "success": true,
  "kv_status": {
    "available": true,
    "readable": true,
    "writable": true
  }
}
```

## 如果仍然失败

如果 Dashboard 配置后仍然失败，说明：
1. KV namespace `41bca314c98c4db580f450fb2e2c37bd` 不存在
2. 需要先创建 KV namespace

**创建 KV namespace 步骤**：
1. Workers & Pages → KV
2. Create a namespace
3. 名称：`NovaMail-Users`
4. 复制生成的 ID
5. 更新 `wrangler.toml` 中的 ID
6. 重新配置 Pages Functions 的 KV binding

## 预期结果

修复后，Export 功能应该：
1. 成功连接 Mailchimp
2. 存储 token 到 KV
3. 从 KV 读取 token
4. 成功导出模板到 Mailchimp
