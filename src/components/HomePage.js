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
        <Link to={"/schedules"}>
        <button className='schedules'> Schedules </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;