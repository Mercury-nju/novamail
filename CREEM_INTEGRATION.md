# 🚀 Creem支付集成指南

## 📋 **概述**

本文档介绍如何将NovaMail与Creem支付平台集成，实现真实的订阅付费服务。

## 🔧 **环境配置**

### 1. 环境变量设置

在您的`.env.local`文件中添加以下配置：

```bash
# Creem API配置
CREEM_API_KEY="your-creem-api-key"
CREEM_BASE_URL="https://api.creem.com/v1"
CREEM_WEBHOOK_SECRET="your-creem-webhook-secret"
PAYMENT_PROVIDER="creem"
```

### 2. 获取Creem API密钥

1. 登录Creem控制台
2. 进入API设置页面
3. 创建新的API密钥
4. 复制API密钥到环境变量

## 📊 **数据库迁移**

运行以下命令更新数据库结构：

```bash
npx prisma db push
```

## 🎯 **功能特性**

### ✅ **已实现功能**

1. **订阅管理**
   - 创建订阅
   - 获取订阅信息
   - 更新订阅计划
   - 取消订阅

2. **客户管理**
   - 创建客户
   - 获取客户信息
   - 管理支付方式

3. **Webhook处理**
   - 订阅状态变更
   - 支付成功/失败
   - 自动更新用户状态

4. **计划管理**
   - 获取可用计划
   - 计划限制管理
   - 功能权限控制

## 🔄 **API端点**

### 获取计划列表
```
GET /api/creem/plans
```

### 创建订阅
```
POST /api/creem/subscriptions
{
  "planId": "pro-monthly",
  "trialDays": 14
}
```

### 获取订阅信息
```
GET /api/creem/subscriptions?subscriptionId=sub_xxx
```

### Webhook端点
```
POST /api/creem/webhook
```

## 🎨 **前端集成**

### 1. 升级按钮

在Billing页面中，升级按钮现在会调用Creem API：

```typescript
const handleUpgrade = async (planId: string) => {
  const response = await fetch('/api/creem/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, trialDays: 14 })
  })
  
  const data = await response.json()
  if (data.success) {
    // 重定向到Creem支付页面
    window.location.href = data.data.checkoutUrl
  }
}
```

### 2. 订阅状态显示

Billing页面会自动显示用户的真实订阅状态：

- 免费计划用户：显示升级选项
- 付费计划用户：显示当前计划和支付方式
- 试用期用户：显示试用剩余时间

## 🔒 **安全考虑**

### 1. Webhook验证

所有Webhook请求都会验证签名：

```typescript
const isValid = creem.verifyWebhookSignature(payload, signature)
if (!isValid) {
  return new Response('Invalid signature', { status: 401 })
}
```

### 2. 用户认证

所有API端点都需要用户登录：

```typescript
const session = await getServerSession(authOptions)
if (!session?.user?.email) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## 📈 **使用统计**

### 1. 邮件发送限制

根据用户订阅计划限制邮件发送数量：

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { subscription: true }
})

const planLimits = {
  free: { emails: 1000, contacts: 500 },
  pro: { emails: 25000, contacts: 5000 },
  enterprise: { emails: -1, contacts: -1 }
}

const limits = planLimits[user.subscription?.plan || 'free']
if (limits.emails > 0 && user.emailsSentThisMonth >= limits.emails) {
  throw new Error('Email limit exceeded')
}
```

### 2. 功能权限控制

根据订阅计划控制功能访问：

```typescript
const hasFeature = (user: User, feature: string) => {
  const plan = user.subscription?.plan || 'free'
  const features = {
    free: ['basic-templates', 'ai-generation'],
    pro: ['all-templates', 'advanced-analytics', 'priority-support'],
    enterprise: ['custom-templates', 'white-label', 'api-access']
  }
  return features[plan]?.includes(feature) || false
}
```

## 🚀 **部署步骤**

### 1. 更新环境变量

在Cloudflare Pages和Workers中设置Creem环境变量：

```bash
# Cloudflare Pages环境变量
CREEM_API_KEY=your-creem-api-key
CREEM_BASE_URL=https://api.creem.com/v1
CREEM_WEBHOOK_SECRET=your-creem-webhook-secret
PAYMENT_PROVIDER=creem
```

### 2. 配置Webhook

在Creem控制台中配置Webhook URL：

```
https://your-domain.com/api/creem/webhook
```

### 3. 测试集成

1. 创建测试订阅
2. 验证Webhook接收
3. 检查数据库更新
4. 测试支付流程

## 🔧 **故障排除**

### 常见问题

1. **API密钥错误**
   - 检查环境变量设置
   - 验证API密钥有效性

2. **Webhook未接收**
   - 检查Webhook URL配置
   - 验证签名验证逻辑

3. **订阅状态不同步**
   - 检查数据库连接
   - 验证Webhook处理逻辑

### 调试工具

```typescript
// 启用调试日志
console.log('Creem API Response:', response)
console.log('Webhook Event:', event)
console.log('User Update:', userUpdate)
```

## 📞 **支持**

如果遇到问题，请：

1. 检查Creem API文档
2. 查看服务器日志
3. 联系技术支持

---

**NovaMail + Creem = 完整的SaaS支付解决方案！** 🚀✨
