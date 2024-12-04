import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserContext from "../../context/userContext";

function Navbar() {
  const { setUser, user } = useContext(UserContext);
  
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.clear("user");
    setUser(null);
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1" to="/">
            EventCrafter
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-warning" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-warning" : "nav-link"
                  }
                  to="/organizations"
                >
                  Organizations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-warning" : "nav-link"
                  }
                  to="/events"
                >
                  Events
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-warning" : "nav-link"
                  }
                  to="/create-event"
                  style={{
                    pointerEvents: user?.type === "organizer" ? "auto" : "none",
                    opacity: user?.type === "organizer" ? 1 : 0.5,
                  }}
                  aria-disabled={user?.type !== "organizer"}
                >
                  Create Event
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active bg-danger p-2 rounded "
                  style={{
                    opacity: user === null ? 0 : 1,
                  }}
                  onClick={logOutUser}
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
