const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

// Secure all note routes
router.post('/', protect, createNote);
router.get('/', protect, getNotes);
router.get('/:id', protect, getNoteById);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

module.exports = router;
