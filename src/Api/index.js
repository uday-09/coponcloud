import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

console.log(token);

const httpRequest = axios.create({
  baseURL: "http://184.73.70.177/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default httpRequest;
