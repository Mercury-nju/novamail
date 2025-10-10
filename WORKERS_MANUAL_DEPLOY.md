# Cloudflare Workers 手动部署指南

## 问题
AI 邮件生成仍出现中文占位符，需要部署最新的 Workers 代码。

## 解决方案：通过 Cloudflare Dashboard 手动部署

### 步骤 1：准备 Workers 代码
Workers 代码位于：`workers/index.js`

### 步骤 2：登录 Cloudflare Dashboard
1. 访问：https://dash.cloudflare.com/
2. 登录您的账户
3. 选择您的账户

### 步骤 3：找到 Workers 项目
1. 在左侧菜单中，点击 **Workers & Pages**
2. 找到您的 Workers 项目（应该叫 `novamail-api` 或类似名称）
3. 点击进入项目详情

### 步骤 4：编辑 Worker 代码
1. 点击 **Quick Edit** 或 **Edit Code** 按钮
2. 将 `workers/index.js` 的全部内容复制
3. 粘贴到 Cloudflare 的代码编辑器中，替换所有现有代码
4. 点击 **Save and Deploy** 按钮

### 步骤 5：验证部署
1. 部署完成后，访问您的 Workers URL：`https://novamail.world/api/ai/generate-email`
2. 或者在 Cloudflare Dashboard 中查看部署日志

### 步骤 6：清除浏览器缓存
1. 在浏览器中按 `Ctrl+Shift+Delete`（Windows）或 `Cmd+Shift+Delete`（Mac）
2. 选择"缓存的图片和文件"
3. 点击"清除数据"
4. 刷新页面（`Ctrl+F5` 或 `Cmd+Shift+R`）

## 验证修复
1. 访问 https://novamail.world/dashboard/campaigns/new
2. 填写活动信息
3. 点击"Generate with AI"
4. 检查生成的邮件内容是否为纯英文，没有中文占位符

## 注意事项
- 确保 `DASHSCOPE_API_KEY` 环境变量已在 Cloudflare Dashboard 中配置
- 如果仍然看到中文，等待 5-10 分钟让 Cloudflare 缓存更新
- 可以在 Cloudflare Dashboard 的 Workers 日志中查看实时请求

## 关键修改
最新的 `workers/index.js` 已经：
1. 禁用了 AI 生成（通义千问）
2. 使用纯英文模板内容
3. 移除了所有中文占位符
4. 添加了调试日志

## 如果问题仍然存在
请提供以下信息：
1. 浏览器控制台的错误信息（按 F12 查看）
2. 生成的邮件内容截图
3. Cloudflare Workers 日志（在 Dashboard 中查看）

