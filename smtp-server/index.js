const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors({
  origin: ['https://novamail.world', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个 IP 15 分钟内最多 100 个请求
  message: {
    error: '请求过于频繁，请稍后再试'
  }
});
app.use(limiter);

// 邮件发送速率限制
const emailLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 分钟
  max: 10, // 限制每个 IP 1 分钟内最多 10 封邮件
  message: {
    error: '邮件发送过于频繁，请稍后再试'
  }
});

// 验证 SMTP 配置
app.post('/api/smtp/test', emailLimiter, async (req, res) => {
  try {
    const { email, smtpHost, smtpPort, password, isSecure } = req.body;

    // 验证必填字段
    if (!email || !smtpHost || !smtpPort || !password) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数',
        message: '请提供邮箱、SMTP服务器、端口和密码'
      });
    }

    // 创建 SMTP 传输器
    const transporter = nodemailer.createTransporter({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: isSecure, // true for 465, false for other ports
      auth: {
        user: email,
        pass: password
      },
      tls: {
        rejectUnauthorized: false // 允许自签名证书
      }
    });

    // 验证连接
    await transporter.verify();

    // 发送测试邮件
    const testEmail = {
      from: email,
      to: email, // 发送给自己
      subject: 'NovaMail SMTP 连接测试',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">NovaMail</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">SMTP 连接测试成功</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              恭喜！您的 SMTP 配置已成功验证。
            </p>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #2d5a2d;">
                <strong>配置信息：</strong><br>
                邮箱：${email}<br>
                SMTP 服务器：${smtpHost}<br>
                端口：${smtpPort}<br>
                测试时间：${new Date().toLocaleString('zh-CN')}
              </p>
            </div>
            <p style="color: #666; font-size: 14px;">
              您现在可以使用 NovaMail 发送营销邮件了！
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(testEmail);

    res.json({
      success: true,
      message: 'SMTP 连接测试成功',
      details: {
        email: email,
        smtpHost: smtpHost,
        smtpPort: smtpPort,
        messageId: info.messageId
      }
    });

  } catch (error) {
    console.error('SMTP 测试失败:', error);
    
    let errorMessage = 'SMTP 连接失败';
    if (error.code === 'EAUTH') {
      errorMessage = '认证失败，请检查邮箱地址和应用密码';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = '无法连接到 SMTP 服务器，请检查服务器地址和端口';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = '连接超时，请检查网络连接';
    }

    res.status(400).json({
      success: false,
      error: errorMessage,
      details: error.message
    });
  }
});

// 发送营销邮件
app.post('/api/smtp/send', emailLimiter, async (req, res) => {
  try {
    const { 
      emailConfig, 
      recipients, 
      subject, 
      htmlContent, 
      businessName 
    } = req.body;

    // 验证必填字段
    if (!emailConfig || !recipients || !subject || !htmlContent) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数',
        message: '请提供邮件配置、收件人、主题和内容'
      });
    }

    const { email, smtpHost, smtpPort, password, isSecure } = emailConfig;

    // 创建 SMTP 传输器
    const transporter = nodemailer.createTransporter({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: isSecure,
      auth: {
        user: email,
        pass: password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // 验证连接
    await transporter.verify();

    const results = [];
    const errors = [];

    // 批量发送邮件
    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: `${businessName || 'NovaMail'} <${email}>`,
          to: recipient,
          subject: subject,
          html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({
          recipient: recipient,
          success: true,
          messageId: info.messageId
        });

        // 添加延迟避免被标记为垃圾邮件
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        errors.push({
          recipient: recipient,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `邮件发送完成，成功 ${results.length} 封，失败 ${errors.length} 封`,
      results: results,
      errors: errors,
      totalSent: results.length,
      totalFailed: errors.length
    });

  } catch (error) {
    console.error('邮件发送失败:', error);
    
    res.status(500).json({
      success: false,
      error: '邮件发送失败',
      details: error.message
    });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'NovaMail SMTP Server'
  });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error);
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
    details: error.message
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`NovaMail SMTP 服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
});

module.exports = app;
