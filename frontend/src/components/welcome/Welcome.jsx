import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {

  const navigate= useNavigate()

  const handleOrganizerRegister = () => 
     navigate("/organizer/signup");
  

  const handleCustomerRegister = () => 
     navigate("/customer/signup");

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="fs-1 fw-bold text-warning mb-4">
          Welcome User! Please Login Or Register to continue.
        </div>
        <div className="d-flex gap-3 justify-content-center">
          <button type="button" className="btn btn-warning btn-lg" onClick={handleOrganizerRegister}>
            Register as Organizer
          </button>
          <button type="button" className="btn btn-info btn-lg" onClick={handleCustomerRegister}>
            Register as Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
