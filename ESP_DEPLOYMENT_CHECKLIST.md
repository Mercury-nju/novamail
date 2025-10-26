# ESP导出功能部署检查清单

## 🚀 部署前检查

### 1. 代码完整性检查
- [ ] ESP适配器文件已创建 (`adapters/` 文件夹)
- [ ] 后端API端点已添加 (`workers/index.js`)
- [ ] 前端导出界面已实现 (`app/dashboard/campaigns/edit/page.tsx`)
- [ ] OAuth回调页面已创建 (`app/mailchimp/callback/page.tsx`)
- [ ] 环境变量配置已更新 (`env.example`, `wrangler.toml`)

### 2. 环境变量配置
在Cloudflare Workers Dashboard中配置以下Secrets：

#### Mailchimp OAuth
- [ ] `MAILCHIMP_CLIENT_ID` - Mailchimp应用Client ID
- [ ] `MAILCHIMP_CLIENT_SECRET` - Mailchimp应用Client Secret
- [ ] `MAILCHIMP_REDIRECT_URI` - OAuth回调URL

#### SendGrid API
- [ ] `SENDGRID_API_KEY` - SendGrid API密钥

#### Resend API
- [ ] `RESEND_API_KEY` - Resend API密钥

### 3. Mailchimp OAuth应用设置
- [ ] 在Mailchimp Developer创建应用
- [ ] 设置Redirect URI为: `https://your-domain.com/mailchimp/callback`
- [ ] 获取Client ID和Client Secret
- [ ] 配置OAuth权限范围 (templates)

### 4. SendGrid配置
- [ ] 创建SendGrid API Key
- [ ] 设置API Key权限:
  - [ ] Template Engine: Full Access
  - [ ] User: Read Access
- [ ] 验证API Key有效性

### 5. Resend配置
- [ ] 创建Resend API Key
- [ ] 验证API Key有效性
- [ ] 注意: Resend不支持模板功能

## 🧪 功能测试

### 1. API端点测试
使用 `test-esp-export.js` 脚本测试:

```javascript
// 在浏览器控制台中运行
runAllTests()
```

预期结果:
- [ ] `/api/export` 端点可访问
- [ ] `/api/mailchimp/connect` 端点可访问
- [ ] `/api/mailchimp/callback` 端点可访问

### 2. Mailchimp OAuth流程测试
- [ ] 点击"Connect Mailchimp"按钮
- [ ] 新窗口打开Mailchimp授权页面
- [ ] 完成授权后窗口自动关闭
- [ ] 用户收到成功提示

### 3. SendGrid导出测试
- [ ] 选择SendGrid作为ESP
- [ ] 点击"Export"按钮
- [ ] 模板成功导出到SendGrid
- [ ] 收到成功提示和编辑链接

### 4. Resend功能测试
- [ ] 选择Resend作为ESP
- [ ] 点击"Export"按钮
- [ ] 收到"功能未支持"提示

### 5. 错误处理测试
- [ ] 网络错误处理
- [ ] 配置错误处理
- [ ] 用户未登录处理
- [ ] OAuth token过期处理

## 🔧 故障排除

### 常见问题及解决方案

#### 1. Mailchimp OAuth失败
**问题**: 授权页面无法打开或授权失败
**解决方案**:
- 检查Redirect URI配置
- 验证Client ID和Secret
- 确认OAuth权限范围

#### 2. SendGrid API错误
**问题**: 导出失败，API Key无效
**解决方案**:
- 验证API Key权限设置
- 检查API Key是否有效
- 确认模板权限配置

#### 3. 网络错误
**问题**: 请求失败，无法连接到服务器
**解决方案**:
- 检查网络连接
- 验证API端点URL
- 检查CORS配置

#### 4. 用户认证问题
**问题**: 用户邮箱未找到
**解决方案**:
- 检查用户登录状态
- 验证localStorage/sessionStorage
- 重新登录用户

## 📊 性能监控

### 1. API响应时间
- [ ] 导出请求响应时间 < 5秒
- [ ] OAuth连接响应时间 < 2秒
- [ ] 错误处理响应时间 < 1秒

### 2. 错误率监控
- [ ] API错误率 < 5%
- [ ] OAuth失败率 < 10%
- [ ] 用户操作失败率 < 3%

### 3. 用户体验指标
- [ ] 导出成功率 > 90%
- [ ] 用户满意度 > 85%
- [ ] 支持请求数量 < 5/天

## 🚀 上线准备

### 1. 生产环境配置
- [ ] 更新生产域名配置
- [ ] 配置生产环境Secrets
- [ ] 设置生产环境OAuth回调URL

### 2. 监控和日志
- [ ] 配置错误监控
- [ ] 设置性能监控
- [ ] 启用API调用日志

### 3. 用户文档
- [ ] 更新用户指南
- [ ] 创建ESP连接教程
- [ ] 提供故障排除文档

### 4. 支持准备
- [ ] 培训支持团队
- [ ] 准备常见问题解答
- [ ] 设置用户反馈渠道

## ✅ 最终验证

### 完整流程测试
1. [ ] 用户登录NovaMail
2. [ ] 选择邮件模板
3. [ ] 编辑模板内容
4. [ ] 点击"Export to ESP"
5. [ ] 选择ESP平台
6. [ ] 完成OAuth授权（如需要）
7. [ ] 成功导出模板
8. [ ] 跳转到ESP编辑器

### 多ESP测试
- [ ] Mailchimp导出流程完整
- [ ] SendGrid导出流程完整
- [ ] Resend功能限制正确显示

### 错误场景测试
- [ ] 网络断开时的错误处理
- [ ] OAuth token过期时的处理
- [ ] API配置错误时的处理
- [ ] 用户未授权时的处理

---

**部署完成后，请运行以下命令验证功能:**

```bash
# 检查编译错误
npm run build

# 运行测试脚本
node test-esp-export.js

# 检查配置
node check-esp-config.js
```

**成功部署的标志:**
- ✅ 所有API端点响应正常
- ✅ OAuth流程完整可用
- ✅ 模板导出功能正常
- ✅ 错误处理完善
- ✅ 用户体验流畅
