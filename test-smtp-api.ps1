# SMTP API 测试脚本
Write-Host "Testing SMTP Configuration API..." -ForegroundColor Green

# 测试获取 SMTP 配置
Write-Host "`n1. Testing GET /api/user/email-config" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/user/email-config?userId=test_user" -Method GET
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试保存 SMTP 配置
Write-Host "`n2. Testing POST /api/user/email-config" -ForegroundColor Yellow
$configData = @{
    provider = "gmail"
    email = "test@example.com"
    password = "test_password"
    smtpHost = "smtp.gmail.com"
    smtpPort = "587"
    isSecure = $true
    userId = "test_user"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/user/email-config" -Method POST -Body $configData -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试 SMTP 连接
Write-Host "`n3. Testing POST /api/user/test-email" -ForegroundColor Yellow
$testData = @{
    provider = "gmail"
    email = "test@example.com"
    password = "test_password"
    smtpHost = "smtp.gmail.com"
    smtpPort = "587"
    isSecure = $true
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://novamail.world/api/user/test-email" -Method POST -Body $testData -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nSMTP API testing completed!" -ForegroundColor Green
