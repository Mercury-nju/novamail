# 简单的 Worker 部署脚本
$API_TOKEN = "o1CH8v-fJgNZh7OHScY02oYpbxWpYiF8sdMq7Bwl"
$ACCOUNT_ID = "8b0131a99f0fbfe479670ecaef6b4448"
$WORKER_NAME = "novamail-api"

Write-Host "开始部署 Worker: $WORKER_NAME"

# 读取代码
$workerCode = Get-Content "index-simple.js" -Raw
Write-Host "代码长度: $($workerCode.Length) 字符"

# 创建请求头
$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

# 创建简化的请求体
$body = @{
    "main" = @{
        "name" = "index-simple.js"
        "content" = $workerCode
        "type" = "esm"
    }
    "compatibility_date" = "2024-01-01"
    "compatibility_flags" = @("nodejs_compat")
} | ConvertTo-Json -Depth 5

Write-Host "发送更新请求..."

try {
    $response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME" -Headers $headers -Method PUT -Body $body
    Write-Host "✅ 部署成功!"
    Write-Host "响应: $($response.success)"
} catch {
    Write-Host "❌ 部署失败: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "错误详情: $responseBody"
    }
}
