# NovaMail 生产环境部署指南

## 🚀 生产环境配置

### 1. 环境变量配置

在 `.env.local` 或生产环境变量中设置：

```bash
# 邮件发送服务 (必需)
RESEND_API_KEY=re_your_resend_api_key_here

# 可选：其他邮件服务
SENDGRID_API_KEY=your_sendgrid_key
MAILGUN_API_KEY=your_mailgun_key

# 数据库 (如果使用)
DATABASE_URL=your_database_url

# 安全配置
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
```

### 2. 邮件服务集成

#### Resend (推荐)
1. 注册 [Resend](https://resend.com)
2. 获取 API Key
3. 设置环境变量 `RESEND_API_KEY`
4. 验证域名 (生产环境必需)

#### 其他邮件服务
- SendGrid
- Mailgun  
- AWS SES
- Nodemailer with SMTP

### 3. 性能优化

#### Next.js 配置
```javascript
// next.config.js
const nextConfig = {
  // 生产环境优化
  compress: true,
  poweredByHeader: false,
  
  // 图片优化
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // 安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}
```

### 4. 部署平台

#### Cloudflare Pages (推荐)
1. 连接 GitHub 仓库
2. 构建命令: `npm run build`
3. 输出目录: `out`
4. 设置环境变量
5. 部署API Routes Worker: `./deploy-api-routes.sh`

#### Vercel
1. 连接 GitHub 仓库
2. 设置环境变量
3. 自动部署

#### Netlify
1. 构建命令: `npm run build`
2. 发布目录: `out`
3. 设置环境变量

#### 自托管
1. 构建: `npm run build`
2. 启动: `npm start`
3. 使用 PM2 管理进程

### 5. 监控和日志

#### 错误监控
- Sentry
- LogRocket
- Bugsnag

#### 性能监控
- Vercel Analytics
- Google Analytics
- Hotjar

### 6. 安全考虑

#### API 安全
- 请求频率限制
- 输入验证和清理
- CORS 配置
- API Key 保护

#### 数据保护
- HTTPS 强制
- 安全头设置
- 敏感数据加密
- GDPR 合规

### 7. 功能验证清单

#### ✅ AI 生成功能
- [ ] 输入验证
- [ ] 错误处理
- [ ] 性能监控
- [ ] 内容质量检查

#### ✅ 邮件发送功能  
- [ ] 真实邮件服务集成
- [ ] 发送状态跟踪
- [ ] 错误重试机制
- [ ] 发送限制

#### ✅ 用户体验
- [ ] 加载状态显示
- [ ] 错误消息友好
- [ ] 响应时间优化
- [ ] 移动端适配

### 8. 测试建议

#### 功能测试
```bash
# API 测试
curl -X POST https://your-domain.com/api/ai/generate-email \
  -H "Content-Type: application/json" \
  -d '{"userRequest":"Create a welcome email"}'

# 邮件发送测试
curl -X POST https://your-domain.com/api/campaigns/send \
  -H "Content-Type: application/json" \
  -d '{"subject":"Test","content":"<p>Test</p>","recipients":["test@example.com"],"senderEmail":"noreply@yourdomain.com","senderName":"Test"}'
```

#### 性能测试
- 使用 Lighthouse 测试页面性能
- 使用 WebPageTest 测试加载时间
- 使用 GTmetrix 测试优化建议

### 9. 维护和更新

#### 定期检查
- 监控错误日志
- 检查性能指标
- 更新依赖包
- 安全补丁

#### 备份策略
- 代码版本控制
- 数据库备份
- 配置文件备份
- 环境变量备份

---

## 🎯 生产环境就绪功能

✅ **AI 邮件生成** - 智能内容生成，支持多种邮件类型  
✅ **真实邮件发送** - 集成 Resend API，支持批量发送  
✅ **专业模板编辑** - 直接在模板上编辑，实时预览  
✅ **错误处理** - 完整的错误处理和用户反馈  
✅ **性能监控** - 请求时间跟踪和性能优化  
✅ **安全配置** - 安全头设置和输入验证  

NovaMail 现在是一个完全生产就绪的邮件营销平台！🚀
