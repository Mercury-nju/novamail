# 📧 邮件发送问题解决方案

## 🔍 问题分析

根据 Resend API 的错误信息：
```
You can only send testing emails to your own email address (lihongyangnju@gmail.com). 
To send emails to other recipients, please verify a domain at resend.com/domains, 
and change the `from` address to an email using this domain.
```

**问题原因**：
1. Resend 免费账户只能向自己的邮箱发送测试邮件
2. 要向其他邮箱发送邮件，需要验证发送域名
3. 当前使用的 `noreply@novamail.world` 域名未验证

## 🚀 解决方案

### 方案 1：验证发送域名（推荐）

1. **访问 Resend 控制台**：
   - 打开 [https://resend.com/domains](https://resend.com/domains)
   - 登录您的账户

2. **添加域名**：
   - 点击 "Add Domain"
   - 输入您的域名（如：novamail.world）
   - 按照指示配置 DNS 记录

3. **配置 DNS 记录**：
   ```
   # SPF 记录
   TXT: v=spf1 include:_spf.resend.com ~all
   
   # DKIM 记录
   CNAME: resend._domainkey -> resend._domainkey.resend.com
   
   # DMARC 记录（可选）
   TXT: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com
   ```

4. **验证域名**：
   - 等待 DNS 记录生效（通常 5-30 分钟）
   - 在 Resend 控制台验证域名状态

### 方案 2：使用 Resend 默认域名（临时）

修改邮件发送配置，使用 Resend 的验证域名：

```javascript
// 在 app/api/campaigns/send/route.ts 中修改
from: `${senderName} <onboarding@resend.dev>` // 使用 Resend 默认域名
```

### 方案 3：升级 Resend 账户

1. **升级到付费计划**：
   - 访问 [https://resend.com/pricing](https://resend.com/pricing)
   - 选择适合的计划
   - 付费后可以发送到任何邮箱地址

## 🔧 立即修复

### 临时解决方案（使用验证域名）

让我修改邮件发送配置，使用 Resend 的验证域名：
