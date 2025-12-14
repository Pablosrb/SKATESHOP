import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '@/types/product';

import { useCart } from '@/context/CartContext';

import '@/styles/ProductCard.css'; // Asegúrate de que este archivo existe


interface ProductCardProps {
    product: Product;
}

const getStockStatus = (stock: number) => {
    if (stock > 10) {
        return { text: 'DISPONIBLE', color: 'green' };
    } else if (stock > 0) {
        return { text: 'POCAS UNIDADES', color: 'red' };
    } else {
        return { text: 'AGOTADO', color: 'red' };
    }
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart(); 
    // Lógica segura para la imagen: Si es null, ponemos un placeholder
    const imageUrl = product.image 
        ? product.image 
        : 'https://placehold.co/300x300?text=Sin+Imagen';

    const navigate = useNavigate(); // 2. INICIALIZAR EL HOOK

    // 3. FUNCIÓN PARA NAVEGAR AL CLICK
    const handleCardClick = () => {
        navigate(`/producto/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();

        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price), 
            image: product.image || undefined,         
            quantity: 1,
        });
        
        alert('¡Añadido al carrito!');
    };

    const stockStatus = getStockStatus(product.stock);


    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="card-image-container">
                <img 
                    src={imageUrl} 
                    alt={product.name} 
                    loading="lazy" 
                />
                {!product.is_active && (
                    <span className="badge-inactive">No disponible</span>
                )}
            </div>

            <div className="card-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-brand">
                    {product.brand?.name || 'Marca desconocida'}
                </p>                
                <p style={{ 
                    color: stockStatus.color, 
                    fontWeight: 'bold', 
                    fontSize: '0.8rem',
                    margin: '5px 0'
                }}>
                    {stockStatus.text}
                </p>

                <div className="card-footer">
                    <span className="price">{product.price} €</span>
                    
                    {/* Botón simple por ahora */}
                    <button 
                        disabled={product.stock <= 0}
                        className="btn-add"
                        onClick={handleAddToCart}
                    >
                        {product.stock > 0 ? 'Añadir' : 'Agotado'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;