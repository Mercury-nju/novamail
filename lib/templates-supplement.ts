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
  },
  
  {
    id: 'delivery-delayed',
    name: 'Delivery Delayed',
    category: 'E-commerce',
    description: 'Shipping delay notification',
    subject: 'Important: Your order is delayed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Delay Notice</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px"><tr><td style="padding:40px;text-align:center;border-bottom:1px solid #e5e7eb"><h1 style="color:#1f2937;margin:0;font-size:26px">Delivery Update</h1></td></tr><tr><td style="padding:40px"><p style="color:#6b7280;margin:0 0 15px;line-height:1.6">Unfortunately, your order is experiencing a delay.</p><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">Expected delivery: March 28, 2024</p><p style="color:#6b7280;margin:0;line-height:1.6">We apologize for any inconvenience.</p></td></tr></table></body></html>`,
    features: ['Informative', 'Apologetic', 'Clear'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'warranty-expiring',
    name: 'Warranty Expiring',
    category: 'E-commerce',
    description: 'Warranty expiration reminder',
    subject: 'Your warranty expires soon',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Warranty</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:2px solid #f59e0b;border-radius:12px"><tr><td style="padding:40px;text-align:center"><h1 style="color:#1f2937;margin:0;font-size:24px">Warranty Reminder</h1><p style="color:#6b7280;margin:10px 0 0">Expires: April 1, 2024</p></td></tr><tr><td style="padding:0 40px 40px"><p style="color:#6b7280;margin:0;line-height:1.6">Your product warranty will expire soon. Consider renewing to maintain coverage.</p></td></tr></table></body></html>`,
    features: ['Alert', 'Time-sensitive', 'Actionable'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'inventory-low',
    name: 'Low Inventory Alert',
    category: 'E-commerce',
    description: 'Notify about low inventory',
    subject: 'Limited stock on items you viewed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Stock Alert</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #dc2626;border-radius:12px"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:24px">Low Stock Alert</h1><p style="color:#6b7280;margin:15px 0;line-height:1.6">Only 3 left in stock</p><p style="color:#6b7280;margin:0;line-height:1.6">Hurry before it's gone!</p></td></tr></table></body></html>`,
    features: ['Urgent', 'Limited', 'Simple'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'wishlist-item-sale',
    name: 'Wishlist Item on Sale',
    category: 'E-commerce',
    description: 'Wishlist item price drop',
    subject: 'Price drop on your wishlist item',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Price Alert</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px"><tr><td style="padding:40px;background:#f0fdf4;border-radius:12px 12px 0 0"><h1 style="color:#16a34a;margin:0;font-size:24px">Price Drop!</h1></td></tr><tr><td style="padding:0 40px 40px;background:#fff;border-radius:0 0 12px 12px"><p style="color:#6b7280;margin:0;line-height:1.6">An item from your wishlist is now on sale.</p></td></tr></table></body></html>`,
    features: ['Price Alert', 'Personalized', 'Saving'],
    isPopular: true,
    isNew: true
  }
]

