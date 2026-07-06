const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getEducation,
  getEducationItem,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/educationController');

router.get('/', getEducation);
router.get('/:id', getEducationItem);
router.post('/', protect, admin, createEducation);
router.put('/:id', protect, admin, updateEducation);
router.delete('/:id', protect, admin, deleteEducation);

module.exports = router;
