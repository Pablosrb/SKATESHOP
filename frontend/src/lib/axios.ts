import axios from 'axios';

const api = axios.create({
    // Asumimos que tu backend está en el puerto 8000. 
    // Lo ideal es poner esto en un archivo .env como VITE_API_URL
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor: Añade el token automáticamente si existe
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('user_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;