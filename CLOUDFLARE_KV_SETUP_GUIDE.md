# Cloudflare KV 存储配置指南

## 🚨 紧急修复 - KV存储配置

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

### 第一步：登录Cloudflare Dashboard

1. **访问Cloudflare Dashboard**
   - 打开 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
   - 登录你的Cloudflare账户

2. **选择账户**
   - 确保选择了正确的Cloudflare账户

### 第二步：创建KV命名空间

1. **进入KV存储页面**
   - 在左侧菜单中点击 "Workers & Pages"
   - 点击 "KV" 选项卡

2. **创建USERS_KV命名空间**
   - 点击 "Create a namespace" 按钮
   - 名称: `NovaMail-Users`
   - 点击 "Add" 按钮
   - **重要**: 复制生成的命名空间ID (格式: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

3. **创建EMAIL_CONFIG_KV命名空间**
   - 点击 "Create a namespace" 按钮
   - 名称: `NovaMail-EmailConfig`
   - 点击 "Add" 按钮
   - **重要**: 复制生成的命名空间ID

4. **创建CAMPAIGNS_KV命名空间**
   - 点击 "Create a namespace" 按钮
   - 名称: `NovaMail-Campaigns`
   - 点击 "Add" 按钮
   - **重要**: 复制生成的命名空间ID

### 第三步：更新wrangler.toml配置

1. **获取命名空间ID**
   - 在KV页面中，点击每个命名空间
   - 复制 "Namespace ID" (32位字符串)

2. **更新配置文件**
   - 打开 `workers/wrangler.toml`
   - 取消注释KV配置部分
   - 替换 `your-*-kv-id` 为实际的命名空间ID

### 第四步：重新部署Workers

```bash
cd workers
wrangler deploy
```

## 📊 配置示例

### wrangler.toml 配置示例

```toml
# KV 存储配置
[[kv_namespaces]]
binding = "USERS_KV"
id = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"  # 替换为实际的USERS_KV ID
preview_id = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"

[[kv_namespaces]]
binding = "EMAIL_CONFIG_KV"
id = "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7"  # 替换为实际的EMAIL_CONFIG_KV ID
preview_id = "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7"

[[kv_namespaces]]
binding = "CAMPAIGNS_KV"
id = "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8"  # 替换为实际的CAMPAIGNS_KV ID
preview_id = "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8"
```

## 🧪 测试配置

### 测试Google OAuth登录

1. **访问网站**
   - 打开 [https://novamail.world](https://novamail.world)
   - 点击 "Continue with Google"

2. **完成Google认证**
   - 选择Google账户
   - 授权应用访问

3. **验证登录成功**
   - 应该跳转到dashboard
   - 用户信息应该正确显示

4. **测试数据持久化**
   - 刷新页面，确认登录状态保持
   - 登出后重新登录，确认用户数据存在

### 测试用户数据存储

1. **创建测试数据**
   - 在dashboard中创建campaign
   - 添加contacts
   - 发送测试邮件

2. **验证数据持久化**
   - 登出并重新登录
   - 确认数据仍然存在

## 🔍 故障排除

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

2. **检查KV存储**
   - 在Cloudflare Dashboard中查看KV数据
   - 确认数据已正确保存

3. **测试API端点**
   ```bash
   curl -X POST https://novamail.world/api/auth/google-login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User","provider":"google"}'
   ```

## 📈 性能优化

### 缓存策略
- 使用KV存储的缓存功能
- 实现数据缓存机制
- 减少KV读取次数

### 数据压缩
- 压缩存储的数据
- 使用高效的序列化格式
- 定期清理过期数据

## 🎯 完成检查清单

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
