import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type UsedItem } from '@/types/usedItem';
import '@/styles/ProductCard.css';

interface UsedItemCardProps {
    item: UsedItem;
}

const UsedItemCard: React.FC<UsedItemCardProps> = ({ item }) => {
    
    const navigate = useNavigate();
    const handleViewDetail = () => {
        navigate(`/segunda-mano/${item.id}`);
    };

    const imageUrl = item.image
        ? item.image_url
        : 'https://placehold.co/300x300?text=Sin+Imagen';

    // Función simple para traducir el estado visualmente
    const getConditionLabel = (condition: string) => {
        if (condition === 'new') return 'Nuevo';
        if (condition === 'like_new') return 'Como nuevo';
        return 'Usado';
    };

    return (
        <div className="product-card" onClick={handleViewDetail}>
            {/* ETIQUETA DE ESTADO (Esquina superior) */}
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                <span style={{ 
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.7rem',
                    textTransform: 'uppercase'
                }}>
                    {getConditionLabel(item.condition)}
                </span>
            </div>

            <div className="card-image-container">
                <img src={imageUrl} alt={item.title} loading="lazy" />
                {item.status === 'sold' && (
                    <span className="badge-inactive">VENDIDO</span>
                )}
            </div>

            <div className="card-info">
                {/* TÍTULO */}
                <h3 className="product-title">{item.title}</h3>
                
                {/* VENDEDOR */}
                <p className="product-brand" style={{fontSize: '0.8rem', color: '#666'}}>
                    Vendedor: <strong>{item.user?.name || 'Anónimo'}</strong>
                </p>
                
                <div className="card-footer">
                    <span className="price">{item.price} €</span>
                    
                    {/* Botón diferente para diferenciar del catálogo oficial */}
                    <button 
                        className="btn-add"
                        disabled={item.status === 'sold'}
                        style={{ borderColor: '#333', color: '#333' }}
                        onClick={() => console.log('Ir al detalle o chat', item.id)}
                    >
                        {item.status === 'sold' ? 'Vendido' : 'Ver'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsedItemCard;