require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const { errorHandler } = require('./middlewares/error');

// Middlewares
app.use(express.json());


// Not found handler
app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found: ${req.originalUrl}`);
    next(error);
});


// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Asset Tracker API is running on http://localhost:${port}`);
});