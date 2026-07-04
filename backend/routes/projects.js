const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages
} = require('../controllers/projectController');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);
router.post('/:id/images', protect, admin, uploadProjectImages);

module.exports = router;
