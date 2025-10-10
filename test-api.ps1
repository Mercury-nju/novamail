# Test AI Email Generation API
# 测试 AI 邮件生成 API，检查是否返回中文占位符

$body = @{
    emailMode = "professional"
    selectedTemplate = "event"
    campaignData = @{
        purpose = "Join Us for an Exclusive Event"
        businessName = "Eat"
        productService = "Restaurant Services"
        targetUrl = "https://example.com/event"
    }
} | ConvertTo-Json

Write-Host "Sending request to API..." -ForegroundColor Yellow
Write-Host "URL: https://novamail.world/api/ai/generate-email" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/ai/generate-email" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -UseBasicParsing

    Write-Host "`nStatus Code: $($response.StatusCode)" -ForegroundColor Green
    
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "`nSubject:" -ForegroundColor Cyan
    Write-Host $result.subject
    
    Write-Host "`nBody (first 500 chars):" -ForegroundColor Cyan
    Write-Host $result.body.Substring(0, [Math]::Min(500, $result.body.Length))
    
    Write-Host "`nTemplate:" -ForegroundColor Cyan
    Write-Host $result.template
    
    Write-Host "`nNote:" -ForegroundColor Cyan
    Write-Host $result.note
    
    # Check for Chinese characters
    if ($result.subject -match '[\u4e00-\u9fa5]' -or $result.body -match '[\u4e00-\u9fa5]') {
        Write-Host "`n⚠️  WARNING: Chinese characters detected in response!" -ForegroundColor Red
    } else {
        Write-Host "`n✓ No Chinese characters detected" -ForegroundColor Green
    }
    
} catch {
    Write-Host "`nError:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:" -ForegroundColor Red
        Write-Host $responseBody
    }
}

