
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UsedItem {
    id: number;
    user_id: number;
    title: string;        
    description: string | null;
    price: string;        
    condition: string;    
    image: string | null;
    status: 'active' | 'sold' | 'archived';
    created_at: string;
    image_url?: string;

    user?: User; 
}

export interface UsedItemsApiResponse {
    message: string;
    data: UsedItem[];
}