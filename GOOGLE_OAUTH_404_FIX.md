# Google OAuth 404错误修复指南

## 问题分析
从终端日志可以看到，Google OAuth现在使用了正确的凭据：
- **Client ID**: `1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8.apps.googleusercontent.com`
- **Client Secret**: `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5tU`

但仍然出现404错误，说明问题在于Google Cloud Console的配置。

## 必需修复的Google Cloud Console设置

### 1. 检查重定向URI配置
**访问**: https://console.cloud.google.com/apis/credentials

**必需设置**:
```
授权重定向URI: http://localhost:3000/api/auth/callback/google
```

**重要**: 
- 必须是 `http://localhost:3000/api/auth/callback/google`（不是 `https://`）
- 路径必须完全匹配，包括 `/api/auth/callback/google`
- 不能有多余的斜杠或字符

### 2. 检查授权JavaScript来源
```
授权JavaScript来源: http://localhost:3000
```

### 3. 检查OAuth同意屏幕
**访问**: https://console.cloud.google.com/apis/credentials/consent

**必需设置**:
- 应用名称: NovaMail
- 用户支持电子邮件: 您的邮箱
- 开发者联系信息: 您的邮箱
- 应用状态: 已发布（或添加测试用户）

### 4. 检查API启用状态
**访问**: https://console.cloud.google.com/apis/library

**确保以下API已启用**:
- Google+ API
- Google OAuth2 API
- Google Identity API

## 详细修复步骤

### 步骤1: 修复重定向URI
1. 访问 https://console.cloud.google.com/apis/credentials
2. 找到您的OAuth 2.0客户端ID: `1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8`
3. 点击编辑（铅笔图标）
4. 在"授权重定向URI"部分，确保有：
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. 点击"保存"

### 步骤2: 检查应用状态
1. 访问 https://console.cloud.google.com/apis/credentials/consent
2. 如果应用状态是"测试中"，需要：
   - 添加测试用户（您的Google账号）
   - 或者发布应用到生产环境

### 步骤3: 验证API启用
1. 访问 https://console.cloud.google.com/apis/library
2. 搜索并确保以下API已启用：
   - Google+ API
   - Google OAuth2 API

## 常见错误和解决方案

### 错误1: "redirect_uri_mismatch"
**原因**: 重定向URI不匹配
**解决**: 确保Google Cloud Console中的重定向URI与代码中的完全一致

### 错误2: "access_denied"
**原因**: OAuth同意屏幕未配置或应用未发布
**解决**: 配置OAuth同意屏幕并发布应用

### 错误3: "invalid_client"
**原因**: 客户端ID或密钥错误
**解决**: 检查环境变量中的凭据是否正确

## 测试步骤
1. 修复Google Cloud Console配置后
2. 重启开发服务器: `npm run dev`
3. 访问 http://localhost:3000/login
4. 点击Google登录按钮
5. 应该跳转到Google授权页面（不是404错误）

## 如果仍有问题
请提供：
1. Google Cloud Console中重定向URI的截图
2. OAuth同意屏幕的状态
3. 具体的错误信息
