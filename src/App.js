import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Users from './components/Users'
import Schedules from './components/Schedules'

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path="/" element={ <HomePage /> } />
       <Route path="/users" element={ <Users /> } />
       <Route path="/users/:userId/schedules" element={<Schedules />} />
       <Route path="/schedules" element={<Schedules />} />
      </Routes>
    </div>
  )
}

export default App;
