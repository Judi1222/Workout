const express = require('express');
const router = express.Router();
const{
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// GET all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id',getWorkout )

// POST a new workout
router.post('/', createWorkout)

// Delete a workout
router.delete('/:id', deleteWorkout) // Assuming '/' is the base path for workouts

// Update a workout
router.patch('/:id', updateWorkout)

module.exports = router;