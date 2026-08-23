import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "https://axel-a7ya.onrender.com",
});

api.interceptors.request.use((config) => {

    // Auth endpoints ko Authorization header ki zarurat nahi
    const isAuthRequest =
        config.url?.startsWith("/auth/");

    if (!isAuthRequest) {

        const token =
            localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
    }

    // FormData ke liye Content-Type manually mat set karo
    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] =
            "application/json";
    }

    return config;
});

export default api;