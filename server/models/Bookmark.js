const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'URL is required'],
    match: [/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/, 'Invalid URL']
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
