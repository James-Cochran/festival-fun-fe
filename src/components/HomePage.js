import React from 'react';
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Festival Fun Admin</h1>
      <div className="navigation-buttons">
        <button onClick={() => console.log('Navigate to Users')}>Users</button>
        <button onClick={() => console.log('Navigate to Schedules')}>Schedules</button>
      </div>
    </div>
  );
};

export default HomePage;