require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to DB (using async/await)
async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://Judi12:Judi2002@cluster0.7wqurzs.mongodb.net/?retryWrites=true&w=majority', {
      // Remove the deprecated options
    });
    console.log('Connected to database');
      //routes
      app.use('/api/workouts', workoutRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();