// src/types/usedItem.ts

export interface User {
    id: number;
    name: string;
    email: string;
    // ... otros campos del usuario
}

export interface UsedItem {
    id: number;
    user_id: number;
    title: string;        // En la tabla normal es 'name', aquí es 'title'
    description: string | null;
    price: string;        // Laravel suele mandar decimales como strings
    condition: string;    // 'used', 'new', etc.
    image: string | null;
    status: 'active' | 'sold' | 'archived';
    created_at: string;
    
    // Relación con el usuario (vendedor)
    user?: User; 
}

export interface UsedItemsApiResponse {
    message: string;
    data: UsedItem[];
}