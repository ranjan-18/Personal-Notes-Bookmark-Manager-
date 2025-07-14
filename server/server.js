const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors'); 
const dotenv = require('dotenv');
dotenv.config();

// 🔥 Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

const bookmarkRoutes = require('./routes/bookmarkRoutes');
app.use('/api/bookmarks', bookmarkRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB(); // Connect to MongoDB after server starts
});
