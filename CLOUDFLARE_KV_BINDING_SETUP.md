# Cloudflare Pages KV 绑定配置步骤

## 重要：在 Cloudflare Dashboard 中配置 KV 绑定

### 1. 登录 Cloudflare Dashboard
访问：https://dash.cloudflare.com/

### 2. 进入 Pages 项目设置
1. 点击 "Pages"
2. 找到项目 "novamail"
3. 点击 "Settings"

### 3. 配置 Functions 设置
1. 在左侧菜单选择 "Functions"
2. 点击 "Add KV namespace binding"
3. 填写以下信息：
   - **Variable name**: `USERS_KV`
   - **KV namespace**: `NovaMail-Users`
   - **Environment**: `Production`
   - **Preview**: `NovaMail-Users`

### 4. 保存并重新部署
1. 点击 "Save"
2. 等待自动重新部署

## KV Namespace 信息
- **名称**: NovaMail-Users
- **ID**: 41bca314c98c4db580f450fb2e2c37bd
- **用途**: 存储用户 Mailchimp OAuth token

## 验证配置
部署完成后，Functions 将能够：
- 访问 `env.USERS_KV.get(key)` 读取数据
- 访问 `env.USERS_KV.put(key, value)` 写入数据
- 存储用户的 Mailchimp token

## 重启部署
配置完成后，重新部署项目：
```bash
git push origin main
```

## 注意
这必须通过 Cloudflare Dashboard 手动配置，wrangler.toml 配置不会自动应用到 Pages Functions。
