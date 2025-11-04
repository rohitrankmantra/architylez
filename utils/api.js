import axios from "axios";

const api = axios.create({
  baseURL: "https://architylezz-backend.onrender.com/api"|| "http://localhost:5000/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

export const BASE_URL = "https://architylezz-backend.onrender.com/api" || "http://localhost:5000";


export default api;
