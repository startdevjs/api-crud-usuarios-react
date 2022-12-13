import axios from "axios";

const api = axios.create({
  baseURL: "http://54.39.163.134:3001",
});

export default api;
