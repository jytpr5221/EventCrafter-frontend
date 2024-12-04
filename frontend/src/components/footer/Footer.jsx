import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best services to our customers. Our mission is to make your life easier and more enjoyable.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="text-white">Home</NavLink></li>
              <li><NavLink to="/events" className="text-white">All Events</NavLink></li>
              <li><NavLink to="/organizations" className="text-white">Organizations</NavLink></li>
             </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li className='d-block'><a href="https://github.com/jytpr5221" className="text-white mr-3">GitHub<i className="fab fa-facebook-f"></i></a></li>
              <li className='d-block'><a href="https://www.instagram.com/jytpr_5221/" className="text-white mr-3">Instagram<i className="fab fa-instagram"></i></a></li>
              <li className='d-block'><a href="https://www.linkedin.com/in/jyoti-prakash-panda-86055a286/" className="text-white mr-3">LinkedIn<i className="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-4">
          <p>&copy; 2024 <strong>EventCrafter</strong>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
