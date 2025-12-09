import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsedItems } from '@/services/usedItemService'; // <--- Tu nuevo servicio
import { type UsedItem } from '@/types/usedItem';
import UsedItemCard from '@/components/UsedItemCard'; // <--- Tu nueva card
import '@/styles/ProductPage.css';

const SecondHandPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<UsedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getUsedItems();
                setItems(data);
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los artículos.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleMyItems = () => {
        navigate('/mis-anuncios'); 
    };

    return (
        <div className="catalogo-container">
            
            {/* CABECERA */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '30px',
                borderBottom: '1px solid #eee',
                paddingBottom: '20px'
            }}>
                <div>
                    <h1 style={{ margin: 0 }}>Segunda Mano</h1>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>Compra y vende material usado de nuestra comunidad</p>
                </div>

                <div className="catalog-actions">
                    <button 
                        className="btn-outline" 
                        onClick={handleMyItems}

                        style={{
                            backgroundColor: 'var(--color-accent, #f97316)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}
                    >
                        📂 Mis Anuncios
                    </button>
                </div>
            </div>

            {/* ESTADOS DE CARGA / ERROR */}
            {loading && <div style={{textAlign: 'center', padding: '50px'}}>Cargando el mercadillo...</div>}
            {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}

            {/* GRID DE PRODUCTOS */}
            {!loading && !error && (
                <div className="product-grid">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <UsedItemCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                            <h3>No hay artículos en venta ahora mismo.</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecondHandPage;