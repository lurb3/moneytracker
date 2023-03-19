import axios from "axios";
import { useNavigate } from 'react-router-dom';

const request = axios;

request.defaults.baseURL = process.env.REACT_APP_API_URL;

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.setContentType("application/json");
    config.headers["withCredentials"] = "true";
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // Add your response interceptors here
    return response;
  },
  (error) => {
    const navigate = useNavigate();
    // Example: handle unauthorized errors
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default request;
