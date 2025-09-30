# Stripe 支付系统配置指南

## 1. 环境变量配置

在 `.env.local` 文件中添加以下 Stripe 配置：

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Stripe Price IDs (在 Stripe Dashboard 中创建)
STRIPE_PRO_MONTHLY_PRICE_ID="price_your_pro_monthly_price_id"
STRIPE_PRO_YEARLY_PRICE_ID="price_your_pro_yearly_price_id"
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID="price_your_enterprise_monthly_price_id"
STRIPE_ENTERPRISE_YEARLY_PRICE_ID="price_your_enterprise_yearly_price_id"
```

## 2. Stripe Dashboard 设置

### 2.1 创建产品 (Products)

1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 进入 **Products** 页面
3. 创建以下产品：

#### Pro Plan - Monthly
- **Name**: NovaMail Pro (Monthly)
- **Description**: Professional email marketing plan
- **Pricing**: $19.00 USD / month
- **Billing period**: Monthly

#### Pro Plan - Yearly
- **Name**: NovaMail Pro (Yearly)
- **Description**: Professional email marketing plan
- **Pricing**: $190.00 USD / year
- **Billing period**: Yearly

#### Enterprise Plan - Monthly
- **Name**: NovaMail Enterprise (Monthly)
- **Description**: Enterprise email marketing plan (Custom pricing)
- **Pricing**: Custom pricing - Contact sales
- **Billing period**: Monthly

#### Enterprise Plan - Yearly
- **Name**: NovaMail Enterprise (Yearly)
- **Description**: Enterprise email marketing plan (Custom pricing)
- **Pricing**: Custom pricing - Contact sales
- **Billing period**: Yearly

### 2.2 获取价格 ID

创建产品后，复制每个产品的 **Price ID**（格式：`price_xxxxxxxxxx`），并更新环境变量。

### 2.3 配置 Webhook

1. 进入 **Developers** > **Webhooks**
2. 点击 **Add endpoint**
3. 设置 **Endpoint URL**: `https://yourdomain.com/api/stripe/webhook`
4. 选择以下事件：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. 复制 **Signing secret** 并更新 `STRIPE_WEBHOOK_SECRET` 环境变量

## 3. 测试支付流程

### 3.1 使用测试卡号

Stripe 提供以下测试卡号：

- **成功支付**: `4242 4242 4242 4242`
- **需要验证**: `4000 0025 0000 3155`
- **支付失败**: `4000 0000 0000 0002`

### 3.2 测试流程

1. 启动应用：`npm run dev`
2. 访问定价页面：`http://localhost:3001/pricing`
3. 选择 Pro 或 Enterprise 计划
4. 使用测试卡号完成支付
5. 检查用户订阅状态是否更新

## 4. 功能特性

### 4.1 已实现功能

- ✅ Stripe 支付集成
- ✅ 订阅管理（创建、取消、重新激活）
- ✅ 用户权限控制
- ✅ 使用量跟踪
- ✅ 账单管理界面
- ✅ Webhook 事件处理

### 4.2 使用限制

#### Free Plan
- 最多 500 个联系人
- 每月最多 1000 封邮件
- 每月最多 2 个活动
- 基础功能

#### Pro Plan
- 最多 5,000 个联系人
- 每月最多 25,000 封邮件
- 无限活动
- 专业模板
- 高级分段
- Excel 导入
- 优先支持
- 移除 NovaMail 品牌

#### Enterprise Plan
- 无限联系人
- 无限邮件
- 无限活动
- 所有功能
- 自定义品牌
- 专属支持

## 5. 部署注意事项

### 5.1 生产环境配置

1. 将 Stripe 密钥切换为生产环境密钥
2. 更新 Webhook URL 为生产域名
3. 确保所有环境变量正确配置

### 5.2 安全考虑

- 永远不要在客户端代码中暴露 Stripe 密钥
- 使用 HTTPS 保护 Webhook 端点
- 验证 Webhook 签名
- 定期轮换 API 密钥

## 6. 故障排除

### 6.1 常见问题

**Q: 支付后订阅状态没有更新**
A: 检查 Webhook 配置和签名验证

**Q: 权限检查失败**
A: 确认用户订阅状态和数据库同步

**Q: 测试卡号不工作**
A: 确保使用正确的测试卡号和 CVC

### 6.2 调试工具

- Stripe Dashboard 事件日志
- 应用控制台日志
- 数据库订阅记录

## 7. 下一步

1. 配置生产环境 Stripe 账户
2. 设置监控和告警
3. 实现退款处理
4. 添加发票生成功能
5. 集成税务计算
