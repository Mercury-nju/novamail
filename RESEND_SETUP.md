# Resend API 设置指南

## 概述
NovaMail 使用 Resend API 来发送验证码和欢迎邮件。需要配置 Resend API 密钥才能启用真实的邮件发送功能。

## 设置步骤

### 1. 注册 Resend 账户
1. 访问 [Resend.com](https://resend.com)
2. 注册账户并验证邮箱
3. 完成账户设置

### 2. 获取 API 密钥
1. 登录 Resend 控制台
2. 进入 "API Keys" 页面
3. 创建新的 API 密钥
4. 复制生成的 API 密钥（格式：`re_xxxxxxxxxx`）

### 3. 配置 Cloudflare Workers
1. 更新 `wrangler.toml` 文件中的 `RESEND_API_KEY`
2. 将占位符 `re_1234567890abcdef` 替换为真实的 API 密钥

```toml
[vars]
RESEND_API_KEY = "re_your_actual_api_key_here"
```

### 4. 验证域名（可选）
- 在 Resend 控制台中添加并验证你的发送域名
- 这将提高邮件的送达率并避免垃圾邮件文件夹

## 邮件模板

### 验证码邮件
- **发件人**: NovaMail <noreply@novamail.com>
- **主题**: Your NovaMail Verification Code
- **内容**: 包含6位验证码的HTML邮件

### 欢迎邮件
- **发件人**: NovaMail <welcome@novamail.com>
- **主题**: Welcome to NovaMail!
- **内容**: 欢迎信息和仪表板链接

## 测试

### 开发环境
- 验证码会在控制台中显示（仅用于测试）
- 邮件会发送到指定的邮箱地址

### 生产环境
- 验证码只通过邮件发送
- 不会在控制台显示验证码

## 故障排除

### 常见问题
1. **API 密钥无效**: 检查密钥格式和权限
2. **邮件发送失败**: 检查邮箱地址格式和域名验证
3. **验证码未收到**: 检查垃圾邮件文件夹

### 调试
- 查看 Cloudflare Workers 日志
- 检查 Resend API 响应
- 验证网络连接

## 安全注意事项
- 不要在代码中硬编码 API 密钥
- 使用环境变量存储敏感信息
- 定期轮换 API 密钥
- 监控 API 使用情况

## 成本
- Resend 提供免费额度：每月 3,000 封邮件
- 超出免费额度后按使用量计费
- 查看 [Resend 定价页面](https://resend.com/pricing) 了解详细信息
