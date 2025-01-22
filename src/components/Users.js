import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Users.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users')  
      .then((response) => response.json())
      .then((data) => {
        const sortedUsers = data.data.sort((a, b) => {
          const nameA = `${a.attributes.first_name} ${a.attributes.last_name}`
          const nameB = `${b.attributes.first_name} ${b.attributes.last_name}`
          return nameA.localeCompare(nameB)
        })
        setUsers(data.data)
        setLoading(false) 
      })
      .catch((err) => {
        setError('Failed to fetch users.')
        setLoading(false)
      });
  }, []) 
  if (loading) return <p>Loading users...</p>
  if (error) return <p>{error}</p>

  return (
    <section className="users-container">
      <h2>Users List</h2>
      <ul className="users-list">
        {users.map((user) => (
          <Link to={`/users/${user.id}/schedules`} className="user-specifics-link">
            <li className="user-specifics" key={user.id}>
              {user.attributes.first_name} {user.attributes.last_name} ({user.attributes.email})
            </li>
          </Link>
        ))}
      </ul>
      <Link to={`/`}>
        <button className="Homepage">HomePage</button>
      </Link>
    </section>
  );
};

export default Users;
