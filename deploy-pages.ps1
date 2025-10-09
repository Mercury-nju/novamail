# Cloudflare Pages 部署脚本
# 使用 Cloudflare CLI 部署前端

Write-Host "开始部署 NovaMail 前端到 Cloudflare Pages..." -ForegroundColor Green

# 检查是否已安装 Cloudflare CLI
try {
    $wranglerVersion = npx wrangler --version
    Write-Host "Wrangler 版本: $wranglerVersion" -ForegroundColor Yellow
} catch {
    Write-Host "错误: 未找到 Wrangler CLI" -ForegroundColor Red
    Write-Host "请先安装: npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# 检查构建输出目录
if (-not (Test-Path "out")) {
    Write-Host "错误: 未找到构建输出目录 'out'" -ForegroundColor Red
    Write-Host "请先运行: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "构建输出目录存在，开始部署..." -ForegroundColor Green

# 部署到 Cloudflare Pages
try {
    Write-Host "正在部署到 Cloudflare Pages..." -ForegroundColor Yellow
    
    # 使用 wrangler pages deploy 命令
    $deployResult = npx wrangler pages deploy out --project-name=novamail
    
    Write-Host "部署成功!" -ForegroundColor Green
    Write-Host $deployResult
    
} catch {
    Write-Host "部署失败: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n手动部署步骤:" -ForegroundColor Yellow
    Write-Host "1. 打开 https://dash.cloudflare.com" -ForegroundColor White
    Write-Host "2. 进入 Pages → novamail 项目" -ForegroundColor White
    Write-Host "3. 点击 'Upload assets'" -ForegroundColor White
    Write-Host "4. 上传整个 'out' 文件夹的内容" -ForegroundColor White
    Write-Host "5. 等待部署完成" -ForegroundColor White
}

Write-Host "`nDeployment completed. Please clear browser cache and test login functionality." -ForegroundColor Cyan
