# NovaMail SMTP Server

NovaMail 的 SMTP 服务器，用于处理用户使用自己的邮箱发送邮件。

## 功能特性

- ✅ 真实的 SMTP 连接测试
- ✅ 使用用户自己的 SMTP 配置发送邮件
- ✅ 批量邮件发送
- ✅ 速率限制保护
- ✅ 错误处理和重试机制
- ✅ CORS 支持

## 安装和运行

### 1. 安装依赖

```bash
cd smtp-server
npm install
```

### 2. 启动服务器

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 3. 健康检查

访问 `http://localhost:3001/health` 检查服务状态。

## API 接口

### 1. SMTP 连接测试

**POST** `/api/smtp/test`

测试用户的 SMTP 配置是否有效。

**请求体：**
```json
{
  "email": "user@example.com",
  "smtpHost": "smtp.gmail.com",
  "smtpPort": "587",
  "password": "app-password",
  "isSecure": true
}
```

**响应：**
```json
{
  "success": true,
  "message": "SMTP 连接测试成功",
  "details": {
    "email": "user@example.com",
    "smtpHost": "smtp.gmail.com",
    "smtpPort": "587",
    "messageId": "message-id"
  }
}
```

### 2. 发送营销邮件

**POST** `/api/smtp/send`

使用用户的 SMTP 配置发送营销邮件。

**请求体：**
```json
{
  "emailConfig": {
    "email": "user@example.com",
    "smtpHost": "smtp.gmail.com",
    "smtpPort": "587",
    "password": "app-password",
    "isSecure": true
  },
  "recipients": ["recipient1@example.com", "recipient2@example.com"],
  "subject": "营销邮件主题",
  "htmlContent": "<h1>邮件内容</h1>",
  "businessName": "公司名称"
}
```

**响应：**
```json
{
  "success": true,
  "message": "邮件发送完成，成功 2 封，失败 0 封",
  "results": [
    {
      "recipient": "recipient1@example.com",
      "success": true,
      "messageId": "message-id-1"
    }
  ],
  "errors": [],
  "totalSent": 2,
  "totalFailed": 0
}
```

## 部署

### 1. 本地部署

```bash
# 安装依赖
npm install

# 启动服务
npm start
```

### 2. 云服务器部署

推荐使用以下平台：

- **Railway**: 简单易用，支持自动部署
- **Render**: 免费额度，支持 GitHub 集成
- **Heroku**: 老牌平台，功能完善
- **DigitalOcean**: 性价比高，控制灵活

### 3. Railway 部署示例

1. 连接 GitHub 仓库
2. 选择 `smtp-server` 目录
3. 设置环境变量（如需要）
4. 自动部署

## 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `PORT` | 服务器端口 | `3001` |
| `NODE_ENV` | 运行环境 | `development` |

## 安全特性

- **速率限制**: 防止滥用
- **CORS 配置**: 限制跨域访问
- **输入验证**: 验证所有输入参数
- **错误处理**: 不暴露敏感信息

## 支持的邮箱服务商

- ✅ Gmail (smtp.gmail.com:587/465)
- ✅ Outlook (smtp-mail.outlook.com:587)
- ✅ Yahoo (smtp.mail.yahoo.com:587/465)
- ✅ 自定义 SMTP 服务器

## 故障排除

### 常见错误

1. **EAUTH**: 认证失败
   - 检查邮箱地址和应用密码
   - 确保已启用两步验证

2. **ECONNECTION**: 连接失败
   - 检查 SMTP 服务器地址和端口
   - 确认网络连接正常

3. **ETIMEDOUT**: 连接超时
   - 检查防火墙设置
   - 尝试不同的端口

### 日志查看

```bash
# 查看实时日志
npm run dev

# 生产环境日志
pm2 logs
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
