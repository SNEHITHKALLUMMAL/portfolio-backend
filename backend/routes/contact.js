const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

router.post('/', createContact);
router.get('/', protect, admin, getContacts);
router.get('/:id', protect, admin, getContact);
router.put('/:id', protect, admin, updateContact);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
