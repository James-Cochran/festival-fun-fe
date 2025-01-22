import React from 'react';
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Festival Fun Admin</h1>
      <div className="navigation-buttons">
        <Link to={"/users"}>
        <button className='users'> Users </button>
        </Link>
        <button onClick={() => console.log('Navigate to Schedules')}>Schedules</button>
      </div>
    </div>
  );
};

export default HomePage;