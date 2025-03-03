import axios from "axios";

export const http1 = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export default axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-type": "application/json"
  }
});
