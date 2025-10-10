# NovaMail 手动部署指南

## 问题描述
Logo文件在Cloudflare Pages上返回404错误，需要手动部署静态资源。

## 部署步骤

### 方法1: Cloudflare Dashboard 手动上传

1. **打开Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com
   - 登录您的账户

2. **进入Pages项目**
   - 点击左侧菜单 "Pages"
   - 找到 "novamail" 项目并点击

3. **手动上传静态资源**
   - 点击 "Upload assets" 按钮
   - 选择整个 `out` 文件夹中的所有文件
   - 点击 "Deploy" 开始部署

4. **等待部署完成**
   - 部署通常需要 1-2 分钟
   - 完成后会显示新的部署URL

### 方法2: 重新部署现有项目

1. **进入Pages项目**
   - 在Cloudflare Dashboard中找到 "novamail" 项目

2. **触发重新部署**
   - 点击 "重新部署" 或 "Redeploy" 按钮
   - 选择最新的提交

3. **检查构建设置**
   - 确保 "构建输出目录" 设置为 `out`
   - 确保 "构建命令" 设置为 `npm run build`

## 需要上传的文件

### 静态资源文件
- `favicon.svg` (1300 字节)
- `logo-horizontal.svg` (2532 字节)
- `logo-icon.svg` (1867 字节)
- `logo.svg` (2809 字节)

### HTML页面文件
- `index.html` (主页面)
- `404.html` (错误页面)
- 各个子目录的 `index.html` 文件

### 配置文件
- `_headers` (HTTP头配置)

### JavaScript和CSS文件
- `_next/` 目录下的所有文件

## 验证部署

部署完成后，访问以下URL验证：

1. **主页**: https://novamail.world/
2. **Logo文件**: https://novamail.world/logo-horizontal.svg
3. **Favicon**: https://novamail.world/favicon.svg

## 预期结果

- ✅ 主页正常加载
- ✅ Logo文件返回200状态码
- ✅ 所有静态资源可正常访问
- ✅ 页面中的logo正常显示

## 故障排除

如果部署后仍有问题：

1. **清除浏览器缓存**
   - 按 `Ctrl + F5` 强制刷新
   - 或在开发者工具中清除缓存

2. **检查文件路径**
   - 确保文件路径正确
   - 检查大小写敏感

3. **重新构建**
   - 运行 `npm run build`
   - 重新上传 `out` 文件夹

## 联系支持

如果手动部署遇到问题，请检查：
1. Cloudflare账户权限
2. 网络连接
3. 文件上传完整性
4. 构建设置配置
