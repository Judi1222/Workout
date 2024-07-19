import { useEffect } from 'react'; // Import hooks
import { useWorkoutsContext } from '../Context/workoutContext.js';
// Components
import WorkoutDetails from '../Components/WorkoutDetails.js';
import WorkoutForm from '../Components/WorkoutForm.js'

const Home = () => {
  const{state, dispatch}=useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})

      }
    };

    fetchWorkouts();
  }, [dispatch]); // Empty dependency array for initial fetch

  return (
    <div className="home">
      <div className='workouts'>
        {state.workouts && state.workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
