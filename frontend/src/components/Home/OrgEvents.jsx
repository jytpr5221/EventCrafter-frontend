import React from "react";
import getEvent from "../../controllers/getEvent";
import { useState,useEffect } from "react";

function OrgEvents({ eventid }) {
    const [event, setEvent] = useState(null);
    console.log(eventid)
    
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
  return (
   
     <div>
        {event === null ? null: 
        <div
        className="card m-auto mt-5 shadow-sm w-75 card-custom"
        style={{
          background: "linear-gradient(135deg, #2c3e50, #4c5c68)",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
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
         Registered Customers: <strong>{event.registeredBy.length}</strong>
       </p>
       
       
     </div>
     </div>
     }
     </div>
    
  );
}

export default OrgEvents;
