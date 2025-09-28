const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced', 'complained'],
    default: 'active'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  customFields: {
    type: Map,
    of: String
  },
  source: {
    type: String,
    enum: ['manual', 'csv_import', 'api', 'form', 'other'],
    default: 'manual'
  },
  lastEmailSent: Date,
  lastEmailOpened: Date,
  lastEmailClicked: Date,
  unsubscribeToken: {
    type: String,
    unique: true,
    sparse: true
  },
  bounceCount: {
    type: Number,
    default: 0
  },
  complaintCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes
contactSchema.index({ userId: 1, email: 1 }, { unique: true });
contactSchema.index({ userId: 1, status: 1 });
contactSchema.index({ userId: 1, tags: 1 });
contactSchema.index({ userId: 1, createdAt: -1 });
contactSchema.index({ unsubscribeToken: 1 });

// Virtual for full contact info
contactSchema.virtual('contactInfo').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    status: this.status,
    tags: this.tags,
    createdAt: this.createdAt
  };
});

// Instance method to add tag
contactSchema.methods.addTag = function(tag) {
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
  }
  return this.save();
};

// Instance method to remove tag
contactSchema.methods.removeTag = function(tag) {
  this.tags = this.tags.filter(t => t !== tag);
  return this.save();
};

// Instance method to update status
contactSchema.methods.updateStatus = function(status) {
  this.status = status;
  if (status === 'unsubscribed') {
    this.unsubscribeToken = null;
  }
  return this.save();
};

// Static method to find by user and email
contactSchema.statics.findByUserAndEmail = function(userId, email) {
  return this.findOne({ userId, email: email.toLowerCase() });
};

// Static method to get user contacts with filters
contactSchema.statics.getUserContacts = function(userId, filters = {}) {
  const query = { userId };
  
  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }
  
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(filters.limit || 50)
    .skip(filters.skip || 0);
};

// Static method to get contact stats
contactSchema.statics.getContactStats = function(userId) {
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

module.exports = mongoose.model('Contact', contactSchema);
