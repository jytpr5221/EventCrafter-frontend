import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios.config";
import Event from "./Event.jsx";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/allEvents");
        setEvents(response.data);
        setLoading(false);  

      } catch (error) {
        setLoading(false);  
        console.error("Error fetching events:", error);

      } 
     };

    getEvents();
  }, []);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center text-white">
          <p className="fs-3 fw-medium text-warning">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => <Event key={event._id} event={event} />)
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center text-white">
            <p className="fs-3 fw-semibold text-warning">No Events To Show</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
