const express = require('express');
const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/overview
// @desc    Get analytics overview
// @access  Private
router.get('/overview', auth, async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get campaign statistics
    const campaignStats = await Campaign.aggregate([
      {
        $match: {
          userId: req.userId,
          sentAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSent: { $sum: '$statistics.totalSent' },
          totalDelivered: { $sum: '$statistics.totalDelivered' },
          totalOpened: { $sum: '$statistics.totalOpened' },
          totalClicked: { $sum: '$statistics.totalClicked' },
          totalBounced: { $sum: '$statistics.totalBounced' },
          totalUnsubscribed: { $sum: '$statistics.totalUnsubscribed' }
        }
      }
    ]);

    // Get contact statistics
    const contactStats = await Contact.aggregate([
      {
        $match: { userId: req.userId }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format contact stats
    const formattedContactStats = {
      total: 0,
      active: 0,
      unsubscribed: 0,
      bounced: 0,
      complained: 0
    };

    contactStats.forEach(stat => {
      formattedContactStats[stat._id] = stat.count;
      formattedContactStats.total += stat.count;
    });

    // Calculate rates
    const stats = campaignStats[0] || {
      totalSent: 0,
      totalDelivered: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalBounced: 0,
      totalUnsubscribed: 0
    };

    const openRate = stats.totalDelivered > 0 ? (stats.totalOpened / stats.totalDelivered * 100) : 0;
    const clickRate = stats.totalDelivered > 0 ? (stats.totalClicked / stats.totalDelivered * 100) : 0;
    const bounceRate = stats.totalSent > 0 ? (stats.totalBounced / stats.totalSent * 100) : 0;
    const unsubscribeRate = stats.totalDelivered > 0 ? (stats.totalUnsubscribed / stats.totalDelivered * 100) : 0;

    res.json({
      success: true,
      data: {
        emailStats: {
          totalSent: stats.totalSent,
          totalDelivered: stats.totalDelivered,
          totalOpened: stats.totalOpened,
          totalClicked: stats.totalClicked,
          totalBounced: stats.totalBounced,
          totalUnsubscribed: stats.totalUnsubscribed,
          openRate: parseFloat(openRate.toFixed(2)),
          clickRate: parseFloat(clickRate.toFixed(2)),
          bounceRate: parseFloat(bounceRate.toFixed(2)),
          unsubscribeRate: parseFloat(unsubscribeRate.toFixed(2))
        },
        contactStats: formattedContactStats,
        timeRange
      }
    });
  } catch (error) {
    console.error('Get analytics overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics overview'
    });
  }
});

// @route   GET /api/analytics/campaigns
// @desc    Get campaign performance data
// @access  Private
router.get('/campaigns', auth, async (req, res) => {
  try {
    const { timeRange = '30d', limit = 10 } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const campaigns = await Campaign.find({
      userId: req.userId,
      sentAt: { $gte: startDate },
      status: 'sent'
    })
    .select('name subject statistics sentAt')
    .sort({ sentAt: -1 })
    .limit(parseInt(limit));

    const campaignPerformance = campaigns.map(campaign => ({
      name: campaign.name,
      subject: campaign.subject,
      sent: campaign.statistics.totalSent,
      delivered: campaign.statistics.totalDelivered,
      opened: campaign.statistics.totalOpened,
      clicked: campaign.statistics.totalClicked,
      openRate: campaign.statistics.openRate,
      clickRate: campaign.statistics.clickRate,
      sentAt: campaign.sentAt
    }));

    res.json({
      success: true,
      data: { campaignPerformance }
    });
  } catch (error) {
    console.error('Get campaign performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign performance data'
    });
  }
});

// @route   GET /api/analytics/trends
// @desc    Get email performance trends
// @access  Private
router.get('/trends', auth, async (req, res) => {
  try {
    const { timeRange = '30d', metric = 'openRate' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get daily trends
    const trends = await Campaign.aggregate([
      {
        $match: {
          userId: req.userId,
          sentAt: { $gte: startDate },
          status: 'sent'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$sentAt'
            }
          },
          totalSent: { $sum: '$statistics.totalSent' },
          totalDelivered: { $sum: '$statistics.totalDelivered' },
          totalOpened: { $sum: '$statistics.totalOpened' },
          totalClicked: { $sum: '$statistics.totalClicked' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Calculate rates for each day
    const trendData = trends.map(trend => {
      const openRate = trend.totalDelivered > 0 ? (trend.totalOpened / trend.totalDelivered * 100) : 0;
      const clickRate = trend.totalDelivered > 0 ? (trend.totalClicked / trend.totalDelivered * 100) : 0;
      
      return {
        date: trend._id,
        openRate: parseFloat(openRate.toFixed(2)),
        clickRate: parseFloat(clickRate.toFixed(2)),
        totalSent: trend.totalSent,
        totalDelivered: trend.totalDelivered,
        totalOpened: trend.totalOpened,
        totalClicked: trend.totalClicked
      };
    });

    res.json({
      success: true,
      data: { trendData }
    });
  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trends data'
    });
  }
});

// @route   GET /api/analytics/device-breakdown
// @desc    Get device breakdown data
// @access  Private
router.get('/device-breakdown', auth, async (req, res) => {
  try {
    // Mock device data - in a real implementation, this would come from tracking pixels
    const deviceData = [
      { name: 'Desktop', value: 45, color: '#3B82F6' },
      { name: 'Mobile', value: 35, color: '#10B981' },
      { name: 'Tablet', value: 20, color: '#F59E0B' }
    ];

    res.json({
      success: true,
      data: { deviceData }
    });
  } catch (error) {
    console.error('Get device breakdown error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch device breakdown data'
    });
  }
});

// @route   GET /api/analytics/top-content
// @desc    Get top performing content
// @access  Private
router.get('/top-content', auth, async (req, res) => {
  try {
    const { timeRange = '30d', limit = 5 } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const topContent = await Campaign.find({
      userId: req.userId,
      sentAt: { $gte: startDate },
      status: 'sent'
    })
    .select('subject statistics')
    .sort({ 'statistics.openRate': -1 })
    .limit(parseInt(limit));

    const contentData = topContent.map(campaign => ({
      subject: campaign.subject,
      openRate: campaign.statistics.openRate,
      clickRate: campaign.statistics.clickRate,
      totalSent: campaign.statistics.totalSent
    }));

    res.json({
      success: true,
      data: { contentData }
    });
  } catch (error) {
    console.error('Get top content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top content data'
    });
  }
});

// @route   GET /api/analytics/geographic
// @desc    Get geographic data
// @access  Private
router.get('/geographic', auth, async (req, res) => {
  try {
    // Mock geographic data - in a real implementation, this would come from IP tracking
    const geographicData = [
      { country: 'United States', opens: 1250, clicks: 89 },
      { country: 'Canada', opens: 456, clicks: 34 },
      { country: 'United Kingdom', opens: 789, clicks: 56 },
      { country: 'Australia', opens: 234, clicks: 18 },
      { country: 'Germany', opens: 567, clicks: 42 }
    ];

    res.json({
      success: true,
      data: { geographicData }
    });
  } catch (error) {
    console.error('Get geographic data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch geographic data'
    });
  }
});

module.exports = router;
