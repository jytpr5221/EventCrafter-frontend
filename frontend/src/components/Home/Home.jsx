import React, { useContext, useEffect } from "react";
import UserContext from "../../context/userContext.js";
import Event from "./Event.jsx";
import OrgHome from "./OrgHome.jsx";

function Home() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || null;
    if (existingUser) {
      setUser(existingUser);
    }
  }, [setUser]);

  return (
    <div>
      {!user ? (
        <div
         className=" fs-1 fw-bold vh-100 text-center text-warning"
        >User not available. Sign in to continue</div>
      ) : (
        user.type === 'organizer' ? <OrgHome/>:
        <div>
          <div
            style={{
              backgroundColor: "#2d2d2d",
              height:'30vh',
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              textAlign: "center",
              marginBottom: "30px",  
            }}
            className="fs-1 fw-bold rounded mt-5 container d-flex justify-content-center align-items-center text-warning"
          >
            Welcome {user._doc?.name }!
          </div>
          <div
            style={{
              width: "80%", 
              marginTop: "50px",
              margin: "auto",
              backgroundColor: "#2d2d2d",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div className="fs-3 fw-medium text-decoration-underline text-info">
              Your Events
            </div>
            {user._doc.registeredIn.length > 0 ? (
              user._doc.registeredIn.map((eventId) => (
                <Event key={eventId} eventid={eventId} />
              ))
            ) : (
              <div className="text-light mt-3">No events registered.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
