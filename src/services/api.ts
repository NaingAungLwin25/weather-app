import axios from "axios";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

const api = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      key: weatherApiKey,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
