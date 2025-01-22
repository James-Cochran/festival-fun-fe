import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Users from './components/Users'

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path="/" element={ <HomePage /> } />
       <Route path="/users" element={ <Users /> } />
      </Routes>
    </div>
  );
}

export default App;
