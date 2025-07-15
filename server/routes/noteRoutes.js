const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// 🔹 GET /api/notes?q=keyword (optional)
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const query = q
      ? {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { content: { $regex: q, $options: 'i' } },
            { tags: { $in: [q] } }
          ]
        }
      : {};

    const notes = await Note.find(query);
    res.json(notes);
  } catch (err) {
    console.error('❌ GET /api/notes error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 POST /api/notes
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const note = new Note({
      title,
      content,
      tags,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error('❌ POST /api/notes error:', err.message);
    res.status(500).json({ message: 'Failed to create note' });
  }
});

// 🔹 DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// 🔹 PUT /api/notes/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
