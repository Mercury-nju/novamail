# Cloudflare Workers 部署指南

## 概述
NovaMail 使用 Cloudflare Workers 来提供 API 端点，包括验证码发送、用户验证等功能。

## 部署步骤

### 1. 准备 Cloudflare API Token
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. 创建 API Token，权限包括：
   - `Cloudflare Workers:Edit`
   - `Account:Read`
3. 复制生成的 API Token

### 2. 设置环境变量
```bash
# Windows PowerShell
$env:CLOUDFLARE_API_TOKEN="your_api_token_here"

# Windows CMD
set CLOUDFLARE_API_TOKEN=your_api_token_here

# Linux/Mac
export CLOUDFLARE_API_TOKEN="your_api_token_here"
```

### 3. 配置 Resend API 密钥
1. 注册 [Resend](https://resend.com) 账户
2. 获取 API 密钥
3. 更新 `workers/wrangler.toml` 中的 `RESEND_API_KEY`

### 4. 部署 Workers
```bash
# 进入 workers 目录
cd workers

# 部署到 Cloudflare Workers
wrangler deploy
```

### 5. 验证部署
部署成功后，你会看到类似输出：
```
✨ Success! Uploaded 1 files (123.45 KB)
📦  novamail-api@1.0.0
🌍  https://novamail-api.your-subdomain.workers.dev
```

## API 端点

### 验证码相关
- `POST /api/auth/send-verification` - 发送验证码
- `POST /api/auth/verify-code` - 验证验证码

### Creem 支付相关
- `GET /api/creem/test` - 测试 Creem API
- `GET /api/creem/webhook-test` - 测试 Webhook
- `GET /api/creem/plans` - 获取订阅计划
- `POST /api/creem/subscriptions` - 创建订阅

## 环境变量

### 必需的环境变量
- `CREEM_API_KEY` - Creem 支付 API 密钥
- `CREEM_BASE_URL` - Creem API 基础 URL
- `CREEM_WEBHOOK_SECRET` - Creem Webhook 密钥
- `RESEND_API_KEY` - Resend 邮件服务 API 密钥

### 配置示例
```toml
[vars]
CREEM_API_KEY = "creem_22oMcuzUH4TeWyWVAVjTes"
CREEM_BASE_URL = "https://api.creem.io/v1"
CREEM_WEBHOOK_SECRET = "whsec_5uvCq8f1gQMsqz5rqwdVgZ"
RESEND_API_KEY = "re_your_actual_resend_api_key"
```

## 测试 API

### 1. 测试验证码发送
```bash
curl -X POST https://novamail-api.your-subdomain.workers.dev/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### 2. 测试验证码验证
```bash
curl -X POST https://novamail-api.your-subdomain.workers.dev/api/auth/verify-code \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "code": "123456", "firstName": "Test", "lastName": "User"}'
```

### 3. 测试 Creem API
```bash
curl https://novamail-api.your-subdomain.workers.dev/api/creem/test
```

## 故障排除

### 常见问题

#### 1. API Token 无效
```
Error: Invalid API Token
```
**解决方案**: 检查 API Token 是否正确设置，权限是否足够

#### 2. 环境变量未设置
```
Error: RESEND_API_KEY not found
```
**解决方案**: 确保在 `wrangler.toml` 中正确配置了所有环境变量

#### 3. 部署失败
```
Error: Failed to deploy
```
**解决方案**: 
- 检查网络连接
- 验证 API Token 权限
- 查看详细错误日志

### 调试技巧

#### 1. 查看日志
```bash
wrangler tail
```

#### 2. 本地测试
```bash
wrangler dev
```

#### 3. 检查部署状态
```bash
wrangler deployments list
```

## 更新部署

### 修改代码后重新部署
```bash
cd workers
wrangler deploy
```

### 回滚到上一个版本
```bash
wrangler rollback
```

## 监控和维护

### 1. 监控 API 使用情况
- 访问 Cloudflare Dashboard
- 查看 Workers 使用统计
- 监控错误率和响应时间

### 2. 日志分析
- 使用 `wrangler tail` 查看实时日志
- 分析错误模式和性能问题

### 3. 定期更新
- 更新依赖包
- 检查安全漏洞
- 优化性能

## 安全注意事项

1. **API 密钥安全**
   - 不要在代码中硬编码 API 密钥
   - 使用环境变量存储敏感信息
   - 定期轮换 API 密钥

2. **访问控制**
   - 限制 API 访问频率
   - 实施适当的身份验证
   - 监控异常访问模式

3. **数据保护**
   - 加密敏感数据传输
   - 实施数据保留策略
   - 遵守隐私法规

## 成本优化

1. **请求优化**
   - 减少不必要的 API 调用
   - 实施缓存策略
   - 优化响应大小

2. **资源管理**
   - 监控 Workers 使用量
   - 优化代码性能
   - 使用适当的计划

3. **第三方服务**
   - 监控 Resend 使用量
   - 优化邮件发送频率
   - 使用免费额度
