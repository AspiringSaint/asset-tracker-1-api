require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const { errorHandler } = require('./middlewares/error');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Middlewares
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Not found handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found: ${req.originalUrl}`);
  next(error);
});

// Global error handler
app.use(errorHandler);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => {
    console.log(`Asset Tracker API is running on http://localhost:${port}`);
  });
})
.catch(err => console.error(`MongoDB connection error: ${err.message}`));