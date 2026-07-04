const User = require('../models/User');
const upload = require('../utils/upload');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio, phone, location, socialLinks } = req.body;

    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (socialLinks) user.socialLinks = socialLinks;

    await user.save();

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/user/avatar
// @access  Private
exports.uploadAvatar = async (req, res) => {
  try {
    upload.single('avatar')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }

      const user = await User.findById(req.user.id);
      user.avatar = `/uploads/${req.file.filename}`;
      await user.save();

      res.status(200).json({
        success: true,
        user
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload resume
// @route   POST /api/user/resume
// @access  Private
exports.uploadResume = async (req, res) => {
  try {
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }

      const user = await User.findById(req.user.id);
      user.resume = `/uploads/${req.file.filename}`;
      await user.save();

      res.status(200).json({
        success: true,
        user
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get public profile
// @route   GET /api/user/public
// @access  Public
exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ role: 'admin' }).select('-password -failedLoginAttempts -lockUntil');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
