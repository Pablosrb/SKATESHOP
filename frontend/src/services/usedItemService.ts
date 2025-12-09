import { type UsedItem, type UsedItemsApiResponse } from '../types/usedItem';

const API_URL = 'http://localhost:8000/api'; 

export const getUsedItems = async (): Promise<UsedItem[]> => {
    
    // 1. RECUPERAMOS EL TOKEN (Asumo que lo guardaste con este nombre al hacer login)
    const token = localStorage.getItem('user_token'); 
    // OJO: Si usas otro nombre en el login (ej: 'access_token'), cámbialo aquí.

    // Si no hay token, ni siquiera intentamos llamar a la API (ahorramos tiempo)
    if (!token) {
        throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${API_URL}/used-items`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 2. ESTA LÍNEA ES LA LLAVE PARA ENTRAR EN LAS RUTAS PROTEGIDAS DE LARAVEL
            'Authorization': `Bearer ${token}` 
        }
    });

    if (response.status === 401) {
        // Si el token caducó o es falso, limpiamos y redirigimos (opcional)
        // localStorage.removeItem('user_token');
        // window.location.href = '/login';
        throw new Error('Sesión caducada. Vuelve a iniciar sesión.');
    }

    if (!response.ok) {
        throw new Error('Error al cargar los productos de segunda mano');
    }

    const json: UsedItemsApiResponse = await response.json();
    return json.data;
};