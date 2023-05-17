import axios from "axios";

export const getToken = () => localStorage.getItem("token");

const instance = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: getToken(),
    },
});

export default instance;
