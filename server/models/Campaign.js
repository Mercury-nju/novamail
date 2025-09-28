const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true,
    maxlength: [100, 'Campaign name cannot exceed 100 characters']
  },
  subject: {
    type: String,
    required: [true, 'Email subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  body: {
    type: String,
    required: [true, 'Email body is required']
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled'],
    default: 'draft'
  },
  type: {
    type: String,
    enum: ['promotional', 'newsletter', 'transactional', 'welcome', 'other'],
    default: 'promotional'
  },
  style: {
    type: String,
    enum: ['formal', 'casual', 'promotional'],
    default: 'casual'
  },
  recipients: [{
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    },
    email: String,
    name: String,
    status: {
      type: String,
      enum: ['pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed'],
      default: 'pending'
    },
    sentAt: Date,
    deliveredAt: Date,
    openedAt: Date,
    clickedAt: Date,
    bouncedAt: Date,
    unsubscribeToken: String
  }],
  scheduledAt: Date,
  sentAt: Date,
  completedAt: Date,
  settings: {
    trackOpens: {
      type: Boolean,
      default: true
    },
    trackClicks: {
      type: Boolean,
      default: true
    },
    includeUnsubscribeLink: {
      type: Boolean,
      default: true
    },
    fromName: String,
    fromEmail: String,
    replyTo: String
  },
  statistics: {
    totalSent: {
      type: Number,
      default: 0
    },
    totalDelivered: {
      type: Number,
      default: 0
    },
    totalOpened: {
      type: Number,
      default: 0
    },
    totalClicked: {
      type: Number,
      default: 0
    },
    totalBounced: {
      type: Number,
      default: 0
    },
    totalUnsubscribed: {
      type: Number,
      default: 0
    },
    openRate: {
      type: Number,
      default: 0
    },
    clickRate: {
      type: Number,
      default: 0
    },
    bounceRate: {
      type: Number,
      default: 0
    }
  },
  aiGenerated: {
    type: Boolean,
    default: false
  },
  aiPrompt: String,
  aiModel: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
campaignSchema.index({ userId: 1, status: 1 });
campaignSchema.index({ userId: 1, createdAt: -1 });
campaignSchema.index({ userId: 1, sentAt: -1 });
campaignSchema.index({ scheduledAt: 1 });
campaignSchema.index({ 'recipients.email': 1 });

// Virtual for recipient count
campaignSchema.virtual('recipientCount').get(function() {
  return this.recipients.length;
});

// Virtual for campaign performance
campaignSchema.virtual('performance').get(function() {
  const stats = this.statistics;
  return {
    openRate: stats.totalDelivered > 0 ? (stats.totalOpened / stats.totalDelivered * 100).toFixed(2) : 0,
    clickRate: stats.totalDelivered > 0 ? (stats.totalClicked / stats.totalDelivered * 100).toFixed(2) : 0,
    bounceRate: stats.totalSent > 0 ? (stats.totalBounced / stats.totalSent * 100).toFixed(2) : 0
  };
});

// Instance method to add recipient
campaignSchema.methods.addRecipient = function(contact) {
  const existingRecipient = this.recipients.find(r => r.email === contact.email);
  if (!existingRecipient) {
    this.recipients.push({
      contactId: contact._id,
      email: contact.email,
      name: contact.name,
      status: 'pending'
    });
  }
  return this.save();
};

// Instance method to update recipient status
campaignSchema.methods.updateRecipientStatus = function(email, status, additionalData = {}) {
  const recipient = this.recipients.find(r => r.email === email);
  if (recipient) {
    recipient.status = status;
    if (status === 'sent') recipient.sentAt = new Date();
    if (status === 'delivered') recipient.deliveredAt = new Date();
    if (status === 'opened') recipient.openedAt = new Date();
    if (status === 'clicked') recipient.clickedAt = new Date();
    if (status === 'bounced') recipient.bouncedAt = new Date();
    
    Object.assign(recipient, additionalData);
  }
  return this.save();
};

// Instance method to calculate statistics
campaignSchema.methods.calculateStatistics = function() {
  const stats = {
    totalSent: 0,
    totalDelivered: 0,
    totalOpened: 0,
    totalClicked: 0,
    totalBounced: 0,
    totalUnsubscribed: 0
  };

  this.recipients.forEach(recipient => {
    if (['sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed'].includes(recipient.status)) {
      stats.totalSent++;
    }
    if (['delivered', 'opened', 'clicked'].includes(recipient.status)) {
      stats.totalDelivered++;
    }
    if (['opened', 'clicked'].includes(recipient.status)) {
      stats.totalOpened++;
    }
    if (recipient.status === 'clicked') {
      stats.totalClicked++;
    }
    if (recipient.status === 'bounced') {
      stats.totalBounced++;
    }
    if (recipient.status === 'unsubscribed') {
      stats.totalUnsubscribed++;
    }
  });

  this.statistics = {
    ...stats,
    openRate: stats.totalDelivered > 0 ? (stats.totalOpened / stats.totalDelivered * 100) : 0,
    clickRate: stats.totalDelivered > 0 ? (stats.totalClicked / stats.totalDelivered * 100) : 0,
    bounceRate: stats.totalSent > 0 ? (stats.totalBounced / stats.totalSent * 100) : 0
  };

  return this.save();
};

// Static method to get user campaigns
campaignSchema.statics.getUserCampaigns = function(userId, filters = {}) {
  const query = { userId };
  
  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.type) {
    query.type = filters.type;
  }
  
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { subject: { $regex: filters.search, $options: 'i' } }
    ];
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(filters.limit || 20)
    .skip(filters.skip || 0);
};

// Static method to get campaign stats
campaignSchema.statics.getCampaignStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Campaign', campaignSchema);
