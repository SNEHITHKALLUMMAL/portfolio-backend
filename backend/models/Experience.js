const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please add company name'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Please add designation'],
    trim: true
  },
  location: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    required: [true, 'Please add start date']
  },
  endDate: {
    type: Date,
    default: null
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  achievements: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    default: 'full-time'
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

experienceSchema.index({ startDate: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
