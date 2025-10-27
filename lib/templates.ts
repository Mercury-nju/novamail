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

// 30+ 高质量邮件模板，分类明确
export const professionalTemplates: ProfessionalTemplate[] = [
  // ========== BUSINESS (3 templates) ==========
  {
    id: 'professional-update',
    name: 'Professional Update',
    category: 'Business',
    description: 'Corporate communication with structured layout',
    subject: 'Important Update from [Company Name]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Professional Update</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f5f7fa"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px 30px;text-align:center;border-bottom:2px solid #2563eb"><h1 style="color:#1f2937;margin:0;font-size:28px">Important Update</h1><p style="color:#6b7280;margin:10px 0 0;font-size:14px">[Company Name] - [Date]</p></td></tr><tr><td style="padding:40px 30px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:20px">Dear [Name],</h2><p style="color:#4b5563;margin:0 0 20px;font-size:15px;line-height:1.6">We are writing to inform you of an important update.</p><div style="background:#f3f4f6;padding:20px;border-left:4px solid #2563eb;margin:20px 0"><p style="margin:0;color:#1f2937;font-size:15px"><strong>Key Points:</strong></p><ul style="margin:10px 0 0 20px;color:#4b5563"><li>Important point one</li><li>Important point two</li></ul></div><p style="color:#4b5563;margin:20px 0 0;font-size:15px">If you have questions, contact us.</p></td></tr><tr><td style="padding:20px 30px;background:#f9fafb;text-align:center"><p style="margin:0;color:#6b7280;font-size:12px">© 2024 [Company Name]</p></td></tr></table></body></html>`,
    features: ['Professional', 'Structured', 'Clear Layout'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'business-report',
    name: 'Business Report',
    category: 'Business',
    description: 'Data-driven report with visual metrics',
    subject: 'Monthly Business Report - [Month]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Business Report</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f1f5f9"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff"><tr><td style="padding:50px 40px;background:linear-gradient(135deg,#1e40af,#3b82f6);text-align:center"><h1 style="color:#fff;margin:0;font-size:32px">Monthly Report</h1><p style="color:#e0e7ff;margin:15px 0 0">Financial Overview</p></td></tr><tr><td style="padding:40px"><table width="100%" style="margin-bottom:30px"><tr><td width="50%" style="padding:20px;background:#f0f9ff;text-align:center"><div style="font-size:32px;font-weight:bold;color:#0284c7;margin-bottom:5px">$125K</div><div style="font-size:12px;color:#64748b">Revenue</div></td><td width="50%" style="padding:20px;background:#f0fdf4;text-align:center"><div style="font-size:32px;font-weight:bold;color:#16a34a">12.5%</div><div style="font-size:12px;color:#64748b">Growth</div></td></tr></table><h3 style="color:#1f2937;margin:0 0 20px">Highlights</h3><ul style="margin:0;color:#4b5563"><li>Record revenue</li><li>Market expansion</li></ul></td></tr></table></body></html>`,
    features: ['Metrics', 'Visual Data', 'Professional'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'corporate-announcement',
    name: 'Corporate Announcement',
    category: 'Business',
    description: 'Formal company announcement with branding',
    subject: 'Announcement: [Title]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Announcement</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border:1px solid #e5e5e5"><tr><td style="padding:30px;background:#1f2937;text-align:center"><h1 style="color:#fff;margin:0">COMPANY ANNOUNCEMENT</h1></td></tr><tr><td style="padding:40px 30px"><h2 style="color:#1f2937;margin:0 0 20px">Important Notice</h2><p style="color:#4b5563;margin:0 0 20px;line-height:1.6">We are pleased to announce [announcement details].</p><p style="color:#4b5563;margin:0">For more information, please visit our website.</p></td></tr></table></body></html>`,
    features: ['Formal', 'Branded', 'Professional'],
    isPopular: false,
    isNew: false
  },

  // ========== E-COMMERCE (4 templates) ==========
  {
    id: 'flash-sale',
    name: 'Flash Sale',
    category: 'E-commerce',
    description: 'Urgent sale with countdown timer',
    subject: '⚡ Flash Sale: 50% OFF - 24 Hours Only!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Flash Sale</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#0f172a"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:30px;background:#facc15;text-align:center"><div style="font-size:48px;color:#1e293b;font-weight:bold;margin-bottom:10px">⚡</div><h1 style="color:#1e293b;margin:0;font-size:32px">FLASH SALE</h1><p style="color:#1e293b;margin:10px 0 0;font-size:18px">50% OFF EVERYTHING</p><div style="background:#1e293b;color:#facc15;padding:15px 30px;border-radius:8px;display:inline-block;margin-top:15px;font-size:24px">⏰ ENDS IN 24H</div></td></tr><tr><td style="padding:40px;text-align:center"><div style="background:#f8fafc;padding:30px;border-radius:8px;margin-bottom:30px"><div style="font-size:32px;margin-bottom:10px">🛍️</div><div style="font-size:24px;color:#dc2626;font-weight:bold">$49.99</div><div style="text-decoration:line-through;color:#9ca3af">$99.99</div></div><a href="#" style="background:#dc2626;color:#fff;text-decoration:none;padding:20px 50px;border-radius:8px;font-weight:bold;font-size:18px;display:inline-block">Shop Now</a></td></tr></table></body></html>`,
    features: ['Urgency', 'Countdown', 'Clear CTA'],
    isPopular: true,
    isNew: true
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    category: 'E-commerce',
    description: 'Order receipt with tracking info',
    subject: 'Order Confirmed: #12345',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Order Confirmation</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f9fafb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px;background:#10b981;text-align:center"><div style="font-size:64px;margin-bottom:15px">✓</div><h1 style="color:#fff;margin:0;font-size:28px">Order Confirmed!</h1><p style="color:#d1fae5;margin:10px 0 0">Your order is being processed</p></td></tr><tr><td style="padding:40px"><h2 style="color:#1f2937;margin:0 0 20px">Order Details</h2><div style="background:#f9fafb;padding:20px;border-radius:8px"><table width="100%"><tr><td style="color:#6b7280;padding:8px 0">Order Number:</td><td style="text-align:right;font-weight:bold">#12345</td></tr><tr><td style="color:#6b7280;padding:8px 0">Total:</td><td style="text-align:right;font-weight:bold">$89.99</td></tr></table></div></td></tr></table></body></html>`,
    features: ['Confirmation', 'Details', 'Tracking'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'abandoned-cart',
    name: 'Abandoned Cart',
    category: 'E-commerce',
    description: 'Recovery email for abandoned shopping carts',
    subject: 'Your cart is waiting - Complete your purchase!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Abandoned Cart</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f3f4f6"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0 0 10px;font-size:24px">You left items in your cart</h1><p style="color:#6b7280;margin:0 0 30px">Complete your purchase and get free shipping!</p><div style="border:2px dashed #d1d5db;padding:20px;border-radius:8px;margin-bottom:30px"><p style="margin:0 0 15px;font-weight:600">Items in your cart:</p><ul style="margin:0;color:#4b5563"><li>Product Name - $39.99</li></ul></div><a href="#" style="background:#1f2937;color:#fff;text-decoration:none;padding:15px 40px;border-radius:8px;font-weight:bold;display:inline-block">Continue Shopping</a></td></tr></table></body></html>`,
    features: ['Recovery', 'Reminder', 'Incentive'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    category: 'E-commerce',
    description: 'Featured products with images',
    subject: 'Discover Our New Collection',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Product Showcase</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f3f4f6"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff"><tr><td style="padding:0"><div style="background:#fef3c7;padding:40px;text-align:center"><div style="width:150px;height:150px;background:#fbbf24;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:60px">📦</div><h1 style="color:#78350f;margin:0 0 10px;font-size:28px">NEW COLLECTION</h1><p style="color:#92400e;margin:0">Premium Quality</p></div></td></tr><tr><td style="padding:40px"><h2 style="color:#1f2937;margin:0 0 20px">Why Choose Us?</h2><table width="100%"><tr><td style="padding:15px 0"><div style="font-size:32px;margin-bottom:10px">⚡</div><h3 style="margin:0 0 5px">Fast Delivery</h3></td><td style="padding:15px 0"><div style="font-size:32px;margin-bottom:10px">🔒</div><h3 style="margin:0 0 5px">Secure Payment</h3></td></tr></table><div style="text-align:center;margin-top:30px"><a href="#" style="background:#1f2937;color:#fff;text-decoration:none;padding:18px 40px;border-radius:8px;font-weight:bold;display:inline-block">Shop Now</a></div></td></tr></table></body></html>`,
    features: ['Visual', 'Benefits', 'Engaging'],
    isPopular: false,
    isNew: true
  },

  // ========== NEWSLETTER (3 templates) ==========
  {
    id: 'weekly-newsletter',
    name: 'Weekly Newsletter',
    category: 'Newsletter',
    description: 'Weekly digest with multiple sections',
    subject: '📰 Weekly Newsletter - [Date]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Newsletter</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f9fafb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border:1px solid #e5e7eb"><tr><td style="padding:40px 30px;text-align:center;background:#1f2937"><h1 style="color:#fff;margin:0;font-size:28px">Weekly Newsletter</h1><p style="color:#9ca3af;margin:10px 0 0">Stay informed with our latest updates</p></td></tr><tr><td style="padding:40px 30px"><h2 style="color:#1f2937;margin:0 0 15px;font-size:20px;border-bottom:2px solid #e5e7eb;padding-bottom:10px">Top Stories</h2><div style="margin-bottom:25px"><h3 style="color:#1f2937;margin:0 0 5px;font-size:16px">Story Title</h3><p style="color:#6b7280;margin:0;font-size:14px;line-height:1.5">Story summary and preview text goes here...</p></div><div style="background:#f9fafb;padding:20px;border-radius:8px;margin-top:30px"><h3 style="margin:0 0 10px;color:#1f2937">Quick Links</h3><ul style="margin:0;padding-left:20px;color:#6b7280"><li>Link 1</li><li>Link 2</li><li>Link 3</li></ul></div></td></tr></table></body></html>`,
    features: ['Multi-Section', 'Links', 'Organized'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'bi-weekly-digest',
    name: 'Bi-Weekly Digest',
    category: 'Newsletter',
    description: 'Fortnightly news roundup',
    subject: 'Your Bi-Weekly Digest',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Digest</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f1f5f9"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:30px;background:linear-gradient(135deg,#667eea,#764ba2);text-align:center"><h1 style="color:#fff;margin:0">Bi-Weekly Digest</h1><p style="color:#e0e7ff;margin:5px 0 0">All the news worth sharing</p></td></tr><tr><td style="padding:40px"><div style="margin-bottom:30px"><h2 style="color:#1f2937;margin:0 0 10px;font-size:18px">📊 Latest Numbers</h2><p style="color:#6b7280;margin:0;font-size:14px;line-height:1.6">Key metrics and statistics from the past two weeks...</p></div><div style="margin-bottom:30px"><h2 style="color:#1f2937;margin:0 0 10px;font-size:18px">🎯 What's Trending</h2><p style="color:#6b7280;margin:0;font-size:14px;line-height:1.6">Popular topics and discussions...</p></div></td></tr></table></body></html>`,
    features: ['Sections', 'Gradient Header', 'Engaging'],
    isPopular: false,
    isNew: false
  },
  {
    id: 'monthly-roundup',
    name: 'Monthly Roundup',
    category: 'Newsletter',
    description: 'Monthly highlights and summary',
    subject: 'Monthly Roundup - [Month]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Monthly Roundup</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto"><tr><td style="padding:50px 30px;text-align:center"><h1 style="color:#1f2937;margin:0;font-size:32px;font-weight:300">Monthly</h1><h1 style="color:#3b82f6;margin:0;font-size:32px;font-weight:700">ROUNDUP</h1><p style="color:#6b7280;margin:20px 0 0;font-size:14px">[Month] Highlights</p></td></tr><tr><td style="padding:40px 30px"><div style="border-left:4px solid #3b82f6;padding-left:20px;margin-bottom:25px"><h2 style="color:#1f2937;margin:0 0 10px">Achievements</h2><p style="color:#6b7280;margin:0;line-height:1.6">This month's major wins and milestones...</p></div><div style="border-left:4px solid #10b981;padding-left:20px;margin-bottom:25px"><h2 style="color:#1f2937;margin:0 0 10px">Highlights</h2><p style="color:#6b7280;margin:0;line-height:1.6">Notable events and updates...</p></div></td></tr></table></body></html>`,
    features: ['Timeline', 'Accent Colors', 'Clean Design'],
    isPopular: true,
    isNew: true
  },

  // ========== PRODUCT LAUNCH (3 templates) ==========
  {
    id: 'launch-announcement',
    name: 'Launch Announcement',
    category: 'Product Launch',
    description: 'Product launch with excitement',
    subject: '🚀 Introducing [Product Name]!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Launch</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#0f172a"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:60px 40px;text-align:center"><div style="font-size:80px;margin-bottom:20px">🚀</div><h1 style="color:#fff;margin:0;font-size:36px;font-weight:800">WE'RE LAUNCHING!</h1><p style="color:#c7d2fe;margin:15px 0 0">The future is here</p></div></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:26px">Say Hello to [Product Name]</h2><p style="color:#4b5563;margin:0 0 25px;line-height:1.8;font-size:15px">After months of development, we're thrilled to introduce our revolutionary new product that will change everything.</p><div style="background:#f9fafb;padding:25px;border-radius:10px;margin-bottom:30px"><h3 style="margin:0 0 15px;color:#1f2937">Key Features</h3><ul style="margin:0;padding-left:20px;color:#4b5563"><li>Feature one with benefits</li><li>Feature two that saves time</li><li>Feature three that's revolutionary</li></ul></div><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:20px 50px;border-radius:10px;font-weight:bold;font-size:18px;display:inline-block">Get Early Access</a></td></tr></table></body></html>`,
    features: ['Exciting', 'Feature List', 'Strong CTA'],
    isPopular: true,
    isNew: true
  },
  {
    id: 'pre-launch-teaser',
    name: 'Pre-Launch Teaser',
    category: 'Product Launch',
    description: 'Build anticipation before launch',
    subject: 'Something Big is Coming...',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Teaser</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#000"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#1a1a1a"><tr><td style="padding:60px 40px;text-align:center"><div style="border:3px solid #fff;border-radius:50%;width:150px;height:150px;margin:0 auto 30px;display:flex;align-items:center;justify-content:center"><div style="font-size:60px">🔮</div></div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:300;letter-spacing:2px">SOMETHING BIG</h1><h1 style="color:#fff;margin:10px 0 0;font-size:32px;font-weight:300;letter-spacing:2px">IS COMING</h1><p style="color:#a3a3a3;margin:30px 0 0;font-size:14px;letter-spacing:1px">Launching Soon</p></td></tr><tr><td style="padding:40px;text-align:center"><div style="border-top:1px solid #404040;padding-top:30px;width:200px;margin:0 auto;color:#808080;font-size:12px">Stay tuned for the reveal</div></td></tr></table></body></html>`,
    features: ['Minimal', 'Mysterious', 'Anticipation'],
    isPopular: false,
    isNew: false
  },
  {
    id: 'feature-highlight',
    name: 'Feature Highlight',
    category: 'Product Launch',
    description: 'Deep dive into product features',
    subject: 'Discover What Makes [Product] Special',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Features</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fafafa"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff"><tr><td style="padding:50px 40px;background:#1f2937;text-align:center"><h1 style="color:#fff;margin:0;font-size:28px">Product Features</h1></td></tr><tr><td style="padding:50px 40px"><table width="100%"><tr><td style="padding:20px 0;border-bottom:1px solid #e5e7eb"><div style="font-size:36px;margin-bottom:10px">⚡</div><h3 style="margin:0 0 5px;color:#1f2937">Lightning Fast</h3><p style="margin:0;color:#6b7280;line-height:1.6">10x faster than traditional solutions</p></td></tr><tr><td style="padding:20px 0;border-bottom:1px solid #e5e7eb"><div style="font-size:36px;margin-bottom:10px">🔒</div><h3 style="margin:0 0 5px;color:#1f2937">Ultra Secure</h3><p style="margin:0;color:#6b7280;line-height:1.6">Bank-level encryption and security</p></td></tr><tr><td style="padding:20px 0"><div style="font-size:36px;margin-bottom:10px">✨</div><h3 style="margin:0 0 5px;color:#1f2937">Beautiful Design</h3><p style="margin:0;color:#6b7280;line-height:1.6">Award-winning user interface</p></td></tr></table></td></tr></table></body></html>`,
    features: ['Feature Focus', 'Icons', 'Clear Benefits'],
    isPopular: true,
    isNew: false
  },

  // ========== ONBOARDING (3 templates) ==========
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    category: 'Onboarding',
    description: 'Welcome new users warmly',
    subject: 'Welcome to [Company Name]! 🎉',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Welcome</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden"><tr><td style="padding:60px 40px;text-align:center;background:linear-gradient(135deg,#10b981,#059669)"><div style="font-size:80px;margin-bottom:20px">🎉</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:700">Welcome!</h1><p style="color:#d1fae5;margin:15px 0 0;font-size:18px">We're excited to have you</p></td></tr><tr><td style="padding:50px 40px"><p style="color:#4b5563;margin:0 0 25px;font-size:16px;line-height:1.7">Hi [Name],</p><p style="color:#4b5563;margin:0 0 25px;font-size:16px;line-height:1.7">Thank you for joining! We're thrilled to have you as part of our community.</p><div style="background:#ecfdf5;border-left:4px solid #10b981;padding:20px;border-radius:8px;margin:30px 0"><h3 style="margin:0 0 15px;color:#1f2937">Get Started</h3><ul style="margin:0;padding-left:20px;color:#4b5563"><li>Complete your profile</li><li>Explore features</li><li>Join our community</li></ul></div><a href="#" style="background:#10b981;color:#fff;text-decoration:none;padding:18px 40px;border-radius:8px;font-weight:bold;font-size:16px;display:inline-block;margin-top:20px">Get Started</a></td></tr></table></body></html>`,
    features: ['Friendly', 'Action Items', 'Guide'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'get-started',
    name: 'Get Started Guide',
    category: 'Onboarding',
    description: 'Step-by-step getting started guide',
    subject: 'Let's Get You Started!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Get Started</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto"><tr><td style="padding:50px 40px;background:#1f2937;text-align:center"><h1 style="color:#fff;margin:0;font-size:28px">Ready to Get Started?</h1><p style="color:#9ca3af;margin:10px 0 0">Follow these simple steps</p></td></tr><tr><td style="padding:50px 40px"><div style="margin-bottom:35px"><div style="display:inline-block;background:#3b82f6;color:#fff;padding:12px 20px;border-radius:50%;font-weight:bold;margin-right:15px">1</div><div style="display:inline-block;vertical-align:middle;width:75%"><h3 style="margin:0 0 5px;color:#1f2937">Sign Up</h3><p style="margin:0;color:#6b7280;font-size:14px">Create your account in seconds</p></div></div><div style="margin-bottom:35px"><div style="display:inline-block;background:#10b981;color:#fff;padding:12px 20px;border-radius:50%;font-weight:bold;margin-right:15px">2</div><div style="display:inline-block;vertical-align:middle;width:75%"><h3 style="margin:0 0 5px;color:#1f2937">Explore</h3><p style="margin:0;color:#6b7280;font-size:14px">Discover all available features</p></div></div><div><div style="display:inline-block;background:#f59e0b;color:#fff;padding:12px 20px;border-radius:50%;font-weight:bold;margin-right:15px">3</div><div style="display:inline-block;vertical-align:middle;width:75%"><h3 style="margin:0 0 5px;color:#1f2937">Success</h3><p style="margin:0;color:#6b7280;font-size:14px">You're all set to go!</p></div></div></td></tr></table></body></html>`,
    features: ['Steps', 'Visual Guide', 'Clear Instructions'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'account-setup',
    name: 'Account Setup',
    category: 'Onboarding',
    description: 'Help users complete their profile',
    subject: 'Complete Your Profile',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Setup</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f9fafb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px;text-align:center"><div style="background:#fef3c7;border-radius:50%;width:100px;height:100px;margin:0 auto 25px;display:flex;align-items:center;justify-content:center"><div style="font-size:50px">👋</div></div><h1 style="color:#1f2937;margin:0 0 15px;font-size:26px">Almost There!</h1><p style="color:#6b7280;margin:0 0 30px">Complete your profile to unlock all features</p></div></td></tr><tr><td style="padding:0 40px 40px"><div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:20px;margin-bottom:20px"><p style="margin:0 0 10px;color:#991b1b;font-weight:600">Incomplete Profile</p><p style="margin:0;color:#dc2626;font-size:14px">Complete these steps to get started</p></div><ul style="margin:0;padding-left:20px;color:#4b5563"><li>Upload a profile photo</li><li>Add your bio</li><li>Connect social accounts</li></ul><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:15px 40px;border-radius:8px;font-weight:bold;display:inline-block;margin-top:25px">Complete Now</a></td></tr></table></body></html>`,
    features: ['Reminder', 'Progress', 'Helpful'],
    isPopular: false,
    isNew: true
  },

  // ========== EVENTS (3 templates) ==========
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    category: 'Events',
    description: 'Invite to events with RSVP',
    subject: 'You're Invited: [Event Name]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Event Invitation</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef3c7"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1)"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);padding:60px 40px;text-align:center"><h1 style="color:#1f2937;margin:0;font-size:36px;font-weight:800">YOU'RE INVITED!</h1><p style="color:#78350f;margin:15px 0 0;font-size:20px;font-weight:600">[Event Name]</p></div></td></tr><tr><td style="padding:50px 40px"><table width="100%" style="margin-bottom:30px"><tr><td style="padding:15px 0"><span style="color:#1f2937;font-weight:600">📅 Date:</span> <span style="color:#6b7280">March 20, 2024</span></td></tr><tr><td style="padding:15px 0"><span style="color:#1f2937;font-weight:600">⏰ Time:</span> <span style="color:#6b7280">7:00 PM</span></td></tr><tr><td style="padding:15px 0"><span style="color:#1f2937;font-weight:600">📍 Location:</span> <span style="color:#6b7280">123 Main St</span></td></tr></table><p style="color:#4b5563;margin:0 0 30px;line-height:1.7">Join us for an amazing event filled with networking, insights, and fun!</p><a href="#" style="background:#f59e0b;color:#fff;text-decoration:none;padding:20px 50px;border-radius:10px;font-weight:bold;font-size:18px;display:inline-block">RSVP Now</a></td></tr></table></body></html>`,
    features: ['Inviting', 'Details', 'RSVP'],
    isPopular: true,
    isNew: true
  },
  {
    id: 'webinar-invitation',
    name: 'Webinar Invitation',
    category: 'Events',
    description: 'Invite to online webinars',
    subject: 'Join Our Webinar: [Topic]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Webinar</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#e0f2fe"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px"><tr><td style="padding:50px 40px;background:#0ea5e9;text-align:center"><div style="font-size:64px;margin-bottom:20px">🎓</div><h1 style="color:#fff;margin:0;font-size:28px">Free Webinar</h1><p style="color:#bae6fd;margin:10px 0 0">Learn from industry experts</p></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 20px">Topic: [Webinar Title]</h2><p style="color:#6b7280;margin:0 0 25px;line-height:1.7">Join us for an exclusive webinar where you'll learn [key topics].</p><div style="background:#f0f9ff;padding:25px;border-radius:8px;margin-bottom:25px"><h3 style="margin:0 0 15px;color:#1f2937">📅 When</h3><p style="margin:0 0 10px;color:#4b5563">Wednesday, March 15, 2024</p><p style="margin:0;color:#4b5563">2:00 PM - 3:30 PM EST</p></div><a href="#" style="background:#0ea5e9;color:#fff;text-decoration:none;padding:18px 40px;border-radius:8px;font-weight:bold;display:inline-block">Register Free</a></td></tr></table></body></html>`,
    features: ['Educational', 'Clear Schedule', 'Registration'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'event-reminder',
    name: 'Event Reminder',
    category: 'Events',
    description: 'Remind about upcoming events',
    subject: 'Reminder: [Event] Starts Tomorrow!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reminder</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef3c7"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;border:3px solid #fbbf24"><tr><td style="padding:50px 40px;text-align:center"><div style="font-size:72px;margin-bottom:20px">⏰</div><h1 style="color:#1f2937;margin:0;font-size:32px;font-weight:800">Don't Miss Out!</h1><p style="color:#78350f;margin:15px 0 0;font-size:18px;font-weight:600">[Event Name] starts tomorrow</p></td></tr><tr><td style="padding:40px"><p style="color:#4b5563;margin:0 0 20px;line-height:1.7">This is your friendly reminder that you registered for [Event Name].</p><div style="background:#fffbeb;border:2px solid #fbbf24;padding:20px;border-radius:8px;margin-bottom:25px"><p style="margin:0;color:#78350f;font-weight:600">Event Details:</p><p style="margin:10px 0 0;color:#92400e">March 15, 2024 at 7:00 PM</p></div><a href="#" style="background:#fbbf24;color:#1f2937;text-decoration:none;padding:18px 40px;border-radius:8px;font-weight:bold;display:inline-block">View Details</a></td></tr></table></body></html>`,
    features: ['Urgent', 'Clear Time', 'Details'],
    isPopular: false,
    isNew: false
  },

  // ========== TRANSACTIONAL (3 templates) ==========
  {
    id: 'password-reset',
    name: 'Password Reset',
    category: 'Transactional',
    description: 'Password reset request email',
    subject: 'Reset Your Password',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Password Reset</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f9fafb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px;margin:0 auto;background:#fff;border-radius:10px"><tr><td style="padding:40px 35px;background:#3b82f6;text-align:center"><h1 style="color:#fff;margin:0;font-size:24px">Security Alert</h1></td></tr><tr><td style="padding:50px 35px"><h2 style="color:#1f2937;margin:0 0 20px">Password Reset Request</h2><p style="color:#6b7280;margin:0 0 25px;line-height:1.7">We received a request to reset your password. Click the button below to create a new password.</p><div style="text-align:center;margin:35px 0"><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:16px 50px;border-radius:8px;font-weight:bold;font-size:15px;display:inline-block">Reset Password</a></div><p style="color:#9ca3af;margin:30px 0 0;font-size:12px;line-height:1.6">If you didn't request this, you can safely ignore this email. The link will expire in 1 hour.</p></td></tr></table></body></html>`,
    features: ['Secure', 'Clear Action', 'Timeout Info'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'email-verification',
    name: 'Email Verification',
    category: 'Transactional',
    description: 'Verify email address',
    subject: 'Please Verify Your Email',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Verify Email</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#ecfdf5"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px;margin:0 auto;background:#fff;border-radius:12px"><tr><td style="padding:50px 40px;text-align:center"><div style="background:#10b981;border-radius:50%;width:80px;height:80px;margin:0 auto 25px;display:flex;align-items:center;justify-content:center"><span style="font-size:48px">✓</span></div><h1 style="color:#1f2937;margin:0;font-size:26px">Verify Your Email</h1><p style="color:#6b7280;margin:15px 0 0">Almost done! Just one more step.</p></td></tr><tr><td style="padding:0 40px 50px"><p style="color:#4b5563;margin:0 0 25px;line-height:1.7">Hi there! Click the button below to verify your email address and complete your registration.</p><div style="text-align:center"><a href="#" style="background:#10b981;color:#fff;text-decoration:none;padding:18px 50px;border-radius:8px;font-weight:bold;font-size:16px;display:inline-block">Verify Email</a></div></td></tr></table></body></html>`,
    features: ['Simple', 'Clear CTA', 'Friendly'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'invoice-receipt',
    name: 'Invoice Receipt',
    category: 'Transactional',
    description: 'Payment receipt with details',
    subject: 'Payment Received - Receipt #12345',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Receipt</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#f9fafb"><tr><td style="padding:40px 35px;background:#1f2937"><h1 style="color:#fff;margin:0;font-size:24px">Payment Receipt</h1></td></tr><tr><td style="padding:50px 35px;background:#fff"><p style="color:#4b5563;margin:0 0 10px">Thank you for your payment!</p><div style="background:#f9fafb;padding:25px;border-radius:8px;margin:25px 0"><table width="100%"><tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb"><span style="color:#6b7280">Receipt #:</span><span style="float:right;color:#1f2937;font-weight:600">12345</span></td></tr><tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb"><span style="color:#6b7280">Date:</span><span style="float:right;color:#1f2937">March 15, 2024</span></td></tr><tr><td style="padding:10px 0"><span style="color:#6b7280">Amount Paid:</span><span style="float:right;color:#16a34a;font-weight:bold;font-size:18px">$99.99</span></td></tr></table></div></td></tr></table></body></html>`,
    features: ['Detailed', 'Professional', 'Clear Info'],
    isPopular: true,
    isNew: false
  },

  // ========== MARKETING (3 templates) ==========
  {
    id: 'summer-promotion',
    name: 'Summer Promotion',
    category: 'Marketing',
    description: 'Seasonal marketing campaign',
    subject: 'Summer Sale - Up to 70% Off!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Summer Sale</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef3c7"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:60px 40px;text-align:center;background:linear-gradient(135deg,#fbbf24,#f59e0b)"><div style="font-size:64px;margin-bottom:20px">☀️</div><h1 style="color:#1f2937;margin:0;font-size:38px;font-weight:900">SUMMER SALE</h1><p style="color:#78350f;margin:15px 0 0;font-size:24px;font-weight:700">Up to 70% OFF</p><div style="background:#1f2937;color:#fbbf24;padding:12px 30px;border-radius:8px;display:inline-block;margin-top:20px;font-size:20px;font-weight:bold">HOT DEALS!</div></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:24px">Sizzling Summer Deals</h2><p style="color:#6b7280;margin:0 0 30px;line-height:1.7">Beat the heat with our hottest deals! From summer essentials to cool gadgets, we've got everything you need.</p><div style="background:#fffbeb;padding:25px;border-radius:10px;margin-bottom:30px"><p style="margin:0;color:#78350f;font-weight:600;font-size:18px">🔥 Don't miss out - Sale ends soon!</p></div><a href="#" style="background:#f59e0b;color:#fff;text-decoration:none;padding:20px 50px;border-radius:10px;font-weight:bold;font-size:18px;display:inline-block">Shop Now →</a></td></tr></table></body></html>`,
    features: ['Seasonal', 'Bold Design', 'Urgency'],
    isPopular: true,
    isNew: true
  },
  {
    id: 'referral-program',
    name: 'Referral Program',
    category: 'Marketing',
    description: 'Invite friends and earn rewards',
    subject: 'Refer Friends & Get $50!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Referral</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px"><tr><td style="padding:50px 40px;text-align:center;background:#10b981"><div style="font-size:64px;margin-bottom:20px">🎁</div><h1 style="color:#fff;margin:0;font-size:32px">Earn $50</h1><p style="color:#d1fae5;margin:10px 0 0">Refer your friends today</p></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 15px">Share the Love</h2><p style="color:#6b7280;margin:0 0 25px;line-height:1.7">Get $50 for every friend you refer who makes a purchase. They get 20% off their first order!</p><div style="background:#ecfdf5;padding:20px;border-radius:8px;margin:30px 0"><p style="margin:0;color:#059669;font-weight:600">Your unique referral link:</p><p style="margin:10px 0 0;background:#f9fafb;padding:15px;border-radius:6px;color:#6b7280;font-size:14px">yourcompany.com/ref/[CODE]</p></div><a href="#" style="background:#10b981;color:#fff;text-decoration:none;padding:18px 50px;border-radius:8px;font-weight:bold;display:inline-block">Share Now</a></td></tr></table></body></html>`,
    features: ['Rewards', 'Incentive', 'Sharing'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'loyalty-rewards',
    name: 'Loyalty Rewards',
    category: 'Marketing',
    description: 'Reward loyal customers',
    subject: 'Special Rewards for You!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Rewards</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff7ed"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px"><tr><td style="padding:50px 40px;text-align:center"><div style="background:#f59e0b;border-radius:50%;width:120px;height:120px;margin:0 auto 25px;display:flex;align-items:center;justify-content:center"><span style="font-size:64px">⭐</span></div><h1 style="color:#1f2937;margin:0;font-size:28px">You Have Rewards!</h1><p style="color:#78350f;margin:15px 0 0;font-size:18px;font-weight:600">5,000 Points Available</p></td></tr><tr><td style="padding:0 40px 50px"><p style="color:#4b5563;margin:0 0 25px;line-height:1.7">Thanks for being a valued member! Use your points to get exclusive discounts.</p><div style="background:#fef3c7;padding:20px;border-radius:8px;margin-bottom:25px"><p style="margin:0 0 10px;color:#78350f;font-weight:600">Available Rewards:</p><ul style="margin:0;color:#92400e"><li>1,000 pts = $10 off</li><li>2,500 pts = $25 off</li><li>5,000 pts = $50 off</li></ul></div><a href="#" style="background:#f59e0b;color:#fff;text-decoration:none;padding:18px 40px;border-radius:8px;font-weight:bold;display:inline-block">Redeem Now</a></td></tr></table></body></html>`,
    features: ['Points', 'Rewards', 'Exclusive'],
    isPopular: true,
    isNew: false
  },

  // ========== HOLIDAY (3 templates) ==========
  {
    id: 'christmas-special',
    name: 'Christmas Special',
    category: 'Holiday',
    description: 'Festive holiday campaign',
    subject: '🎄 Merry Christmas Special Offers!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Christmas</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef2f2"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:60px 40px;text-align:center;background:linear-gradient(135deg,#dc2626,#991b1b)"><div style="font-size:80px;margin-bottom:25px">🎄</div><h1 style="color:#fff;margin:0;font-size:36px;font-weight:800">MERRY CHRISTMAS</h1><p style="color:#fecaca;margin:20px 0 0;font-size:22px;font-weight:600">Festive Special Offers</p><div style="background:#fff;color:#dc2626;padding:15px 40px;border-radius:10px;display:inline-block;margin-top:25px;font-size:24px;font-weight:bold">50% OFF</div></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 20px">Spread the Joy</h2><p style="color:#6b7280;margin:0 0 30px;line-height:1.7">Get into the Christmas spirit with our festive collection and special holiday deals!</p><div style="background:#fee2e2;padding:25px;border-radius:10px;margin-bottom:30px"><p style="margin:0;color:#991b1b;font-weight:600;font-size:16px">🎁 Gift Ideas for Everyone</p><p style="margin:10px 0 0;color:#92400e">From $9.99 to $999.99</p></div><a href="#" style="background:#dc2626;color:#fff;text-decoration:none;padding:20px 50px;border-radius:10px;font-weight:bold;font-size:18px;display:inline-block">Shop Now</a></td></tr></table></body></html>`,
    features: ['Festive', 'Seasonal', 'Bold Colors'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'new-year-celebration',
    name: 'New Year Celebration',
    category: 'Holiday',
    description: 'New year special offers',
    subject: 'Happy New Year! Special Offers Inside',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Year</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#1e1b4b"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px"><tr><td style="padding:70px 50px;text-align:center;background:linear-gradient(135deg,#1e1b4b,#312e81)"><h1 style="color:#fff;margin:0;font-size:44px;font-weight:800">HAPPY</h1><h1 style="color:#fbbf24;margin:10px 0 0;font-size:44px;font-weight:800">NEW YEAR!</h1><p style="color:#c7d2fe;margin:30px 0 0;font-size:18px">Welcome to 2024</p><div style="margin-top:35px"><span style="font-size:72px">🎆</span></div></td></tr><tr><td style="padding:60px 50px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:28px">Start the Year Right</h2><p style="color:#4b5563;margin:0 0 30px;line-height:1.8;font-size:16px">Celebrate the new year with fresh starts, new goals, and exclusive deals to help you achieve everything you've planned.</p><div style="background:#1e3a8a;color:#fff;padding:30px;border-radius:12px;margin:35px 0"><h3 style="margin:0 0 15px;font-size:20px">🎯 New Year Resolutions Sale</h3><ul style="margin:0;padding-left:20px"><li>Start your fitness journey - 30% off</li><li>Learn new skills - 40% off</li><li>Organize your life - 25% off</li></ul></div><a href="#" style="background:#1e3a8a;color:#fff;text-decoration:none;padding:22px 60px;border-radius:10px;font-weight:bold;font-size:18px;display:inline-block">Explore Deals</a></td></tr></table></body></html>`,
    features: ['Celebration', 'Aspirational', 'Motivational'],
    isPopular: true,
    isNew: true
  },
  {
    id: 'black-friday',
    name: 'Black Friday',
    category: 'Holiday',
    description: 'Black Friday mega sale',
    subject: '🔥 Black Friday - Biggest Sale Ever!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Black Friday</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#000"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:60px 40px;background:#000;text-align:center"><h1 style="color:#fff;margin:0;font-size:42px;font-weight:900">BLACK FRIDAY</h1><p style="color:#ef4444;margin:20px 0 0;font-size:26px;font-weight:800">UP TO 80% OFF</p><div style="margin-top:35px;font-size:56px">🔥</div></td></tr><tr><td style="padding:50px 40px"><div style="background:#fee2e2;padding:30px;border-radius:12px;margin-bottom:30px"><h2 style="color:#dc2626;margin:0 0 15px;font-size:24px">⚡ Limited Time Only</h2><p style="margin:0;color:#991b1b;font-weight:700;font-size:18px">Sale ends in 48 hours - Don't miss out!</p></div><h3 style="color:#1f2937;margin:0 0 20px">Doorbuster Deals</h3><table width="100%"><tr><td style="padding:15px 0;border-bottom:1px solid #e5e7eb"><span style="color:#1f2937;font-weight:600">Category 1:</span><span style="float:right;color:#dc2626;font-weight:bold">70% OFF</span></td></tr><tr><td style="padding:15px 0;border-bottom:1px solid #e5e7eb"><span style="color:#1f2937;font-weight:600">Category 2:</span><span style="float:right;color:#dc2626;font-weight:bold">65% OFF</span></td></tr><tr><td style="padding:15px 0"><span style="color:#1f2937;font-weight:600">Category 3:</span><span style="float:right;color:#dc2626;font-weight:bold">60% OFF</span></td></tr></table><a href="#" style="background:#000;color:#fff;text-decoration:none;padding:22px 60px;border-radius:10px;font-weight:900;font-size:20px;display:inline-block;margin-top:30px">SHOP NOW</a></td></tr></table></body></html>`,
    features: ['Massive Sale', 'Urgency', 'High Discounts'],
    isPopular: true,
    isNew: false
  }
]

// 更新分类映射
export const templateCategories: Record<string, string[]> = {
  'Business': ['professional-update', 'business-report', 'corporate-announcement'],
  'E-commerce': ['flash-sale', 'order-confirmation', 'abandoned-cart', 'product-showcase'],
  'Newsletter': ['weekly-newsletter', 'bi-weekly-digest', 'monthly-roundup'],
  'Product Launch': ['launch-announcement', 'pre-launch-teaser', 'feature-highlight'],
  'Onboarding': ['welcome-email', 'get-started', 'account-setup'],
  'Events': ['event-invitation', 'webinar-invitation', 'event-reminder'],
  'Transactional': ['password-reset', 'email-verification', 'invoice-receipt'],
  'Marketing': ['summer-promotion', 'referral-program', 'loyalty-rewards'],
  'Holiday': ['christmas-special', 'new-year-celebration', 'black-friday']
}

// 获取分类中的模板
export const getTemplatesByCategory = (category: string): ProfessionalTemplate[] => {
  const templateIds = templateCategories[category] || []
  return professionalTemplates.filter(template => templateIds.includes(template.id))
}

// 获取所有分类
export const getAllCategories = (): string[] => {
  return Object.keys(templateCategories)
}

// 获取热门模板
export const getPopularTemplates = (): ProfessionalTemplate[] => {
  return professionalTemplates.filter(template => template.isPopular)
}

// 获取新模板
export const getNewTemplates = (): ProfessionalTemplate[] => {
  return professionalTemplates.filter(template => template.isNew)
}
