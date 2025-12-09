import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsedItemById } from '../services/usedItemService';
import { type UsedItem } from '../types/usedItem';
import '../styles/ProductPage.css'; // Reutilizamos el CSS del catálogo normal si existe

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

  // Lógica de imagen (igual que en la card)
  const imageUrl = item.image_url || 'https://placehold.co/600x600?text=Sin+Imagen';

  // Traducir condición
  const conditionLabels: Record<string, string> = {
    new: 'Nuevo (Sin usar)',
    like_new: 'Como nuevo',
    used: 'Usado',
    worn: 'Muy usado'
  };

  return (
    <div className="product-page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Botón volver */}
      <button onClick={() => navigate('/segunda-mano')} style={{ marginBottom: '20px', cursor: 'pointer', background:'none', border:'none', textDecoration:'underline' }}>
        ← Volver al catálogo
      </button>

      <div className="product-detail-layout" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div className="product-image-section" style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={imageUrl} 
            alt={item.title} 
            style={{ width: '100%', borderRadius: '12px', border: '1px solid #eee' }} 
          />
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="product-info-section" style={{ flex: '1', minWidth: '300px' }}>
          
          <div className="badge-container" style={{ marginBottom: '10px' }}>
             {item.status === 'sold' 
                ? <span style={{background: '#ccc', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>VENDIDO</span>
                : <span style={{background: '#ff4d00', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>DISPONIBLE</span>
             }
          </div>

          <h1 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{item.title}</h1>
          
          <p className="price" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111' }}>
            {item.price} €
          </p>

          <div className="seller-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9f9f9', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
            <div style={{ background: '#ddd', width: '40px', height: '40px', borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center' }}>👤</div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Vendido por:</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{item.user?.name || 'Usuario desconocido'}</p>
            </div>
          </div>

          <div className="specs" style={{ margin: '20px 0' }}>
            <p><strong>Estado:</strong> {conditionLabels[item.condition] || item.condition}</p>
            <p><strong>Publicado:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
          </div>

          <div className="description" style={{ lineHeight: '1.6', color: '#444', marginBottom: '30px' }}>
            <h3>Descripción</h3>
            <p>{item.description || 'El vendedor no ha añadido descripción.'}</p>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="actions" style={{ display: 'flex', gap: '15px' }}>
            <button 
                disabled={item.status === 'sold'}
                style={{ 
                    flex: 1, 
                    padding: '15px', 
                    background: item.status === 'sold' ? '#ccc' : '#111', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 'bold', 
                    cursor: item.status === 'sold' ? 'not-allowed' : 'pointer'
                }}
            >
                {item.status === 'sold' ? 'Ya vendido' : 'Contactar al Vendedor'}
            </button>

            {/* Opcional: Botón de chat o añadir al carrito */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UsedProductPage;