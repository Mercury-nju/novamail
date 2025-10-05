# Google OAuth 配置检查

## 当前配置
- **Client ID**: `1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8.apps.googleusercontent.com`
- **Client Secret**: `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5tU`

## 必需的Google Cloud Console设置

### 1. 授权重定向URI
在Google Cloud Console中，确保以下URI已添加到您的OAuth客户端：

**开发环境:**
```
http://localhost:3000/api/auth/callback/google
```

**生产环境 (如果需要):**
```
https://yourdomain.com/api/auth/callback/google
```

### 2. 授权JavaScript来源
```
http://localhost:3000
```

### 3. OAuth同意屏幕
- 确保OAuth同意屏幕已配置
- 添加必要的范围：`openid`, `email`, `profile`
- 添加测试用户（如果应用仍在测试模式）

### 4. 验证步骤
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择您的项目
3. 转到 "APIs & Services" > "Credentials"
4. 找到您的OAuth 2.0客户端ID
5. 点击编辑
6. 确认重定向URI设置正确

## 常见问题
- **404错误**: 通常是因为重定向URI不匹配
- **403错误**: 通常是因为OAuth同意屏幕未配置或范围不足
- **重定向循环**: 通常是因为回调URL配置错误

## 测试URL
点击Google登录按钮后，应该跳转到：
```
https://accounts.google.com/o/oauth2/v2/auth?client_id=1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&prompt=consent&access_type=offline&state=...
```
