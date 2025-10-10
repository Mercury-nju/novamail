# Gmail SMTP 配置指南

## 概述
我们已经将注册验证码发送功能从Resend API切换为Gmail SMTP，以提高每日发送限制（从100封提升到500封）。

## 配置步骤

### 1. 启用Gmail应用专用密码
1. 登录你的Gmail账户
2. 进入 [Google账户设置](https://myaccount.google.com/)
3. 点击"安全性" → "两步验证"（如果未启用，请先启用）
4. 点击"应用专用密码"
5. 选择"邮件"和"其他设备"
6. 输入设备名称（如：NovaMail SMTP）
7. 复制生成的16位密码

### 2. 更新Workers配置
在 `workers/wrangler.toml` 中更新以下配置：

```toml
# Gmail SMTP 配置 (用于注册验证码)
GMAIL_SMTP_USER = "your-actual-email@gmail.com"  # 替换为你的Gmail邮箱
GMAIL_SMTP_PASSWORD = "your-16-digit-app-password"  # 替换为应用专用密码
GMAIL_SMTP_HOST = "smtp.gmail.com"
GMAIL_SMTP_PORT = "587"
```

### 3. 部署更新
```bash
cd workers
wrangler deploy
```

## 当前状态

### ✅ 已实现
- [x] Gmail SMTP配置结构
- [x] 验证码生成逻辑
- [x] 错误处理和回退机制
- [x] 开发环境测试模式

### ⚠️ 需要配置
- [ ] 真实的Gmail邮箱地址
- [ ] Gmail应用专用密码
- [ ] 重新部署Workers

### 🔄 当前行为
- **未配置Gmail SMTP时**：返回验证码用于测试
- **配置Gmail SMTP后**：尝试发送真实邮件
- **发送失败时**：回退到测试模式

## 测试方法

### 1. 测试API端点
```bash
curl -X POST https://novamail.world/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 2. 检查响应
```json
{
  "success": true,
  "message": "Verification code sent successfully via Gmail SMTP",
  "code": "123456",
  "timestamp": "2025-10-10T14:30:00.000Z"
}
```

## 优势对比

| 服务 | 每日限制 | 每月限制 | 成本 | 适用场景 |
|------|----------|----------|------|----------|
| Resend免费版 | 100封 | 3,000封 | 免费 | 小规模测试 |
| Gmail SMTP | 500封 | 15,000封 | 免费 | 中小规模应用 |
| Resend付费版 | 无限制 | 无限制 | 付费 | 大规模应用 |

## 注意事项

1. **安全性**：应用专用密码比普通密码更安全
2. **限制**：Gmail有发送频率限制，避免短时间内大量发送
3. **监控**：建议监控发送成功率，及时处理失败情况
4. **备份**：保留Resend作为备用方案

## 故障排除

### 常见问题
1. **401错误**：检查应用专用密码是否正确
2. **连接超时**：检查网络连接和SMTP设置
3. **发送失败**：检查Gmail账户状态和限制

### 回退方案
如果Gmail SMTP出现问题，系统会自动回退到测试模式，确保验证码功能始终可用。
