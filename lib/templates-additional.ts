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
  }
]

