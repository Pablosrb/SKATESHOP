import React from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import '@/styles/CartPage.css';

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-empty-state">
                <h2>Tu carrito está vacío 😔</h2>
                <button onClick={() => navigate('/catalogo')} className="btn-continue">
                    Ir a comprar
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Carrito de Compra ({cart.length} productos)</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item-card">
                            
                            {/* SECCIÓN CLICABLE */}
                            <div 
                                className="item-image clickable" 
                                onClick={() => navigate(`/producto/${item.id}`)}
                            >
                                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
                            </div>
                            
                            <div 
                                className="item-details clickable"
                                onClick={() => navigate(`/producto/${item.id}`)}
                            >
                                <h3>{item.name}</h3>
                                <p className="item-price">{item.price.toFixed(2)} €</p>
                            </div>

                            {/* ACCIONES (NO CLICABLES PARA NAVEGACIÓN) */}
                            <div className="item-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                                <button 
                                    className="btn-remove"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Resumen</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                    <button className="btn-checkout" onClick={() => alert('Próximamente...')}>
                        Tramitar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;