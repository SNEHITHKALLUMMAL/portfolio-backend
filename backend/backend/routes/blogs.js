const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getBlogs,
  getBlogBySlug,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  approveComment,
  uploadCoverImage
} = require('../controllers/blogController');

router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', protect, admin, getBlog);
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);
router.post('/:id/comments', addComment);
router.put('/:id/comments/:commentId', protect, admin, approveComment);
router.post('/:id/cover', protect, admin, uploadCoverImage);

module.exports = router;
