import axios from "axios";

const api = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000
});


api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      key: "a190c50898e643bdab6130820243010",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
