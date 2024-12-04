import React, { useContext,useEffect } from 'react'
import UserContext from '../../context/userContext';
import Event from './Event';
import OrgEvents from './OrgEvents';
function OrgHome() {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
      const existingUser = JSON.parse(localStorage.getItem("user")) || null;
      if (existingUser) {
        setUser(existingUser);
      }
    }, [setUser]);

    
  
  return (
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
            Welcome {user.fullName }!
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
              Your Created Events
            </div>
            {user.created?.length === 0 ? <div>No event created</div> :
             
              user.created.map((ev)=>
              <OrgEvents key={ev} eventid={ev} />
            )
            }
          </div>
    </div>
  )
}

export default OrgHome
