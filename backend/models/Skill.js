const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: [true, 'Please add a skill name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills', 'Other']
  },
  percentage: {
    type: Number,
    required: [true, 'Please add proficiency percentage'],
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

skillSchema.index({ category: 1 });

module.exports = mongoose.model('Skill', skillSchema);
