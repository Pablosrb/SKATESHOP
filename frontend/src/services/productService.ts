// src/services/productService.ts
import api from '@/lib/axios';
import { type Product } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/products');
        
        return response.data.products;
        

    } catch (error) {
        console.error('❌ Error en la petición:', error);
        throw error; // Lanzamos el error para que React Query lo sepa
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

// src/services/productService.ts
// import api from '@/lib/axios';
// import { type Product } from '@/types/product';

// export const getProducts = async (): Promise<Product[]> => {
//     // Hacemos GET a /products
//     const { data } = await api.get('/products');
    
//     // Si usas API Resources en Laravel, los datos suelen venir en data.data
//     // Si devuelves return response()->json($products), vienen directos en data
//     // Ajusta esto según tu respuesta real:
//     return Array.isArray(data) ? data : data.data; 
// };


// import { fetchApi } from '../api/fetchApi';
// import { type Product, type ProductApiResponse } from '../types/product';

// export const productService = {
  
//   getAll: async (): Promise<Product[]> => {
//     try {





//       // 1. Hacemos la petición usando nuestro cliente genérico
//       // Le decimos que esperamos una respuesta tipo ProductApiResponse
//       const data = await fetchApi<ProductApiResponse>('/products');
//       console.log(data)

//       // 2. Aquí gestionamos la respuesta. 
//       // La API devuelve un objeto { message: "...", products: [...] }
//       // Nosotros extraemos y devolvemos SOLO el array de productos.
//       return data.products;




      
//     } catch (error) {
//       console.error('Error en el servicio de productos:', error);
//       throw error; 
//     }
//   },
//   // Aquí podrías añadir más métodos en el futuro:
//   // getById: (id: number) => ...
//   // create: (product: Product) => ...
// };

