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

export const createUsedItem = async (formData: FormData): Promise<UsedItem> => {
    
    const token = localStorage.getItem('user_token');

    if (!token) {
        throw new Error('No hay sesión activa para publicar anuncios.');
    }

    const response = await fetch(`${API_URL}/used-items`, {
        method: 'POST',
        headers: {
            // ¡IMPORTANTE! Al enviar FormData (archivos), NO definas 'Content-Type'.
            // El navegador detectará que es un archivo y pondrá el boundary automáticamente.
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (response.status === 401) {
        throw new Error('Sesión caducada. Vuelve a iniciar sesión.');
    }

    if (!response.ok) {
        // Intentamos leer el mensaje de error específico que manda Laravel
        const errorData = await response.json();
        // Laravel suele mandar los errores de validación en errorData.message o errorData.errors
        const errorMessage = errorData.message || 'Error al subir el producto';
        throw new Error(errorMessage);
    }

    // Asumimos que Laravel devuelve el objeto creado, posiblemente dentro de "data"
    // Si tu API devuelve { data: { id: 1, ... } }, hacemos esto:
    const json = await response.json();
    
    // Devolvemos json.data si existe, o json entero si el objeto viene directo
    return json.data || json;
};

export const getUsedItemById = async (id: string): Promise<UsedItem> => {
    // Nota: Esta ruta es pública, no necesita token obligatoriamente para VER el producto.
    // Si tu backend exige token para ver detalles, añade los headers de Authorization aquí.
    const token = localStorage.getItem('user_token');
    
    if (!token) {
        throw new Error('No hay sesión activa para publicar anuncios.');
    }

    const response = await fetch(`${API_URL}/used-items/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('No se pudo cargar el artículo');
    }

    const json = await response.json();
    return json.data; // Asumiendo que Laravel devuelve { data: { ... } }
};

export const getMyUsedItems = async (): Promise<UsedItem[]> => {
    const token = localStorage.getItem('user_token');
    if (!token) throw new Error('No autorizado');

    const response = await fetch(`${API_URL}/used-items/my-items`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) throw new Error('Error al cargar tus anuncios');
    const json = await response.json();
    return json.data;
};

// 2. ACTUALIZAR ESTADO (Para cambiar a Vendido/Archivado)
export const updateUsedItemStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('user_token');
    
    // OJO: Laravel a veces da problemas con PUT y FormData/archivos. 
    // Como solo enviamos JSON aquí, usamos headers application/json
    const response = await fetch(`${API_URL}/used-items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify({ status }) // Solo enviamos el status
    });

    if (!response.ok) throw new Error('Error al actualizar estado');
    return await response.json();
};

// 3. ELIMINAR ANUNCIO
export const deleteUsedItem = async (id: number) => {
    const token = localStorage.getItem('user_token');
    
    const response = await fetch(`${API_URL}/used-items/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) throw new Error('Error al eliminar el anuncio');
    return true;
};