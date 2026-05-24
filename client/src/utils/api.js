import axios from "axios";

const API = "http://localhost:5050";

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
