const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS yahan hai
const path = require('path'); // Path module ko import karna
require('dotenv').config();

// Route files ko import karna
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // CORS middleware frontend se request allow karta hai
app.use(express.json()); // JSON data ko samajhne ke liye

// --- Frontend Files Ko Serve Karna ---
// 'public' naam ke folder se static files (HTML, CSS, JS) serve karein
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly serve index.html for the root route '/' to fix 404 error
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            // Agar file nahi milti hai to yeh helpful error message bhejega
            res.status(404).send("Homepage not found. Please ensure you have a 'public' folder with 'index.html' inside it at your backend's root directory.");
        }
    });
});


// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB se safaltapoorvak connect ho gaya!');
  } catch (error) {
    console.error('MongoDB connection fail ho gaya:', error.message);
    process.exit(1);
  }
};
connectDB();


// API Routes ka istemal
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});