import axios from "axios";

const BASE_URL = "http://13.62.99.184/:4000/api"; // Replace with your backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
