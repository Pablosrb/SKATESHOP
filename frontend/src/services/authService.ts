import api from '@/lib/axios';

// 1. LOGIN
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data; 
        // Retorna { token: "...", user: { ... } }
    } catch (error: any) {
        // Manejo de errores de Axios
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Error al iniciar sesión');
        }
        throw error;
    }
};

// 2. REGISTRO
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('/register', { name, email, password });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const data = error.response.data;
            
            // Lógica para sacar el primer error de validación de Laravel (ej: "Email ya en uso")
            if (data.errors) {
                const firstError = Object.values(data.errors)[0]; 
                // A veces es un array ["Error..."], a veces string.
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                throw new Error(String(errorMessage) || 'Error en el registro');
            }

            throw new Error(data.message || 'Error al registrarse');
        }
        throw error;
    }
};

// // src/services/authService.ts

// // Ajusta la URL si es necesario
// const API_URL = 'http://localhost:8000/api';

// export const loginUser = async (email: string, password: string) => {
//     const response = await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         // Si Laravel devuelve error (ej: 401 o 422), lanzamos el mensaje
//         throw new Error(data.message || 'Error al iniciar sesión');
//     }

//     return data; 
//     // Laravel suele devolver algo como: 
//     // { token: "...", user: { id: 1, name: "...", role: "admin" } }
// };

// export const registerUser = async (name: string, email: string, password: string) => {
//     const response = await fetch(`${API_URL}/register`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({ name, email, password })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         // Laravel devuelve los errores de validación (ej: email repetido)
//         // Intentamos mostrar el primer error que encontremos
//         if (data.errors) {
//             const firstError = Object.values(data.errors)[0]; 
//             throw new Error(Array.isArray(firstError) ? firstError[0] : 'Error en el registro');
//         }
//         throw new Error(data.message || 'Error al registrarse');
//     }

//     return data;
// };