const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors'); 
const dotenv = require('dotenv');
dotenv.config();

// 🔥 Middleware to parse JSON bodies
app.use(express.json());



app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://personal-notes-bookmark-manager-wp7.vercel.app'
  ],
  credentials: true
}));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

const bookmarkRoutes = require('./routes/bookmarkRoutes');
app.use('/api/bookmarks', bookmarkRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // 👈 this enables /api/auth/register


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
     // Connect to MongoDB after server starts
});
