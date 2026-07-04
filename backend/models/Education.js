const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Please add institution name'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Please add degree'],
    trim: true
  },
  field: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    required: [true, 'Please add start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add end date']
  },
  current: {
    type: Boolean,
    default: false
  },
  grade: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['degree', 'certification', 'course', 'bootcamp'],
    default: 'degree'
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

educationSchema.index({ startDate: -1 });

module.exports = mongoose.model('Education', educationSchema);
