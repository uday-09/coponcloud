import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

console.log(token);

const api = axios.create({
  baseURL: "http://localhost:3500/",
});

export default api;
