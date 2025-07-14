const express = require('express');
const router = express.Router();
const {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');

const { protect } = require('../middleware/authMiddleware');

// Secure all bookmark routes
router.post('/', protect, createBookmark);
router.get('/', protect, getBookmarks);
router.get('/:id', protect, getBookmarkById);
router.put('/:id', protect, updateBookmark);
router.delete('/:id', protect, deleteBookmark);

module.exports = router;
