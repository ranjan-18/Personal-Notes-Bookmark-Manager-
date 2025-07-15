const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// 🔹 GET /api/bookmarks
router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (err) {
    console.error('❌ GET bookmarks error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 POST /api/bookmarks
router.post('/', async (req, res) => {
  try {
    const { url, title, description, tags } = req.body;
    const bookmark = new Bookmark({ url, title, description, tags });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    console.error('❌ POST bookmarks error:', err.message);
    res.status(500).json({ message: 'Failed to add bookmark' });
  }
});

module.exports = router;
