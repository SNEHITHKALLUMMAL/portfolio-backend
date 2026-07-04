const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  uploadResume,
  getPublicProfile
} = require('../controllers/userController');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/avatar', protect, uploadAvatar);
router.post('/resume', protect, uploadResume);
router.get('/public', getPublicProfile);

module.exports = router;
