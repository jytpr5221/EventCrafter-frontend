import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios.config.js";
import bookTicket from "../../controllers/bookTicket.js";

function Event({ event }) {
  const user = JSON.parse(localStorage.getItem('user')) || null;  

  const [organizerName, setOrganizerName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

   const getDate = (date) => {
    let day = new Date(date);
    const dayOfMonth = day.getDate();

    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formattedDate = `${dayOfMonth}${getDaySuffix(dayOfMonth)} ${day.toLocaleString("en", { month: "short" })} ${day.getFullYear()}`;
    return formattedDate;
  };

   const checkRegistration = () => {
    if (user && user._doc) {
      const UserRegistered = user._doc.registeredIn || [];
      if (UserRegistered.length > 0 || user._doc.type === 'customer') {
        setIsRegistered(UserRegistered.includes(event._id));
      }
    }
  };

   useEffect(() => {
    const showOrg = async () => {
      try {
        const orgId = event.createdBy;
        const response = await axiosInstance.get(`/org/${orgId}`);
        setOrganizerName(response.data.name);
      } catch (error) {
        setOrganizerName('randwa')

        console.error("Error fetching organizer:", error);
      }
    };

     if (event && event.createdBy) {
      showOrg();
    }

    if (user && user._doc) {
      checkRegistration();
    }
  }, [event, user]);  
  const handleRegister = async () => {
    try {
      await bookTicket(event._id);   
      setIsRegistered(true);         
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <div className="card m-auto mt-5 shadow-sm w-75 card-custom"
      style={{
        background: "linear-gradient(135deg, #2c3e50, #4c5c68)",
        borderRadius: "15px",
        padding: "20px",
      }}>
      <div className="card-body text-white">
        <h5 className="card-title text-warning text-center pd-4">
          {event.type.toUpperCase()}
        </h5>
        <h6 className="card-subtitle mb-2 text-light">
          {event.title.toUpperCase()}
        </h6>
     
        <p className="card-text">
          Organizer: <strong>{organizerName.toUpperCase()}</strong>
        </p>
        
        <p className="card-text">
          Event Date: <strong>{getDate(event.eventDate)}</strong>
        </p>
        <p className="card-text">
          Available Tickets: <strong>{event.availableTickets}</strong>
        </p>
        <p className="card-text">
          Tickets Close On: <strong>{getDate(event.ticketsClosedOn)}</strong>
        </p>

        {user && user._doc?.type === "customer" ? (
          isRegistered ? (
            <div className="d-flex align-items-center m-auto">
              <span className="p-2 rounded m-1 bg-success">You are registered!</span>
            </div>
          ) : (
            <button className="btn btn-primary mt-3" onClick={handleRegister}>
              Register
            </button>
          )
        ) : (
          <div></div> 
        )}
      </div>
    </div>
  );
}

export default Event;
