# Paddle 支付系统配置指南

## 概述

Paddle 是一个专为数字产品和软件服务设计的支付平台，特别适合面向海外市场的 SaaS 产品。

## 优势

### 1. 专为 SaaS 设计
- 强大的订阅管理功能
- 自动处理订阅续费、升级、降级
- 支持多种计费模式

### 2. 全球税务合规
- 自动处理全球销售税和增值税
- 确保符合各地税务法规
- 自动生成符合要求的发票

### 3. 中国商户支持
- 支持 SWIFT 转账到中国银行账户
- 符合中国外汇管理要求
- 相对简单的申请流程

## 申请流程

### 1. 注册账户
1. 访问 [Paddle Dashboard](https://vendors.paddle.com)
2. 使用企业邮箱注册账户
3. 提供公司基本信息

### 2. 身份验证
1. 提供身份证明文件（护照或身份证）
2. 完成自拍验证
3. 提供地址证明（银行账单或公共事业账单）

### 3. 网站审核
1. 确保网站包含服务条款页面
2. 确保网站包含隐私政策页面
3. 提交网站进行审核

### 4. 银行账户验证
1. 提供中国银行账户信息
2. 完成银行账户验证
3. 设置提现方式

## 环境变量配置

在 `.env.local` 文件中添加以下配置：

```env
# Paddle 配置
PADDLE_ENVIRONMENT="sandbox" # 或 "production"
PADDLE_API_KEY="your_paddle_api_key"
PADDLE_WEBHOOK_SECRET="your_webhook_secret"

# Paddle 产品价格 ID（在 Paddle Dashboard 中创建后获取）
PADDLE_PRO_MONTHLY_PRICE_ID="pri_01h..."
PADDLE_PRO_YEARLY_PRICE_ID="pri_01h..."
```

## 产品创建

### 1. 在 Paddle Dashboard 创建产品

#### Pro Plan - Monthly
- **Name**: NovaMail Pro (Monthly)
- **Description**: Professional email marketing plan
- **Price**: $19.00 USD
- **Billing Period**: Monthly
- **Type**: Subscription

#### Pro Plan - Yearly
- **Name**: NovaMail Pro (Yearly)
- **Description**: Professional email marketing plan
- **Price**: $190.00 USD
- **Billing Period**: Yearly
- **Type**: Subscription

### 2. 获取价格 ID
创建产品后，复制每个产品的 **Price ID**（格式：`pri_01h...`），并更新环境变量。

## Webhook 配置

### 1. 设置 Webhook 端点
1. 进入 Paddle Dashboard > Developer Tools > Webhooks
2. 点击 "Add endpoint"
3. 设置 **Endpoint URL**: `https://yourdomain.com/api/paddle/webhook`
4. 选择以下事件：
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `transaction.completed`
   - `transaction.payment_failed`

### 2. 获取 Webhook 密钥
复制 **Signing secret** 并更新 `PADDLE_WEBHOOK_SECRET` 环境变量。

## 技术实现

### 1. 安装依赖
```bash
npm install paddle-billing
```

### 2. 核心文件
- `lib/paddle.ts` - Paddle 配置和工具函数
- `app/api/paddle/create-subscription/route.ts` - 创建订阅
- `app/api/paddle/webhook/route.ts` - Webhook 处理
- `app/api/paddle/cancel-subscription/route.ts` - 取消订阅
- `app/api/paddle/reactivate-subscription/route.ts` - 重新激活订阅

### 3. 支付流程
1. 用户点击订阅按钮
2. 调用 `/api/paddle/create-subscription` 创建订阅
3. 重定向到 Paddle 支付页面
4. 用户完成支付
5. Paddle 发送 Webhook 通知
6. 更新用户订阅状态

## 测试

### 1. 使用测试模式
```env
PADDLE_ENVIRONMENT="sandbox"
```

### 2. 测试卡号
Paddle 提供以下测试卡号：
- **成功支付**: `4000 0000 0000 0002`
- **需要验证**: `4000 0000 0000 0005`
- **支付失败**: `4000 0000 0000 0007`

### 3. 测试流程
1. 启动应用：`npm run dev`
2. 访问定价页面：`http://localhost:3001/pricing`
3. 选择 Pro 计划
4. 使用测试卡号完成支付
5. 检查用户订阅状态是否更新

## 费用结构

### 支付手续费
- **信用卡**: 约 2.9% + $0.30
- **PayPal**: 约 2.9% + $0.30
- **其他方式**: 根据支付方式而定

### 其他费用
- **SWIFT 转账**: 约 $15/笔
- **汇率转换**: 可能存在汇率损失
- **月度费用**: 可能有月度维护费

## 合规要求

### 中国法规要求
1. **外汇管理**
   - 遵守外汇管理局规定
   - 及时申报跨境收入
   - 保持合规记录

2. **税务要求**
   - 按时缴纳相关税费
   - 保持税务记录
   - 配合税务检查

3. **反洗钱**
   - 客户身份识别
   - 交易监控
   - 可疑交易报告

## 监控和维护

### 1. 支付状态监控
- 监控支付成功率
- 处理支付失败
- 跟踪订阅状态

### 2. 异常处理
- 处理 Webhook 失败
- 处理支付异常
- 处理订阅异常

### 3. 定期检查
- 检查账户状态
- 检查合规要求
- 检查费用结构

## 故障排除

### 常见问题

**Q: 支付后订阅状态没有更新**
A: 检查 Webhook 配置和签名验证

**Q: 无法创建订阅**
A: 检查 API 密钥和产品配置

**Q: 测试卡号不工作**
A: 确保使用正确的测试卡号和 CVC

### 调试工具
- Paddle Dashboard 事件日志
- 应用控制台日志
- 数据库订阅记录

## 总结

Paddle 是一个功能强大的支付平台，特别适合面向海外市场的 SaaS 产品。通过正确的配置和集成，可以实现：

1. **全球支付**: 支持多种支付方式和货币
2. **订阅管理**: 强大的订阅计费和管理功能
3. **税务合规**: 自动处理全球税务合规
4. **中国支持**: 支持中国商户和银行账户

对于您的邮件营销 SaaS 产品，Paddle 是一个理想的选择。


