# Campaigns API 测试脚本
Write-Host "Testing Campaigns API..." -ForegroundColor Green

# 测试获取 campaigns
Write-Host "`n1. Testing GET /api/campaigns" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/campaigns?userId=test_user" -Method GET
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试创建 campaign
Write-Host "`n2. Testing POST /api/campaigns" -ForegroundColor Yellow
$campaignData = @{
    name = "Test Campaign"
    subject = "Test Email Subject"
    status = "draft"
    recipients = @("test@example.com")
    userId = "test_user"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/campaigns" -Method POST -Body $campaignData -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试发送邮件
Write-Host "`n3. Testing POST /api/campaigns/send" -ForegroundColor Yellow
$sendData = @{
    campaignData = @{
        subject = "Test Campaign"
        body = "This is a test email"
        businessName = "Test Company"
        recipients = @("test@example.com")
    }
    recipients = @("test@example.com")
    userId = "test_user"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/campaigns/send" -Method POST -Body $sendData -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nCampaigns API testing completed!" -ForegroundColor Green
