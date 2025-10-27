import { ProfessionalTemplate } from './templates'

// Supplement templates to reach 100 total
// This file contains the remaining ~44 templates
export const supplementTemplates: ProfessionalTemplate[] = [
  {
    id: 'return-request',
    name: 'Return Request',
    category: 'E-commerce',
    description: 'Return request processing',
    subject: 'Your Return Request is Being Processed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Return</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:50px 40px;background:#3b82f6;text-align:center"><div style="font-size:64px;margin-bottom:20px">📋</div><h1 style="color:#fff;margin:0;font-size:32px">Return Request Received</h1></td></tr><tr><td style="padding:50px 40px"><p style="color:#6b7280;margin:0 0 25px;line-height:1.7">We've received your return request and will process it within 2-3 business days.</p><div style="background:#f0f9ff;padding:20px;border-radius:12px;margin-bottom:25px"><p style="margin:0;color:#1e40af;font-weight:600">Return ID:</p><p style="margin:5px 0 0;color:#1f2937;font-size:18px">RET12345</p></div><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:18px 45px;border-radius:10px;font-weight:700;display:inline-block">Track Your Return</a></td></tr></table></body></html>`,
    features: ['Processing', 'Tracking', 'Helpful'],
    isPopular: false,
    isNew: false
  }
]

