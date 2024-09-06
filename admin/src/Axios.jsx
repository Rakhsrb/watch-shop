import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: token,
  },
});

export default instance;
