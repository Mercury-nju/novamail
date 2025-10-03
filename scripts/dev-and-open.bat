@echo off
echo 🚀 Starting NovaMail development server...

:: 启动Next.js开发服务器
start "NovaMail Dev Server" cmd /k "npm run dev"

:: 等待服务器启动
echo ⏳ Waiting for server to start...
timeout /t 8 /nobreak > nul

echo ✅ Opening browser...
start http://localhost:3000

echo 🌐 Browser opened! Development server is running.
echo 💡 Press Ctrl+C in the server window to stop.
pause


