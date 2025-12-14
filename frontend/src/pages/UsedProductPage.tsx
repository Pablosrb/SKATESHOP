import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsedItemById } from '@/services/usedItemService';
import { type UsedItem } from '@/types/usedItem';
import '@/styles/UsedProductPage.css'; 

const UsedProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [item, setItem] = useState<UsedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchItem = async () => {
      try {
        const data = await getUsedItemById(id);
        setItem(data);
      } catch (err) {
        setError('El producto no existe o fue eliminado.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <div className="loading-spinner">Cargando...</div>;
  if (error || !item) return <div className="error-msg">{error}</div>;

  const imageUrl = item.image_url || 'https://placehold.co/600x600?text=Sin+Imagen';

  // Traducir condición
  const conditionLabels: Record<string, string> = {
    new: 'Nuevo (Sin usar)',
    like_new: 'Como nuevo',
    used: 'Usado',
    worn: 'Muy usado'
  };

  return (
    <div className="used-product-page-wrapper">
      
      <button 
        onClick={() => navigate('/segunda-mano')} 
        className="btn-back-to-catalog"
      >
        ← Volver al catálogo
      </button>

      <div className="used-product-detail-layout">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="used-product-image-section">
          <img 
            src={imageUrl} 
            alt={item.title} 
          />
        </div>

        {/* COLUMNA DERECHA */}
        <div className="used-product-info-section">
          
          {/* estado */}
          <div className="badge-container">
             <span 
               className={`used-product-status-badge ${item.status === 'sold' ? 'status-sold' : 'status-available'}`}
             >
                {item.status === 'sold' ? 'VENDIDO' : 'DISPONIBLE'}
             </span>
          </div>

          <h1>{item.title}</h1>
          
          <p className="used-product-price">
            {item.price} €
          </p>

          {/* Vendedor */}
          <div className="used-seller-info">
            <div className="used-seller-info-avatar">👤</div>
            <div>
              <p className="label">Vendido por:</p>
              <p className="name">{item.user?.name || 'Usuario desconocido'}</p>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="used-product-specs">
            <p><strong>Estado:</strong> {conditionLabels[item.condition] || item.condition}</p>
            <p><strong>Publicado:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
          </div>

          {/* Descripción */}
          <div className="used-product-description">
            <h3>Descripción</h3>
            <p>{item.description || 'El vendedor no ha añadido descripción.'}</p>
          </div>

          <div className="used-product-actions">
            <button 
                disabled={item.status === 'sold'}
                className="btn-contact-seller"
            >
                {item.status === 'sold' ? 'Ya vendido' : 'Contactar al Vendedor'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UsedProductPage;