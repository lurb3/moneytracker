import axios from "axios";
//import router from "@/router";

const request = axios;

request.defaults.baseURL = process.env.REACT_APP_API_URL;

request.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // config.headers.setContentType("application/json");
    // config.headers["withCredentials"] = "true";
    // config.headers.Authorization = `Bearer ${token}`;

    // Add your request interceptors here
    // Example: config.headers.Authorization = 'Bearer YOUR_TOKEN';
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
    // Example: handle unauthorized errors
    if (error.response.status === 401) {
      //localStorage.removeItem("token");
      //router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default request;
