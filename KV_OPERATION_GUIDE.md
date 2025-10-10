# Cloudflare KV 存储操作指南

## 🎯 快速操作步骤

### 第一步：创建KV命名空间

1. **登录Cloudflare Dashboard**
   - 访问 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
   - 登录你的账户

2. **进入KV存储页面**
   - 左侧菜单：`Workers & Pages` → `KV`
   - 点击 `Create a namespace`

3. **创建三个命名空间**

   **USERS_KV (用户数据)**
   - 名称：`NovaMail-Users`
   - 点击 `Add`
   - **重要**：复制命名空间ID (32位字符串)

   **EMAIL_CONFIG_KV (邮件配置)**
   - 名称：`NovaMail-EmailConfig`
   - 点击 `Add`
   - **重要**：复制命名空间ID

   **CAMPAIGNS_KV (营销活动)**
   - 名称：`NovaMail-Campaigns`
   - 点击 `Add`
   - **重要**：复制命名空间ID

### 第二步：更新配置文件

1. **打开配置文件**
   ```bash
   # 编辑 workers/wrangler.toml
   ```

2. **替换命名空间ID**
   ```toml
   [[kv_namespaces]]
   binding = "USERS_KV"
   id = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"  # 替换为实际ID
   preview_id = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"

   [[kv_namespaces]]
   binding = "EMAIL_CONFIG_KV"
   id = "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7"  # 替换为实际ID
   preview_id = "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7"

   [[kv_namespaces]]
   binding = "CAMPAIGNS_KV"
   id = "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8"  # 替换为实际ID
   preview_id = "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8"
   ```

### 第三步：部署更新

```bash
cd workers
wrangler deploy
```

## 🔍 验证配置

### 测试Google OAuth登录
1. 访问 [https://novamail.world](https://novamail.world)
2. 点击 "Continue with Google"
3. 完成Google认证
4. 确认跳转到dashboard
5. 刷新页面，确认登录状态保持

### 测试数据持久化
1. 登录后创建campaign
2. 登出并重新登录
3. 确认数据仍然存在

## 📊 数据存储格式

### 用户数据 (USERS_KV)
```
Key: user_email@example.com
Value: {
  "id": "user_1234567890_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "picture": "https://...",
  "provider": "google",
  "emailVerified": true,
  "plan": "free",
  "createdAt": "2025-01-10T14:30:00.000Z",
  "updatedAt": "2025-01-10T14:30:00.000Z",
  "token": "token_xyz789",
  "emailsSentThisMonth": 0,
  "contactsCount": 0,
  "campaignsCount": 0,
  "lastUsageReset": "2025-01-10T14:30:00.000Z"
}
```

### 邮件配置 (EMAIL_CONFIG_KV)
```
Key: email_config_user_id
Value: {
  "provider": "gmail",
  "email": "user@gmail.com",
  "smtpHost": "smtp.gmail.com",
  "smtpPort": "587",
  "isSecure": true,
  "isConfigured": true,
  "password": "encrypted_password",
  "createdAt": "2025-01-10T14:30:00.000Z",
  "updatedAt": "2025-01-10T14:30:00.000Z"
}
```

### 营销活动 (CAMPAIGNS_KV)
```
Key: campaigns_user_id
Value: [
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
    "createdAt": "2025-01-10T14:30:00.000Z",
    "sentAt": "2025-01-10T14:30:00.000Z",
    "businessName": "NovaMail",
    "sendingMethod": "novamail_default"
  }
]
```

## 🛠️ 手动操作KV数据

### 在Cloudflare Dashboard中查看数据

1. **进入KV存储页面**
   - `Workers & Pages` → `KV`
   - 点击对应的命名空间

2. **查看数据**
   - 点击 `Keys` 选项卡
   - 查看存储的键值对

3. **添加/编辑数据**
   - 点击 `Add key` 添加新数据
   - 点击现有键进行编辑

### 使用Wrangler CLI操作

```bash
# 查看所有键
wrangler kv:key list --binding USERS_KV

# 获取特定键的值
wrangler kv:key get "user_email@example.com" --binding USERS_KV

# 设置键值
wrangler kv:key put "user_email@example.com" '{"name":"John Doe"}' --binding USERS_KV

# 删除键
wrangler kv:key delete "user_email@example.com" --binding USERS_KV
```

## 🔧 故障排除

### 常见问题

1. **KV命名空间未找到**
   - 检查命名空间ID是否正确
   - 确认命名空间已创建

2. **权限错误**
   - 确认Workers有KV访问权限
   - 检查绑定名称是否正确

3. **数据未保存**
   - 查看Workers日志
   - 检查KV存储是否正常工作

### 调试方法

1. **查看Workers日志**
   ```bash
   cd workers
   wrangler tail
   ```

2. **测试API端点**
   ```bash
   curl -X POST https://novamail.world/api/auth/google-login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User","provider":"google"}'
   ```

## ✅ 完成检查清单

- [ ] 创建USERS_KV命名空间
- [ ] 创建EMAIL_CONFIG_KV命名空间
- [ ] 创建CAMPAIGNS_KV命名空间
- [ ] 复制所有命名空间ID
- [ ] 更新wrangler.toml配置
- [ ] 重新部署Workers
- [ ] 测试Google OAuth登录
- [ ] 测试用户数据持久化
- [ ] 验证dashboard认证检查
- [ ] 测试登出功能

## 🚀 下一步

1. **完成KV存储配置**
2. **测试所有功能**
3. **监控系统性能**
4. **优化用户体验**

---

**重要**: 这个配置是修复Google OAuth用户数据持久化bug的关键步骤，确保用户登录后数据能够正确保存和恢复。


