# Resend API 密钥更新说明

## 当前状态

在 `workers/wrangler.toml` 文件中，Resend API 密钥仍然是占位符：

```toml
RESEND_API_KEY = "re_1234567890abcdef"  # 请替换为真实的Resend API密钥
```

## 更新方法

### 方法1: 更新 wrangler.toml 文件

请将真实的 Resend API 密钥替换占位符：

```toml
RESEND_API_KEY = "re_your_real_api_key_here"
```

### 方法2: 在 Cloudflare Dashboard 中配置

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Workers & Pages
3. 找到 `novamail-api` Worker
4. 点击 Settings → Variables
5. 添加环境变量：
   - Name: `RESEND_API_KEY`
   - Value: `re_your_real_api_key_here`

### 方法3: 使用 wrangler CLI

```bash
cd workers
wrangler secret put RESEND_API_KEY
# 然后输入真实的 API 密钥
```

## 验证配置

更新密钥后，可以通过以下方式验证：

1. **发送测试邮件**：
   ```powershell
   powershell -ExecutionPolicy Bypass -File test-campaigns-api.ps1
   ```

2. **检查 Workers 日志**：
   ```bash
   wrangler tail
   ```

3. **查看邮件是否实际送达**

## 注意事项

- Resend API 密钥格式：`re_` 开头，后跟字母数字组合
- 确保密钥有发送邮件的权限
- 密钥更新后需要重新部署 Workers

## 下一步

请提供真实的 Resend API 密钥，或者确认您已经在 Cloudflare Dashboard 中配置了正确的密钥。
