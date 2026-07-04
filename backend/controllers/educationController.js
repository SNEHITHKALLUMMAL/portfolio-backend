const Education = require('../models/Education');

// @desc    Get all education
// @route   GET /api/education
// @access  Public
exports.getEducation = async (req, res) => {
  try {
    const { type } = req.query;

    let query = {};
    if (type) query.type = type;

    const education = await Education.find(query)
      .populate('createdBy', 'name')
      .sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Public
exports.getEducationItem = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id).populate('createdBy', 'name');

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found'
      });
    }

    res.status(200).json({
      success: true,
      education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new education
// @route   POST /api/education
// @access  Private/Admin
exports.createEducation = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private/Admin
exports.updateEducation = async (req, res) => {
  try {
    let education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found'
      });
    }

    education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private/Admin
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found'
      });
    }

    await education.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Education deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
