import axios from "axios";

const baseURL = "https://rokom.xyz";

const Service = axios.create({ baseURL });

Service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers = {
    Authorization: token ? `Bearer ${token}` : null,
    "Content-Type": "application/json",
  };

  return config;
});

export { Service };
