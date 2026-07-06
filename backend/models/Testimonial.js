const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please add client name'],
    trim: true
  },
  clientPosition: {
    type: String,
    default: ''
  },
  clientCompany: {
    type: String,
    default: ''
  },
  clientImage: {
    type: String,
    default: ''
  },
  review: {
    type: String,
    required: [true, 'Please add review']
  },
  rating: {
    type: Number,
    required: [true, 'Please add rating'],
    min: 1,
    max: 5
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  approved: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
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

testimonialSchema.index({ approved: 1 });
testimonialSchema.index({ featured: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
