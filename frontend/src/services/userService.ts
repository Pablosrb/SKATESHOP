import api from '@/lib/axios';

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
}

export const getUserProfile = async (id: number): Promise<UserProfile> => {
    try {
        const response = await api.get(`/users/${id}`);
        
        return response.data.user; 

    } catch (error) {
        console.error('Error en getUserProfile:', error);
        throw error;
    }
};

export const updateUserProfile = async (id: number, data: any) => {
    const response = await api.put(`/users/${id}`, data);
    
    return response.data.user || response.data.data || response.data;
};






