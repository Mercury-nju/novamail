# 🚀 快速启用真实邮件发送

## 一键设置（推荐）

### 1. 获取 Resend API 密钥
1. 访问 [https://resend.com](https://resend.com)
2. 注册账户并验证邮箱
3. 进入 "API Keys" 页面
4. 创建新密钥并复制（格式：`re_xxxxxxxxxx`）

### 2. 运行设置脚本
```bash
npm run setup:email
```
按提示输入您的 Resend API 密钥

### 3. 测试邮件发送
```bash
npm run test:email
```

### 4. 重启开发服务器
```bash
npm run dev
```

## 手动设置

### 方法一：本地开发环境
创建 `.env.local` 文件：
```bash
RESEND_API_KEY=re_your_actual_api_key_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 方法二：生产环境（Cloudflare）
更新 `wrangler.toml`：
```toml
[vars]
RESEND_API_KEY = "re_your_actual_api_key_here"
```

## 验证设置

### 检查配置是否生效
1. 进入邮件编辑页面
2. 点击 "Send Email" 按钮
3. 查看控制台输出：
   - ✅ "Sending email via Resend API" - 配置成功
   - ❌ "EMAIL SENDING SIMULATION" - 配置未生效

### 测试邮件发送
1. 填写收件人邮箱（建议使用自己的邮箱）
2. 填写发件人邮箱和姓名
3. 点击发送
4. 检查收件箱（包括垃圾邮件文件夹）

## 故障排除

### 常见问题
- **API 密钥无效**: 检查密钥格式和权限
- **邮件发送失败**: 检查邮箱格式和网络连接
- **邮件进入垃圾邮件**: 验证发送域名

### 获取帮助
- 查看详细指南：`ENABLE_REAL_EMAIL_SENDING.md`
- 检查 Resend 控制台日志
- 查看应用控制台错误信息

## 下一步
- 验证发送域名（提高送达率）
- 设置邮件模板
- 配置邮件追踪
- 监控发送统计

---
**提示**: 请妥善保管您的 API 密钥，不要提交到公共代码仓库。
