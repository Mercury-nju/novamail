# Cloudflare Pages 部署指南

## 🚀 **最新更新部署**

您的NovaMail应用已经更新完成，现在包含了：
- ✅ 真实邮件验证系统
- ✅ Gmail SMTP集成
- ✅ 完善的安全审计
- ✅ AI助手模式
- ✅ 数据管理功能

## 📋 **部署步骤**

### 1. 环境变量配置
在Cloudflare Pages设置中配置以下环境变量：

```bash
# 必需的环境变量
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.pages.dev
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=NovaMail <noreply@novamail.world>
```

### 2. 构建命令
使用以下构建命令：
```bash
npm run build:cloudflare
```

### 3. 数据库准备
- 如果使用数据库，确保数据库已设置并运行
- 如果使用Cloudflare D1，确保配置正确

## 🔧 **功能特点**

### 📧 **邮箱验证**
- 新注册用户必须验证邮箱
- 发送专业HTML邮件
- 6位验证码，10分钟有效期

### 🔒 **安全功能**
- 速率限制保护
- CSRF保护
- 安全的错误处理
- 安全头部配置

### 🤖 **AI助手**
- LLM风格的接口
- 智能邮件生成
- 上下文理解

### 📊 **管理功能**
- 用户管理仪表板
- 邮件活动分析
- 竞选预览和重新发送

## 🎯 **升级说明**

此版本相比之前版本的主要改进：
1. **安全强化** - 完整的安全审计和修复
2. **邮箱验证** - 真实的SMTP邮件发送
3. **用户体验** - AI助手和更好的界面
4. **管理功能** - 完善的用户和数据管理

## 📞 **支持**

如有问题，请检查：
1. 环境变量是否正确配置
2. Gmail应用密码是否有效
3. 数据库连接是否正常
4. Google OAuth设置是否正确

部署完成后，您可以：
- 测试邮箱验证功能
- 使用AI助手生成邮件
- 管理用户和数据
- 享受增强的安全性
