import axios from "axios"; 

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

// http://localhost:8800

export default instance;