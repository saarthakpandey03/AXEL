import axios from "axios";

const api = axios.create({
    baseURL: "https://axel-a7ya.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        // Auth endpoints ke alawa token bhejo
        const isAuthRequest = config.url?.startsWith("/auth/");

        if (!isAuthRequest) {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        // File upload ke time browser khud multipart boundary set karega
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;