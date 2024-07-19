import { useContext } from 'react';
import { WorkoutContext } from '../Context/workoutContext';

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
  }

  return context;
};