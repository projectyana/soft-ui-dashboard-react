<<<<<<< HEAD
import axios from "axios";

const baseURL = "https://api.rokom.xyz";

const Service = axios.create({ baseURL });

Service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers = {
    Authorization: token ? `Bearer ${token}` : null,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  };

  return config;
});

export { Service };
>>>>>>> 09557d04367f7c12aa73a4e814ebd4f97589edd5
