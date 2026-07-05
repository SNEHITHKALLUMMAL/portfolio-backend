const Analytics = require('../models/Analytics');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalVisitors = await Analytics.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalBlogs = await Blog.countDocuments({ status: 'published' });
    const totalInquiries = await Contact.countDocuments();
    const pendingInquiries = await Contact.countDocuments({ status: 'pending' });

    // Get monthly statistics
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    
    const monthlyVisitors = await Analytics.countDocuments({
      timestamp: { $gte: oneMonthAgo }
    });

    // Get device analytics
    const deviceStats = await Analytics.aggregate([
      {
        $group: {
          _id: '$device',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get traffic sources
    const sourceStats = await Analytics.aggregate([
      {
        $group: {
          _id: '$referrer',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get page views
    const pageStats = await Analytics.aggregate([
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalVisitors,
        totalProjects,
        totalBlogs,
        totalInquiries,
        pendingInquiries,
        monthlyVisitors,
        deviceStats,
        sourceStats,
        pageStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Track visitor
// @route   POST /api/analytics/track
// @access  Public
exports.trackVisitor = async (req, res) => {
  try {
    const { visitorId, page, pageTitle, referrer, device, browser, os, screenResolution } = req.body;

    const analytics = await Analytics.create({
      visitorId,
      page,
      pageTitle,
      referrer,
      device,
      browser,
      os,
      screenResolution
    });

    res.status(201).json({
      success: true,
      analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get visitor data
// @route   GET /api/analytics/visitors
// @access  Private/Admin
exports.getVisitors = async (req, res) => {
  try {
    const { page = 1, limit = 50, startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const visitors = await Analytics.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Analytics.countDocuments(query);

    res.status(200).json({
      success: true,
      count: visitors.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      visitors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update session duration
// @route   PUT /api/analytics/duration
// @access  Public
exports.updateDuration = async (req, res) => {
  try {
    const { visitorId, duration } = req.body;

    const analytics = await Analytics.findOne({ visitorId }).sort({ timestamp: -1 });

    if (analytics) {
      analytics.duration = duration;
      await analytics.save();
    }

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
