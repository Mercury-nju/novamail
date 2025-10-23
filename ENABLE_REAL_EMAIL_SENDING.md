# 启用真实邮件发送功能指南

## 🚀 快速启用步骤

### 1. 获取 Resend API 密钥

1. **注册 Resend 账户**
   - 访问 [https://resend.com](https://resend.com)
   - 点击 "Get Started" 注册账户
   - 验证您的邮箱地址

2. **创建 API 密钥**
   - 登录 Resend 控制台
   - 进入 "API Keys" 页面
   - 点击 "Create API Key"
   - 输入密钥名称（如：NovaMail Production）
   - 复制生成的 API 密钥（格式：`re_xxxxxxxxxx`）

### 2. 配置环境变量

#### 方法一：本地开发环境
创建 `.env.local` 文件：
```bash
# 邮件发送服务
RESEND_API_KEY=re_your_actual_api_key_here

# 其他必要配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

#### 方法二：Cloudflare Workers 生产环境
更新 `wrangler.toml` 文件：
```toml
[vars]
RESEND_API_KEY = "re_your_actual_api_key_here"
```

#### 方法三：Cloudflare Dashboard
1. 进入 Cloudflare Dashboard
2. 选择 Workers & Pages
3. 找到您的项目
4. 进入 Settings > Environment Variables
5. 添加 `RESEND_API_KEY` 变量

### 3. 验证配置

#### 检查配置是否生效
1. 启动开发服务器：`npm run dev`
2. 进入邮件编辑页面
3. 点击 "Send Email" 按钮
4. 查看控制台输出：
   - 如果显示 "EMAIL SENDING SIMULATION (DEV MODE)" - 配置未生效
   - 如果显示 "Sending email via Resend API" - 配置已生效

#### 测试邮件发送
1. 填写收件人邮箱（建议使用自己的邮箱测试）
2. 填写发件人邮箱和姓名
3. 点击发送
4. 检查收件箱（包括垃圾邮件文件夹）

### 4. 域名验证（生产环境推荐）

#### 在 Resend 中验证域名
1. 进入 Resend 控制台
2. 进入 "Domains" 页面
3. 添加您的域名（如：novamail.world）
4. 按照指示添加 DNS 记录
5. 验证域名状态

#### 使用验证过的域名发送
```javascript
// 使用验证过的域名作为发件人
from: "NovaMail <noreply@novamail.world>"
```

## 🔧 故障排除

### 常见问题

1. **API 密钥无效**
   - 检查密钥格式是否正确（以 `re_` 开头）
   - 确认密钥权限是否足够
   - 检查密钥是否过期

2. **邮件发送失败**
   - 检查收件人邮箱格式
   - 确认发件人邮箱格式
   - 查看控制台错误信息

3. **邮件进入垃圾邮件**
   - 验证发送域名
   - 设置 SPF、DKIM 记录
   - 避免使用垃圾邮件关键词

### 调试步骤

1. **检查环境变量**
   ```bash
   # 在代码中添加调试
   console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET' : 'NOT SET')
   ```

2. **查看 API 响应**
   ```javascript
   // 在 sendEmail 函数中添加
   console.log('Resend API response:', data)
   ```

3. **测试 API 连接**
   ```bash
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_your_api_key" \
     -H "Content-Type: application/json" \
     -d '{"from":"test@example.com","to":"test@example.com","subject":"Test","html":"<p>Test email</p>"}'
   ```

## 📊 监控和限制

### Resend 免费额度
- 每月 3,000 封邮件
- 每天 100 封邮件
- 超出后需要付费

### 监控使用情况
1. 在 Resend 控制台查看使用统计
2. 设置使用量警报
3. 监控发送成功率

## 🚀 部署到生产环境

### Cloudflare Pages 部署
1. 在 Cloudflare Dashboard 中设置环境变量
2. 重新部署应用
3. 测试生产环境邮件发送

### 其他平台部署
- **Vercel**: 在项目设置中添加环境变量
- **Netlify**: 在站点设置中添加环境变量
- **自托管**: 在服务器上设置环境变量

## ✅ 验证清单

- [ ] Resend 账户已注册并验证
- [ ] API 密钥已创建并复制
- [ ] 环境变量已正确配置
- [ ] 开发环境测试通过
- [ ] 生产环境部署完成
- [ ] 域名验证完成（可选）
- [ ] 邮件发送测试成功

## 🆘 获取帮助

如果遇到问题，请检查：
1. Resend 控制台的 API 使用日志
2. 应用的控制台错误信息
3. 网络连接状态
4. 邮箱服务商的反垃圾邮件设置

---

**注意**: 请妥善保管您的 API 密钥，不要将其提交到公共代码仓库中。
