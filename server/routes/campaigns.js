const express = require('express');
const { body, validationResult } = require('express-validator');
const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/campaigns
// @desc    Get user's campaigns
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      type,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filters = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      status,
      type,
      search
    };

    const campaigns = await Campaign.getUserCampaigns(req.userId, filters);
    const totalCampaigns = await Campaign.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      data: {
        campaigns,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCampaigns / parseInt(limit)),
          totalCampaigns,
          hasNext: parseInt(page) * parseInt(limit) < totalCampaigns,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns'
    });
  }
});

// @route   GET /api/campaigns/stats
// @desc    Get campaign statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await Campaign.getCampaignStats(req.userId);
    const totalCampaigns = await Campaign.countDocuments({ userId: req.userId });

    // Format stats
    const formattedStats = {
      total: totalCampaigns,
      draft: 0,
      scheduled: 0,
      sent: 0,
      paused: 0,
      cancelled: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Get campaign stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign statistics'
    });
  }
});

// @route   POST /api/campaigns
// @desc    Create a new campaign
// @access  Private
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Campaign name is required'),
  body('subject').trim().notEmpty().withMessage('Email subject is required'),
  body('body').trim().notEmpty().withMessage('Email body is required'),
  body('type').optional().isIn(['promotional', 'newsletter', 'transactional', 'welcome', 'other']).withMessage('Invalid campaign type'),
  body('style').optional().isIn(['formal', 'casual', 'promotional']).withMessage('Invalid email style'),
  body('scheduledAt').optional().isISO8601().withMessage('Invalid scheduled date format'),
  body('settings').optional().isObject().withMessage('Settings must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      subject,
      body,
      type = 'promotional',
      style = 'casual',
      scheduledAt,
      settings = {},
      aiGenerated = false,
      aiPrompt,
      aiModel
    } = req.body;

    // Create new campaign
    const campaign = new Campaign({
      userId: req.userId,
      name,
      subject,
      body,
      type,
      style,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      settings: {
        trackOpens: true,
        trackClicks: true,
        includeUnsubscribeLink: true,
        ...settings
      },
      aiGenerated,
      aiPrompt,
      aiModel
    });

    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: { campaign }
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create campaign'
    });
  }
});

// @route   GET /api/campaigns/:id
// @desc    Get a specific campaign
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      data: { campaign }
    });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign'
    });
  }
});

// @route   PUT /api/campaigns/:id
// @desc    Update a campaign
// @access  Private
router.put('/:id', [
  auth,
  body('name').optional().trim().notEmpty().withMessage('Campaign name cannot be empty'),
  body('subject').optional().trim().notEmpty().withMessage('Email subject cannot be empty'),
  body('body').optional().trim().notEmpty().withMessage('Email body cannot be empty'),
  body('type').optional().isIn(['promotional', 'newsletter', 'transactional', 'welcome', 'other']).withMessage('Invalid campaign type'),
  body('style').optional().isIn(['formal', 'casual', 'promotional']).withMessage('Invalid email style'),
  body('scheduledAt').optional().isISO8601().withMessage('Invalid scheduled date format'),
  body('settings').optional().isObject().withMessage('Settings must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      subject,
      body,
      type,
      style,
      scheduledAt,
      settings
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (subject) updateData.subject = subject;
    if (body) updateData.body = body;
    if (type) updateData.type = type;
    if (style) updateData.style = style;
    if (scheduledAt) updateData.scheduledAt = new Date(scheduledAt);
    if (settings) updateData.settings = { ...updateData.settings, ...settings };

    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: { campaign }
    });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update campaign'
    });
  }
});

// @route   DELETE /api/campaigns/:id
// @desc    Delete a campaign
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete campaign'
    });
  }
});

// @route   POST /api/campaigns/:id/recipients
// @desc    Add recipients to campaign
// @access  Private
router.post('/:id/recipients', [
  auth,
  body('contactIds').isArray().withMessage('Contact IDs must be an array'),
  body('contactIds.*').isMongoId().withMessage('Invalid contact ID format')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { contactIds } = req.body;

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Get contacts
    const contacts = await Contact.find({
      _id: { $in: contactIds },
      userId: req.userId,
      status: 'active'
    });

    // Add recipients to campaign
    for (const contact of contacts) {
      await campaign.addRecipient(contact);
    }

    res.json({
      success: true,
      message: `${contacts.length} recipients added to campaign`,
      data: { campaign }
    });
  } catch (error) {
    console.error('Add recipients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add recipients to campaign'
    });
  }
});

// @route   POST /api/campaigns/:id/send
// @desc    Send campaign
// @access  Private
router.post('/:id/send', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
      return res.status(400).json({
        success: false,
        message: 'Campaign cannot be sent in its current status'
      });
    }

    if (campaign.recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Campaign has no recipients'
      });
    }

    // Update campaign status
    campaign.status = 'sending';
    campaign.sentAt = new Date();
    await campaign.save();

    // In a real implementation, you would:
    // 1. Queue the emails for sending
    // 2. Use a service like SendGrid, Mailgun, or AWS SES
    // 3. Track delivery, opens, and clicks
    // 4. Update recipient statuses

    // For demo purposes, simulate sending
    setTimeout(async () => {
      try {
        // Update all recipients to "sent" status
        campaign.recipients.forEach(recipient => {
          recipient.status = 'sent';
          recipient.sentAt = new Date();
        });

        campaign.status = 'sent';
        campaign.completedAt = new Date();
        await campaign.save();
      } catch (error) {
        console.error('Campaign send simulation error:', error);
      }
    }, 2000);

    res.json({
      success: true,
      message: 'Campaign is being sent',
      data: { campaign }
    });
  } catch (error) {
    console.error('Send campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send campaign'
    });
  }
});

// @route   POST /api/campaigns/:id/pause
// @desc    Pause campaign
// @access  Private
router.post('/:id/pause', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: 'paused' },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      message: 'Campaign paused successfully',
      data: { campaign }
    });
  } catch (error) {
    console.error('Pause campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to pause campaign'
    });
  }
});

// @route   POST /api/campaigns/:id/resume
// @desc    Resume campaign
// @access  Private
router.post('/:id/resume', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: 'sending' },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      message: 'Campaign resumed successfully',
      data: { campaign }
    });
  } catch (error) {
    console.error('Resume campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resume campaign'
    });
  }
});

// @route   GET /api/campaigns/:id/recipients
// @desc    Get campaign recipients
// @access  Private
router.get('/:id/recipients', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      userId: req.userId
    }).select('recipients');

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      data: { recipients: campaign.recipients }
    });
  } catch (error) {
    console.error('Get campaign recipients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign recipients'
    });
  }
});

module.exports = router;
