// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';
import { type Product } from '@/types/product';

export const useProducts = () => {
    // useQuery maneja por nosotros: loading, error, caché y reintentos
    return useQuery<Product[], Error>({
        queryKey: ['products'], // Clave única para la caché
        queryFn: getProducts,   // La función que trae los datos
        staleTime: 1000 * 60 * 5, // Los datos se consideran "frescos" por 5 minutos (no recarga innecesariamente)
    });
};