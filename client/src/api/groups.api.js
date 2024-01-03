import axios from "axios";

const URL =
    process.env.NODE_ENV === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:4000";

    const authApi = axios.create({
    baseURL: `${URL}/groups`,
});

// Interceptor para incluir el token en los encabezados de todas las solicitudes
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['x-access-token'] = token;  // Corregir aquí
    }
    return config;
});

export const getInfo = () => authApi.get("/panel/");
