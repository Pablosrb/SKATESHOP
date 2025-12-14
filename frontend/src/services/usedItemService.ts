import api from '@/lib/axios';
import { type UsedItem } from '../types/usedItem';

export const getUsedItems = async (): Promise<UsedItem[]> => {
    const response = await api.get('/used-items');
    return response.data.data || response.data;
};

export const createUsedItem = async (formData: FormData): Promise<UsedItem> => {
    try {
        const response = await api.post('/used-items', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data || response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Error al subir el producto');
        }
        throw error;
    }
};

export const getUsedItemById = async (id: string): Promise<UsedItem> => {
    const response = await api.get(`/used-items/${id}`);
    return response.data.data || response.data;
};

export const getMyUsedItems = async (): Promise<UsedItem[]> => {
    const response = await api.get('/used-items/my-items');
    return response.data.data || response.data;
};

export const updateUsedItemStatus = async (id: number, status: string) => {
    const response = await api.put(`/used-items/${id}`, { status });
    return response.data;
};

export const deleteUsedItem = async (id: number) => {
    await api.delete(`/used-items/${id}`);
    return true;
};