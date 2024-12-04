import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getOrganization from "../../controllers/getOrg";
import getEvent from "../../controllers/getEvent";
import Event from "../events/Event";

function Organizer() {
  const { orgId } = useParams();
  const [org, setOrg] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await getOrganization(orgId);
        setOrg(response);

        const fetchedEvents = await Promise.all(
          response.created.map((eventId) => getEvent(eventId))
        );
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organization or events:", error);
        setLoading(false);
      }
    };

    fetchOrg();
  }, [orgId]);

  if (loading) {
    return <div className="fs-1 fw-medium text-warning">Loading...</div>;
  }

  return (
    <div>
      {!org ? (
        <div className="fs-1 fw-medium text-warning">Organization not found</div>
      ) : (
        <div>
          <div
            style={{
              backgroundColor: "#2d2d2d",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              textAlign: "center",
              marginBottom: "30px",
            }}
            className="fs-1 fw-bold rounded mt-5 container d-flex-column justify-content-center align-items-center text-warning"
          >
            <h1>{org.name}</h1>
            <div className="fs-5 fw-medium" style={{ color: '#fd7e14' }}>
              Org-ID: {org._id}
            </div>
            <div className="fs-5 fw-medium text-info">Email: {org.email}</div>
            <div className="fs-5 fw-medium text-info">Contact no: {org.contact}</div>
          </div>
          <div className="container rounded p-4" style={{ backgroundColor: "#2d2d2d" }}>
            {events.length > 0 ? (
              events.map((event) => <Event key={event._id} event={event} />)
            ) : (
              <div className="fs-5 fw-medium text-warning">No events found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Organizer;
