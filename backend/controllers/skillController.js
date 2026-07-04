const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category) query.category = category;

    const skills = await Skill.find(query)
      .populate('createdBy', 'name')
      .sort({ order: 1, category: 1 });

    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      skills: grouped,
      allSkills: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
exports.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate('createdBy', 'name');

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.status(200).json({
      success: true,
      skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private/Admin
exports.createSkill = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
exports.updateSkill = async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
