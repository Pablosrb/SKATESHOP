import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type CartItem } from "@/types/cartItem";


interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, amount: number) => void;
    clearCart: () => void;
    refreshCartUser: () => void;
    total: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- HELPER PARA OBTENER LA CLAVE ---
// Esto decide qué "cajón" abrir en el localStorage
const getCartKey = () => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            // Cada usuario tiene su propia clave única
            return `cart_user_${user.id}`;
        } catch (e) {
            return 'cart_guest';
        }
    }
    return 'cart_guest';
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 1. Estado para la clave actual (para saber si estamos en modo guest o user)
    const [currentKey, setCurrentKey] = useState<string>(getCartKey());

    // 2. Estado del carrito
    const [cart, setCart] = useState<CartItem[]>([]);

    // EFECTO 1: CARGAR EL CARRITO CUANDO CAMBIA EL USUARIO (KEY)
    useEffect(() => {
        const storedCart = localStorage.getItem(currentKey);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        } else {
            setCart([]); // Si es un usuario nuevo, empezamos vacío
        }
    }, [currentKey]);

    // EFECTO 2: GUARDAR EL CARRITO CUANDO CAMBIAN LOS ITEMS
    useEffect(() => {
        localStorage.setItem(currentKey, JSON.stringify(cart));
    }, [cart, currentKey]);

    // --- ACCIONES ---

    // Esta función la llamaremos desde Login y Header cuando el usuario cambie
    const refreshCartUser = () => {
        setCurrentKey(getCartKey());
    };

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, amount: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + amount);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            refreshCartUser, 
            total, 
            cartCount 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
    return context;
};