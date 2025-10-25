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
    description: 'Clean, professional design with subtle gradients and modern typography',
    subject: 'Introducing [Product Name] - The Future is Here',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Clean Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
          <div style="display: inline-block; background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 16px; margin-bottom: 16px;">
            <span style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Launch</span>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">Introducing NovaAI</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 400;">The Future of Email Marketing is Here</p>
        </div>
        
        <!-- Main Content Section -->
        <div style="padding: 40px 30px;">
          <!-- Personalized Greeting -->
          <div style="margin-bottom: 24px;">
            <p style="color: #1a202c; font-size: 16px; line-height: 1.5; margin-bottom: 8px; font-weight: 500;">
              Hi [Customer Name],
            </p>
            <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0;">
              We're excited to announce something that will transform your business.
            </p>
          </div>
          
          <!-- Main Message -->
          <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #e2e8f0; border-left: 4px solid #667eea;">
            <h3 style="color: #1a202c; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What makes NovaAI revolutionary:</h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
                <span style="color: #2d3748; font-size: 14px; line-height: 1.5;">AI-powered content generation that writes like a human</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
                <span style="color: #2d3748; font-size: 14px; line-height: 1.5;">Advanced personalization that increases engagement by 300%</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
                <span style="color: #2d3748; font-size: 14px; line-height: 1.5;">Smart analytics that predict customer behavior</span>
              </div>
            </div>
          </div>
          
          <!-- Special Offer Section -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <div style="display: inline-block; background: rgba(255,255,255,0.15); padding: 4px 8px; border-radius: 8px; margin-bottom: 12px;">
              <span style="color: white; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Limited Time</span>
            </div>
            <h3 style="color: white; margin: 0 0 12px 0; font-size: 20px; font-weight: 600;">Early Access Offer</h3>
            <p style="color: white; margin: 0 0 6px 0; font-size: 15px; font-weight: 500;">
              Join 10,000+ marketers already using NovaAI
            </p>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 13px;">
              Get <strong>50% off</strong> your first year • Expires in 48 hours
            </p>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
              Start Your Free Trial
            </a>
            <p style="color: #718096; font-size: 12px; margin: 8px 0 0 0;">No credit card required • 14-day free trial</p>
          </div>
          
          <!-- Social Proof -->
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #bae6fd; text-align: center;">
            <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Trusted by Industry Leaders</h4>
            <p style="color: #1e40af; margin: 0; font-size: 13px; line-height: 1.4;">
              Over 10,000 businesses trust NovaAI • Join Shopify, Stripe, and Notion
            </p>
          </div>
          
          <!-- Closing Message -->
          <div style="margin: 32px 0 0 0;">
            <p style="color: #4a5568; font-size: 15px; line-height: 1.5; margin: 0 0 20px 0;">
              Ready to revolutionize your email marketing? Let's get started together.
            </p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p style="color: #2d3748; font-size: 14px; line-height: 1.5; margin: 0;">
                Best regards,<br>
                <strong style="color: #1a202c;">The NovaAI Team</strong><br>
                <span style="color: #667eea; font-weight: 500;">NovaMail</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
    features: ['Clean Design', 'Subtle Gradients', 'Professional Layout', 'Clear CTA'],
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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 8px 25px rgba(0,0,0,0.1);">
        <!-- Tech Header with Digital Elements -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.1) 50%, transparent 51%); background-size: 20px 20px; animation: gridMove 20s linear infinite;"></div>
          <div style="position: absolute; top: 20px; left: 20px; width: 4px; height: 4px; background: #3b82f6; border-radius: 50%; animation: blink 2s infinite;"></div>
          <div style="position: absolute; top: 40px; right: 30px; width: 6px; height: 6px; background: #10b981; border-radius: 50%; animation: blink 2s infinite 0.5s;"></div>
          <div style="position: absolute; bottom: 30px; left: 50px; width: 3px; height: 3px; background: #f59e0b; border-radius: 50%; animation: blink 2s infinite 1s;"></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="display: inline-block; background: rgba(59, 130, 246, 0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.3);">
              <span style="color: #60a5fa; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">⚡ Tech Update</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 800; letter-spacing: -1px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Version 2.0</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 16px 0 0 0; font-size: 18px; font-weight: 400;">Next-Generation Technology is Here</p>
            <div style="margin-top: 24px;">
              <span style="display: inline-block; background: rgba(59, 130, 246, 0.25); padding: 6px 12px; border-radius: 12px; color: #60a5fa; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px);">🚀 Performance</span>
              <span style="display: inline-block; background: rgba(16, 185, 129, 0.25); padding: 6px 12px; border-radius: 12px; color: #34d399; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px); margin-left: 8px;">🔒 Secure</span>
            </div>
          </div>
        </div>
        
        <div style="padding: 50px 30px;">
          <!-- Personalized Tech Greeting -->
          <div style="margin-bottom: 32px;">
            <p style="color: #1e293b; font-size: 18px; line-height: 1.5; margin-bottom: 8px; font-weight: 600;">
              Hello [Developer Name],
            </p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0;">
              We're pushing the boundaries of what's possible. Here's what's new in v2.0.
            </p>
          </div>
          
          <!-- Tech Features Section -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 32px; border-radius: 16px; margin: 32px 0; border: 1px solid #cbd5e1; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 0 2px 2px 0;"></div>
            <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 700;">🚀 Revolutionary Features:</h3>
            <div style="display: grid; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%;"></div>
                <span style="color: #334155; font-size: 15px; line-height: 1.5;">3x faster processing with AI optimization</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%;"></div>
                <span style="color: #334155; font-size: 15px; line-height: 1.5;">Enhanced API with real-time streaming</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%;"></div>
                <span style="color: #334155; font-size: 15px; line-height: 1.5;">Advanced analytics with machine learning</span>
              </div>
            </div>
          </div>
          
          <!-- Performance Section -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 32px; border-radius: 16px; text-align: center; margin: 32px 0; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 3s ease-in-out infinite;"></div>
            <div style="position: relative; z-index: 2;">
              <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 12px; margin-bottom: 16px; backdrop-filter: blur(10px);">
                <span style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">📈 Performance</span>
              </div>
              <h3 style="color: white; margin: 0 0 16px 0; font-size: 22px; font-weight: 700;">300% Speed Boost</h3>
              <p style="color: white; margin: 0 0 8px 0; font-size: 16px; font-weight: 500;">
                Lightning-fast response times
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
                Zero downtime deployment • 99.9% uptime guarantee
              </p>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
              <span style="position: relative; z-index: 2;">Explore New Features 🚀</span>
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease;"></div>
            </a>
            <p style="color: #6b7280; font-size: 13px; margin: 12px 0 0 0;">Free migration tools • 24/7 support • Documentation</p>
          </div>
          
          <!-- Breaking Changes Alert -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #f59e0b; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">⚠️ Breaking Changes</h4>
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
              Review our migration guide for API changes. We've provided automated migration tools to simplify the process.
            </p>
          </div>
          
          <!-- Developer Community -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #86efac; text-align: center;">
            <h4 style="color: #166534; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">👨‍💻 Developer Community</h4>
            <p style="color: #15803d; margin: 0; font-size: 14px; line-height: 1.5;">
              Join 50,000+ developers • GitHub discussions • Stack Overflow support
            </p>
          </div>
          
          <!-- Closing Message -->
          <div style="margin: 40px 0 0 0;">
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for being part of our developer community. We're committed to providing cutting-edge tools.
            </p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
              <p style="color: #1e293b; font-size: 15px; line-height: 1.6; margin: 0;">
                Best regards,<br>
                <strong style="color: #1e293b;">The Development Team</strong><br>
                <span style="color: #3b82f6; font-weight: 600;">[Company Name]</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes gridMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(20px); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      </style>
    `,
    features: ['Tech Aesthetics', 'Digital Elements', 'Performance Focus', 'Developer Community'],
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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(16, 185, 129, 0.1);">
        <!-- Wellness Header with Nature Elements -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -20px; left: -20px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; animation: float 6s ease-in-out infinite;"></div>
          <div style="position: absolute; bottom: -30px; right: -30px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; animation: float 8s ease-in-out infinite reverse;"></div>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%); border-radius: 50%; animation: pulse 4s ease-in-out infinite;"></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 20px; backdrop-filter: blur(10px);">
              <span style="color: white; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🌱 Wellness Wednesday</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">Your Health Journey</h1>
            <p style="color: rgba(255,255,255,0.95); margin: 16px 0 0 0; font-size: 18px; font-weight: 400;">Nurturing Mind, Body & Soul</p>
            <div style="margin-top: 24px;">
              <span style="display: inline-block; background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; color: white; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px);">🧘‍♀️ Mindfulness</span>
              <span style="display: inline-block; background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; color: white; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px); margin-left: 8px;">🌿 Natural</span>
            </div>
          </div>
        </div>
        
        <div style="padding: 50px 30px;">
          <!-- Personalized Wellness Greeting -->
          <div style="margin-bottom: 32px;">
            <p style="color: #1f2937; font-size: 18px; line-height: 1.5; margin-bottom: 8px; font-weight: 500;">
              Hi [Wellness Seeker],
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
              Your wellness journey is unique, and we're here to support every step of the way.
            </p>
          </div>
          
          <!-- Wellness Focus Section -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 32px; border-radius: 16px; margin: 32px 0; border: 1px solid #bbf7d0; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 0 2px 2px 0;"></div>
            <h3 style="color: #166534; margin: 0 0 20px 0; font-size: 20px; font-weight: 700;">This Week's Wellness Focus:</h3>
            <div style="display: grid; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%;"></div>
                <span style="color: #15803d; font-size: 15px; line-height: 1.5;">Mindful breathing exercises for stress relief</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%;"></div>
                <span style="color: #15803d; font-size: 15px; line-height: 1.5;">Nutritious meal planning for energy</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%;"></div>
                <span style="color: #15803d; font-size: 15px; line-height: 1.5;">Gentle movement for body awareness</span>
              </div>
            </div>
          </div>
          
          <!-- Wellness Tip Section -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px; border-radius: 16px; text-align: center; margin: 32px 0; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 3s ease-in-out infinite;"></div>
            <div style="position: relative; z-index: 2;">
              <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 12px; margin-bottom: 16px; backdrop-filter: blur(10px);">
                <span style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🌟 Daily Tip</span>
              </div>
              <h3 style="color: white; margin: 0 0 16px 0; font-size: 22px; font-weight: 700;">Gratitude Practice</h3>
              <p style="color: white; margin: 0 0 8px 0; font-size: 16px; font-weight: 500;">
                Start your day with 5 minutes of gratitude
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
                Write down 3 things you're grateful for • Enhances positive mindset
              </p>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
              <span style="position: relative; z-index: 2;">Begin Your Journey 🌱</span>
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease;"></div>
            </a>
            <p style="color: #6b7280; font-size: 13px; margin: 12px 0 0 0;">Free wellness resources • Expert guidance • Community support</p>
          </div>
          
          <!-- Wellness Reminder -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #f59e0b; text-align: center;">
            <h4 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">💚 Wellness Reminder</h4>
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
              Small, consistent steps lead to lasting change. Be patient and kind to yourself on this journey.
            </p>
          </div>
          
          <!-- Social Proof -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #86efac; text-align: center;">
            <h4 style="color: #166534; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">🌿 Community Stories</h4>
            <p style="color: #15803d; margin: 0; font-size: 14px; line-height: 1.5;">
              "This program changed my life!" - Sarah M. • "I feel more balanced and energized!" - Mike T.
            </p>
          </div>
          
          <!-- Closing Message -->
          <div style="margin: 40px 0 0 0;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
              Your wellness matters. Take care of yourself today. 💚
            </p>
            
            <div style="border-top: 1px solid #d1fae5; padding-top: 24px;">
              <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 0;">
                With care and support,<br>
                <strong style="color: #1f2937;">The Wellness Team</strong><br>
                <span style="color: #10b981; font-weight: 600;">[Organization Name]</span>
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
    features: ['Wellness Focus', 'Calming Design', 'Health Guidance', 'Mindful Elements'],
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
        <!-- E-commerce Header with Product Showcase -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.8;"></div>
          <div style="position: relative; z-index: 2;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 20px; backdrop-filter: blur(10px);">
              <span style="color: white; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🛍️ New Arrival</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Spring Collection</h1>
            <p style="color: rgba(255,255,255,0.95); margin: 16px 0 0 0; font-size: 18px; font-weight: 500;">Limited Stock - Shop Before It's Gone!</p>
            <div style="margin-top: 24px;">
              <span style="display: inline-block; background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; color: white; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px);">🔥 Hot Items</span>
              <span style="display: inline-block; background: rgba(255,255,255,0.25); padding: 6px 12px; border-radius: 12px; color: white; font-size: 12px; font-weight: 500; backdrop-filter: blur(10px); margin-left: 8px;">⚡ Fast Shipping</span>
            </div>
          </div>
        </div>
        
        <div style="padding: 40px 30px;">
          <!-- Personalized Greeting -->
          <div style="margin-bottom: 32px;">
            <p style="color: #1f2937; font-size: 18px; line-height: 1.5; margin-bottom: 8px; font-weight: 600;">
              Hi [Customer Name],
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
              Your style journey just got an upgrade! We've curated the perfect pieces for you.
            </p>
          </div>
          
          <!-- Product Features -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 32px; border-radius: 16px; margin: 32px 0; border: 1px solid #f59e0b; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 0 2px 2px 0;"></div>
            <h3 style="color: #92400e; margin: 0 0 20px 0; font-size: 20px; font-weight: 700;">Why Our Customers Love This Collection:</h3>
            <div style="display: grid; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%;"></div>
                <span style="color: #92400e; font-size: 15px; line-height: 1.5;">Premium quality materials that last</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%;"></div>
                <span style="color: #92400e; font-size: 15px; line-height: 1.5;">Trendy designs that never go out of style</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%;"></div>
                <span style="color: #92400e; font-size: 15px; line-height: 1.5;">Perfect fit guarantee or free returns</span>
              </div>
            </div>
          </div>
          
          <!-- Special Offer Section -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 32px; border-radius: 16px; text-align: center; margin: 32px 0; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 3s ease-in-out infinite;"></div>
            <div style="position: relative; z-index: 2;">
              <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 12px; margin-bottom: 16px; backdrop-filter: blur(10px);">
                <span style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">⚡ Flash Sale</span>
              </div>
              <h3 style="color: white; margin: 0 0 16px 0; font-size: 22px; font-weight: 700;">Limited Time Offer</h3>
              <p style="color: white; margin: 0 0 8px 0; font-size: 16px; font-weight: 500;">
                Get <strong>30% off</strong> your entire order
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
                Plus free shipping on orders over $75 • Expires in 48 hours
              </p>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
              <span style="position: relative; z-index: 2;">Shop Now 🛒</span>
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease;"></div>
            </a>
            <p style="color: #6b7280; font-size: 13px; margin: 12px 0 0 0;">Free returns • 30-day guarantee • Secure checkout</p>
          </div>
          
          <!-- Social Proof -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #86efac; text-align: center;">
            <h4 style="color: #166534; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">⭐ Customer Reviews</h4>
            <p style="color: #15803d; margin: 0; font-size: 14px; line-height: 1.5;">
              "Absolutely love the quality and fit!" - Sarah M. • "Fast shipping and great customer service!" - Mike T.
            </p>
          </div>
          
          <!-- Closing Message -->
          <div style="margin: 40px 0 0 0;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Don't wait - these styles are selling fast! Secure your favorites before they're gone.
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
              <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 0;">
                Happy Shopping,<br>
                <strong style="color: #1f2937;">The [Store Name] Team</strong><br>
                <span style="color: #f59e0b; font-weight: 600;">Your Style Destination</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      </style>
    `,
    features: ['E-commerce Focus', 'Product Showcase', 'Sales Psychology', 'Customer Trust'],
    isPopular: true,
    isNew: false
  }
]
