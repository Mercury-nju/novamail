#!/usr/bin/env node

const { spawn } = require('child_process');
const { exec } = require('child_process');

console.log('🚀 Starting NovaMail development server...');

// 启动Next.js开发服务器
const nextDev = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe',
  shell: true
});

// 监听服务器启动
nextDev.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  
  // 当服务器启动完成时，打开浏览器
  if (output.includes('Ready') || output.includes('Local:')) {
    console.log('✅ Server is ready! Opening browser...');
    
    setTimeout(() => {
      const url = 'http://localhost:3000';
      
      // 根据不同操作系统打开浏览器
      const platform = process.platform;
      let command;
      
      if (platform === 'darwin') {
        command = `open ${url}`; // macOS
      } else if (platform === 'win32') {
        command = `start ${url}`; // Windows
      } else {
        command = `xdg-open ${url}`; // Linux
      }
      
      exec(command, (error) => {
        if (error) {
          console.error('❌ Failed to open browser:', error.message);
          console.log(`📋 Please manually open: ${url}`);
        } else {
          console.log('🌐 Browser opened successfully!');
        }
      });
    }, 2000); // 等待2秒确保服务器完全启动
  }
});

nextDev.stderr.on('data', (data) => {
  console.error(data.toString());
});

// 优雅退出处理
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  nextDev.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextDev.kill();
  process.exit(0);
});


