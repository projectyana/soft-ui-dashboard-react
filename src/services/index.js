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
