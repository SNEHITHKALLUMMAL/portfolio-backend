const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  images: [{
    type: String
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Web Development', 'Mobile App', 'UI/UX Design', 'Machine Learning', 'Data Science', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create text index for search
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });

module.exports = mongoose.model('Project', projectSchema);
