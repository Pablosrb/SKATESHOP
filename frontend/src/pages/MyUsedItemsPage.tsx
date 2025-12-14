import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyUsedItems, updateUsedItemStatus, deleteUsedItem } from '../services/usedItemService';
import { type UsedItem } from '../types/usedItem';
import '../styles/MyUsedItems.css'; // Crearemos este CSS abajo

const MyUsedItemsPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<UsedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'sold' | 'archived'>('all');

    // Cargar datos al iniciar
    useEffect(() => {
        loadMyItems();
    }, []);

    const loadMyItems = async () => {
        try {
            const data = await getMyUsedItems();
            setItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambio de estado (Select)
    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await updateUsedItemStatus(id, newStatus);
            
            setItems(prevItems => prevItems.map(item => 
                item.id === id ? { ...item, status: newStatus as any } : item
            ));
            
            alert('Estado actualizado');
        } catch (error) {
            alert('Error al actualizar el estado');
        }
    };

    // Manejar eliminación
    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este anuncio?')) return;

        try {
            await deleteUsedItem(id);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            alert('Error al eliminar');
        }
    };

    const filteredItems = items.filter(item => 
        filter === 'all' ? true : item.status === filter
    );

    return (
        <div className="management-container">
            <header className="management-header">
                <h1>Mis Anuncios</h1>
                <div className="header-buttons">
                    <button className="btn-secondary" onClick={() => navigate('/segunda-mano')}>
                        Ver Catálogo Completo
                    </button>
                    <button className="btn-primary" onClick={() => navigate('/vender')}>
                        + Subir Nuevo Producto
                    </button>
                </div>
            </header>

            {/* PESTAÑAS DE FILTRO */}
            <div className="tabs">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todos</button>
                <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>En Venta 🟢</button>
                <button className={filter === 'sold' ? 'active' : ''} onClick={() => setFilter('sold')}>Vendidos 🔴</button>
                <button className={filter === 'archived' ? 'active' : ''} onClick={() => setFilter('archived')}>Archivados 🔒</button>
            </div>

            {loading ? <p>Cargando tus productos...</p> : (
                <div className="items-list">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">No hay productos en esta sección.</div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item.id} className={`manage-card ${item.status}`}>
                                {/* Imagen */}
                                <div className="manage-img">
                                    <img src={item.image_url || 'https://placehold.co/100'} alt={item.title} />
                                </div>

                                {/* Info */}
                                <div className="manage-info">
                                    <h3>{item.title}</h3>
                                    <p className="price">{item.price} €</p>
                                    <p className="date">Subido el: {new Date(item.created_at).toLocaleDateString()}</p>
                                </div>

                                {/* Cateogria */}
                                <div className="manage-actions">
                                    <div className="status-control">
                                        <label>Estado: </label>
                                        <select 
                                            value={item.status} 
                                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                            className={`status-select ${item.status}`}
                                        >
                                            <option value="active">🟢 En Venta</option>
                                            <option value="sold">🔴 Vendido</option>
                                            <option value="archived">🔒 Archivado</option>
                                        </select>
                                    </div>

                                    <button 
                                        className="btn-delete"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MyUsedItemsPage;