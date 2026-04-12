import axios from "axios";

// instance global
const api = axios.create({
  baseURL: "http://localhost:3000", // بدلها حسب backend متاعك
  headers: {
    "Content-Type": "application/json"
  }
});





export default api;f