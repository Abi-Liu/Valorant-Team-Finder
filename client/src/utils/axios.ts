import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://valorantfinder.onrender.com/",
});

export default axiosInstance;
