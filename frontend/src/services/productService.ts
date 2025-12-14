import api from '@/lib/axios';
import { type Product } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/products');
        
        return response.data.products;
        

    } catch (error) {
        console.error('❌ Error en la petición:', error);
        throw error; 
    }
};


export const getProductById = async (id: string): Promise<Product> => {
  // Usamos 'any' en el get temporalmente para que TypeScript no se queje 
  // de que la respuesta tiene un campo 'message' extra.
  const response = await api.get(`/products/${id}`);
  
  // ¡AQUÍ ESTÁ LA SOLUCIÓN!
  // Accedemos a .data (de axios) y luego a .product (de tu JSON)
  return response.data.product; 
};
