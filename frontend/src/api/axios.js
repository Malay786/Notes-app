import axios from 'axios';

const API = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: import.meta.env.VITE_BACKEND_URL,  // use vercel environmen variable
    withCredentials: true,  // so that cookies can be sent
});

// automatically attach token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

export default API;