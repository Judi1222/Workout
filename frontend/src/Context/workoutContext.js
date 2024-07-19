import { createContext,useReducer,useContext, useEffect } from 'react';

// Components
import WorkoutDetails from '../Components/WorkoutDetails.js';
import WorkoutForm from '../Components/WorkoutForm.js'

const Home = () => {
  const{workouts, dispatch}=useWorkoutsContext()

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
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
export const WorkoutContext = createContext();

const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
    return{
      workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
    }
    
    default:
      return state;
  }
};

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error('useWorkoutsContext must be used inside a WorkoutContextProvider');
  }

  return context;
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};


 