import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Schedules.css';

const Schedules = () => {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    let url = 'http://localhost:3000/api/v1/schedules'

    if (userId) {
      url = `http://localhost:3000/api/v1/users/${userId}/schedules`
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('schedule data ', data)
        setSchedules(data.data) 
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching schedules:', err)
        setError('Failed to fetch schedules.')
        setLoading(false)
      })
  }, [userId])

  const deleteShow = (scheduleId, showId) => {  
    fetch(`http://localhost:3000/api/v1/schedules/${scheduleId}/shows/${showId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
  
        if (data.message) {
          setSchedules(prevSchedules => 
            prevSchedules.map(schedule => {
              if (schedule.id === scheduleId) {
                return {
                  ...schedule, 
                  attributes: {
                    ...schedule.attributes,
                    shows: (schedule.attributes.shows || []).filter(show => show.id !== showId)
                  } 
                }
              }
              return schedule
            })
          )
  
          setSuccessMessage('The show has been removed from this schedule.')
          
          setTimeout(() => setSuccessMessage(null), 3000)
        } else {
          console.error("Failed to delete show: ", data.error)
        }
      })
      .catch(error => {
        console.error("Error deleting show:", error)
      })
  }

  if (loading) return <p>Loading schedules...</p>
  if (error) return <p>{error}</p>

  return (
    <section className="schedules-container">
      <h2>Schedules</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <ul className="schedules-list">
        {schedules.map((schedule) => (
          <li key={schedule.id} className="schedule-specifics">
            <h3>{schedule.attributes.title}</h3>
            <ul>
              {schedule.attributes.shows && schedule.attributes.shows.length > 0 ? (
                schedule.attributes.shows.map((show, index) => {
                  console.log('show ', show)  
                  console.log('show id ', show.id)
                  return (
                    <li key={index} className="show-specifics" onClick={() => deleteShow(schedule.id, show.id)}>
                      <strong>{show.artist}</strong> - {show.genre} on {show.location}
                    </li>
                  )
                })
              ) : (
                <li>No shows scheduled</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
      <Link to={`/`}>
        <button className="Homepage">HomePage</button>
      </Link>
    </section>
  )
};

export default Schedules;
