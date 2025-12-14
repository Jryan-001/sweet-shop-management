import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Sweet } from '../types';
import { sweetsAPI } from '../services/api';

interface CartItem extends Sweet {
  cartQuantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (sweet: Sweet) => Promise<void>;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
    const saved = localStorage.getItem(`cart_${userId}`);
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (sweet: Sweet) => {
    const currentSweet = await sweetsAPI.getById(sweet.id);
    if (currentSweet.quantity <= 0) {
      throw new Error('Out of stock');
    }
    const existing = cart.find(item => item.id === sweet.id);
    const currentCartQty = existing ? existing.cartQuantity : 0;
    if (currentCartQty >= currentSweet.quantity) {
      throw new Error(`Only ${currentSweet.quantity} items available`);
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === sweet.id);
      if (existing) {
        return prev.map(item =>
          item.id === sweet.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prev, { ...sweet, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, cartQuantity: quantity } : item));
    }
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
