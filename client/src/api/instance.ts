import axios from "axios";

export const getToken = () => localStorage.getItem("token");

const instance = axios.create({
    baseURL: "/api",
});

instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalConfig = error.config;
        if (error.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            instance.defaults.headers.common.Authorization = getToken();
            return instance(originalConfig);
        }

        return Promise.reject(error);
    }
);

export default instance;
