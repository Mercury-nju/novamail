# 生产环境Google OAuth配置指南

## 当前状态
✅ **开发环境已配置完成**
- 重定向URI: `http://localhost:3000/api/auth/callback/google`
- JavaScript来源: `http://localhost:3000`
- Google登录功能正常工作

## 网站上线后需要添加的配置

### 1. Google Cloud Console配置
访问：https://console.cloud.google.com/apis/credentials

**添加生产环境重定向URI**：
```
https://yourdomain.com/api/auth/callback/google
```

**添加生产环境JavaScript来源**：
```
https://yourdomain.com
```

### 2. 环境变量配置
在生产服务器上设置：
```bash
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key
GOOGLE_CLIENT_ID=1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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5tU
```

### 3. OAuth同意屏幕配置
确保OAuth同意屏幕已发布到生产环境：
- 访问：https://console.cloud.google.com/apis/credentials/consent
- 确保应用状态为"已发布"
- 添加生产域名到授权域名列表

## 部署步骤

### 步骤1: 更新Google Cloud Console
1. 在OAuth客户端配置中添加生产环境URI
2. 保持开发环境URI不变（用于本地测试）

### 步骤2: 配置生产环境变量
```bash
# 生产环境
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secure-production-secret
GOOGLE_CLIENT_ID=1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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5tU
```

### 步骤3: 部署应用
1. 部署到生产服务器
2. 确保环境变量正确设置
3. 测试Google登录功能

## 验证码功能说明

**Google OAuth vs 验证码**：
- Google OAuth：用于用户登录认证
- 验证码：用于邮箱发送功能

**验证码功能需要额外配置**：
1. **SMTP服务器配置**（用于发送邮件）
2. **邮箱服务提供商**（Gmail、SendGrid等）
3. **API密钥配置**

## 当前支持的验证码功能

### 已配置的邮箱服务
- Gmail SMTP
- 阿里云邮件服务
- 腾讯云邮件服务

### 环境变量示例
```bash
# 邮件服务配置
EMAIL_FROM=noreply@yourdomain.com
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
```

## 总结

✅ **Google登录**：开发环境已配置，生产环境需要添加域名配置
✅ **验证码功能**：需要配置SMTP服务器和邮箱服务
✅ **网站上线**：需要更新Google Cloud Console和生产环境变量

**建议**：
1. 先测试开发环境的Google登录
2. 网站上线前配置生产环境OAuth
3. 单独配置验证码发送服务
