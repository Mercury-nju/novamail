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
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    category: 'Newsletter',
    description: 'Perfect for regular newsletters with clean sections and easy reading',
    subject: '📰 Weekly Newsletter - [Date]',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: #1e40af; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Weekly Newsletter</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Stay updated with our latest news</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Hi [Subscriber Name],
          </p>
          
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
            Welcome to this week's newsletter! Here's what's happening in our world.
          </p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">This Week's Highlights</h3>
            <ul style="color: #4b5563; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">New feature announcement</li>
              <li style="margin-bottom: 8px;">Industry insights and trends</li>
              <li style="margin-bottom: 8px;">Upcoming events and webinars</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px;">
              Read Full Article
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0;">
            Thank you for being part of our community!
          </p>
          
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 24px 0 0 0;">
            Best regards,<br>
            <strong>The Newsletter Team</strong>
          </p>
        </div>
      </div>
    `,
    features: ['Clean Sections', 'Easy Reading', 'Regular Updates', 'Community Focus'],
    isPopular: false,
    isNew: true
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'Product',
    description: 'Exciting product launch announcement with compelling visuals',
    subject: '🚀 Introducing [Product Name] - The Future is Here!',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); padding: 40px 30px; text-align: center;">
          <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 20px;">
            <span style="color: white; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🚀 New Launch</span>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Introducing [Product Name]</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 16px 0 0 0; font-size: 16px; font-weight: 400;">The Future is Here</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Hi [Customer Name],
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.7; margin-bottom: 32px;">
            We're thrilled to announce the launch of our most innovative product yet. This is a game-changer that will revolutionize how you work.
          </p>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #f59e0b;">
            <h3 style="color: #92400e; margin: 0 0 16px 0; font-size: 20px; font-weight: 700;">Why This Changes Everything:</h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #f59e0b; border-radius: 50%;"></div>
                <span style="color: #92400e; font-size: 15px; line-height: 1.5;">10x faster performance than competitors</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #f59e0b; border-radius: 50%;"></div>
                <span style="color: #92400e; font-size: 15px; line-height: 1.5;">Revolutionary AI-powered features</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #f59e0b; border-radius: 50%;"></div>
                <span style="color: #92400e; font-size: 15px; line-height: 1.5;">Seamless integration with your workflow</span>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);">
              Get Early Access
            </a>
            <p style="color: #6b7280; font-size: 12px; margin: 8px 0 0 0;">Limited time offer • 50% off for early adopters</p>
          </div>
          
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 32px 0 0 0;">
            Don't miss out on this opportunity to be among the first to experience the future.
          </p>
          
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 24px 0 0 0;">
            Excited to share this with you,<br>
            <strong>The Product Team</strong>
          </p>
        </div>
      </div>
    `,
    features: ['Exciting Design', 'Product Focus', 'Launch Announcement', 'Call to Action'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'welcome-series',
    name: 'Welcome Series',
    category: 'Onboarding',
    description: 'Perfect for welcoming new users with a friendly, informative approach',
    subject: 'Welcome to [Company Name] - Let\'s Get Started!',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: #059669; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Welcome to [Company Name]!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">We're excited to have you on board</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Hi [New User Name],
          </p>
          
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
            Welcome to our community! We're thrilled you've joined us and can't wait to help you get the most out of our platform.
          </p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #059669;">
            <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Your Next Steps:</h3>
            <ol style="color: #047857; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Complete your profile setup</li>
              <li style="margin-bottom: 8px;">Explore our features and tools</li>
              <li style="margin-bottom: 8px;">Connect with our community</li>
              <li style="margin-bottom: 8px;">Start your first project</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px;">
              Complete Setup
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 24px 0; border: 1px solid #f59e0b;">
            <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">💡 Pro Tip</h4>
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">Check out our getting started guide for tips and best practices!</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0;">
            If you have any questions, just reply to this email. We're here to help!
          </p>
          
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 24px 0 0 0;">
            Welcome aboard,<br>
            <strong>The [Company Name] Team</strong>
          </p>
        </div>
      </div>
    `,
    features: ['Friendly Tone', 'Step-by-Step Guide', 'Onboarding Focus', 'Helpful Tips'],
    isPopular: false,
    isNew: true
  },
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    category: 'Events',
    description: 'Elegant design for event invitations and announcements',
    subject: '🎉 You\'re Invited: [Event Name] - [Date]',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 30px; text-align: center;">
          <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 20px;">
            <span style="color: white; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🎉 You're Invited</span>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">[Event Name]</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 16px 0 0 0; font-size: 16px; font-weight: 400;">Join us for an unforgettable experience</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Dear [Guest Name],
          </p>
          
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin-bottom: 32px;">
            We're excited to invite you to our upcoming event. This will be an amazing opportunity to network, learn, and celebrate together.
          </p>
          
          <div style="background: #fef2f2; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #fecaca;">
            <h3 style="color: #dc2626; margin: 0 0 16px 0; font-size: 20px; font-weight: 700;">Event Details:</h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #dc2626; border-radius: 50%;"></div>
                <span style="color: #991b1b; font-size: 15px; line-height: 1.5;"><strong>Date:</strong> [Event Date]</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #dc2626; border-radius: 50%;"></div>
                <span style="color: #991b1b; font-size: 15px; line-height: 1.5;"><strong>Time:</strong> [Event Time]</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 6px; height: 6px; background: #dc2626; border-radius: 50%;"></div>
                <span style="color: #991b1b; font-size: 15px; line-height: 1.5;"><strong>Location:</strong> [Event Location]</span>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);">
              RSVP Now
            </a>
            <p style="color: #6b7280; font-size: 12px; margin: 8px 0 0 0;">Limited seats available • RSVP by [Deadline]</p>
          </div>
          
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 32px 0 0 0;">
            We can't wait to see you there!
          </p>
          
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 24px 0 0 0;">
            Best regards,<br>
            <strong>The Event Team</strong>
          </p>
        </div>
      </div>
    `,
    features: ['Elegant Design', 'Event Details', 'RSVP Function', 'Professional Tone'],
    isPopular: false,
    isNew: true
  }
]
