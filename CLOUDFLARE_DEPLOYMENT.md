# 🚀 Cloudflare Pages + Workers 部署指南

## 📋 架构说明

### 前端：Cloudflare Pages
- 静态网站托管
- 全球CDN加速
- 自动部署

### 后端：Cloudflare Workers
- API路由处理
- 边缘计算
- 全球分布

## 🔧 部署步骤

### 1. 部署前端到Cloudflare Pages

1. **登录Cloudflare Dashboard**
2. **进入Pages**
3. **连接GitHub仓库**
4. **配置构建设置**：
   - 构建命令：`npm run build`
   - 输出目录：`out`
   - Node.js版本：`18`

### 2. 部署API到Cloudflare Workers

1. **安装Wrangler CLI**：
   ```bash
   npm install -g wrangler
   ```

2. **登录Cloudflare**：
   ```bash
   wrangler login
   ```

3. **部署Workers**：
   ```bash
   cd workers
   wrangler deploy
   ```

4. **配置环境变量**：
   ```bash
   wrangler secret put DASHSCOPE_API_KEY
   # 输入：sk-9bf19547ddbd4be1a87a7a43cf251097
   ```

### 3. 更新前端API地址

1. **获取Workers域名**：
   - 部署后获得：`https://novamail-api.your-username.workers.dev`

2. **更新前端代码**：
   ```javascript
   // 替换所有API调用
   const response = await fetch('https://novamail-api.your-username.workers.dev/api/ai/generate-email', {
   ```

### 4. 配置CORS（如果需要）

在Workers中添加CORS头：
```javascript
// 在响应中添加
headers: {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://your-domain.pages.dev',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
```

## 🔧 环境变量配置

### Cloudflare Pages环境变量：
```
NEXT_PUBLIC_API_URL=https://novamail-api.your-username.workers.dev
```

### Cloudflare Workers环境变量：
```
DASHSCOPE_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
```

## 📊 成本估算

### Cloudflare Pages：
- 免费：100,000次构建/月
- 免费：无限带宽

### Cloudflare Workers：
- 免费：100,000次请求/天
- 免费：10ms CPU时间/请求

**总计：完全免费！**

## 🚀 优势

- ✅ **全球CDN** - 超快访问速度
- ✅ **边缘计算** - API响应极快
- ✅ **完全免费** - 无成本
- ✅ **自动扩展** - 无需管理服务器
- ✅ **高可用性** - 99.9%+ 可用性

## 🔧 下一步

1. 部署前端到Cloudflare Pages
2. 部署API到Cloudflare Workers
3. 配置环境变量
4. 测试功能
5. 更新域名（可选）

**现在您可以在Cloudflare上运行完整的SaaS产品！** 🎉
