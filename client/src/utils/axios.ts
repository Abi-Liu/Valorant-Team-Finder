import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5173",
});

export default axiosInstance;
