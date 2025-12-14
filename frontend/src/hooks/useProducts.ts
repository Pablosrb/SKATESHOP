import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';
import { type Product } from '@/types/product';

export const useProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5, 
    });
};