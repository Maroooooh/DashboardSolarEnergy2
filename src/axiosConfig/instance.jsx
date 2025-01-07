import axios from "axios";
import store from "./../store/store";
import { logout } from "../store/slices/auth";

const axiosInstance = axios.create({
    baseURL: 'https://rendermarah.onrender.com',
});
const isTokenExpired = (token) => {
    if (!token) {
        store.dispatch(logout());
        return true;
    }
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
            store.dispatch(logout());
            return true;
        }
    }
    return false;
};

axiosInstance.interceptors.request.use((req) => {
    const isLogin = localStorage.getItem("isLoggin");
    const token = localStorage.getItem("token");
    
    if (isTokenExpired(token)&&isLogin) {
        return Promise.reject(new Error('Token expired'));
    }
    req.headers.Authorization = `Bearer ${token}`;
    return req;
}, (err) => {
    return Promise.reject(err);
});
axiosInstance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response && err.response.status === 401) {
        store.dispatch(logout());
    }
    return Promise.reject(err);
});

export default axiosInstance;