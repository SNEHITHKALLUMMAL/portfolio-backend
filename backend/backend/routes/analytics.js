const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getDashboardStats,
  trackVisitor,
  getVisitors,
  updateDuration
} = require('../controllers/analyticsController');

router.get('/dashboard', protect, admin, getDashboardStats);
router.post('/track', trackVisitor);
router.get('/visitors', protect, admin, getVisitors);
router.put('/duration', updateDuration);

module.exports = router;
