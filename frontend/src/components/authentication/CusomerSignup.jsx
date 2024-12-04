import React, { useState } from "react";
import axiosInstance from "../../axios.config.js";
import { useNavigate } from "react-router-dom";

function CustomerSignup() {
  let [contact, setContact] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = () => navigate('/customer/signin');

  const signUp = async (event) => {
    event.preventDefault();

    if (!contact || !name || !email || !password) {
      return alert("All fields are required!");
    }

    try {
      const response = await axiosInstance.post("/customer/signup", {
        contact,
        name,
        email,
        password,
      });

      console.log(response);
      alert("User Registered! Sign in to continue");
      navigate('/customer/signin');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert(`${error.response.data.message}. Sign in to continue`);
      } else {
        alert("Server is not responding");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '320px', backgroundColor: '#4c5c68', padding: '20px', borderRadius: '10px' }}>
        <h4 className="text-center text-warning mb-4">Customer SignUp</h4>
        <form onSubmit={signUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              style={{ backgroundColor: '#2c3e50', color: '#fff', border: '1px solid #666', borderRadius: '5px' }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label text-white">Contact</label>
            <input
              type="tel"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="form-control"
              style={{ backgroundColor: '#2c3e50', color: '#fff', border: '1px solid #666', borderRadius: '5px' }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{ backgroundColor: '#2c3e50', color: '#fff', border: '1px solid #666', borderRadius: '5px' }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{ backgroundColor: '#2c3e50', color: '#fff', border: '1px solid #666', borderRadius: '5px' }}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn w-100" style={{ background: 'linear-gradient(135deg, #ff5e57, #ff8566)', borderRadius: '25px', padding: '10px', color: '#fff', border: 'none' }}>
              Sign Up
            </button>
          </div>
          <div onClick={handleSignin} className="text-center m-2 text-decoration-underline text-light" style={{ cursor: 'pointer' }}>
            Already have an account?
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerSignup;
