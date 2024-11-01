import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      key,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
