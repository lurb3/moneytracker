import axios from "axios";
import { useNavigate } from 'react-router-dom';

const useAxios = () => {
  const navigate = useNavigate();

  const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  request.interceptors.response.use(
    (response) => {
      // Add your response interceptors here
      return response;
    },
    (error) => {
      // Example: handle unauthorized errors
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return request;
}

export default useAxios;
