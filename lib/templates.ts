import { SparklesIcon, DocumentTextIcon, ShoppingCartIcon, CalendarIcon } from '@heroicons/react/24/outline'

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
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'Modern',
    description: 'Contemporary design with vibrant gradients and bold typography',
    subject: '🚀 Introducing [Product Name] - The Future is Here',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 8px 25px rgba(0,0,0,0.1);">
        <!-- Hero Section with Enhanced Gradient -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden;">
          <!-- Animated Background Elements -->
          <div style="position: absolute; top: -20px; left: -20px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%); border-radius: 50%; animation: float 6s ease-in-out infinite;"></div>
          <div style="position: absolute; bottom: -30px; right: -30px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; animation: float 8s ease-in-out infinite reverse;"></div>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); border-radius: 50%; animation: pulse 4s ease-in-out infinite;"></div>
          
          <!-- Main Content -->
          <div style="position: relative; z-index: 2;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 20px; backdrop-filter: blur(10px);">
              <span style="color: white; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🚀 New Launch</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 800; letter-spacing: -1px; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Introducing NovaAI</h1>
            <p style="color: rgba(255,255,255,0.95); margin: 16px 0 0 0; font-size: 18px; font-weight: 400; line-height: 1.4;">The Future of Email Marketing is Here</p>
            <div style="margin-top: 24px;">
              <span style="display: inline-block; background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; color: white; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px);">✨ AI-Powered</span>
              <span style="display: inline-block; background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; color: white; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px); margin-left: 8px;">🎯 Smart Analytics</span>
            </div>
          </div>
        </div>
        
        <!-- Main Content Section -->
        <div style="padding: 50px 30px;">
          <!-- Personalized Greeting -->
          <div style="margin-bottom: 32px;">
            <p style="color: #1a202c; font-size: 18px; line-height: 1.5; margin-bottom: 8px; font-weight: 500;">
              Hi [Customer Name],
            </p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">
              We're thrilled to announce something that will transform your business forever.
            </p>
          </div>
          
          <!-- Main Message -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 32px; border-radius: 16px; margin: 32px 0; border: 1px solid #e2e8f0; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0 2px 2px 0;"></div>
            <h3 style="color: #1a202c; margin: 0 0 20px 0; font-size: 20px; font-weight: 700;">What makes NovaAI revolutionary:</h3>
            <div style="display: grid; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%;"></div>
                <span style="color: #2d3748; font-size: 15px; line-height: 1.5;">AI-powered content generation that writes like a human</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%;"></div>
                <span style="color: #2d3748; font-size: 15px; line-height: 1.5;">Advanced personalization that increases engagement by 300%</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%;"></div>
                <span style="color: #2d3748; font-size: 15px; line-height: 1.5;">Smart analytics that predict customer behavior</span>
              </div>
            </div>
          </div>
          
          <!-- Special Offer Section -->
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 32px; border-radius: 16px; text-align: center; margin: 32px 0; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 3s ease-in-out infinite;"></div>
            <div style="position: relative; z-index: 2;">
              <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 12px; margin-bottom: 16px; backdrop-filter: blur(10px);">
                <span style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🎯 Limited Time</span>
              </div>
              <h3 style="color: white; margin: 0 0 16px 0; font-size: 22px; font-weight: 700;">Early Access Offer</h3>
              <p style="color: white; margin: 0 0 8px 0; font-size: 16px; font-weight: 500;">
                Join 10,000+ marketers already using NovaAI
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
                Get <strong>50% off</strong> your first year • Expires in 48 hours
              </p>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
              <span style="position: relative; z-index: 2;">Start Your Free Trial</span>
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease;"></div>
            </a>
            <p style="color: #718096; font-size: 13px; margin: 12px 0 0 0;">No credit card required • 14-day free trial</p>
          </div>
          
          <!-- Social Proof -->
          <div style="background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%); padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #81e6d9; text-align: center;">
            <h4 style="color: #234e52; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Trusted by Industry Leaders</h4>
            <p style="color: #2c7a7b; margin: 0; font-size: 14px; line-height: 1.5;">
              Over 10,000 businesses trust NovaAI • Join Shopify, Stripe, and Notion
            </p>
          </div>
          
          <!-- Closing Message -->
          <div style="margin: 40px 0 0 0;">
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Ready to revolutionize your email marketing? Let's get started together.
            </p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
              <p style="color: #2d3748; font-size: 15px; line-height: 1.6; margin: 0;">
                Best regards,<br>
                <strong style="color: #1a202c;">The NovaAI Team</strong><br>
                <span style="color: #667eea; font-weight: 600;">NovaMail</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      </style>
    `,
    features: ['Vibrant Gradients', 'Bold Typography', 'Modern Layout', 'Strong CTA'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'Minimal',
    description: 'Clean, minimalist design with plenty of white space and elegant typography',
    subject: 'Welcome to [Company Name] - Let\'s Get Started!',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="background: #ffffff; padding: 60px 40px 40px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
          <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -0.5px;">Welcome to NovaMail</h1>
          <p style="color: #666666; margin: 16px 0 0 0; font-size: 16px; font-weight: 300;">Let's get you started</p>
        </div>
        
        <div style="padding: 60px 40px;">
          <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">
            Hi [Customer Name],
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.7; margin-bottom: 40px; font-weight: 300;">
            Welcome to NovaMail. We're excited to have you join thousands of businesses already using our platform to create beautiful, effective email campaigns.
          </p>
          
          <div style="background: #fafafa; padding: 32px; margin: 40px 0; border-left: 2px solid #e0e0e0;">
            <h3 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 18px; font-weight: 400;">Your next steps</h3>
            <ol style="color: #555555; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6; font-weight: 300;">
              <li style="margin-bottom: 12px;">Complete your profile setup</li>
              <li style="margin-bottom: 12px;">Choose your first template</li>
              <li style="margin-bottom: 12px;">Import your contact list</li>
              <li style="margin-bottom: 12px;">Send your first campaign</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 48px 0;">
            <a href="#" style="display: inline-block; background: #1a1a1a; color: white; padding: 16px 32px; text-decoration: none; border-radius: 0; font-weight: 400; font-size: 16px; letter-spacing: 0.5px;">
              Get Started
            </a>
          </div>
          
          <div style="border-left: 2px solid #e0e0e0; padding-left: 24px; margin: 40px 0;">
            <h3 style="color: #1a1a1a; margin: 0 0 12px 0; font-size: 16px; font-weight: 400;">Need help?</h3>
            <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.5; font-weight: 300;">Visit our help center for guides, tutorials, and best practices.</p>
          </div>
          
          <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 40px 0; font-weight: 300;">
            We're here to help you succeed. If you have any questions, just reply to this email.
          </p>
          
          <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 48px 0 0 0; font-weight: 300;">
            Best,<br>
            The NovaMail Team
          </p>
        </div>
      </div>
    `,
    features: ['Clean Typography', 'White Space', 'Elegant Layout', 'Subtle Colors'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'corporate-professional',
    name: 'Corporate Professional',
    category: 'Corporate',
    description: 'Professional business design with structured layout and corporate colors',
    subject: '[Company Name] Monthly Newsletter - [Month Year]',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: #1e293b; padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">NovaMail</h1>
          <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px; font-weight: 400;">Monthly Newsletter - December 2024</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-bottom: 24px; font-weight: 400;">
            Dear [Subscriber Name],
          </p>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.7; margin-bottom: 32px; font-weight: 400;">
            Welcome to our <strong>December 2024</strong> newsletter. This month, we're excited to share significant updates and insights from the NovaMail platform.
          </p>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">This Month's Highlights</h3>
            <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Launched AI-powered email personalization features</li>
              <li style="margin-bottom: 8px;">Achieved 99.9% email delivery rate across all campaigns</li>
              <li style="margin-bottom: 8px;">Expanded integration support for 15+ CRM platforms</li>
            </ul>
          </div>
          
          <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin: 24px 0;">
            <h3 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Industry Insights</h3>
            <p style="color: #475569; margin: 0; font-size: 15px; line-height: 1.6;">Email marketing ROI increased by 42% in 2024, with personalized campaigns showing the highest engagement rates across all industries.</p>
          </div>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #bfdbfe;">
            <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Featured Content</h4>
            <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.5;">Read our latest case study: "How TechCorp Increased Email Engagement by 300% with NovaMail"</p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px;">
              Read Full Report
            </a>
          </div>
          
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 24px 0; font-weight: 400;">
            Thank you for being part of our community. We value your feedback and suggestions for improving our platform.
          </p>
          
          <p style="color: #1e293b; font-size: 15px; line-height: 1.6; margin: 32px 0 0 0; font-weight: 400;">
            Best regards,<br>
            <strong>The NovaMail Team</strong><br>
            <span style="color: #64748b; font-size: 14px;">Marketing Department</span>
          </p>
        </div>
      </div>
    `,
    features: ['Structured Layout', 'Corporate Colors', 'Professional Tone', 'Business Focus'],
    isPopular: false,
    isNew: true
  },
  {
    id: 'elegant-luxury',
    name: 'Elegant Luxury',
    category: 'Elegant',
    description: 'Sophisticated design with premium aesthetics and refined typography',
    subject: 'Exclusive Invitation: [Event Name] - A Night of Elegance',
    htmlContent: `
      <div style="font-family: 'Georgia', 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
        <div style="background: #1a1a1a; padding: 50px 40px; text-align: center; position: relative;">
          <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent);"></div>
          <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Exclusive Invitation</h1>
          <p style="color: #ffffff; margin: 20px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px;">A Night of Elegance & Sophistication</p>
        </div>
        
        <div style="padding: 50px 40px; background: #fafafa;">
          <p style="color: #2c2c2c; font-size: 16px; line-height: 1.8; margin-bottom: 30px; font-weight: 300;">
            Dear [Guest Name],
          </p>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.8; margin-bottom: 35px; font-weight: 300;">
            We are delighted to extend a personal invitation to you for an exclusive evening of elegance and sophistication. Join us for an unforgettable experience that celebrates the finest in [Industry/Theme].
          </p>
          
          <div style="background: #ffffff; padding: 30px; margin: 35px 0; border-left: 4px solid #d4af37; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 20px; font-weight: 400; letter-spacing: 0.5px;">Event Details</h3>
            <div style="color: #4a4a4a; font-size: 15px; line-height: 1.6;">
              <p style="margin: 0 0 8px 0;"><strong>Date:</strong> [Event Date]</p>
              <p style="margin: 0 0 8px 0;"><strong>Time:</strong> [Event Time]</p>
              <p style="margin: 0 0 8px 0;"><strong>Venue:</strong> [Venue Name]</p>
              <p style="margin: 0;"><strong>Dress Code:</strong> Black Tie Optional</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="#" style="display: inline-block; background: #1a1a1a; color: #d4af37; padding: 18px 40px; text-decoration: none; border: 2px solid #d4af37; font-weight: 300; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; transition: all 0.3s ease;">
              Accept Invitation
            </a>
          </div>
          
          <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 35px 0; font-weight: 300; text-align: center;">
            We look forward to welcoming you to this exclusive gathering.
          </p>
          
          <p style="color: #2c2c2c; font-size: 15px; line-height: 1.8; margin: 40px 0 0 0; font-weight: 300;">
            With warm regards,<br>
            <strong style="color: #1a1a1a;">The [Organization] Team</strong>
          </p>
        </div>
      </div>
    `,
    features: ['Premium Aesthetics', 'Elegant Typography', 'Luxury Branding', 'Sophisticated Layout'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'creative-vibrant',
    name: 'Creative Vibrant',
    category: 'Creative',
    description: 'Bold, colorful design perfect for creative industries and artistic brands',
    subject: '🎨 Creative Workshop: [Workshop Name] - Unleash Your Creativity',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
        <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.6;"></div>
          <h1 style="color: white; margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.5px; position: relative; z-index: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🎨 Creative Workshop</h1>
          <p style="color: white; margin: 12px 0 0 0; font-size: 16px; font-weight: 500; position: relative; z-index: 1; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">Unleash Your Creative Potential</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
            Hey [Creative Name]! 👋
          </p>
          
          <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
            Ready to dive into a world of creativity? We're excited to invite you to our exclusive <strong style="color: #ff6b6b;">[Workshop Name]</strong> - where imagination meets innovation!
          </p>
          
          <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #e2e8f0;">
            <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">✨ What You'll Learn:</h3>
            <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">🎯 Creative problem-solving techniques</li>
              <li style="margin-bottom: 8px;">🎨 Advanced design principles</li>
              <li style="margin-bottom: 8px;">💡 Innovation methodologies</li>
              <li style="margin-bottom: 8px;">🚀 Portfolio development strategies</li>
            </ul>
          </div>
          
          <div style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4); padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -20px; right: -20px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: -30px; left: -30px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600; position: relative; z-index: 1;">🎉 Special Offer</h3>
            <p style="color: white; margin: 0; font-size: 15px; position: relative; z-index: 1;">
              Early bird pricing: <strong>30% off</strong> for the first 20 participants!
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4); transition: all 0.3s ease;">
              Join the Workshop 🚀
            </a>
          </div>
          
          <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 25px 0; text-align: center;">
            Let's create something amazing together! 🎨✨
          </p>
          
          <p style="color: #2d3748; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
            Creative regards,<br>
            <strong style="color: #ff6b6b;">The Creative Team</strong><br>
            <span style="color: #4ecdc4;">[Organization Name]</span>
          </p>
        </div>
      </div>
    `,
    features: ['Bold Colors', 'Creative Layout', 'Vibrant Design', 'Artistic Elements'],
    isPopular: true,
    isNew: true
  },
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    category: 'Modern',
    description: 'Clean, tech-focused design with modern aesthetics and digital elements',
    subject: 'Tech Update: [Product Name] v2.0 - Now Live!',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.1) 50%, transparent 51%); background-size: 20px 20px;"></div>
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1;">Tech Update</h1>
          <p style="color: #94a3b8; margin: 12px 0 0 0; font-size: 16px; font-weight: 400; position: relative; z-index: 1;">Version 2.0 is Now Live</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
            Hello [Developer Name],
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
            We're excited to announce that <strong style="color: #3b82f6;">[Product Name] v2.0</strong> is now live! This major update brings powerful new features and significant performance improvements.
          </p>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🚀 New Features</h3>
            <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">⚡ 3x faster processing speed</li>
              <li style="margin-bottom: 8px;">🔧 Enhanced API endpoints</li>
              <li style="margin-bottom: 8px;">📊 Real-time analytics dashboard</li>
              <li style="margin-bottom: 8px;">🔒 Advanced security protocols</li>
            </ul>
          </div>
          
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0;">
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">📈 Performance Boost</h3>
            <p style="color: white; margin: 0; font-size: 15px;">
              Experience <strong>300% faster</strong> response times and improved reliability.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">
              Explore New Features
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">⚠️ Breaking Changes</h4>
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">Please review our migration guide for any breaking changes that may affect your implementation.</p>
          </div>
          
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 25px 0;">
            Thank you for being part of our developer community. We're committed to providing you with the best tools and experience.
          </p>
          
          <p style="color: #1e293b; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
            Best regards,<br>
            <strong>The Development Team</strong><br>
            <span style="color: #3b82f6;">[Company Name]</span>
          </p>
        </div>
      </div>
    `,
    features: ['Tech Aesthetics', 'Modern Layout', 'Performance Focus', 'Developer Friendly'],
    isPopular: false,
    isNew: true
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    category: 'Minimal',
    description: 'Clean, calming design perfect for health, wellness, and lifestyle brands',
    subject: 'Wellness Wednesday: [Topic] - Your Health Journey Starts Here',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 60%);"></div>
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.3px; position: relative; z-index: 1;">🌱 Wellness Wednesday</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 400; position: relative; z-index: 1;">Your Health Journey Starts Here</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 400;">
            Hi [Wellness Seeker],
          </p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
            This week, we're focusing on <strong style="color: #10b981;">[Wellness Topic]</strong> - a key component of your overall health and wellbeing journey.
          </p>
          
          <div style="background: #f0fdf4; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #bbf7d0;">
            <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">💚 This Week's Focus</h3>
            <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">🧘‍♀️ Mindful breathing exercises</li>
              <li style="margin-bottom: 8px;">🥗 Nutritious meal planning</li>
              <li style="margin-bottom: 8px;">🚶‍♀️ Daily movement goals</li>
              <li style="margin-bottom: 8px;">😴 Quality sleep strategies</li>
            </ul>
          </div>
          
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 25px; border-radius: 10px; text-align: center; margin: 25px 0;">
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">🌟 Wellness Tip</h3>
            <p style="color: white; margin: 0; font-size: 15px;">
              Start your day with 5 minutes of gratitude practice for a positive mindset.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">
              Start Your Journey 🌱
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">💡 Remember</h4>
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">Small, consistent steps lead to big changes. Be patient and kind to yourself on this journey.</p>
          </div>
          
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 25px 0; text-align: center;">
            Your wellness matters. Take care of yourself today. 💚
          </p>
          
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
            With care,<br>
            <strong style="color: #10b981;">The Wellness Team</strong><br>
            <span style="color: #059669;">[Organization Name]</span>
          </p>
        </div>
      </div>
    `,
    features: ['Calming Colors', 'Wellness Focus', 'Clean Design', 'Health Oriented'],
    isPopular: false,
    isNew: false
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    category: 'Sales',
    description: 'Bold, colorful design perfect for e-commerce and retail brands',
    subject: '🛍️ New Collection Alert - Limited Stock!',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.6;"></div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1;">🛍️ New Collection</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 400; position: relative; z-index: 1;">Limited Stock Alert!</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
            Hi Fashion Enthusiast,
          </p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
            Our hottest spring collection just dropped and we're seeing items fly off the shelves! Don't miss out on these exclusive pieces.
          </p>
          
          <div style="background: #fef3c7; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #fbbf24;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🔥 Limited Time Offers</h3>
            <ul style="color: #b45309; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">🚚 Free Shipping Over $75</li>
              <li style="margin-bottom: 8px;">⚡ Express Delivery Available</li>
              <li style="margin-bottom: 8px;">🎯 Exclusive Early Access</li>
              <li style="margin-bottom: 8px;">💎 VIP Member Discounts</li>
            </ul>
          </div>
          
          <div style="background: linear-gradient(135deg, #ec4899, #be185d); padding: 25px; border-radius: 10px; text-align: center; margin: 25px 0;">
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">⚡ Flash Sale</h3>
            <p style="color: white; margin: 0; font-size: 15px;">
              Up to <strong>50% off</strong> selected items - ends in 24 hours!
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);">
              Shop Now 🛒
            </a>
          </div>
          
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 25px 0; text-align: center;">
            Limited quantities available. Shop now before they're gone! ⏰
          </p>
          
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
            Happy Shopping,<br>
            <strong style="color: #ec4899;">The Fashion Team</strong><br>
            <span style="color: #be185d;">[Store Name]</span>
          </p>
        </div>
      </div>
    `,
    features: ['Bold Colors', 'E-commerce Focus', 'Sales Oriented', 'Urgency Driven'],
    isPopular: true,
    isNew: false
  }
]
