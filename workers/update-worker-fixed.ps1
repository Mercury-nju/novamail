# 更新现有的 novamail-api Worker 使用修复后的代码
$API_TOKEN = "o1CH8v-fJgNZh7OHScY02oYpbxWpYiF8sdMq7Bwl"
$ACCOUNT_ID = "8b0131a99f0fbfe479670ecaef6b4448"
$WORKER_NAME = "novamail-api"

# 读取修复后的 Workers 代码
$workerCode = Get-Content "index.js" -Raw

# 创建请求头
$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

# 创建请求体
$body = @{
    "main" = @{
        "name" = "index.js"
        "content" = $workerCode
        "type" = "esm"
    }
    "compatibility_date" = "2024-01-01"
    "compatibility_flags" = @("nodejs_compat")
    "vars" = @{
        "CREEM_API_KEY" = "creem_22oMcuzUH4TeWyWVAVjTes"
        "CREEM_BASE_URL" = "https://api.creem.io/v1"
        "CREEM_WEBHOOK_SECRET" = "whsec_5uvCq8f1gQMsqz5rqwdVgZ"
        "RESEND_API_KEY" = "re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"
        "DASHSCOPE_API_KEY" = "sk-9bf19547ddbd4be1a87a7a43cf251097"
        "GMAIL_SMTP_USER" = "lihongyangnju@gmail.com"
        "GMAIL_SMTP_PASSWORD" = "zjhk rkmy ysoz dhyi"
        "GMAIL_SMTP_HOST" = "smtp.gmail.com"
        "GMAIL_SMTP_PORT" = "587"
        "GMAIL_REFRESH_TOKEN" = "1//04FWiY69BwVHbCgYIARAAGAQSNwF-L9IrZeOSGrUTkpP5iwxbNiR27XmP7fcSOg2AWpjRh55RUIlzrUI3nDHecaJV29bkosRLxrU"
        "GOOGLE_CLIENT_ID" = "3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com"
        "GOOGLE_CLIENT_SECRET" = "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"
    }
} | ConvertTo-Json -Depth 10

Write-Host "🚀 开始更新 Worker: $WORKER_NAME" -ForegroundColor Green
Write-Host "代码长度: $($workerCode.Length) 字符" -ForegroundColor Yellow
Write-Host "修复内容: 确保发送用户编辑的真实邮件内容" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME" -Headers $headers -Method PUT -Body $body
    Write-Host "✅ Worker 更新成功!" -ForegroundColor Green
    Write-Host "响应: $($response | ConvertTo-Json -Depth 5)" -ForegroundColor White
    Write-Host "🎉 Workers已更新，现在将发送用户编辑的真实邮件内容！" -ForegroundColor Green
} catch {
    Write-Host "❌ Worker 更新失败!" -ForegroundColor Red
    Write-Host "错误: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "响应体: $responseBody" -ForegroundColor Red
    }
}
