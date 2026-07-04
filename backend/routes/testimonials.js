const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial
} = require('../controllers/testimonialController');

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', protect, admin, createTestimonial);
router.put('/:id', protect, admin, updateTestimonial);
router.delete('/:id', protect, admin, deleteTestimonial);
router.put('/:id/approve', protect, admin, approveTestimonial);

module.exports = router;
