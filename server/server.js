const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes'); // ✅ Added

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ REGISTER ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/bookmarks', bookmarkRoutes); // ✅ Now correctly placed

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('❌ Mongo connection failed:', err));
