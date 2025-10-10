# 手动部署 Workers 指南

## 部署步骤

### 1. 打开 Cloudflare Dashboard
访问：https://dash.cloudflare.com

### 2. 进入 Workers & Pages
1. 在左侧菜单中找到 "Workers & Pages"
2. 点击进入

### 3. 找到项目
1. 在 Workers 列表中找到 `novamail-api`
2. 点击项目名称进入详情页

### 4. 编辑代码
1. 点击 "Quick Edit" 按钮
2. 在代码编辑器中，删除所有现有代码
3. 复制 `workers/index.js` 文件的全部内容
4. 粘贴到编辑器中

### 5. 配置环境变量
1. 点击 "Settings" 标签
2. 点击 "Variables" 子标签
3. 确保以下环境变量已配置：

```
CREEM_API_KEY = creem_22oMcuzUH4TeWyWVAVjTes
CREEM_BASE_URL = https://api.creem.io/v1
CREEM_WEBHOOK_SECRET = whsec_5uvCq8f1gQMsqz5rqwdVgZ
RESEND_API_KEY = re_PCbEHboB...
```

### 6. 保存并部署
1. 点击 "Save and Deploy" 按钮
2. 等待部署完成

### 7. 验证部署
部署完成后，测试以下 API 端点：

```bash
# 测试 campaigns API
curl https://novamail.world/api/campaigns?userId=test_user

# 测试邮件发送
curl -X POST https://novamail.world/api/campaigns/send \
  -H "Content-Type: application/json" \
  -d '{
    "campaignData": {
      "subject": "Test Email",
      "body": "This is a test email",
      "businessName": "Test Company"
    },
    "recipients": ["test@example.com"],
    "userId": "test_user"
  }'
```

## 故障排除

### 如果部署失败
1. 检查代码语法是否正确
2. 确认环境变量配置正确
3. 查看 Workers 日志获取错误信息

### 如果 API 返回 404
1. 确认 Workers 已成功部署
2. 检查 API 路由配置
3. 验证 Workers URL 是否正确

### 如果邮件发送失败
1. 检查 Resend API 密钥是否正确
2. 确认密钥有发送权限
3. 查看 Workers 日志获取详细错误

## 部署检查清单

- [ ] Workers 代码已更新
- [ ] 环境变量已配置
- [ ] 部署成功完成
- [ ] API 端点测试通过
- [ ] 邮件发送功能正常
- [ ] Campaigns 页面显示记录

---

**部署完成后，您的 NovaMail 应用将能够：**
- 正常发送邮件并实际送达
- 在 campaigns 页面显示发送记录
- 提供完整的邮件营销功能