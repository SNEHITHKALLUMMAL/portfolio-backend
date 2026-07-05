const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');

router.get('/', getSkills);
router.get('/:id', getSkill);
router.post('/', protect, admin, createSkill);
router.put('/:id', protect, admin, updateSkill);
router.delete('/:id', protect, admin, deleteSkill);

module.exports = router;
