# Gmail SMTP 配置指南

## 🚀 快速配置步骤

### 第一步：获取Gmail应用专用密码

1. **登录Gmail账户**
   - 访问 [Gmail](https://gmail.com)
   - 确保已启用两步验证

2. **进入Google账户设置**
   - 点击右上角头像 → "管理您的Google账户"
   - 或直接访问 [myaccount.google.com](https://myaccount.google.com)

3. **启用两步验证**（如果未启用）
   - 点击"安全性" → "两步验证"
   - 按照提示完成设置

4. **生成应用专用密码**
   - 点击"安全性" → "应用专用密码"
   - 选择"邮件"和"其他设备"
   - 输入设备名称：`NovaMail SMTP`
   - 点击"生成"
   - **重要**：复制生成的16位密码（格式：xxxx xxxx xxxx xxxx）

### 第二步：更新配置文件

在 `workers/wrangler.toml` 中更新以下配置：

```toml
# Gmail SMTP 配置 (用于注册验证码)
GMAIL_SMTP_USER = "your-actual-email@gmail.com"  # 替换为你的Gmail邮箱
GMAIL_SMTP_PASSWORD = "your-16-digit-app-password"  # 替换为应用专用密码
GMAIL_SMTP_HOST = "smtp.gmail.com"
GMAIL_SMTP_PORT = "587"
```

### 第三步：部署更新

```bash
cd workers
wrangler deploy
```

## 🔧 配置示例

假设你的Gmail邮箱是 `novamail.test@gmail.com`，应用专用密码是 `abcd efgh ijkl mnop`

那么配置应该是：

```toml
GMAIL_SMTP_USER = "novamail.test@gmail.com"
GMAIL_SMTP_PASSWORD = "abcdefghijklmnop"  # 去掉空格
GMAIL_SMTP_HOST = "smtp.gmail.com"
GMAIL_SMTP_PORT = "587"
```

## 🧪 测试配置

### 1. 测试API端点
```bash
curl -X POST https://novamail.world/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@gmail.com"}'
```

### 2. 检查响应
成功配置后，响应应该包含：
```json
{
  "success": true,
  "message": "Verification code sent successfully via Gmail SMTP",
  "code": "123456",
  "timestamp": "2025-10-10T14:30:00.000Z"
}
```

### 3. 检查收件箱
- 查看Gmail收件箱
- 查找来自 `your-email@gmail.com` 的邮件
- 主题：`Your NovaMail Verification Code`

## ⚠️ 注意事项

### 安全提醒
- **不要**在代码中硬编码密码
- **不要**将配置文件提交到Git
- **定期**更换应用专用密码

### 限制说明
- Gmail每日发送限制：500封
- 发送频率限制：避免短时间内大量发送
- 账户状态：确保Gmail账户正常

### 故障排除

#### 常见错误
1. **401 Unauthorized**
   - 检查应用专用密码是否正确
   - 确认已启用两步验证

2. **连接超时**
   - 检查网络连接
   - 确认SMTP设置正确

3. **发送失败**
   - 检查Gmail账户状态
   - 确认未达到发送限制

#### 回退机制
如果Gmail SMTP配置失败，系统会自动回退到测试模式，确保验证码功能始终可用。

## 📊 性能对比

| 配置状态 | 发送方式 | 每日限制 | 状态 |
|----------|----------|----------|------|
| 未配置 | 测试模式 | 无限制 | ✅ 可用 |
| 已配置 | Gmail SMTP | 500封 | ✅ 可用 |
| 失败 | 回退模式 | 无限制 | ✅ 可用 |

## 🎯 下一步

1. **配置Gmail SMTP**（当前步骤）
2. **测试真实邮件发送**
3. **监控发送成功率**
4. **优化邮件模板**

---

**需要帮助？** 如果遇到问题，请检查：
- Gmail账户状态
- 应用专用密码格式
- 网络连接
- Workers部署状态
