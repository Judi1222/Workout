import React from 'react';
import{ BrowserRouter, Routes, Route} from 'react-router-dom'
//pages and components
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import { WorkoutContextProvider } from './Context/workoutContext';
function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <WorkoutContextProvider>
      <Navbar/>
      <div className='pages'>
        <Routes>
        <Route path="/" element={<Home />} />  {/* Assuming "/" is the path for Home */}
        </Routes>
      </div>
      </WorkoutContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
