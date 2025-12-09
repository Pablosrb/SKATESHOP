export interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  image: string | null; // El backend devuelve null si no hay imagen
  description: string; // Usaremos esta como la descripción corta
  price: string;       // ¡CLAVE! El precio viene como STRING ("89.99")
  stock: number;
  is_active: number;   // 1 o 0 (Aunque internamente Laravel lo maneje como boolean, el JSON es number)
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

// Para un solo producto (Tu respuesta nueva)
export interface ProductApiResponse {
    message: string;
    product: Product;
}

