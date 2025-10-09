# NovaMail 前端部署指南

## 问题描述
登录页面仍然显示"Email login is temporarily disabled"弹窗，需要重新部署前端以清除缓存。

## 解决方案

### 方法1: Cloudflare Dashboard 手动部署

1. **打开 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com
   - 登录您的账户

2. **进入 Pages 项目**
   - 点击左侧菜单 "Pages"
   - 找到 "novamail" 项目并点击

3. **上传新版本**
   - 点击 "Upload assets" 按钮
   - 选择整个 `out` 文件夹中的所有文件
   - 点击 "Deploy" 开始部署

4. **等待部署完成**
   - 部署通常需要 1-2 分钟
   - 完成后会显示新的部署URL

### 方法2: 使用命令行（需要API Token）

1. **获取 Cloudflare API Token**
   - 访问 https://dash.cloudflare.com/profile/api-tokens
   - 创建新的API Token，权限选择：
     - Account: Cloudflare Pages:Edit
     - Zone: Zone:Read (如果需要)

2. **设置环境变量**
   ```powershell
   $env:CLOUDFLARE_API_TOKEN = "your_api_token_here"
   ```

3. **执行部署**
   ```powershell
   npx wrangler pages deploy out --project-name=novamail
   ```

## 部署后验证

1. **清除浏览器缓存**
   - 按 `Ctrl + F5` 强制刷新
   - 或在开发者工具中清除缓存

2. **测试登录功能**
   - 访问 https://novamail.world/login
   - 确认不再出现禁用弹窗
   - 测试邮箱登录功能

3. **验证其他功能**
   - 注册功能
   - AI邮件生成
   - 邮件活动发送

## 当前状态

✅ **后端API已部署** - Workers代码已更新并部署
✅ **前端代码已修复** - 登录页面代码已更新
⏳ **前端需要重新部署** - 清除缓存并应用新版本

## 文件说明

- `out/` - 构建输出目录，包含所有静态文件
- `app/login/page.tsx` - 登录页面，已修复禁用问题
- `workers/index.js` - Workers API，已添加登录端点

## 联系支持

如果部署过程中遇到问题，请检查：
1. Cloudflare账户权限
2. 网络连接
3. 文件上传完整性
