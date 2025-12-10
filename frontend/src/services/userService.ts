import api from '@/lib/axios';

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
}

// 1. OBTENER PERFIL
export const getUserProfile = async (id: number): Promise<UserProfile> => {
    try {
        const response = await api.get(`/users/${id}`);
        
        // CORRECCIÓN BASADA EN TU LOG:
        // Tu backend devuelve: { message: "...", user: { ... } }
        // Así que accedemos a response.data.user
        return response.data.user; 

    } catch (error) {
        console.error('Error en getUserProfile:', error);
        throw error;
    }
};

// 2. ACTUALIZAR PERFIL
export const updateUserProfile = async (id: number, data: any) => {
    const response = await api.put(`/users/${id}`, data);
    
    // Aquí también, si Laravel devuelve el usuario actualizado dentro de "user" o "data"
    // Lo intentamos buscar, si no devolvemos todo.
    return response.data.user || response.data.data || response.data;
};














// import api from '@/lib/axios'; // Importamos tu instancia de axios que ya funciona

// export interface UserProfile {
//     id: number;
//     name: string;
//     email: string;
//     role: string; // 'admin' | 'user'
//     // password no lo traemos por seguridad
// }

// export const getUserProfile = async (id: number): Promise<UserProfile> => {
//     // Ajusta la ruta según tu backend. 
//     // Si usas Laravel standard resource controller: GET /api/users/{id}
//     const response = await api.get(`/users/${id}`);
//     console.log('📡 Respuesta RAW del Backend:', response.data);
//     return response.data.data || response.data;
// };

// // 2. ACTUALIZAR PERFIL (Nombre o Contraseña)
// export const updateUserProfile = async (id: number, data: any) => {
//     // Laravel suele pedir PUT o PATCH para actualizar
//     const response = await api.put(`/users/${id}`, data);
//     return response.data.data || response.data;
// };









// 1. OBTENER PERFIL
// export const getUserProfile = async (id: number) => {
//     try {
//         // Tu interceptor se encargará de poner el token aquí automáticamente
//         const response = await api.get(`/users/${id}`);
        
//         // Dependiendo de cómo devuelve Laravel el usuario:
//         // Opción A: return response.data; (Si devuelve el objeto directo)
//         // Opción B: return response.data.data; (Si usa Resources)
        
//         // Usamos esto para cubrir ambos casos:
//         return response.data.data || response.data; 
        
//     } catch (error) {
//         console.error('Error obteniendo perfil:', error);
//         throw error;
//     }
// };

// // 2. ACTUALIZAR PERFIL (Datos o Contraseña)
// export const updateUserProfile = async (id: number, data: any) => {
//     try {
//         const response = await api.put(`/users/${id}`, data);
//         return response.data; 
        
//     } catch (error: any) {
//         // Manejo de errores específico de Axios
//         if (error.response && error.response.data) {
//             // Extraemos el mensaje de error de Laravel (ej: "La contraseña no coincide")
//             const serverMessage = error.response.data.message || 'Error al actualizar';
//             throw new Error(serverMessage);
//         }
//         // Error genérico
//         throw new Error('Error al conectar con el servidor');
//     }
// };