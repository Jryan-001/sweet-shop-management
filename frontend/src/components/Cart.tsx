import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { sweetsAPI } from '../services/api';
import toast from 'react-hot-toast';
import type { Sweet } from '../types';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [processing, setProcessing] = useState(false);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStock = async () => {
      const stocks: Record<string, number> = {};
      for (const item of cart) {
        try {
          const sweet = await sweetsAPI.getById(item.id);
          stocks[item.id] = sweet.quantity;
        } catch {
          stocks[item.id] = 0;
        }
      }
      setStockMap(stocks);
    };
    if (cart.length > 0) {
      fetchStock();
      const interval = setInterval(fetchStock, 5000);
      return () => clearInterval(interval);
    }
  }, [cart.length]);

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      for (const item of cart) {
        const currentSweet = await sweetsAPI.getById(item.id);
        if (currentSweet.quantity < item.cartQuantity) {
          toast.error(`${item.name} has only ${currentSweet.quantity} items left!`);
          setProcessing(false);
          return;
        }
      }
      for (const item of cart) {
        for (let i = 0; i < item.cartQuantity; i++) {
          await sweetsAPI.purchase(item.id);
        }
      }
      toast.success('Order placed successfully! 🎉');
      clearCart();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map(item => {
              const availableStock = stockMap[item.id] ?? item.quantity;
              const isOutOfStock = availableStock === 0;
              const exceedsStock = item.cartQuantity > availableStock;
              return (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-teal-600 font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-xs mt-1 font-medium">
                      <span className={availableStock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {availableStock} available
                      </span>
                      {exceedsStock && <span className="text-red-600 ml-2">⚠️ Exceeds stock!</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.cartQuantity - 1)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">-</button>
                    <span className="px-4 font-semibold dark:text-white">{item.cartQuantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.cartQuantity + 1)} 
                      disabled={item.cartQuantity >= availableStock}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">Remove</button>
                </div>
              );
            })}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-teal-600">${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} disabled={processing} className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 disabled:bg-gray-400">
              {processing ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
