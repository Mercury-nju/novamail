#!/bin/bash

# NovaMail API Routes 部署脚本
# 部署Cloudflare Workers来处理API路由

echo "🚀 开始部署 NovaMail API Routes..."

# 检查是否安装了wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装。请先安装: npm install -g wrangler"
    exit 1
fi

# 进入workers目录
cd workers

# 部署API Routes Worker
echo "📦 部署 API Routes Worker..."
wrangler deploy --config api-routes-wrangler.toml

if [ $? -eq 0 ]; then
    echo "✅ API Routes Worker 部署成功!"
    echo "🌐 API端点: https://novamail-api-routes.zhuanz.workers.dev"
    echo ""
    echo "📋 可用的API端点:"
    echo "  - POST /api/ai/generate-email"
    echo "  - POST /api/campaigns/send"
    echo ""
    echo "🔧 环境变量配置:"
    echo "  - RESEND_API_KEY: 用于邮件发送"
    echo "  - DASHSCOPE_API_KEY: 用于AI生成"
else
    echo "❌ API Routes Worker 部署失败!"
    exit 1
fi

echo "🎉 部署完成!"
