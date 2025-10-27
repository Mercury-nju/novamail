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
    htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Review Request</title></head><body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#fff"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff"><tr><td style="padding:40px"><h1 style="color:#1f2937;margin:0;font-size:22px">How was your purchase?</h1><p style="color:#6b7280;margin:15px 0 0;line-height:1.6">We'd love to hear about your experience.</p></td></tr></table></body></html>`,
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
  }
]

