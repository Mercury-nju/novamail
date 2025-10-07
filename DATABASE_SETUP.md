# 生产环境数据库配置选项

## 选项1：Cloudflare D1 (推荐)
# 1. 在Cloudflare控制台创建D1数据库
# 2. 获取数据库URL
# 3. 在Cloudflare Pages环境变量中设置：
#    CLOUDFLARE_D1_DATABASE_URL="your-d1-database-url"

## 选项2：PostgreSQL (更强大)
# 1. 使用Supabase、PlanetScale、或Railway
# 2. 获取PostgreSQL连接字符串
# 3. 在环境变量中设置：
#    DATABASE_URL="postgresql://user:password@host:port/database"

## 选项3：MySQL
# 1. 使用PlanetScale、Railway、或AWS RDS
# 2. 获取MySQL连接字符串
# 3. 在环境变量中设置：
#    DATABASE_URL="mysql://user:password@host:port/database"

## 当前配置（本地开发）
DATABASE_URL="file:./dev.db"

## 生产环境建议
# 使用PostgreSQL或MySQL，支持更多用户和更好的性能
# 数据库迁移：prisma db push
# 查看数据：使用数据库管理工具或Prisma Studio
