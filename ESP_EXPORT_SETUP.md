# ESP导出功能配置指南

## 概述

NovaMail现在支持将邮件模板导出到各种Email Service Provider (ESP)，包括Mailchimp、SendGrid和Resend。用户可以在NovaMail中设计模板，然后导出到他们选择的ESP平台进行发送和追踪。

## 功能特性

- **多ESP支持**: Mailchimp (OAuth), SendGrid (API Key), Resend (API Key)
- **OAuth授权**: Mailchimp使用OAuth 2.0授权流程
- **API Key认证**: SendGrid和Resend使用API Key认证
- **模板同步**: 将HTML模板和主题同步到ESP平台
- **编辑链接**: 导出成功后提供ESP平台的编辑链接

## 配置步骤

### 1. Mailchimp配置

#### 1.1 创建Mailchimp应用
1. 访问 [Mailchimp Developer](https://developer.mailchimp.com/)
2. 登录你的Mailchimp账户
3. 点击 "Create App"
4. 填写应用信息：
   - App Name: NovaMail Integration
   - Description: Email template export integration
   - Redirect URI: `https://your-domain.com/api/mailchimp/callback`

#### 1.2 获取OAuth凭据
1. 在应用详情页面找到：
   - Client ID
   - Client Secret
2. 记录这些信息用于配置

#### 1.3 配置环境变量
在Cloudflare Workers Dashboard中配置以下Secrets：
```
MAILCHIMP_CLIENT_ID=your-client-id
MAILCHIMP_CLIENT_SECRET=your-client-secret
MAILCHIMP_REDIRECT_URI=https://your-domain.com/api/mailchimp/callback
```

### 2. SendGrid配置

#### 2.1 创建SendGrid API Key
1. 访问 [SendGrid Dashboard](https://app.sendgrid.com/)
2. 登录你的SendGrid账户
3. 导航到 Settings > API Keys
4. 点击 "Create API Key"
5. 选择 "Restricted Access"
6. 授予以下权限：
   - Template Engine: Full Access
   - User: Read Access
7. 复制生成的API Key

#### 2.2 配置环境变量
在Cloudflare Workers Dashboard中配置以下Secret：
```
SENDGRID_API_KEY=your-api-key
```

### 3. Resend配置

#### 3.1 获取Resend API Key
1. 访问 [Resend Dashboard](https://resend.com/)
2. 登录你的Resend账户
3. 导航到 API Keys
4. 点击 "Create API Key"
5. 复制生成的API Key

#### 3.2 配置环境变量
在Cloudflare Workers Dashboard中配置以下Secret：
```
RESEND_API_KEY=your-api-key
```

## API端点

### 导出模板
```
POST /api/export
Content-Type: application/json

{
  "esp": "mailchimp|sendgrid|resend",
  "name": "Template Name",
  "html": "<html>...</html>",
  "subject": "Email Subject",
  "userEmail": "user@example.com"
}
```

### Mailchimp OAuth连接
```
POST /api/mailchimp/connect
Content-Type: application/json

{
  "userEmail": "user@example.com"
}
```

### Mailchimp OAuth回调
```
POST /api/mailchimp/callback
Content-Type: application/json

{
  "code": "authorization-code",
  "userEmail": "user@example.com"
}
```

## 用户流程

### Mailchimp导出流程
1. 用户点击"Export to ESP"
2. 选择Mailchimp
3. 点击"Connect Mailchimp"（首次使用）
4. 在新窗口中完成Mailchimp OAuth授权
5. 返回NovaMail，点击"Export"
6. 模板同步到Mailchimp
7. 可选择在新窗口中打开Mailchimp编辑器

### SendGrid/Resend导出流程
1. 用户点击"Export to ESP"
2. 选择SendGrid或Resend
3. 点击"Export"
4. 模板同步到对应平台
5. 可选择在新窗口中打开编辑器

## 技术实现

### 适配器模式
使用适配器模式实现不同ESP的统一接口：

```javascript
// 基础适配器
class BaseESPAdapter {
  async createTemplate({ name, html, subject }) { }
  async checkAuth() { }
}

// Mailchimp适配器
class MailchimpAdapter extends BaseESPAdapter {
  async createTemplate({ name, html, subject }) {
    // OAuth授权检查
    // 调用Mailchimp API创建模板
  }
}

// SendGrid适配器
class SendGridAdapter extends BaseESPAdapter {
  async createTemplate({ name, html, subject }) {
    // API Key验证
    // 调用SendGrid API创建模板
  }
}
```

### 错误处理
- OAuth token过期处理
- API Key无效处理
- 网络错误处理
- 用户友好的错误消息

## 安全注意事项

1. **OAuth安全**: 所有OAuth操作在后端处理，不在前端暴露client_secret
2. **API Key保护**: API Key存储在Cloudflare Secrets中
3. **用户数据**: 用户的OAuth token存储在KV存储中
4. **日志安全**: 在日志中隐藏HTML内容和敏感信息

## 故障排除

### 常见问题

1. **Mailchimp授权失败**
   - 检查Redirect URI配置
   - 确认Client ID和Secret正确
   - 检查OAuth权限范围

2. **SendGrid API错误**
   - 验证API Key权限
   - 检查API Key是否有效
   - 确认模板权限设置

3. **Resend功能限制**
   - Resend目前不支持模板功能
   - 会显示"功能未支持"提示

### 调试方法

1. 检查Cloudflare Workers日志
2. 验证环境变量配置
3. 测试API端点响应
4. 检查用户授权状态

## 扩展支持

要添加新的ESP支持：

1. 创建新的适配器类继承`BaseESPAdapter`
2. 实现`createTemplate`和`checkAuth`方法
3. 在`handleExportToESP`中添加新的case
4. 更新前端ESP选择列表
5. 添加相应的环境变量配置

## 部署检查清单

- [ ] Mailchimp OAuth应用已创建
- [ ] SendGrid API Key已生成
- [ ] Resend API Key已生成
- [ ] 环境变量已在Cloudflare Workers中配置
- [ ] Redirect URI已正确设置
- [ ] API权限已正确配置
- [ ] 测试导出流程正常工作
