import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsedItems } from '@/services/usedItemService';
import { type UsedItem } from '@/types/usedItem';
import UsedItemCard from '@/components/UsedItemCard';
import '@/styles/SecondHandPage.css'; 

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
        <div className="second-hand-container">
            
            {/* CABECERA */}
            <div className="second-hand-header">
                <div>
                    <h1>Segunda Mano</h1>
                    <p>Compra y vende material usado de nuestra comunidad</p>
                </div>

                <div className="catalog-actions">
                    <button 
                        className="btn-my-items"
                        onClick={handleMyItems}
                    >
                        📂 Mis Anuncios
                    </button>
                </div>
            </div>

            {loading && <div className="state-message">Cargando el mercadillo...</div>}
            {error && <div className="state-message error">{error}</div>}

            {!loading && !error && (
                <div className="used-item-grid">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <UsedItemCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="state-message">
                            <h3>No hay artículos en venta ahora mismo.</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecondHandPage;