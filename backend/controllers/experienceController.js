const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate('createdBy', 'name')
      .sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).populate('createdBy', 'name');

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      success: true,
      experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private/Admin
exports.createExperience = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
exports.updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
