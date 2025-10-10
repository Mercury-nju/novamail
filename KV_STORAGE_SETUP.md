# Cloudflare KV 存储配置指南

## 🚨 紧急修复说明

我们已经修复了Google OAuth用户数据持久化的严重bug，现在需要配置Cloudflare KV存储来保存用户数据。

## 📋 需要创建的KV命名空间

### 1. USERS_KV - 用户数据存储
- **用途**: 存储用户账户信息
- **数据**: 用户基本信息、登录状态、使用量统计

### 2. EMAIL_CONFIG_KV - 邮件配置存储
- **用途**: 存储用户SMTP配置
- **数据**: Gmail SMTP设置、用户自定义邮件配置

### 3. CAMPAIGNS_KV - 营销活动存储
- **用途**: 存储campaign数据
- **数据**: 邮件活动记录、发送统计

## 🔧 配置步骤

### 第一步：创建KV命名空间

1. **登录Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 选择你的账户

2. **创建USERS_KV命名空间**
   - 转到 "Workers & Pages" → "KV"
   - 点击 "Create a namespace"
   - 名称: `NovaMail-Users`
   - 点击 "Add"

3. **创建EMAIL_CONFIG_KV命名空间**
   - 点击 "Create a namespace"
   - 名称: `NovaMail-EmailConfig`
   - 点击 "Add"

4. **创建CAMPAIGNS_KV命名空间**
   - 点击 "Create a namespace"
   - 名称: `NovaMail-Campaigns`
   - 点击 "Add"

### 第二步：获取命名空间ID

1. **复制命名空间ID**
   - 点击每个命名空间
   - 复制 "Namespace ID" (格式: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

2. **更新wrangler.toml**
   ```toml
   [[kv_namespaces]]
   binding = "USERS_KV"
   id = "你的USERS_KV命名空间ID"
   preview_id = "你的USERS_KV预览ID"

   [[kv_namespaces]]
   binding = "EMAIL_CONFIG_KV"
   id = "你的EMAIL_CONFIG_KV命名空间ID"
   preview_id = "你的EMAIL_CONFIG_KV预览ID"

   [[kv_namespaces]]
   binding = "CAMPAIGNS_KV"
   id = "你的CAMPAIGNS_KV命名空间ID"
   preview_id = "你的CAMPAIGNS_KV预览ID"
   ```

### 第三步：部署更新

```bash
cd workers
wrangler deploy
```

## 🔍 验证配置

### 测试Google OAuth登录
1. 访问网站
2. 点击 "Continue with Google"
3. 完成Google认证
4. 检查是否成功跳转到dashboard
5. 刷新页面，确认登录状态保持

### 测试用户数据持久化
1. 登录后创建一些数据（campaign、contacts等）
2. 登出并重新登录
3. 确认数据仍然存在

## 📊 数据存储格式

### 用户数据 (USERS_KV)
```json
{
  "id": "user_1234567890_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "picture": "https://...",
  "provider": "google",
  "emailVerified": true,
  "plan": "free",
  "createdAt": "2025-10-10T14:30:00.000Z",
  "updatedAt": "2025-10-10T14:30:00.000Z",
  "token": "token_xyz789",
  "emailsSentThisMonth": 0,
  "contactsCount": 0,
  "campaignsCount": 0,
  "lastUsageReset": "2025-10-10T14:30:00.000Z"
}
```

### 邮件配置 (EMAIL_CONFIG_KV)
```json
{
  "provider": "gmail",
  "email": "user@gmail.com",
  "smtpHost": "smtp.gmail.com",
  "smtpPort": "587",
  "isSecure": true,
  "isConfigured": true,
  "password": "encrypted_password",
  "createdAt": "2025-10-10T14:30:00.000Z",
  "updatedAt": "2025-10-10T14:30:00.000Z"
}
```

### 营销活动 (CAMPAIGNS_KV)
```json
{
  "id": "campaign_1234567890",
  "name": "Welcome Campaign",
  "subject": "Welcome to NovaMail!",
  "status": "sent",
  "recipients": 100,
  "sent": 95,
  "opened": 0,
  "clicked": 0,
  "openRate": 0,
  "clickRate": 0,
  "createdAt": "2025-10-10T14:30:00.000Z",
  "sentAt": "2025-10-10T14:30:00.000Z",
  "businessName": "NovaMail",
  "sendingMethod": "novamail_default"
}
```

## ⚠️ 注意事项

### 安全提醒
- KV存储是公开的，不要存储敏感信息
- 密码等敏感数据需要加密
- 定期备份重要数据

### 性能考虑
- KV存储有读取限制
- 考虑使用缓存策略
- 监控存储使用量

### 故障排除
- 检查命名空间ID是否正确
- 确认Workers有KV访问权限
- 查看Workers日志排查问题

## 🎯 修复完成检查清单

- [ ] 创建USERS_KV命名空间
- [ ] 创建EMAIL_CONFIG_KV命名空间
- [ ] 创建CAMPAIGNS_KV命名空间
- [ ] 更新wrangler.toml配置
- [ ] 重新部署Workers
- [ ] 测试Google OAuth登录
- [ ] 测试用户数据持久化
- [ ] 测试dashboard认证检查
- [ ] 测试登出功能

---

**重要**: 这些修复解决了用户数据不持久化的严重bug，确保用户登录后数据能够正确保存和恢复。
