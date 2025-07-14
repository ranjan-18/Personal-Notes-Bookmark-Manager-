const Bookmark = require('../models/Bookmark');
const fetchTitleFromURL = require('../utils/fetchTitleFromURL');

// @desc    Create bookmark
// @route   POST /api/bookmarks
// @access  Private
exports.createBookmark = async (req, res) => {
  try {
    let { url, title, description, tags, isFavorite } = req.body;

    if (!url) return res.status(400).json({ message: 'URL is required' });

    // Auto-fetch title if not provided
    if (!title) {
      title = await fetchTitleFromURL(url);
    }

    const bookmark = await Bookmark.create({
      url,
      title,
      description,
      tags,
      isFavorite,
      userId: req.user._id
    });

    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all bookmarks (search + tags)
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags } = req.query;

    const filter = { userId: req.user._id };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single bookmark
// @route   GET /api/bookmarks/:id
// @access  Private
exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user._id });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    res.status(200).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update bookmark
// @route   PUT /api/bookmarks/:id
// @access  Private
exports.updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    res.status(200).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });

    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
