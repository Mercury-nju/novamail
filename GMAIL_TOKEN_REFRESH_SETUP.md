# Gmail 访问令牌自动刷新设置指南

## 更新后的功能

### 自动刷新机制
- ✅ 自动检测访问令牌过期
- ✅ 使用刷新令牌获取新访问令牌
- ✅ 无需手动更新环境变量
- ✅ 确保 Gmail API 功能持续可用

## 配置步骤

### 1. 获取刷新令牌
1. 访问 [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. 勾选 "Force prompt: Consent Screen"
3. 点击 "Authorize APIs"
4. 重新登录并授权
5. 点击 "Exchange authorization code for tokens"
6. 复制 `refresh_token` 字段

### 2. 配置 Cloudflare Worker 环境变量
在 Cloudflare Dashboard 中添加以下环境变量：

#### 必需的环境变量
- `GMAIL_ACCESS_TOKEN`: 当前访问令牌（Secret 类型）
- `GMAIL_REFRESH_TOKEN`: 刷新令牌（Secret 类型）
- `GOOGLE_CLIENT_ID`: `3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9`
- `GOOGLE_CLIENT_SECRET`: 你的客户端密钥（Secret 类型）

#### 可选的环境变量
- `GMAIL_SMTP_USER`: `lihongyangnju@gmail.com`
- `GMAIL_SMTP_PASSWORD`: `zjhk rkmy ysoz dhyi`

### 3. 部署更新后的代码
1. 复制 `workers/index.js` 的全部内容
2. 在 Cloudflare Dashboard 中打开你的 Worker
3. 粘贴代码并保存

## 工作原理

### 自动刷新流程
1. 用户请求发送验证码
2. 系统检查是否有刷新令牌
3. 如果有，尝试刷新访问令牌
4. 使用新令牌调用 Gmail API
5. 如果刷新失败，使用现有令牌

### 错误处理
- 刷新失败时继续使用现有令牌
- 记录详细的错误日志
- 确保功能不会因令牌问题中断

## 测试

### 测试发送验证码
```bash
curl -X POST https://novamail.world/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 预期响应
```json
{
  "success": true,
  "message": "Verification code sent successfully via Gmail API",
  "code": "123456",
  "note": "Email sent to your inbox",
  "timestamp": "2025-10-10T17:49:28.846Z"
}
```

## 重要提示

### 刷新令牌特点
- 长期有效（通常数月到数年）
- 用于获取新的访问令牌
- 比访问令牌更安全
- 不需要频繁更新

### 生产环境建议
- 定期检查刷新令牌状态
- 监控 Gmail API 配额使用
- 设置错误告警机制
- 备份重要的环境变量

## 故障排除

### 常见问题
1. **刷新失败**: 检查刷新令牌是否有效
2. **权限不足**: 确认 OAuth 范围包含 `gmail.send`
3. **配额超限**: 监控 Gmail API 使用量

### 日志查看
在 Cloudflare Dashboard 的 Worker 日志中查看：
- 令牌刷新状态
- API 调用结果
- 错误详细信息
