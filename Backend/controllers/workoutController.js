const mongoose = require('mongoose'); // Import Mongoose
const Workout = require('../models/workoutModel'); // Use Workout instead of workout

//get all workouts 
const getWorkouts =async(req,res)=>{
  const workout =await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workout)
}

// get a single workouts
const getWorkout =async(req, res)=>{
  const {id} = req.params 
  if(!mongoose.Types.objectId.isValid(id)){
      return res.status(404).json({error:'Workout not found'})
  }

  const workout = await workout.findById(id)
  if (!workout) {
      return res.status(404).json({ error: 'Workout not defined' }); // Use 'defined' instead of 'found' for clarity
  }
  res.status(200).json(workout);
} 


//create new workout 
const createWorkout =async(req, res)=>{
  const { title, load, reps } = req.body;
  let emptyFields=[]
  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length>0){
    return res.status(400).json({error:'please fill all the fields', emptyFields})
  }
  //add doc to db
  try {
      const { title, load, reps } = req.body;
      const newWorkout = new Workout({ title, load, reps }); // Use Workout instead of workout
      const workout = await newWorkout.save(); // Save the new workout (asynchronous)
      res.status(200).json(workout);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
  
    res.status(200).json(workout);
  };


//update a workput 
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Workout not found' });
    }
  
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
  
    res.status(200).json(workout);
  };

module.exports ={
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
