const express = require('express');
const app=express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors'); 
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});