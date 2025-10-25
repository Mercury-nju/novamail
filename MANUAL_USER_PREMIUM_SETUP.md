# 🔧 手动设置用户高级会员指南

## 🎯 目标
为 `2945235656@qq.com` 设置1年高级会员，解决功能权益问题。

## 📋 用户信息
- **邮箱**: 2945235656@qq.com
- **会员期限**: 1年（2025-10-25 至 2026-10-25）
- **会员类型**: Premium
- **总积分**: 50,000
- **邮件限制**: 10,000/月

## 🔧 手动设置步骤

### 步骤1: 登录Cloudflare Dashboard
1. 访问：https://dash.cloudflare.com/
2. 登录您的Cloudflare账户

### 步骤2: 进入Workers管理
1. 左侧菜单：`Workers & Pages`
2. 选择 `Workers`
3. 找到 `novamail-api` Workers

### 步骤3: 进入KV存储管理
1. 点击 `novamail-api` Workers
2. 点击 `Settings` 选项卡
3. 找到 `KV Namespaces` 部分
4. 点击 `USERS_KV` 命名空间

### 步骤4: 添加用户数据
1. 点击 `Add entry` 按钮
2. 填写以下信息：

**Key**: `user_2945235656@qq.com`

**Value**: 
```json
{
  "id": "user_1761361592286_j3g6vcss5",
  "email": "2945235656@qq.com",
  "name": "2945235656",
  "firstName": "2945235656",
  "lastName": "",
  "token": "token_jgo36ju6w",
  "emailVerified": true,
  "createdAt": "2025-10-25T03:06:32.286Z",
  "updatedAt": "2025-10-25T03:06:32.286Z",
  "emailsSentThisMonth": 0,
  "contactsCount": 0,
  "campaignsCount": 0,
  "lastUsageReset": "2025-10-25T03:06:32.286Z",
  "plan": "premium",
  "subscriptionPlan": "premium",
  "subscriptionStatus": "active",
  "subscriptionEndsAt": "2026-10-25T03:06:32.286Z",
  "features": {
    "aiAccess": true,
    "unlimitedContacts": true,
    "unlimitedCampaigns": true,
    "professionalTemplates": true,
    "prioritySupport": true,
    "analyticsDashboard": true
  },
  "totalCredits": 50000,
  "remainingCredits": 50000,
  "monthlyCredits": 50000,
  "emailLimit": 10000
}
```

3. 点击 `Save` 保存

## 📊 会员权益详情

### 💎 高级会员功能
- ✅ **AI访问**: 可以使用AI生成邮件功能
- ✅ **无限联系人**: 可以添加无限数量的联系人
- ✅ **无限活动**: 可以创建无限数量的营销活动
- ✅ **专业模板**: 可以使用所有专业邮件模板
- ✅ **优先支持**: 获得优先技术支持
- ✅ **分析仪表板**: 可以使用高级分析功能

### 📈 使用限制
- **总积分**: 50,000积分
- **剩余积分**: 50,000积分
- **月度积分**: 50,000积分/月
- **邮件限制**: 10,000封/月
- **会员期限**: 2025-10-25 至 2026-10-25

## 🔍 验证设置

### 测试用户登录
1. 访问：https://novamail.world
2. 使用邮箱 `2945235656@qq.com` 登录
3. 检查是否显示高级会员状态

### 检查功能权限
1. **AI功能**: 尝试使用AI生成邮件
2. **模板功能**: 检查是否可以使用专业模板
3. **分析功能**: 检查是否可以使用分析仪表板
4. **积分显示**: 检查是否显示50,000积分

## ⚠️ 注意事项

1. **数据格式**: 确保JSON格式正确
2. **Key格式**: 必须是 `user_2945235656@qq.com`
3. **时间格式**: 使用ISO 8601格式
4. **保存后**: 等待几分钟让数据生效

## 🚀 预期结果

设置完成后，用户应该能够：
- ✅ 看到高级会员标识
- ✅ 使用AI生成邮件功能
- ✅ 访问所有专业模板
- ✅ 使用分析仪表板
- ✅ 享受优先支持
- ✅ 看到50,000积分余额

## 📞 技术支持

如果设置后仍有问题：
1. 检查JSON格式是否正确
2. 确认Key格式是否正确
3. 等待几分钟让数据生效
4. 重新登录测试功能

---

**结论**: 手动设置用户高级会员后，所有功能权益应该都能正常使用！
