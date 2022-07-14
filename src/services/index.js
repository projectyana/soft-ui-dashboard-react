import axios from "axios";

// const baseURL = "https://9b15-182-253-182-32.ap.ngrok.io/api";
const baseURL = "https://rokom.xyz/api";

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
