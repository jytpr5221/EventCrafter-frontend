import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#2d2d2d' }}>
      <div className="text-center text-white">
        <h1 className="fs-1 fw-bold text-danger fst-italic">404</h1>
        <p className="fs-3">Oops! The page you're looking for doesn't exist.</p>
        <NavLink href="/home" className="fs-4 text-info text-decoration-underline">
          Go back to Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;

