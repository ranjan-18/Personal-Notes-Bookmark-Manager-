const Note = require('../models/Note');

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags, isFavorite } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const note = await Note.create({
      title,
      content,
      tags,
      isFavorite,
      userId: req.user._id
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all notes for the logged-in user (with optional search/tags)
// @route   GET /api/notes
// @access  Private
exports.getNotes = async (req, res) => {
  try {
    const { q, tags } = req.query;

    const filter = { userId: req.user._id };

    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }

    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Private
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
