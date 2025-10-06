# 🚀 NovaMail 服务端配置指南

## 📋 概述

NovaMail是一个SaaS邮件营销平台，**您作为服务提供商**需要配置以下服务端组件，用户无需配置任何技术细节。

## 🏗️ 架构说明

### 用户视角：
- ✅ 注册账号 → 使用您的服务
- ✅ 创建邮件 → AI自动生成
- ✅ 发送邮件 → 通过您的系统
- ✅ 管理联系人 → 存储在您的数据库

### 您需要配置的（服务端）：

## 1. 🗄️ 数据库服务

### 推荐方案：PlanetScale（MySQL）
```bash
# 环境变量
DATABASE_URL="mysql://username:password@host/database"
```

**优势**：
- 无服务器MySQL
- 自动扩展
- 全球CDN
- 成本：$29/月起

### 备选方案：Supabase（PostgreSQL）
```bash
# 环境变量
DATABASE_URL="postgresql://username:password@host/database"
```

**优势**：
- 免费额度大
- 内置认证
- 实时功能
- 成本：免费-$25/月

## 2. 📧 邮件服务

### 推荐方案：Resend
```bash
# 环境变量
SMTP_HOST="smtp.resend.com"
SMTP_PORT="587"
SMTP_USER="resend"
SMTP_PASS="your-resend-api-key"
```

**优势**：
- 专为开发者设计
- 高投递率
- 详细分析
- 成本：$20/月10万封

### 备选方案：SendGrid
```bash
# 环境变量
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

## 3. 🤖 AI服务

### 已配置：阿里云通义千问
```bash
# 环境变量
DASHSCOPE_API_KEY="sk-9bf19547ddbd4be1a87a7a43cf251097"
```

**优势**：
- 成本低
- 中文优化
- 稳定可靠

## 4. 🔐 用户认证

### 已配置：Google OAuth
```bash
# 环境变量
GOOGLE_CLIENT_ID="32698331923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 🚀 部署方案

### 方案一：Vercel（推荐）
- **前端+API**: Vercel
- **数据库**: PlanetScale
- **邮件**: Resend
- **成本**: ~$50/月

### 方案二：Railway
- **全栈**: Railway
- **数据库**: Railway PostgreSQL
- **邮件**: Resend
- **成本**: ~$30/月

### 方案三：AWS
- **计算**: AWS Lambda
- **数据库**: AWS RDS
- **邮件**: AWS SES
- **成本**: ~$100-300/月

## 📊 用户数据隔离

每个用户的数据完全隔离：
- ✅ 用户只能看到自己的联系人
- ✅ 用户只能管理自己的邮件活动
- ✅ 用户只能查看自己的统计数据
- ✅ 数据库级别的用户隔离

## 🔧 配置步骤

### 1. 选择数据库服务
1. 注册PlanetScale或Supabase
2. 创建数据库
3. 获取连接字符串
4. 配置`DATABASE_URL`

### 2. 选择邮件服务
1. 注册Resend或SendGrid
2. 验证域名
3. 获取API密钥
4. 配置SMTP设置

### 3. 部署应用
1. 连接GitHub仓库
2. 配置环境变量
3. 部署到Vercel/Railway
4. 测试功能

## 💰 成本估算

### 小型SaaS（1000用户）：
- 数据库：$29/月
- 邮件服务：$20/月
- 部署平台：$20/月
- **总计：~$70/月**

### 中型SaaS（10000用户）：
- 数据库：$100/月
- 邮件服务：$100/月
- 部署平台：$50/月
- **总计：~$250/月**

## 🎯 用户无需配置

用户只需要：
1. 注册账号
2. 开始使用
3. 付费订阅

**所有技术配置都由您完成！**
