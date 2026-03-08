import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-backend-0r61.onrender.com/api/",
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Unexpected error occurred";
    return Promise.reject(message);
  }
);

export default API;