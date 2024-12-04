import React, { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import axiosInstance from '../../axios.config';
import { useNavigate } from 'react-router-dom';

function OrganizerSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return alert("All fields are required!");
    }

    try {
      const response = await axiosInstance.post("/org/signin", {
        email,
        password,
      });

      //console.log("signin response", response);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Welcome");

       navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert(`${error.response.data.message}. Try Again !`);
        setEmail('');
        setPassword('');
      } else {
        alert("Server is not responding");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '320px', backgroundColor: '#4c5c68', padding: '20px', borderRadius: '10px' }}>
        <h4 className="text-center text-warning mb-4">Organizer SignIn</h4>
        <form onSubmit={signIn}>
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
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizerSignin;
