import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:7000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default API;