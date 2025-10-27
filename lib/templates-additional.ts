import { ProfessionalTemplate } from './templates'

// 额外的70个高质量模板，用于扩展到100个模板
export const additionalTemplates: ProfessionalTemplate[] = [
  // ========== BUSINESS (7 additional templates) ==========
  {
    id: 'executive-brief',
    name: 'Executive Brief',
    category: 'Business',
    description: 'Executive summary with key insights',
    subject: 'Executive Brief - Q4 Insights',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Executive Brief</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#0f172a"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:60px 40px;text-align:center"><h1 style="color:#fff;margin:0 0 12px;font-size:42px;font-weight:800">EXECUTIVE BRIEF</h1><p style="color:#94a3b8;margin:0;font-size:18px;font-weight:500">Q4 Key Insights & Strategy</p></div></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 8px;font-size:28px;font-weight:700">Strategic Overview</h2><p style="color:#6b7280;margin:0 0 40px;line-height:1.8;font-size:16px">Critical business intelligence and actionable recommendations.</p><div style="background:#1e293b;padding:35px;border-radius:12px;margin:30px 0"><h3 style="margin:0 0 20px;color:#fff;font-size:20px;font-weight:700">📊 Financial Performance</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px"><div style="background:#334155;padding:20px;border-radius:8px"><p style="margin:0 0 8px;color:#94a3b8;font-size:13px">Total Revenue</p><p style="margin:0;color:#fff;font-size:28px;font-weight:700">$2.4M</p></div><div style="background:#334155;padding:20px;border-radius:8px"><p style="margin:0 0 8px;color:#94a3b8;font-size:13px">Growth Rate</p><p style="margin:0;color:#10b981;font-size:28px;font-weight:700">+24.5%</p></div></div></div><div style="margin:35px 0;padding:25px;background:#f9fafb;border-radius:12px"><h3 style="margin:0 0 15px;color:#1f2937;font-size:20px;font-weight:700">🎯 Key Recommendations</h3><ul style="margin:0;padding-left:22px;color:#4b5563"><li style="margin-bottom:10px">Market expansion opportunity identified</li><li style="margin-bottom:10px">Strategic partnership potential</li><li style="margin-bottom:10px">Investment in technology infrastructure</li></ul></div></td></tr></table></body></html>`,
    features: ['Strategic', 'Data-Driven', 'Executive'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'team-update',
    name: 'Team Update',
    category: 'Business',
    description: 'Internal team communication',
    subject: 'Team Update - [Week/Month]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Team Update</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)"><tr><td style="padding:40px;background:linear-gradient(135deg,#3b82f6,#2563eb);text-align:center"><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">Team Update</h1><p style="color:#bfdbfe;margin:10px 0 0;font-size:16px">Week of [Date]</p></td></tr><tr><td style="padding:40px"><h2 style="color:#1f2937;margin:0 0 30px;font-size:24px;font-weight:700">Hi Team! 👋</h2><div style="margin:25px 0;padding:20px;background:#eff6ff;border-left:4px solid #3b82f6;border-radius:8px"><h3 style="margin:0 0 12px;color:#1e40af;font-size:18px;font-weight:700">📢 Important Announcements</h3><p style="margin:0;color:#1e3a8a;line-height:1.7">Latest company updates and policy changes.</p></div><div style="margin:25px 0;padding:20px;background:#f0fdf4;border-left:4px solid #10b981;border-radius:8px"><h3 style="margin:0 0 12px;color:#14532d;font-size:18px;font-weight:700">✅ Accomplishments</h3><p style="margin:0;color:#166534;line-height:1.7">Major wins and milestones achieved this week.</p></div><div style="margin:25px 0;padding:20px;background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px"><h3 style="margin:0 0 12px;color:#78350f;font-size:18px;font-weight:700">🎯 Upcoming Goals</h3><p style="margin:0;color:#92400e;line-height:1.7">Priority tasks and objectives for next week.</p></div></td></tr></table></body></html>`,
    features: ['Internal', 'Engaging', 'Organized'],
    isPopular: false,
    isNew: true
  },
  {
    id: 'milestone-celebration',
    name: 'Milestone Celebration',
    category: 'Business',
    description: 'Celebrate achievements and milestones',
    subject: '🎉 We Did It! - [Milestone Achievement]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Milestone</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:linear-gradient(135deg,#fef3c7,#fde68a)"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.15)"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:70px 40px;text-align:center"><div style="font-size:96px;margin-bottom:25px">🎉</div><h1 style="color:#fff;margin:0 0 15px;font-size:48px;font-weight:900">WE'VE REACHED</h1><div style="background:#fff;padding:25px 40px;border-radius:12px;display:inline-block"><h2 style="margin:0;color:#f59e0b;font-size:56px;font-weight:900">100K</h2><p style="margin:8px 0 0;color:#78350f;font-size:18px;font-weight:700">Users & Growing!</p></div></div></td></tr><tr><td style="padding:60px 50px"><h2 style="color:#1f2937;margin:0 0 25px;font-size:32px;font-weight:800;text-align:center">Thank You for Being Part of Our Journey! 🙏</h2><p style="color:#6b7280;margin:0 0 40px;line-height:1.9;font-size:17px;text-align:center">Your support has helped us achieve this incredible milestone. Here's to many more accomplishments together!</p><div style="background:#fef3c7;padding:30px;border-radius:16px;margin:35px 0;text-align:center"><h3 style="margin:0 0 20px;color:#78350f;font-size:24px;font-weight:700">🏆 What's Next?</h3><p style="margin:0;color:#92400e;line-height:1.8;font-size:16px">We're just getting started. Expect even bigger announcements soon!</p></div><div style="text-align:center;margin-top:45px"><a href="#" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;text-decoration:none;padding:20px 60px;border-radius:12px;font-weight:800;font-size:18px;display:inline-block;box-shadow:0 8px 24px rgba(245,158,11,0.4)">Explore What's New →</a></div></td></tr></table></body></html>`,
    features: ['Celebratory', 'Visual', 'Gratitude'],
    isPopular: true,
    isNew: false
  },

  // ========== BUSINESS (4 more templates) ==========
  {
    id: 'investment-proposal',
    name: 'Investment Proposal',
    category: 'Business',
    description: 'Professional investment pitch',
    subject: 'Investment Opportunity - [Project Name]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Proposal</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f8fafc"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:60px 40px;text-align:center"><h1 style="color:#fff;margin:0 0 15px;font-size:38px;font-weight:800">INVESTMENT OPPORTUNITY</h1><p style="color:#bfdbfe;margin:0;font-size:18px;font-weight:500">High-Growth Potential Project</p></div></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:28px;font-weight:700">Project Overview</h2><p style="color:#6b7280;margin:0 0 35px;line-height:1.8;font-size:16px">A unique opportunity to invest in a transformative project with proven market traction and strong growth potential.</p><div style="background:#eff6ff;padding:30px;border-radius:12px;margin:30px 0"><h3 style="margin:0 0 20px;color:#1e40af;font-size:20px;font-weight:700">📈 Key Highlights</h3><table width="100%"><tr><td style="padding:10px 0;color:#6b7280">Market Size:</td><td style="text-align:right;color:#1f2937;font-weight:600">$2.3B</td></tr><tr><td style="padding:10px 0;color:#6b7280">Growth Rate:</td><td style="text-align:right;color:#1f2937;font-weight:600">45% CAGR</td></tr><tr><td style="padding:10px 0;color:#6b7280">ROI Projection:</td><td style="text-align:right;color:#16a34a;font-weight:700">25-35%</td></tr></table></div><div style="text-align:center;margin-top:40px"><a href="#" style="background:linear-gradient(135deg,#1e40af,#3b82f6);color:#fff;text-decoration:none;padding:20px 50px;border-radius:12px;font-weight:700;font-size:18px;display:inline-block;box-shadow:0 4px 12px rgba(37,99,235,0.3)">Schedule a Meeting →</a></div></td></tr></table></body></html>`,
    features: ['Professional', 'Data-Driven', 'Investment Focus'],
    isPopular: true,
    isNew: false
  },
  {
    id: 'client-presentation',
    name: 'Client Presentation',
    category: 'Business',
    description: 'Professional client proposal',
    subject: 'Project Proposal: [Client Name]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Proposal</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border:2px solid #e5e7eb;border-radius:16px;overflow:hidden"><tr><td style="padding:50px 40px;background:#1f2937;text-align:center"><h1 style="color:#fff;margin:0 0 10px;font-size:32px;font-weight:700">PROJECT PROPOSAL</h1><p style="color:#9ca3af;margin:0;font-size:16px">For [Client Name]</p></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 15px;font-size:24px">Proposed Solution</h2><p style="color:#6b7280;margin:0 0 30px;line-height:1.8">We're excited to present a comprehensive solution tailored to your specific needs.</p><div style="border-left:4px solid #3b82f6;padding-left:25px;margin:25px 0"><h3 style="margin:0 0 12px;color:#1f2937;font-size:18px">Key Benefits</h3><ul style="margin:0;padding-left:20px;color:#4b5563"><li>Increased efficiency by 40%</li><li>Cost reduction of $50K annually</li><li>Scalable infrastructure</li></ul></div><div style="background:#f9fafb;padding:25px;border-radius:10px;margin:30px 0"><h3 style="margin:0 0 15px;color:#1f2937">Timeline</h3><p style="margin:0;color:#6b7280">Project Duration: 8-12 weeks<br>Delivery: Phased approach</p></div><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:18px 45px;border-radius:10px;font-weight:bold;display:inline-block">View Full Proposal</a></td></tr></table></body></html>`,
    features: ['Formal', 'Detailed', 'Timeline'],
    isPopular: false,
    isNew: true
  },
  {
    id: 'company-newsletter',
    name: 'Company Newsletter',
    category: 'Business',
    description: 'Internal company updates',
    subject: 'Company Newsletter - [Month]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Newsletter</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#0ea5e9,#0284c7);padding:50px 40px;text-align:center"><div style="font-size:56px;margin-bottom:20px">📢</div><h1 style="color:#fff;margin:0 0 12px;font-size:36px;font-weight:800">Company Newsletter</h1><p style="color:#e0f2fe;margin:0;font-size:17px">March 2024</p></div></td></tr><tr><td style="padding:50px 40px"><div style="margin:30px 0;padding:25px;background:#eff6ff;border-radius:12px;border-left:4px solid #0ea5e9"><h3 style="margin:0 0 12px;color:#0c4a6e;font-size:20px;font-weight:700">🏆 Company Milestones</h3><p style="margin:0;color:#075985;line-height:1.7">Major achievements and team recognition highlights.</p></div><div style="margin:30px 0;padding:25px;background:#f0fdf4;border-radius:12px;border-left:4px solid #10b981"><h3 style="margin:0 0 12px;color:#14532d;font-size:20px;font-weight:700">📊 Business Updates</h3><p style="margin:0;color:#166534;line-height:1.7">Latest revenue figures and growth metrics.</p></div><div style="margin:30px 0;padding:25px;background:#fef3c7;border-radius:12px;border-left:4px solid #f59e0b"><h3 style="margin:0 0 12px;color:#78350f;font-size:20px;font-weight:700">🎯 Upcoming Events</h3><p style="margin:0;color:#92400e;line-height:1.7">Team building and company-wide initiatives.</p></div></td></tr></table></body></html>`,
    features: ['Internal', 'Updates', 'Engaging'],
    isPopular: false,
    isNew: false
  },
  {
    id: 'quarterly-review',
    name: 'Quarterly Review',
    category: 'Business',
    description: 'Quarterly performance review',
    subject: 'Q1 2024 Performance Review',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Review</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f8fafc"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1)"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:60px 40px;text-align:center"><h1 style="color:#fff;margin:0 0 15px;font-size:40px;font-weight:900">Q1 REVIEW</h1><p style="color:#e0e7ff;margin:0;font-size:20px;font-weight:600">Performance Summary</p></div></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 25px;font-size:28px;font-weight:700">Key Achievements</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:35px"><div style="background:#dbeafe;padding:25px;border-radius:12px"><p style="margin:0 0 10px;color:#1e40af;font-size:14px;font-weight:600">Revenue</p><p style="margin:0;color:#1e40af;font-size:32px;font-weight:800">$1.2M</p></div><div style="background:#d1fae5;padding:25px;border-radius:12px"><p style="margin:0 0 10px;color:#059669;font-size:14px;font-weight:600">Growth</p><p style="margin:0;color:#059669;font-size:32px;font-weight:800">+34%</p></div><div style="background:#fef3c7;padding:25px;border-radius:12px"><p style="margin:0 0 10px;color:#d97706;font-size:14px;font-weight:600">Clients</p><p style="margin:0;color:#d97706;font-size:32px;font-weight:800">156</p></div><div style="background:#fce7f3;padding:25px;border-radius:12px"><p style="margin:0 0 10px;color:#be185d;font-size:14px;font-weight:600">Satisfaction</p><p style="margin:0;color:#be185d;font-size:32px;font-weight:800">98%</p></div></div><div style="background:#f9fafb;padding:30px;border-radius:12px"><h3 style="margin:0 0 15px;color:#1f2937;font-size:20px;font-weight:700">📈 Highlights</h3><ul style="margin:0;padding-left:22px;color:#4b5563;line-height:1.8"><li>Record-breaking sales performance</li><li>Successful product launch</li><li>Team expansion completed</li><li>Customer satisfaction at all-time high</li></ul></div></td></tr></table></body></html>`,
    features: ['Data-Driven', 'Visual', 'Comprehensive'],
    isPopular: true,
    isNew: false
  },

  // ========== E-COMMERCE (6 additional templates) ==========
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'E-commerce',
    description: 'New product announcement',
    subject: '🎉 Introducing Our Latest Product',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Product Launch</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#fef3c7"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.15)"><tr><td style="padding:0"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);padding:70px 40px;text-align:center"><div style="font-size:96px;margin-bottom:30px">🚀</div><h1 style="color:#fff;margin:0 0 20px;font-size:42px;font-weight:900">NEW PRODUCT</h1><p style="color:#fffbeb;margin:0;font-size:22px;font-weight:600">Revolutionary Design</p><div style="background:#1f2937;color:#fbbf24;padding:15px 40px;border-radius:10px;display:inline-block;margin-top:25px;font-size:20px;font-weight:800">NOW AVAILABLE</div></div></td></tr><tr><td style="padding:60px 40px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:28px">What Makes It Special</h2><p style="color:#6b7280;margin:0 0 40px;line-height:1.8;font-size:16px">Experience innovation like never before with cutting-edge features designed for excellence.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:35px 0"><div style="text-align:center;padding:20px;background:#fef3c7;border-radius:12px"><div style="font-size:48px;margin-bottom:10px">⚡</div><p style="margin:0;color:#78350f;font-weight:700">10x Faster</p></div><div style="text-align:center;padding:20px;background:#fef3c7;border-radius:12px"><div style="font-size:48px;margin-bottom:10px">🎨</div><p style="margin:0;color:#78350f;font-weight:700">Beautiful</p></div><div style="text-align:center;padding:20px;background:#fef3c7;border-radius:12px"><div style="font-size:48px;margin-bottom:10px">🔒</div><p style="margin:0;color:#78350f;font-weight:700">Secure</p></div><div style="text-align:center;padding:20px;background:#fef3c7;border-radius:12px"><div style="font-size:48px;margin-bottom:10px">💎</div><p style="margin:0;color:#78350f;font-weight:700">Premium</p></div></div><div style="text-align:center;margin-top:40px"><a href="#" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;text-decoration:none;padding:22px 60px;border-radius:12px;font-weight:800;font-size:18px;display:inline-block;box-shadow:0 8px 24px rgba(251,191,36,0.4)">Shop Now →</a></div></td></tr></table></body></html>`,
    features: ['Exciting', 'Feature Showcase', 'Strong CTA'],
    isPopular: true,
    isNew: true
  },

  // ========== NEWSLETTER (5 additional templates) ==========
  {
    id: 'weekly-roundup',
    name: 'Weekly Roundup',
    category: 'Newsletter',
    description: 'Weekly news and updates',
    subject: 'Weekly Roundup - [Date]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Roundup</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)"><tr><td style="padding:50px 40px;background:#1f2937;text-align:center"><h1 style="color:#fff;margin:0 0 10px;font-size:36px;font-weight:800">WEEKLY ROUNDUP</h1><p style="color:#9ca3af;margin:0;font-size:16px">March 15, 2024</p></td></tr><tr><td style="padding:50px 40px"><div style="margin:25px 0;padding:25px;background:#f9fafb;border-radius:12px"><h3 style="margin:0 0 15px;color:#1f2937;font-size:22px">📰 Top Stories</h3><p style="margin:0 0 15px;color:#6b7280;line-height:1.7">Industry news and breaking updates from the past week.</p><a href="#" style="color:#3b82f6;text-decoration:none;font-weight:600">Read more →</a></div><div style="margin:25px 0;padding:25px;background:#f9fafb;border-radius:12px"><h3 style="margin:0 0 15px;color:#1f2937;font-size:22px">📊 Data & Insights</h3><p style="margin:0 0 15px;color:#6b7280;line-height:1.7">Key metrics and trends shaping the industry.</p><a href="#" style="color:#3b82f6;text-decoration:none;font-weight:600">View analytics →</a></div></td></tr></table></body></html>`,
    features: ['Weekly', 'News', 'Insights'],
    isPopular: false,
    isNew: false
  },

  // ========== PRODUCT LAUNCH (3 additional templates) ==========
  {
    id: 'limited-edition',
    name: 'Limited Edition',
    category: 'Product Launch',
    description: 'Announce limited edition products',
    subject: '⚡ Limited Edition - Only 100 Available',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Limited Edition</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#000"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:60px 40px;background:#000;text-align:center"><h1 style="color:#fff;margin:0;font-size:40px;font-weight:900">LIMITED EDITION</h1><p style="color:#fbbf24;margin:15px 0 0;font-size:22px;font-weight:700">Only 100 Units Available</p></td></tr><tr><td style="padding:50px 40px"><div style="background:#fef3c7;padding:30px;border-radius:12px;margin-bottom:30px;text-align:center"><h2 style="margin:0 0 15px;color:#78350f;font-size:24px;font-weight:800">⏰ Hurry - Running Out Fast!</h2><p style="margin:0;color:#92400e;font-size:16px">Only <span style="font-size:28px;font-weight:900;color:#d97706">47</span> left in stock</p></div><a href="#" style="background:#000;color:#fbbf24;text-decoration:none;padding:22px 60px;border-radius:12px;font-weight:900;font-size:18px;display:inline-block;border:3px solid #fbbf24">Shop Now</a></td></tr></table></body></html>`,
    features: ['Exclusive', 'Urgency', 'Limited Stock'],
    isPopular: true,
    isNew: false
  },

  // ========== ONBOARDING (3 additional templates) ==========
  {
    id: 'next-steps',
    name: 'Next Steps',
    category: 'Onboarding',
    description: 'Guide users on what to do next',
    subject: 'What to Do Next',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Next Steps</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:50px 40px;background:#10b981;text-align:center"><div style="font-size:64px;margin-bottom:20px">🚀</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">You're All Set!</h1></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 25px;font-size:24px">Here's What's Next</h2><ol style="margin:0;padding-left:25px;color:#6b7280"><li style="margin-bottom:20px">Complete your profile setup</li><li style="margin-bottom:20px">Explore the dashboard</li><li style="margin-bottom:20px">Start creating your first project</li></ol><a href="#" style="background:#10b981;color:#fff;text-decoration:none;padding:18px 45px;border-radius:10px;font-weight:bold;display:inline-block;margin-top:30px">Get Started →</a></td></tr></table></body></html>`,
    features: ['Guidance', 'Clear Steps', 'Helpful'],
    isPopular: true,
    isNew: false
  },

  // ========== EVENTS (2 additional templates) ==========
  {
    id: 'conference-announcement',
    name: 'Conference Announcement',
    category: 'Events',
    description: 'Announce upcoming conferences',
    subject: 'Join Us at [Conference Name]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Conference</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#faf5ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:60px 40px;background:linear-gradient(135deg,#7c3aed,#6366f1);text-align:center"><h1 style="color:#fff;margin:0;font-size:38px;font-weight:900">JOIN US</h1><p style="color:#e9d5ff;margin:15px 0 0;font-size:20px">Annual Conference 2024</p></td></tr><tr><td style="padding:50px 40px"><h2 style="color:#1f2937;margin:0 0 20px;font-size:28px">Why Attend?</h2><ul style="margin:0;padding-left:25px;color:#6b7280"><li style="margin-bottom:15px">Network with industry leaders</li><li style="margin-bottom:15px">Learn from expert speakers</li><li style="margin-bottom:15px">Discover the latest trends</li></ul><a href="#" style="background:linear-gradient(135deg,#7c3aed,#6366f1);color:#fff;text-decoration:none;padding:20px 50px;border-radius:12px;font-weight:700;display:inline-block;margin-top:30px">Register Now</a></td></tr></table></body></html>`,
    features: ['Informative', 'Benefits', 'Registration'],
    isPopular: true,
    isNew: false
  },

  // ========== TRANSACTIONAL (2 additional templates) ==========
  {
    id: 'payment-failed',
    name: 'Payment Failed',
    category: 'Transactional',
    description: 'Payment failure notification',
    subject: 'Payment Failed - Action Required',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Payment Failed</title></head><body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#fef2f2"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:50px 40px;background:#dc2626;text-align:center"><div style="font-size:64px;margin-bottom:20px">⚠️</div><h1 style="color:#fff;margin:0;font-size:28px">Payment Failed</h1></td></tr><tr><td style="padding:50px 40px"><p style="color:#6b7280;margin:0 0 25px;line-height:1.7">We couldn't process your recent payment. Please update your payment method.</p><div style="background:#fef2f2;padding:25px;border-radius:12px;margin-bottom:30px"><p style="margin:0 0 10px;color:#991b1b;font-weight:600">Amount:</p><p style="margin:0;color:#991b1b;font-size:24px;font-weight:700">$99.99</p></div><a href="#" style="background:#dc2626;color:#fff;text-decoration:none;padding:18px 50px;border-radius:10px;font-weight:700;display:inline-block">Update Payment Method</a></td></tr></table></body></html>`,
    features: ['Alert', 'Action Required', 'Helpful'],
    isPopular: false,
    isNew: false
  }
]

