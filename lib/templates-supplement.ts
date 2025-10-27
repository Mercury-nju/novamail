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
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Delivery Delay Notice</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:50px 40px;background:linear-gradient(135deg,#f59e0b,#d97706);text-align:center"><div style="font-size:64px;margin-bottom:20px">⏰</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">Delivery Update</h1><p style="color:#fed7aa;margin:10px 0 0;font-size:18px">Important information about your order</p></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 30px;font-size:20px;font-weight:600">We need to update you on your order delivery</p><div style="background:#fffbeb;padding:30px;border-left:4px solid #f59e0b;border-radius:8px;margin:30px 0"><p style="margin:0 0 15px;color:#78350f;font-weight:700;font-size:18px">⚠️ Delivery Delay</p><p style="margin:0;color:#92400e;line-height:1.7">Unfortunately, your order is experiencing a delay due to shipping carrier issues. We sincerely apologize for any inconvenience this may cause.</p></div><div style="background:#f9fafb;padding:25px;border-radius:8px;margin:25px 0"><p style="margin:0 0 12px;color:#1f2937;font-weight:700">Updated Timeline:</p><p style="margin:0 0 8px;color:#6b7280;line-height:1.6">Original delivery: March 25, 2024</p><p style="margin:0;color:#dc2626;font-weight:700;font-size:16px">New expected delivery: March 28, 2024</p></div><div style="background:#eff6ff;padding:20px;border-radius:8px"><p style="margin:0 0 10px;color:#1e40af;font-weight:700">What happens next:</p><ul style="margin:0;padding-left:22px;color:#4b5563"><li>You'll receive tracking updates automatically</li><li>We're working with the carrier to expedite delivery</li><li>We'll notify you once your package is in transit</li></ul></div></td></tr></table></body></html>`,
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
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Warranty Expiring</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fffbeb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(245,158,11,0.2);border:2px solid #fef3c7"><tr><td style="padding:50px 40px;background:linear-gradient(135deg,#f59e0b,#d97706);text-align:center"><div style="font-size:64px;margin-bottom:20px">⚠️</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">Warranty Expiring Soon</h1><p style="color:#fed7aa;margin:10px 0 0;font-size:18px">Protect your investment</p></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 30px;font-size:20px;font-weight:600">Important notice about your product warranty</p><div style="background:#fffbeb;padding:30px;border-left:4px solid #f59e0b;border-radius:8px;margin:30px 0"><p style="margin:0 0 15px;color:#78350f;font-weight:700;font-size:18px">📅 Expiration Date:</p><p style="margin:0;color:#d97706;font-size:28px;font-weight:800">April 1, 2024</p></div><p style="color:#6b7280;margin:0 0 25px;line-height:1.7">Your product warranty will expire soon. Don't lose your coverage - renew now to maintain protection and peace of mind.</p><div style="background:#f9fafb;padding:25px;border-radius:8px;margin:25px 0"><p style="margin:0 0 15px;color:#1f2937;font-weight:700">Warranty Benefits:</p><ul style="margin:0;padding-left:22px;color:#6b7280"><li>Coverage for defects and malfunctions</li><li>Fast and free replacement service</li><li>Priority customer support</li><li>Extended warranty available</li></ul></div><div style="margin:35px 0;text-align:center"><a href="#" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;text-decoration:none;padding:20px 60px;border-radius:12px;font-weight:900;font-size:20px;display:inline-block;box-shadow:0 8px 20px rgba(245,158,11,0.4)">Renew Warranty →</a></div></td></tr></table></body></html>`,
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
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Low Stock Alert</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef2f2"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(220,38,38,0.2);border:2px solid #fecaca"><tr><td style="padding:0;background:linear-gradient(135deg,#dc2626,#b91c1c);text-align:center"><div style="padding:50px 40px"><div style="font-size:64px;margin-bottom:20px">⚡</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">Running Low!</h1><p style="color:#fee2e2;margin:10px 0 0;font-size:18px">Limited stock remaining</p></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#991b1b;margin:0 0 30px;font-size:22px;font-weight:700;text-align:center">⚠️ Only 3 Items Left In Stock!</p><div style="background:#fef2f2;padding:30px;border-radius:12px;margin:30px 0;border:2px solid #fca5a5"><div style="text-align:center;margin-bottom:20px"><div style="font-size:48px;margin-bottom:15px">📦</div><p style="margin:0 0 10px;color:#991b1b;font-weight:800;font-size:28px">Stock Level: 3</p><p style="margin:0;color:#991b1b;font-size:16px">Only a few left!</p></div><div style="background:#fff;padding:20px;border-radius:8px;margin:15px 0"><p style="margin:0 0 8px;color:#1f2937;font-weight:700;font-size:18px">Product Name</p><p style="margin:0 0 10px;color:#6b7280;font-size:14px">Popular item that's selling fast</p><div style="color:#dc2626;font-size:20px;font-weight:800">⚡ Don't miss out!</div></div></div><div style="text-align:center;margin-top:40px"><a href="#" style="background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;text-decoration:none;padding:20px 60px;border-radius:12px;font-weight:900;font-size:20px;display:inline-block;box-shadow:0 8px 20px rgba(220,38,38,0.4)">Claim It Now →</a></div></td></tr></table></body></html>`,
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
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Price Alert</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f8fafc"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:0;background:linear-gradient(135deg,#22c55e,#16a34a);text-align:center"><div style="padding:50px 40px"><div style="font-size:48px;margin-bottom:20px">💰</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">Price Drop Alert!</h1><p style="color:#d1fae5;margin:10px 0 0;font-size:18px">Great news on items you saved</p></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 30px;font-size:18px;font-weight:600;text-align:center">We noticed something you've been watching</p><div style="background:#f0fdf4;padding:30px;border-radius:12px;margin:30px 0;border:2px solid #86efac"><p style="margin:0 0 15px;color:#15803d;font-weight:700;font-size:20px;text-align:center">Up to 40% OFF</p><p style="margin:0;color:#166534;text-align:center;font-size:16px">Selected items in your wishlist</p></div><div style="margin:35px 0"><div style="background:#fff;border:2px solid #e5e7eb;padding:20px;border-radius:8px;margin-bottom:15px"><p style="margin:0 0 8px;color:#1f2937;font-weight:600">Product Name</p><p style="margin:0;color:#6b7280;font-size:14px">Regular: $99.99 → Now: $59.99</p></div></div><div style="text-align:center;margin-top:40px"><a href="#" style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;text-decoration:none;padding:18px 50px;border-radius:10px;font-weight:700;font-size:18px;display:inline-block;box-shadow:0 4px 14px rgba(34,197,94,0.3)">Shop the Sale →</a></div></td></tr></table></body></html>`,
    features: ['Price Alert', 'Personalized', 'Saving'],
    isPopular: true,
    isNew: true
  },

  // ========== MORE UNIQUE BUSINESS TEMPLATES ==========
  {
    id: 'policy-update',
    name: 'Policy Update',
    category: 'Business',
    description: 'Important policy changes notice',
    subject: 'Policy Update Notice',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Policy Update</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-top:4px solid #2563eb"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Policy Update</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Effective date: April 15, 2024</p></td></tr><tr><td style="padding:0 40px 40px"><p style="color:#6b7280;margin:0;line-height:1.6">Please review the updated terms in your account settings.</p></td></tr></table></body></html>`,
    features: ['Legal', 'Compliance', 'Update'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'capacity-warning',
    name: 'Capacity Warning',
    category: 'Business',
    description: 'Resource capacity alert',
    subject: 'Storage capacity at 85%',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Capacity Alert</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-left:4px solid #f59e0b"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Storage Alert</h1><p style="color:#6b7280;margin:10px 0 0">Current usage: 85%</p></td></tr><tr><td style="padding:0 40px 40px"><div style="background:#f9fafb;height:8px;border-radius:4px"><div style="background:#f59e0b;height:8px;width:85%;border-radius:4px"></div></div></td></tr></table></body></html>`,
    features: ['Alert', 'Progress', 'Technical'],
    isPopular: false,
    isNew: false
  },

  // ========== NEWSLETTER VARIATIONS ==========
  {
    id: 'tech-news',
    name: 'Tech News',
    category: 'Newsletter',
    description: 'Technology news digest',
    subject: 'This Week in Tech',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Tech News</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f8fafc"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:24px">Tech Weekly</h1><p style="color:#6b7280;margin:10px 0 20px">Latest innovations and breakthroughs</p><div style="border-top:1px solid #e5e7eb;padding-top:20px;margin-top:20px"><p style="color:#6b7280;margin:0 0 10px;font-weight:600">AI Breakthrough</p><p style="color:#6b7280;margin:0;font-size:14px">New developments in machine learning...</p></div></td></tr></table></body></html>`,
    features: ['Tech', 'News', 'Weekly'],
    isPopular: false,
    isNew: false
  },

  // ========== MORE UNIQUE VARIATIONS ==========
  {
    id: 'review-request',
    name: 'Review Request',
    category: 'E-commerce',
    description: 'Ask for product review',
    subject: 'How was your purchase?',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Review Request</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f8fafc"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:50px 40px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);text-align:center"><div style="font-size:64px;margin-bottom:20px">⭐</div><h1 style="color:#fff;margin:0;font-size:32px;font-weight:800">How Was Your Purchase?</h1><p style="color:#e9d5ff;margin:10px 0 0;font-size:18px">We'd love to hear from you</p></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 30px;font-size:18px;font-weight:600;text-align:center">Your feedback helps us improve and helps other shoppers too!</p><div style="background:#f9fafb;padding:30px;border-radius:12px;margin:30px 0"><p style="margin:0 0 20px;color:#1f2937;font-weight:700;text-align:center;font-size:20px">Recent Purchase</p><div style="background:#fff;border:2px solid #e5e7eb;padding:20px;border-radius:8px;margin-bottom:15px"><p style="margin:0 0 8px;color:#1f2937;font-weight:600">Product Name</p><p style="margin:0;color:#6b7280;font-size:14px">Purchased on March 20, 2024</p></div></div><p style="color:#6b7280;margin:0 0 25px;line-height:1.7;text-align:center">Share your honest review and help others make better choices.</p><div style="text-align:center;margin-top:40px"><a href="#" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:#fff;text-decoration:none;padding:20px 60px;border-radius:12px;font-weight:900;font-size:20px;display:inline-block;box-shadow:0 8px 20px rgba(139,92,246,0.4)">Write a Review →</a></div></td></tr></table></body></html>`,
    features: ['Feedback', 'Simple', 'Direct'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'refund-processed',
    name: 'Refund Processed',
    category: 'E-commerce',
    description: 'Refund confirmation',
    subject: 'Your refund has been processed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Refund</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Refund Processed</h1><p style="color:#6b7280;margin:10px 0 0">Amount: $99.99</p><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Expected to arrive in 5-7 business days.</p></td></tr></table></body></html>`,
    features: ['Confirmation', 'Amount', 'Timeline'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'subscription-renewal',
    name: 'Subscription Renewal',
    category: 'Transactional',
    description: 'Subscription renewal reminder',
    subject: 'Your subscription renews in 7 days',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Renewal</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Renewal Reminder</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your subscription renews on April 10.</p></td></tr></table></body></html>`,
    features: ['Reminder', 'Payment', 'Date'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'trial-ending',
    name: 'Trial Ending',
    category: 'Transactional',
    description: 'Trial period ending soon',
    subject: 'Your trial ends in 3 days',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Trial Ending</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-left:4px solid #dc2626"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Trial Ending Soon</h1><p style="color:#6b7280;margin:10px 0 0">3 days remaining</p></td></tr></table></body></html>`,
    features: ['Urgent', 'Time-sensitive', 'Conversion'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'order-out-of-stock',
    name: 'Order Out of Stock',
    category: 'E-commerce',
    description: 'Notify item is out of stock',
    subject: 'Item no longer available',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Out of Stock</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Out of Stock</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">This item is currently unavailable.</p></td></tr></table></body></html>`,
    features: ['Notification', 'Status', 'Clear'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'survey-request',
    name: 'Survey Request',
    category: 'Marketing',
    description: 'Customer satisfaction survey',
    subject: 'Quick question for you',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Survey</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Take our survey</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your feedback helps us improve.</p></td></tr></table></body></html>`,
    features: ['Feedback', 'Short', 'Simple'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'event-registration',
    name: 'Event Registration',
    category: 'Events',
    description: 'Confirm event registration',
    subject: 'You\'re registered for [Event]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Registration</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Registration Confirmed</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">See you there!</p></td></tr></table></body></html>`,
    features: ['Confirmation', 'Positive', 'Brief'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'appointment-confirmation',
    name: 'Appointment Confirmation',
    category: 'Events',
    description: 'Confirm appointment booking',
    subject: 'Appointment confirmed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Appointment</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Appointment Confirmed</h1><p style="color:#6b7280;margin:10px 0 0">Date: March 20, 2024</p><p style="color:#6b7280;margin:10px 0 0">Time: 2:00 PM</p></td></tr></table></body></html>`,
    features: ['Scheduled', 'Details', 'Calendar'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder',
    category: 'Events',
    description: 'Remind about upcoming appointment',
    subject: 'Reminder: Your appointment tomorrow',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reminder</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fffbeb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Tomorrow at 2:00 PM</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Don't forget your appointment.</p></td></tr></table></body></html>`,
    features: ['Reminder', 'Tomorrow', 'Calendar'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'waitlist-notification',
    name: 'Waitlist Notification',
    category: 'E-commerce',
    description: 'Item available from waitlist',
    subject: 'Available now - item you wanted',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Available</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Back in Stock</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">The item you wanted is available.</p></td></tr></table></body></html>`,
    features: ['Availability', 'Waitlist', 'Urgent'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'back-in-stock',
    name: 'Back in Stock',
    category: 'E-commerce',
    description: 'Item back in stock alert',
    subject: 'Item back in stock',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>In Stock</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Available Now</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Previously sold out item is back.</p></td></tr></table></body></html>`,
    features: ['Alert', 'Stock', 'Availability'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'price-drop-alert',
    name: 'Price Drop Alert',
    category: 'E-commerce',
    description: 'Price reduction notification',
    subject: 'Price dropped - 25% off',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Price Drop</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">25% Price Drop</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">On items you viewed.</p></td></tr></table></body></html>`,
    features: ['Price', 'Discount', 'Savings'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'account-suspended',
    name: 'Account Suspended',
    category: 'Transactional',
    description: 'Account suspension notice',
    subject: 'Important: Account action required',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Suspend</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef2f2"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#dc2626;margin:0;font-size:22px">Account Issue</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Please contact support to resolve.</p></td></tr></table></body></html>`,
    features: ['Alert', 'Action', 'Support'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'security-alert',
    name: 'Security Alert',
    category: 'Transactional',
    description: 'Security breach notification',
    subject: 'Security Notice - Action Required',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Security</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:2px solid #dc2626"><tr><td style="padding:40px"><h1 style="color:#dc2626;margin:0;font-size:22px">Security Notice</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">We detected unusual activity.</p></td></tr></table></body></html>`,
    features: ['Security', 'Urgent', 'Warning'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'password-changed',
    name: 'Password Changed',
    category: 'Transactional',
    description: 'Confirm password change',
    subject: 'Your password was changed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Password Changed</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Password Changed</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Successfully updated.</p></td></tr></table></body></html>`,
    features: ['Security', 'Confirmation', 'Update'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'login-detected',
    name: 'New Login Detected',
    category: 'Transactional',
    description: 'New device login notification',
    subject: 'New login from unknown device',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Login</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">New Login</h1><p style="color:#6b7280;margin:10px 0 0">Device: iPhone</p><p style="color:#6b7280;margin:10px 0 0">Location: New York</p></td></tr></table></body></html>`,
    features: ['Security', 'Device', 'Location'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'support-ticket',
    name: 'Support Ticket',
    category: 'Transactional',
    description: 'Customer support ticket confirmation',
    subject: 'Support Request Received',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ticket</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:40px;background:#3b82f6;text-align:center"><h1 style="color:#fff;margin:0;font-size:26px">Support Ticket Created</h1></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 25px;font-size:18px;font-weight:600">Your ticket has been received</p><div style="background:#eff6ff;padding:25px;border-left:4px solid #3b82f6;border-radius:8px;margin:25px 0"><p style="margin:0 0 10px;color:#1e40af;font-weight:700">Ticket ID:</p><p style="margin:0;color:#1f2937;font-size:24px;font-weight:800">#12345</p></div><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">We'll review your request and get back to you within 24 hours. You'll receive an email notification when we respond.</p><div style="background:#f9fafb;padding:20px;border-radius:8px"><p style="margin:0 0 10px;color:#1f2937;font-weight:600">What to expect next:</p><ul style="margin:0;padding-left:22px;color:#6b7280"><li>Initial response within 24 hours</li><li>Priority support for premium members</li><li>Detailed updates on any changes</li></ul></div></td></tr></table></body></html>`,
    features: ['Support', 'Ticket', 'Tracking'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'support-reply',
    name: 'Support Reply',
    category: 'Transactional',
    description: 'Support team response',
    subject: 'Re: Your Support Request',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Support Reply</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:40px;background:#10b981;text-align:center"><h1 style="color:#fff;margin:0;font-size:26px">New Response</h1><p style="color:#d1fae5;margin:10px 0 0;font-size:16px">Support Team Update</p></td></tr><tr><td style="padding:50px 40px"><div style="background:#f0fdf4;padding:20px;border-left:4px solid #10b981;border-radius:8px;margin-bottom:25px"><p style="margin:0;color:#065f46;font-weight:700;font-size:18px">Ticket #12345</p></div><div style="background:#f9fafb;padding:25px;border-radius:12px;margin:25px 0"><p style="margin:0 0 15px;color:#1f2937;font-weight:600;font-size:16px">Hi there!</p><p style="margin:0 0 20px;color:#6b7280;line-height:1.7">We've reviewed your ticket and have an update for you. Our team has investigated the issue and implemented a solution.</p><div style="background:#fff;border:2px solid #e5e7eb;padding:20px;border-radius:8px"><p style="margin:0 0 10px;color:#1f2937;font-weight:700">Update Details:</p><ul style="margin:10px 0 0;padding-left:22px;color:#6b7280"><li>Issue identified and resolved</li><li>System update completed</li><li>Monitoring for stability</li></ul></div></div><div style="margin:30px 0"><a href="#" style="background:#10b981;color:#fff;text-decoration:none;padding:16px 40px;border-radius:10px;font-weight:700;font-size:16px;display:inline-block">View Full Response</a></div></td></tr></table></body></html>`,
    features: ['Response', 'Update', 'Direct'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'document-shared',
    name: 'Document Shared',
    category: 'Business',
    description: 'Share document with recipient',
    subject: 'Document shared with you',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document Shared</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#eff6ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:50px 40px;background:linear-gradient(135deg,#3b82f6,#2563eb);text-align:center"><div style="font-size:64px;margin-bottom:20px">📄</div><h1 style="color:#fff;margin:0;font-size:28px;font-weight:800">Document Shared With You</h1></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 25px;font-size:18px;font-weight:600">You have access to a new document</p><div style="background:#eff6ff;padding:25px;border-left:4px solid #3b82f6;border-radius:8px;margin:25px 0"><p style="margin:0 0 10px;color:#1e40af;font-weight:700">Document:</p><p style="margin:0;color:#1f2937;font-size:20px;font-weight:800">Project Proposal.pdf</p></div><div style="background:#f9fafb;padding:20px;border-radius:8px;margin:25px 0"><p style="margin:0 0 15px;color:#1f2937;font-weight:600">Details:</p><ul style="margin:0;padding-left:22px;color:#6b7280"><li>Shared by: John Doe</li><li>Shared on: March 25, 2024</li><li>Access level: View & Comment</li></ul></div><div style="margin:30px 0"><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:16px 40px;border-radius:10px;font-weight:700;font-size:16px;display:inline-block">Open Document →</a></div></td></tr></table></body></html>`,
    features: ['Sharing', 'Access', 'Collaboration'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'team-invitation',
    name: 'Team Invitation',
    category: 'Business',
    description: 'Invite to team workspace',
    subject: 'You\'re invited to join [Team]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invite</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Team Invitation</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Join the team and start collaborating.</p></td></tr></table></body></html>`,
    features: ['Collaboration', 'Invite', 'Team'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'backup-complete',
    name: 'Backup Complete',
    category: 'Business',
    description: 'Data backup completed',
    subject: 'Your backup is complete',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Backup</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Backup Complete</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your data has been safely backed up.</p></td></tr></table></body></html>`,
    features: ['Complete', 'Data', 'Safety'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'invoice-ready',
    name: 'Invoice Ready',
    category: 'Transactional',
    description: 'Invoice is ready for download',
    subject: 'Your invoice is ready',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Invoice Ready</h1><p style="color:#6b7280;margin:10px 0 0">Download your invoice.</p></td></tr></table></body></html>`,
    features: ['Document', 'Ready', 'Download'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'subscription-cancelled',
    name: 'Subscription Cancelled',
    category: 'Transactional',
    description: 'Confirm subscription cancellation',
    subject: 'Subscription cancelled',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Cancelled</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Cancelled</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your subscription has been cancelled.</p></td></tr></table></body></html>`,
    features: ['Cancelled', 'Confirmation', 'Final'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'membership-renewal',
    name: 'Membership Renewal',
    category: 'Business',
    description: 'Membership renewal reminder',
    subject: 'Your membership expires soon',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Membership</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Membership Expires</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Renew to continue enjoying benefits.</p></td></tr></table></body></html>`,
    features: ['Membership', 'Renewal', 'Benefits'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'content-published',
    name: 'Content Published',
    category: 'Business',
    description: 'Notify when content goes live',
    subject: 'Your content is now live',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Published</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Published!</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your content is now live.</p></td></tr></table></body></html>`,
    features: ['Live', 'Content', 'Success'],
    isPopular: false,
    isNew: true
  },

  {
    id: 'comment-reply',
    name: 'Comment Reply',
    category: 'Transactional',
    description: 'Someone replied to your comment',
    subject: 'New reply to your comment',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reply</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">New Reply</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Someone replied to your comment.</p></td></tr></table></body></html>`,
    features: ['Notification', 'Comment', 'Reply'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'feature-launched',
    name: 'Feature Launched',
    category: 'Business',
    description: 'Announce new feature release',
    subject: 'New Feature: [Feature Name]',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Feature</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#eff6ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">New Feature</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">We've added a new feature for you.</p></td></tr></table></body></html>`,
    features: ['Update', 'Feature', 'Launch'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'maintenance-notice',
    name: 'Maintenance Notice',
    category: 'Business',
    description: 'Scheduled maintenance announcement',
    subject: 'Scheduled Maintenance This Weekend',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Maintenance</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fffbeb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Maintenance Scheduled</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">This weekend from 2AM to 6AM.</p></td></tr></table></body></html>`,
    features: ['Notice', 'Schedule', 'Downtime'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'order-update',
    name: 'Order Update',
    category: 'E-commerce',
    description: 'Update about order status',
    subject: 'Order Update',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Order Update</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f8fafc"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)"><tr><td style="padding:0;background:linear-gradient(135deg,#3b82f6,#2563eb)"><div style="padding:50px 40px;text-align:center"><div style="font-size:48px;margin-bottom:20px">📦</div><h1 style="color:#fff;margin:0;font-size:28px;font-weight:800">Order Status Update</h1></div></td></tr><tr><td style="padding:50px 40px"><p style="color:#1f2937;margin:0 0 30px;font-size:18px;font-weight:600">Your order has been updated</p><div style="background:#eff6ff;padding:25px;border-left:4px solid #3b82f6;border-radius:8px;margin-bottom:25px"><p style="margin:0 0 10px;color:#1e40af;font-weight:700">Order Number:</p><p style="margin:0;color:#1f2937;font-size:20px;font-weight:800">#ORD12345</p></div><div style="background:#f0fdf4;padding:25px;border-radius:8px;margin:25px 0"><p style="margin:0 0 10px;color:#059669;font-weight:700">Status:</p><p style="margin:0;color:#047857;font-size:24px;font-weight:800">🟢 Shipped</p></div><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">Your order is on its way! Expected delivery date is March 28, 2024.</p><div style="background:#f9fafb;padding:20px;border-radius:8px;margin:25px 0"><p style="margin:0 0 15px;color:#1f2937;font-weight:600;text-align:center">Tracking Information</p><div style="text-align:center;margin:15px 0"><div style="display:inline-block;background:#3b82f6;color:#fff;padding:8px 16px;border-radius:6px;font-family:monospace;font-weight:600">TRACK123456789</div></div><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:14px 35px;border-radius:8px;font-weight:700;display:inline-block">Track Your Order</a></div></td></tr></table></body></html>`,
    features: ['Update', 'Status', 'Progress'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'product-recommendation',
    name: 'Product Recommendation',
    category: 'E-commerce',
    description: 'Personalized product suggestions',
    subject: 'Products you might like',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Recommendation</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">For You</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Based on your browsing history.</p></td></tr></table></body></html>`,
    features: ['Personalized', 'Recommended', 'Discovery'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'bundle-offer',
    name: 'Bundle Offer',
    category: 'E-commerce',
    description: 'Special bundle deal',
    subject: 'Save 30% with this bundle',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Bundle</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef3c7"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#d97706;margin:0;font-size:22px">Bundle Deal</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Save when you buy together.</p></td></tr></table></body></html>`,
    features: ['Bundle', 'Savings', 'Value'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'admin-alert',
    name: 'Admin Alert',
    category: 'Business',
    description: 'Administrative alert',
    subject: 'Action Required: System Alert',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Alert</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef2f2"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-left:4px solid #dc2626"><tr><td style="padding:40px"><h1 style="color:#dc2626;margin:0;font-size:22px">Alert</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Immediate attention required.</p></td></tr></table></body></html>`,
    features: ['Urgent', 'Admin', 'System'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'achievement-unlocked',
    name: 'Achievement Unlocked',
    category: 'Marketing',
    description: 'Gamification achievement',
    subject: 'Achievement Unlocked!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Achievement</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fffbeb"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#f59e0b;margin:0;font-size:22px">Achievement!</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">You've unlocked a new achievement.</p></td></tr></table></body></html>`,
    features: ['Gamification', 'Reward', 'Motivation'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'milestone-reached',
    name: 'Milestone Reached',
    category: 'Marketing',
    description: 'Reach usage milestone',
    subject: 'You reached 100 messages!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Milestone</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0f9ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#3b82f6;margin:0;font-size:22px">100 Messages Sent</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Keep up the great work!</p></td></tr></table></body></html>`,
    features: ['Progress', 'Milestone', 'Encouragement'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'task-assigned',
    name: 'Task Assigned',
    category: 'Business',
    description: 'Notify task assignment',
    subject: 'New task assigned to you',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Task</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">New Task</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Due: March 25, 2024</p></td></tr></table></body></html>`,
    features: ['Task', 'Assignment', 'Due'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'comment-approved',
    name: 'Comment Approved',
    category: 'Business',
    description: 'Comment moderation approval',
    subject: 'Your comment was approved',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Approved</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Approved</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your comment is now live.</p></td></tr></table></body></html>`,
    features: ['Moderation', 'Approval', 'Success'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'thank-you-message',
    name: 'Thank You Message',
    category: 'Marketing',
    description: 'Appreciation message',
    subject: 'Thank you for being with us',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Thanks</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Thank You</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">We appreciate your support.</p></td></tr></table></body></html>`,
    features: ['Gratitude', 'Appreciation', 'Relationship'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'early-bird-exclusive',
    name: 'Early Bird Exclusive',
    category: 'Marketing',
    description: 'Early access exclusive offer',
    subject: 'Early Bird Access: 48 Hours Only',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Early Access</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#1f2937"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:50px 40px;background:#1f2937;text-align:center"><h1 style="color:#fbbf24;margin:0;font-size:26px">Early Bird Access</h1><p style="color:#fff;margin:10px 0 0">48 Hours Only</p></td></tr><tr><td style="padding:40px"><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">Be the first to get exclusive deals before everyone else.</p><a href="#" style="background:#1f2937;color:#fbbf24;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:bold;display:inline-block">Claim Access</a></td></tr></table></body></html>`,
    features: ['Exclusive', 'Limited Time', 'Early Access'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'vip-welcome',
    name: 'VIP Welcome',
    category: 'Marketing',
    description: 'VIP membership welcome',
    subject: 'Welcome to VIP Membership',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>VIP</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:50px 40px;background:#fef3c7;text-align:center"><h1 style="color:#d97706;margin:0;font-size:28px">VIP Member</h1></td></tr><tr><td style="padding:40px"><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">Thank you for joining our VIP program. Enjoy exclusive benefits and priority support.</p><div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0"><p style="margin:0 0 10px;color:#1f2937;font-weight:bold">Your VIP Benefits:</p><ul style="margin:0;padding-left:20px;color:#6b7280"><li>Priority customer support</li><li>Exclusive early access</li><li>Special member discounts</li><li>VIP-only events</li></ul></div></td></tr></table></body></html>`,
    features: ['VIP', 'Membership', 'Exclusive Benefits'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'unsubscribe-confirmation',
    name: 'Unsubscribe Confirmation',
    category: 'Transactional',
    description: 'Confirm unsubscribe request',
    subject: 'You have been unsubscribed',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Unsubscribed</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">Unsubscribed</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">You've been removed from our mailing list. You won't receive further emails from us.</p></td></tr></table></body></html>`,
    features: ['Confirmation', 'Unsubscribe', 'Final'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'feedback-request',
    name: 'Feedback Request',
    category: 'Marketing',
    description: 'Request customer feedback',
    subject: 'How was your experience?',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Feedback</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#eff6ff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#3b82f6;margin:0;font-size:22px">Share Your Feedback</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">We'd love to hear about your experience with us.</p><div style="margin:25px 0"><a href="#" style="background:#3b82f6;color:#fff;text-decoration:none;padding:14px 35px;border-radius:8px;font-weight:bold;display:inline-block">Leave Feedback</a></div></td></tr></table></body></html>`,
    features: ['Feedback', 'Survey', 'Customer Voice'],
    isPopular: false,
    isNew: true
  },

  {
    id: 'referral-success',
    name: 'Referral Success',
    category: 'Marketing',
    description: 'Friend joined via referral',
    subject: 'Your friend just joined!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Referral</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#16a34a;margin:0;font-size:22px">Referral Bonus!</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your friend joined! You've earned $10 credit.</p><div style="background:#f0fdf4;padding:20px;border-radius:8px;margin:20px 0;border:2px solid #16a34a"><p style="margin:0;color:#16a34a;font-weight:bold">$10 credit added to your account</p></div></td></tr></table></body></html>`,
    features: ['Referral', 'Reward', 'Credit'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'payment-update-needed',
    name: 'Payment Update Needed',
    category: 'Transactional',
    description: 'Request payment method update',
    subject: 'Please update your payment method',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Payment Update</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#dc2626;margin:0;font-size:22px">Action Required</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Your payment method failed. Please update it to continue service.</p><div style="margin:25px 0"><a href="#" style="background:#dc2626;color:#fff;text-decoration:none;padding:14px 35px;border-radius:8px;font-weight:bold;display:inline-block">Update Payment</a></div></td></tr></table></body></html>`,
    features: ['Urgent', 'Payment', 'Action Required'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'workshop-invitation',
    name: 'Workshop Invitation',
    category: 'Events',
    description: 'Invite to educational workshop',
    subject: 'Join our free workshop',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Workshop</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef3c7"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:40px"><h1 style="color:#d97706;margin:0;font-size:22px">Free Workshop</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Learn valuable skills in our upcoming workshop. Limited seats available.</p><div style="background:#fef3c7;padding:20px;border-radius:8px;margin:20px 0"><p style="margin:0;color:#78350f"><strong>Date:</strong> March 30, 2024</p><p style="margin:5px 0 0;color:#78350f"><strong>Time:</strong> 2:00 PM - 4:00 PM</p><p style="margin:5px 0 0;color:#78350f"><strong>Location:</strong> Online</p></div><div style="margin:25px 0"><a href="#" style="background:#d97706;color:#fff;text-decoration:none;padding:14px 35px;border-radius:8px;font-weight:bold;display:inline-block">Register Now</a></div></td></tr></table></body></html>`,
    features: ['Educational', 'Free', 'Learning'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'account-upgrade',
    name: 'Account Upgrade',
    category: 'Transactional',
    description: 'Account upgraded successfully',
    subject: 'Congratulations! Your account has been upgraded',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Upgraded</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f0fdf4"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px"><tr><td style="padding:50px 40px;background:linear-gradient(135deg,#10b981,#059669);text-align:center"><h1 style="color:#fff;margin:0;font-size:28px">Upgraded!</h1><p style="color:#d1fae5;margin:10px 0 0">Premium Features Unlocked</p></td></tr><tr><td style="padding:40px"><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">Your account has been successfully upgraded to Premium. Enjoy all the premium features!</p><div style="background:#eff6ff;padding:20px;border-radius:8px"><p style="margin:0;color:#1f2937;font-weight:bold">New Premium Features:</p><ul style="margin:10px 0 0;padding-left:20px;color:#4b5563"><li>Advanced analytics</li><li>Priority support</li><li>Unlimited exports</li><li>Custom branding</li></ul></div></td></tr></table></body></html>`,
    features: ['Upgrade', 'Premium', 'Success'],
    isPopular: true,
    isNew: false
  },

  {
    id: 'wishlist-item-sale',
    name: 'Wishlist Item on Sale',
    category: 'E-commerce',
    description: 'Notify wishlist item price drop',
    subject: 'Items in your wishlist are now on sale!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Wishlist Sale</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#dc2626;margin:0;font-size:22px">Sale Alert!</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">Items in your wishlist are now on sale. Don't miss out!</p><div style="background:#fef2f2;padding:20px;border-radius:8px;margin:20px 0"><p style="margin:0;color:#991b1b"><strong>Save up to 40% on items you saved</strong></p></div><div style="margin:25px 0"><a href="#" style="background:#dc2626;color:#fff;text-decoration:none;padding:14px 35px;border-radius:8px;font-weight:bold;display:inline-block">View Sale</a></div></td></tr></table></body></html>`,
    features: ['Sale', 'Wishlist', 'Price Drop'],
    isPopular: true,
    isNew: true
  },

  {
    id: 'system-maintenance',
    name: 'System Maintenance',
    category: 'Business',
    description: 'Notify scheduled maintenance',
    subject: 'Scheduled System Maintenance Tonight',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Maintenance</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#f59e0b;margin:0;font-size:22px">Maintenance Notice</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">We'll be performing scheduled maintenance tonight from 12:00 AM to 4:00 AM EST. Services may be temporarily unavailable.</p><div style="background:#fffbeb;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #f59e0b"><p style="margin:0;color:#78350f"><strong>Maintenance Window:</strong></p><p style="margin:5px 0 0;color:#92400e">March 25, 12:00 AM - 4:00 AM EST</p></div></td></tr></table></body></html>`,
    features: ['Notice', 'Scheduled', 'Downtime'],
    isPopular: false,
    isNew: false
  },

  {
    id: 'last-chance-reminder',
    name: 'Last Chance Reminder',
    category: 'Marketing',
    description: 'Final reminder for limited offer',
    subject: 'Last 24 hours - Don\'t miss out!',
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Last Chance</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fef2f2"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:3px solid #dc2626;border-radius:8px"><tr><td style="padding:40px;text-align:center"><h1 style="color:#dc2626;margin:0;font-size:24px">LAST CHANCE!</h1><p style="color:#991b1b;margin:10px 0 0;font-weight:bold">Only 24 hours left</p></td></tr><tr><td style="padding:40px"><p style="color:#6b7280;margin:0 0 20px;line-height:1.6">This is your final reminder. The offer expires in just 24 hours.</p><div style="background:#dc2626;padding:25px;border-radius:8px;text-align:center;margin:25px 0"><p style="margin:0;color:#fff;font-size:18px;font-weight:bold">Don't miss out on this exclusive offer!</p></div><div style="text-align:center"><a href="#" style="background:#dc2626;color:#fff;text-decoration:none;padding:18px 50px;border-radius:8px;font-weight:bold;display:inline-block;font-size:18px">Claim Offer Now</a></div></td></tr></table></body></html>`,
    features: ['Urgency', 'Final', 'Limited Time'],
    isPopular: true,
    isNew: false
  }
]

