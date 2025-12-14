import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import '@/styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart(); 
    const navigate = useNavigate();

    const imageUrl = product.image || 'https://placehold.co/300x300?text=Sin+Imagen';

    //visual del stock
    const getStockLabel = (stock: number) => {
        if (stock <= 0) return <span style={{ color: 'red', fontWeight: 'bold' }}>AGOTADO</span>;
        if (stock < 10) return <span style={{ color: 'orange', fontWeight: 'bold' }}>¡ÚLTIMAS UNIDADES!</span>;
        return <span style={{ color: 'green', fontWeight: 'bold' }}>DISPONIBLE</span>;
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            image: product.image || undefined,         
            quantity: 1,
        });
    };

    return (
        <div className="product-card" onClick={() => navigate(`/producto/${product.id}`)}>
            <div className="card-image-container">
                <img src={imageUrl} alt={product.name} loading="lazy" />
                {!product.is_active && <span className="badge-inactive">No disponible</span>}
            </div>

            <div className="card-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-brand">{product.brand?.name || 'General'}</p>
                
                <div className="stock-status">
                    {getStockLabel(product.stock)}
                </div>

                <div className="card-footer">
                    <span className="price">{product.price} €</span>
                    
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