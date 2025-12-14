import api from '@/lib/axios';

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data; 
    } catch (error: any) {
        // Manejo de errores de Axios
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Error al iniciar sesión');
        }
        throw error;
    }
};

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

                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                throw new Error(String(errorMessage) || 'Error en el registro');
            }

            throw new Error(data.message || 'Error al registrarse');
        }
        throw error;
    }
};
