import axios from "axios";

const baseURL = 'https://eventcrafterbackend.onrender.com'

 const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

 const axiosInstance = axios.create({
  baseURL,
  headers: {
     Authorization: user && user.token ? `Bearer ${user.token}` : ''
  }
});

export default axiosInstance
