export interface ProfessionalTemplate {
  id: string
  name: string
  category: string
  description: string
  subject: string
  htmlContent: string
  features: string[]
  isPopular: boolean
  isNew: boolean
}

export const professionalTemplates: ProfessionalTemplate[] = [
  // === 商务类模板 ===
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'Business',
    description: 'Clean, professional design with subtle gradients and modern typography',
    subject: 'Introducing [Product Name] - The Future is Here',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Modern Gradient Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">NEW LAUNCH</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Introducing NovaAI - The Future of Email Marketing is Here</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Hi [Customer Name],</h2>
            
            <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              We're excited to announce something that will transform how you approach email marketing. 
              After months of development, we're proud to introduce NovaAI - the most advanced email marketing platform ever created.
            </p>
            
            <div style="background-color: #f7fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">What makes NovaAI revolutionary:</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>AI-powered content generation that writes better than humans</li>
                <li>Advanced personalization that increases engagement by 300%</li>
                <li>Smart analytics that predict customer behavior</li>
                <li>Automated A/B testing for optimal performance</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">Get Early Access</a>
            </div>
            
            <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
              Ready to revolutionize your email marketing? Join thousands of businesses already using NovaAI to create stunning, high-converting campaigns.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">© 2024 NovaAI. All rights reserved.</p>
            <p style="color: #a0aec0; margin: 0; font-size: 12px;">You received this email because you subscribed to our newsletter.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Clean Design', 'Subtle Gradients', 'Professional Layout', 'Clear CTA'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'corporate-professional',
    name: 'Corporate Professional',
    category: 'Business',
    description: 'Classic corporate design with clean lines and professional typography',
    subject: 'Important Business Update - [Company Name]',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Corporate Professional Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Times New Roman', serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <!-- Header -->
          <div style="background-color: #1a365d; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">[COMPANY NAME]</h1>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">ESTABLISHED 1995</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 20px; font-weight: bold;">Dear Valued Client,</h2>
            
            <p style="color: #2d3748; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              We are pleased to inform you of significant developments within our organization that will enhance our ability to serve you better.
            </p>
            
            <div style="border-left: 4px solid #1a365d; padding-left: 20px; margin: 25px 0;">
              <h3 style="color: #1a365d; margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">Key Updates:</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 15px; line-height: 1.8;">
                <li>Expanded service portfolio with new capabilities</li>
                <li>Enhanced customer support infrastructure</li>
                <li>Implementation of advanced security protocols</li>
                <li>Strategic partnerships with industry leaders</li>
              </ul>
            </div>
            
            <div style="background-color: #f7fafc; padding: 20px; border: 1px solid #e2e8f0; margin: 25px 0;">
              <p style="color: #2d3748; margin: 0; font-size: 16px; font-weight: bold;">Next Steps:</p>
              <p style="color: #4a5568; margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">
                Our team will contact you within the next 5 business days to discuss how these improvements will benefit your specific needs.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #1a365d; color: #ffffff; text-decoration: none; padding: 12px 25px; border: 2px solid #1a365d; font-weight: bold; font-size: 14px; display: inline-block;">Schedule Consultation</a>
            </div>
            
            <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
              We appreciate your continued trust in our services and look forward to strengthening our partnership.
            </p>
            
            <p style="color: #2d3748; margin: 20px 0 0 0; font-size: 16px;">
              Sincerely,<br>
              <strong>The [Company Name] Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f7fafc; padding: 25px 30px; border-top: 1px solid #e2e8f0;">
            <div style="text-align: center;">
              <p style="color: #718096; margin: 0 0 5px 0; font-size: 12px;">[Company Name] | [Address] | [Phone]</p>
              <p style="color: #a0aec0; margin: 0; font-size: 11px;">This email was sent to [email] because you are a valued client.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Classic Design', 'Professional Typography', 'Corporate Layout', 'Formal Tone'],
    isPopular: false,
    isNew: false
  },

  // === 创意类模板 ===
  {
    id: 'creative-showcase',
    name: 'Creative Showcase',
    category: 'Creative',
    description: 'Bold, artistic design with vibrant colors and creative layouts',
    subject: '🎨 Creative Inspiration - [Project Name]',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Creative Showcase Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); padding: 50px 30px; text-align: center; position: relative;">
            <div style="background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">✨ CREATIVE</h1>
              <h2 style="color: #ffffff; margin: 10px 0 0 0; font-size: 24px; font-weight: 300; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">SHOWCASE</h2>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 28px; font-weight: 700;">Hey Creative Soul! 👋</h2>
            
            <p style="color: #4a5568; margin: 0 0 25px 0; font-size: 18px; line-height: 1.6;">
              We've been working on something absolutely <strong style="color: #ff6b6b;">AMAZING</strong> and we couldn't wait to share it with you!
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center;">
              <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 22px; font-weight: 600;">🎯 What's New?</h3>
              <p style="color: #ffffff; margin: 0; font-size: 16px; opacity: 0.9;">
                Revolutionary design tools that will transform your creative process
              </p>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin: 25px 0;">
              <div style="flex: 1; min-width: 150px; background-color: #ff6b6b; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h4 style="margin: 0 0 10px 0; font-size: 16px;">🎨 Design</h4>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Creative Tools</p>
              </div>
              <div style="flex: 1; min-width: 150px; background-color: #4ecdc4; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h4 style="margin: 0 0 10px 0; font-size: 16px;">🚀 Innovation</h4>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Cutting Edge</p>
              </div>
              <div style="flex: 1; min-width: 150px; background-color: #45b7d1; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h4 style="margin: 0 0 10px 0; font-size: 16px;">💡 Ideas</h4>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Inspiration</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="#" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: #ffffff; text-decoration: none; padding: 18px 35px; border-radius: 25px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);">Explore Now 🚀</a>
            </div>
            
            <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; text-align: center;">
              Ready to unleash your creativity? Join thousands of artists, designers, and creators who are already using our platform to bring their visions to life.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #2d3748; padding: 30px; text-align: center;">
            <p style="color: #a0aec0; margin: 0 0 10px 0; font-size: 14px;">© 2024 Creative Studio. Made with ❤️ for creators.</p>
            <p style="color: #718096; margin: 0; font-size: 12px;">You're receiving this because you're part of our creative community.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Bold Colors', 'Creative Layout', 'Artistic Design', 'Vibrant Elements'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'Minimal',
    description: 'Ultra-minimal design with lots of white space and clean typography',
    subject: 'Simple. Clean. Effective.',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Minimal Clean Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #ffffff;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff;">
          <!-- Content -->
          <div style="padding: 60px 40px;">
            <h1 style="color: #000000; margin: 0 0 30px 0; font-size: 32px; font-weight: 300; letter-spacing: -1px;">Hello</h1>
            
            <p style="color: #666666; margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; font-weight: 300;">
              Sometimes the most powerful messages are the simplest ones.
            </p>
            
            <div style="border-top: 1px solid #e5e5e5; padding-top: 30px; margin: 40px 0;">
              <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px; font-weight: 400;">What we believe</h2>
              <p style="color: #666666; margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;">
                Less is more.<br>
                Quality over quantity.<br>
                Simplicity is sophistication.
              </p>
            </div>
            
            <div style="text-align: center; margin: 50px 0;">
              <a href="#" style="color: #000000; text-decoration: none; border: 1px solid #000000; padding: 12px 24px; font-size: 14px; font-weight: 400; display: inline-block;">Learn More</a>
            </div>
            
            <div style="border-top: 1px solid #e5e5e5; padding-top: 30px; margin-top: 50px;">
              <p style="color: #999999; margin: 0; font-size: 12px; text-align: center;">
                © 2024 Minimal Co. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Ultra Minimal', 'Clean Typography', 'White Space', 'Simple Layout'],
    isPopular: false,
    isNew: true
  },

  // === 科技类模板 ===
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    category: 'Technology',
    description: 'High-tech design with neon accents and futuristic elements',
    subject: '🚀 The Future is Here - [Tech Product]',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tech Futuristic Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Roboto Mono', monospace; background-color: #0a0a0a;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #000000; border: 1px solid #00ff88;">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #000000 0%, #001122 50%, #000000 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #00ff88, #0088ff, #ff0088, #00ff88);"></div>
            <h1 style="color: #00ff88; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 0 10px #00ff88;">NEXUS</h1>
            <p style="color: #0088ff; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">SYSTEM ONLINE</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">Greetings, User.</h2>
            
            <p style="color: #cccccc; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6;">
              Welcome to the next generation of technology. Our advanced systems are now operational and ready to revolutionize your digital experience.
            </p>
            
            <div style="background-color: #001122; border: 1px solid #00ff88; padding: 25px; margin: 25px 0; position: relative;">
              <div style="position: absolute; top: -1px; left: -1px; right: -1px; height: 1px; background: linear-gradient(90deg, #00ff88, #0088ff);"></div>
              <h3 style="color: #00ff88; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">SYSTEM CAPABILITIES:</h3>
              <ul style="color: #cccccc; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Advanced AI Processing Units</li>
                <li>Quantum Encryption Protocols</li>
                <li>Neural Network Integration</li>
                <li>Real-time Data Synchronization</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: linear-gradient(45deg, #00ff88, #0088ff); color: #000000; text-decoration: none; padding: 15px 30px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);">INITIALIZE SYSTEM</a>
            </div>
            
            <div style="border-top: 1px solid #333333; padding-top: 25px; margin-top: 30px;">
              <p style="color: #666666; margin: 0; font-size: 12px; text-align: center; text-transform: uppercase;">
                NEXUS TECHNOLOGY CORP. | SECURE TRANSMISSION
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Neon Accents', 'Futuristic Design', 'Tech Elements', 'Dark Theme'],
    isPopular: true,
    isNew: true
  },

  // === 节日类模板 ===
  {
    id: 'holiday-celebration',
    name: 'Holiday Celebration',
    category: 'Holiday',
    description: 'Festive design with holiday colors and celebratory elements',
    subject: '🎉 Happy Holidays from [Company Name]!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Holiday Celebration Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #f8f8f8;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #d4af37 0%, #ff6b6b 50%, #4ecdc4 100%); padding: 50px 30px; text-align: center; position: relative;">
            <div style="background-color: rgba(255, 255, 255, 0.9); padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #2d3748; margin: 0; font-size: 32px; font-weight: bold;">🎄 Happy Holidays! 🎄</h1>
              <p style="color: #4a5568; margin: 10px 0 0 0; font-size: 18px; font-style: italic;">Wishing you joy and prosperity</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 24px; font-weight: 600; text-align: center;">Dear Valued Customer,</h2>
            
            <p style="color: #4a5568; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; text-align: center;">
              As we celebrate this wonderful season, we want to take a moment to thank you for being an important part of our journey this year.
            </p>
            
            <div style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4); padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center;">
              <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">🎁 Special Holiday Offer</h3>
              <p style="color: #ffffff; margin: 0; font-size: 16px; opacity: 0.9;">
                Enjoy 30% off on all our premium services until the end of the year!
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-around; margin: 30px 0; flex-wrap: wrap;">
              <div style="text-align: center; margin: 10px;">
                <div style="width: 60px; height: 60px; background-color: #ff6b6b; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎄</div>
                <p style="color: #4a5568; margin: 0; font-size: 14px; font-weight: 600;">Christmas</p>
              </div>
              <div style="text-align: center; margin: 10px;">
                <div style="width: 60px; height: 60px; background-color: #4ecdc4; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎊</div>
                <p style="color: #4a5568; margin: 0; font-size: 14px; font-weight: 600;">New Year</p>
              </div>
              <div style="text-align: center; margin: 10px;">
                <div style="width: 60px; height: 60px; background-color: #d4af37; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎉</div>
                <p style="color: #4a5568; margin: 0; font-size: 14px; font-weight: 600;">Celebration</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="#" style="background: linear-gradient(135deg, #d4af37, #ff6b6b); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">Claim Your Gift 🎁</a>
            </div>
            
            <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; text-align: center;">
              May this holiday season bring you happiness, health, and prosperity. Thank you for choosing us!
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">© 2024 [Company Name]. Happy Holidays!</p>
            <p style="color: #a0aec0; margin: 0; font-size: 12px;">Wishing you a wonderful holiday season and a prosperous new year.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Festive Colors', 'Holiday Elements', 'Celebratory Design', 'Warm Tone'],
    isPopular: false,
    isNew: true
  },

  // === 电商类模板 ===
  {
    id: 'ecommerce-sales',
    name: 'E-commerce Sales',
    category: 'E-commerce',
    description: 'Product-focused design with clear pricing and shopping elements',
    subject: '🔥 Flash Sale - Up to 70% Off Everything!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-commerce Sales Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Open Sans', Arial, sans-serif; background-color: #f8f9fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #dc3545; padding: 20px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; text-transform: uppercase;">🔥 FLASH SALE 🔥</h1>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;">Limited Time Only - Don't Miss Out!</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; text-align: center;">Up to 70% Off Everything!</h2>
            
            <p style="color: #4a5568; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; text-align: center;">
              Shop now and save big on our entire collection. This offer won't last long!
            </p>
            
            <!-- Product Grid -->
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin: 25px 0;">
              <div style="flex: 1; min-width: 150px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="height: 120px; background-color: #f7fafc; display: flex; align-items: center; justify-content: center; font-size: 24px;">📱</div>
                <div style="padding: 15px;">
                  <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #2d3748;">Premium Phone</h4>
                  <p style="margin: 0; font-size: 12px; color: #dc3545; font-weight: 600;">$299 <span style="color: #718096; text-decoration: line-through;">$599</span></p>
                </div>
              </div>
              <div style="flex: 1; min-width: 150px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="height: 120px; background-color: #f7fafc; display: flex; align-items: center; justify-content: center; font-size: 24px;">💻</div>
                <div style="padding: 15px;">
                  <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #2d3748;">Laptop Pro</h4>
                  <p style="margin: 0; font-size: 12px; color: #dc3545; font-weight: 600;">$899 <span style="color: #718096; text-decoration: line-through;">$1299</span></p>
                </div>
              </div>
              <div style="flex: 1; min-width: 150px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="height: 120px; background-color: #f7fafc; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎧</div>
                <div style="padding: 15px;">
                  <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #2d3748;">Wireless Headphones</h4>
                  <p style="margin: 0; font-size: 12px; color: #dc3545; font-weight: 600;">$99 <span style="color: #718096; text-decoration: line-through;">$199</span></p>
                </div>
              </div>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">⏰ Sale Ends Soon!</h3>
              <p style="color: #856404; margin: 0; font-size: 14px;">
                This incredible offer expires in 24 hours. Don't wait - shop now and save big!
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #dc3545; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">Shop Now & Save</a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Why Choose Us?</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Free shipping on orders over $50</li>
                <li>30-day money-back guarantee</li>
                <li>24/7 customer support</li>
                <li>Secure payment processing</li>
              </ul>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #6c757d; margin: 0 0 10px 0; font-size: 14px;">© 2024 TechStore. All rights reserved.</p>
            <p style="color: #adb5bd; margin: 0; font-size: 12px;">You received this email because you subscribed to our newsletter.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Product Focus', 'Clear Pricing', 'Shopping Elements', 'Urgency Design'],
    isPopular: true,
    isNew: false
  },

  // === 新闻类模板 ===
  {
    id: 'newsletter-weekly',
    name: 'Newsletter Weekly',
    category: 'Newsletter',
    description: 'Clean newsletter design with multiple sections and easy reading',
    subject: '📰 Weekly Newsletter - [Date]',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter Weekly Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #2d3748; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">The Weekly Digest</h1>
            <p style="color: #a0aec0; margin: 5px 0 0 0; font-size: 14px;">Your source for industry insights and updates</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">This Week's Highlights</h2>
            
            <!-- Article 1 -->
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px;">
              <h3 style="color: #2d3748; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">🚀 Industry Breakthrough</h3>
              <p style="color: #4a5568; margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">
                This week, we witnessed a major breakthrough in technology that could revolutionize how we approach digital marketing...
              </p>
              <a href="#" style="color: #3182ce; text-decoration: none; font-size: 14px; font-weight: 600;">Read More →</a>
            </div>
            
            <!-- Article 2 -->
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px;">
              <h3 style="color: #2d3748; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">📊 Market Analysis</h3>
              <p style="color: #4a5568; margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">
                Our analysts have identified key trends that are shaping the industry landscape in Q4...
              </p>
              <a href="#" style="color: #3182ce; text-decoration: none; font-size: 14px; font-weight: 600;">Read More →</a>
            </div>
            
            <!-- Article 3 -->
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px;">
              <h3 style="color: #2d3748; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">💡 Expert Insights</h3>
              <p style="color: #4a5568; margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">
                Industry experts share their predictions for the upcoming year and what businesses should prepare for...
              </p>
              <a href="#" style="color: #3182ce; text-decoration: none; font-size: 14px; font-weight: 600;">Read More →</a>
            </div>
            
            <!-- Quote Section -->
            <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #3182ce; margin: 25px 0;">
              <p style="color: #2d3748; margin: 0; font-size: 16px; font-style: italic; line-height: 1.5;">
                "The future belongs to those who understand that data is not just information, but the foundation of intelligent decision-making."
              </p>
              <p style="color: #718096; margin: 10px 0 0 0; font-size: 14px;">— Sarah Johnson, CEO of DataCorp</p>
            </div>
            
            <!-- Quick Stats -->
            <div style="background-color: #edf2f7; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">📈 This Week's Numbers</h3>
              <div style="display: flex; justify-content: space-around; text-align: center;">
                <div>
                  <p style="color: #3182ce; margin: 0; font-size: 24px; font-weight: bold;">2.3M</p>
                  <p style="color: #4a5568; margin: 0; font-size: 12px;">New Users</p>
                </div>
                <div>
                  <p style="color: #38a169; margin: 0; font-size: 24px; font-weight: bold;">15%</p>
                  <p style="color: #4a5568; margin: 0; font-size: 12px;">Growth</p>
                </div>
                <div>
                  <p style="color: #d69e2e; margin: 0; font-size: 24px; font-weight: bold;">98%</p>
                  <p style="color: #4a5568; margin: 0; font-size: 12px;">Satisfaction</p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #3182ce; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">View Full Newsletter</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">© 2024 The Weekly Digest. All rights reserved.</p>
            <p style="color: #a0aec0; margin: 0; font-size: 12px;">You're receiving this because you subscribed to our newsletter.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Clean Sections', 'Easy Reading', 'Regular Updates', 'Community Focus'],
    isPopular: false,
    isNew: true
  },

  // === 产品发布类模板 ===
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'Product',
    description: 'Exciting product launch announcement with compelling visuals',
    subject: '🚀 Introducing [Product Name] - The Future is Here!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Launch Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; right: 30px; background-color: #ff6b6b; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">NEW!</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 900; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🚀 LAUNCH DAY</h1>
            <p style="color: #ffffff; margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">The wait is over. The future is here.</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 50px 30px;">
            <h2 style="color: #2d3748; margin: 0 0 25px 0; font-size: 28px; font-weight: 700; text-align: center;">Introducing [Product Name]</h2>
            
            <p style="color: #4a5568; margin: 0 0 30px 0; font-size: 18px; line-height: 1.6; text-align: center;">
              After years of development and testing, we're thrilled to announce the launch of our most innovative product yet.
            </p>
            
            <!-- Product Features -->
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px; border-radius: 20px; margin: 30px 0; text-align: center;">
              <h3 style="color: #ffffff; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">✨ Revolutionary Features</h3>
              <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div style="background-color: rgba(255, 255, 255, 0.2); padding: 20px; border-radius: 15px; min-width: 120px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">⚡</div>
                  <p style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 600;">Lightning Fast</p>
                </div>
                <div style="background-color: rgba(255, 255, 255, 0.2); padding: 20px; border-radius: 15px; min-width: 120px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🔒</div>
                  <p style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 600;">Ultra Secure</p>
                </div>
                <div style="background-color: rgba(255, 255, 255, 0.2); padding: 20px; border-radius: 15px; min-width: 120px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
                  <p style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 600;">Smart AI</p>
                </div>
              </div>
            </div>
            
            <!-- Pricing -->
            <div style="background-color: #f7fafc; padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">🎉 Launch Special Pricing</h3>
              <div style="display: flex; justify-content: center; align-items: baseline; margin: 20px 0;">
                <span style="color: #dc3545; font-size: 48px; font-weight: 900;">$99</span>
                <span style="color: #718096; font-size: 24px; margin-left: 10px; text-decoration: line-through;">$199</span>
              </div>
              <p style="color: #4a5568; margin: 0; font-size: 14px;">Limited time offer - Save 50%!</p>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 20px 40px; border-radius: 50px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);">Get It Now 🚀</a>
            </div>
            
            <!-- Social Proof -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 30px; margin-top: 40px;">
              <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-align: center;">Join 10,000+ Early Adopters</h3>
              <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <p style="color: #3182ce; margin: 0; font-size: 24px; font-weight: bold;">4.9/5</p>
                  <p style="color: #4a5568; margin: 0; font-size: 12px;">User Rating</p>
                </div>
                <div style="text-align: center;">
                  <p style="color: #38a169; margin: 0; font-size: 24px; font-weight: bold;">99%</p>
                  <p style="color: #4a5568; margin: 0; font-size: 12px;">Satisfaction</p>
                </div>
                <div style="text-align: center;">
                  <p style="color: #d69e2e; margin: 0; font-size: 24px; font-weight: bold;">24/7</p>
                  <p style="color: #4a5568; margin: 0; font-size: 12px;">Support</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #2d3748; padding: 30px; text-align: center;">
            <p style="color: #a0aec0; margin: 0 0 10px 0; font-size: 14px;">© 2024 [Company Name]. All rights reserved.</p>
            <p style="color: #718096; margin: 0; font-size: 12px;">You received this email because you're subscribed to our product updates.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Exciting Design', 'Product Focus', 'Launch Announcement', 'Call to Action'],
    isPopular: true,
    isNew: false
  },

  // === 欢迎系列类模板 ===
  {
    id: 'welcome-series',
    name: 'Welcome Series',
    category: 'Onboarding',
    description: 'Perfect for welcoming new users with a friendly, informative approach',
    subject: 'Welcome to [Company Name] - Let\'s Get Started!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Series Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 50px 30px; text-align: center;">
            <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">👋</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">Welcome!</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We're excited to have you on board</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Hi [Name],</h2>
            
            <p style="color: #4b5563; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6;">
              Welcome to [Company Name]! We're thrilled that you've joined our community. You're now part of something special, and we can't wait to help you succeed.
            </p>
            
            <!-- Getting Started Steps -->
            <div style="background-color: #f9fafb; padding: 30px; border-radius: 12px; margin: 30px 0;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">🚀 Let's Get You Started</h3>
              
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 30px; height: 30px; background-color: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 15px;">1</div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">Complete Your Profile</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px;">Add your information to personalize your experience</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 30px; height: 30px; background-color: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 15px;">2</div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">Explore Our Features</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px;">Take a tour of our platform and discover what's possible</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <div style="width: 30px; height: 30px; background-color: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 15px;">3</div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">Create Your First Project</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px;">Start building something amazing right away</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Resources -->
            <div style="margin: 30px 0;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">📚 Helpful Resources</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                <a href="#" style="flex: 1; min-width: 150px; background-color: #f3f4f6; color: #1f2937; text-decoration: none; padding: 15px; border-radius: 8px; text-align: center; font-size: 14px; font-weight: 600;">📖 Documentation</a>
                <a href="#" style="flex: 1; min-width: 150px; background-color: #f3f4f6; color: #1f2937; text-decoration: none; padding: 15px; border-radius: 8px; text-align: center; font-size: 14px; font-weight: 600;">🎥 Video Tutorials</a>
                <a href="#" style="flex: 1; min-width: 150px; background-color: #f3f4f6; color: #1f2937; text-decoration: none; padding: 15px; border-radius: 8px; text-align: center; font-size: 14px; font-weight: 600;">💬 Community</a>
              </div>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="#" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">Get Started Now</a>
            </div>
            
            <!-- Support -->
            <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">💬 Need Help?</h4>
              <p style="color: #047857; margin: 0 0 10px 0; font-size: 14px;">
                Our support team is here to help you succeed. Don't hesitate to reach out!
              </p>
              <a href="#" style="color: #059669; text-decoration: none; font-size: 14px; font-weight: 600;">Contact Support →</a>
            </div>
            
            <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
              We're here to support you every step of the way. Welcome to the team!
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">© 2024 [Company Name]. All rights reserved.</p>
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">You're receiving this because you just signed up for our service.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Friendly Tone', 'Step-by-Step Guide', 'Onboarding Focus', 'Helpful Tips'],
    isPopular: false,
    isNew: true
  },

  // === 活动邀请类模板 ===
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    category: 'Events',
    description: 'Elegant design for event invitations and announcements',
    subject: '🎉 You\'re Invited: [Event Name] - [Date]',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Invitation Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Playfair Display', serif; background-color: #f8f8f8;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 60px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; left: 30px; right: 30px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);"></div>
            <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 300; letter-spacing: 2px;">YOU'RE INVITED</h1>
            <div style="width: 60px; height: 2px; background-color: #ffffff; margin: 20px auto;"></div>
            <p style="color: #ffffff; margin: 0; font-size: 18px; opacity: 0.9; font-style: italic;">To an exclusive event</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 50px 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px; font-weight: 400; text-align: center;">[Event Name]</h2>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #f3f4f6; padding: 20px 30px; border-radius: 12px;">
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Date & Time</p>
                <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 600;">[Date] at [Time]</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #f3f4f6; padding: 20px 30px; border-radius: 12px;">
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Location</p>
                <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 600;">[Venue Name]</p>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">[Address]</p>
              </div>
            </div>
            
            <p style="color: #4b5563; margin: 30px 0; font-size: 16px; line-height: 1.6; text-align: center;">
              Join us for an evening of networking, inspiration, and celebration. This exclusive event brings together industry leaders, innovators, and visionaries for an unforgettable experience.
            </p>
            
            <!-- Event Highlights -->
            <div style="background-color: #f9fafb; padding: 30px; border-radius: 12px; margin: 30px 0;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-align: center;">✨ Event Highlights</h3>
              <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div style="text-align: center; flex: 1; min-width: 120px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🎤</div>
                  <p style="color: #1f2937; margin: 0; font-size: 14px; font-weight: 600;">Keynote Speakers</p>
                </div>
                <div style="text-align: center; flex: 1; min-width: 120px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🤝</div>
                  <p style="color: #1f2937; margin: 0; font-size: 14px; font-weight: 600;">Networking</p>
                </div>
                <div style="text-align: center; flex: 1; min-width: 120px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🍾</div>
                  <p style="color: #1f2937; margin: 0; font-size: 14px; font-weight: 600;">Reception</p>
                </div>
              </div>
            </div>
            
            <!-- RSVP -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);">RSVP Now</a>
            </div>
            
            <!-- Dress Code -->
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">👔 Dress Code</h4>
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                Cocktail attire recommended. Business casual is also acceptable.
              </p>
            </div>
            
            <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; text-align: center;">
              We look forward to celebrating with you. Please RSVP by [RSVP Date] to secure your spot.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #1f2937; padding: 30px; text-align: center;">
            <p style="color: #d1d5db; margin: 0 0 10px 0; font-size: 14px;">© 2024 [Event Organizer]. All rights reserved.</p>
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">You're receiving this invitation because you're a valued member of our community.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    features: ['Elegant Design', 'Event Details', 'RSVP Function', 'Professional Tone'],
    isPopular: false,
    isNew: true
  }
]

// 按分类组织模板
export const templateCategories = {
  'Business': ['modern-gradient', 'corporate-professional'],
  'Creative': ['creative-showcase', 'minimal-clean'],
  'Technology': ['tech-futuristic'],
  'Holiday': ['holiday-celebration'],
  'E-commerce': ['ecommerce-sales'],
  'Newsletter': ['newsletter-weekly'],
  'Product': ['product-launch'],
  'Onboarding': ['welcome-series'],
  'Events': ['event-invitation']
}

// 获取分类中的模板
export const getTemplatesByCategory = (category: string): ProfessionalTemplate[] => {
  const templateIds = templateCategories[category as keyof typeof templateCategories] || []
  return professionalTemplates.filter(template => templateIds.includes(template.id))
}

// 获取所有分类
export const getAllCategories = (): string[] => {
  return Object.keys(templateCategories)
}