import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

console.log(token);

const httpRequest = axios.create({
  baseURL: "http://localhost:3500/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default httpRequest;
