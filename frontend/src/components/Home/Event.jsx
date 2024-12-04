import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios.config';
import getEvent from '../../controllers/getEvent';

function Event({ eventid }) {
  const [event, setEvent] = useState(null);
  const [organizerName, setOrganizerName] = useState('');

  function getDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await getEvent(eventid);
      setEvent(eventData);
    };

    fetchEvent();
  }, [eventid]);

  useEffect(() => {
    const showOrg = async () => {
      try {
        const orgId = event.createdBy;
        const response = await axiosInstance.get(`/org/${orgId}`);
        setOrganizerName(response.data.name);
      } catch (error) {
        console.error('Error fetching organizer:', error);
      }
    };

    if (event && event.createdBy) {
      showOrg();
    }
  }, [event]);

  return (
    <div
      className="card m-auto mt-5 shadow-sm w-75 card-custom"
      style={{
        background: 'linear-gradient(135deg, #2c3e50, #4c5c68)',
        borderRadius: '15px',
        padding: '20px',
      }}
    >
      {event === null ? (
        <div>Loading...</div>
      ) : (
        <div className="card-body text-white">
          <h5 className="card-title text-warning text-center pd-4">
            {event.type.toUpperCase()}
          </h5>
          <h6 className="card-subtitle mb-2 text-light">
            {event.title.toUpperCase()}
          </h6>
          <p className="card-text">
            Event Date: <strong>{getDate(event.eventDate)}</strong>
          </p>
          <p className="card-text">
            Available Tickets: <strong>{event.availableTickets}</strong>
          </p>
          <p className="card-text">
            Organizer: <strong>{organizerName}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Event;
