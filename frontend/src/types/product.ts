export interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  image: string | null; 
  description: string; 
  price: string;       
  stock: number;
  is_active: number;   
  created_at: string;
  updated_at: string;

  brand?: {
    id: number;
    name: string;
    country: string;
  };
  
  category?: {
    id: number;
    name: string;
  };

}

// Interfaz para la respuesta completa de la API
export interface ProductsApiResponse {
    message: string;
    products: Product[];
}

// Para un solo producto
export interface ProductApiResponse {
    message: string;
    product: Product;
}

