const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');

router.get('/', getExperiences);
router.get('/:id', getExperience);
router.post('/', protect, admin, createExperience);
router.put('/:id', protect, admin, updateExperience);
router.delete('/:id', protect, admin, deleteExperience);

module.exports = router;
