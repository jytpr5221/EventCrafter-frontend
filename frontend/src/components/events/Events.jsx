import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios.config";
import Event from "./Event.jsx";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/allEvents");
        //console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        //console.log("Server refused to connect");
      }
    };

    getEvents();
  }, []);
  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => <Event key={event.id} event={event} />)
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
