const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true
  },
  page: {
    type: String,
    required: true
  },
  pageTitle: {
    type: String,
    default: ''
  },
  referrer: {
    type: String,
    default: ''
  },
  location: {
    country: String,
    city: String,
    timezone: String
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  browser: {
    type: String,
    default: ''
  },
  os: {
    type: String,
    default: ''
  },
  screenResolution: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

analyticsSchema.index({ visitorId: 1 });
analyticsSchema.index({ page: 1 });
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ device: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
