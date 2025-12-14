import React, { useState, useEffect, memo } from 'react';
import type { Sweet } from '../types';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Recommendations } from './Recommendations';
import { useCart } from '../context/CartContext';

interface SweetCardProps {
  sweet: Sweet;
  onUpdate: () => void;
  canPurchase: boolean;
  isAdmin: boolean;
  exchangeRate?: number;
  allSweets?: Sweet[];
}

export const SweetCard: React.FC<SweetCardProps> = React.memo(({ 
  sweet, 
  onUpdate, 
  canPurchase,
  isAdmin,
  exchangeRate = 84.5,
  allSweets = []
}) => {
  const { addToCart } = useCart();
  const quantity = sweet.quantity;
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
    const key = `wishlist_${userId}`;
    const wishlist = JSON.parse(localStorage.getItem(key) || '[]');
    setIsWishlisted(wishlist.includes(sweet.id));
  }, [sweet.id]);

  const toggleWishlist = () => {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
    const key = `wishlist_${userId}`;
    const wishlist = JSON.parse(localStorage.getItem(key) || '[]');
    if (isWishlisted) {
      const updated = wishlist.filter((id: string) => id !== sweet.id);
      localStorage.setItem(key, JSON.stringify(updated));
      toast.success('Removed from wishlist');
    } else {
      wishlist.push(sweet.id);
      localStorage.setItem(key, JSON.stringify(wishlist));
      toast.success('Added to wishlist!');
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = async () => {
    if (sweet.quantity === 0) {
      toast.error('Out of stock!');
      return;
    }
    try {
      await addToCart(sweet);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      toast.success(`${sweet.name} added to cart! 🛒`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to add to cart');
    }
  };

  return (
    <div 
      id={`sweet-${sweet.id}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 animate-slide-up"
    >
      <div className="relative overflow-hidden group">
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <svg className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : 'fill-none stroke-gray-600'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img 
          src={`/images/${sweet.image}`} 
          alt={sweet.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2 flex gap-2 flex-wrap">
          {quantity < 10 && quantity > 0 && (
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-1 rounded-full font-semibold animate-pulse">
              ⚠️ Low Stock!
            </span>
          )}
          {quantity === 0 && (
            <span className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full font-semibold">
              🚫 Out of Stock
            </span>
          )}
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors flex-1">{sweet.name}</h3>
            <div className="text-right ml-4">
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                ${sweet.price.toFixed(2)}
              </span>
              <p className="text-sm font-semibold text-orange-500">₹{(sweet.price * exchangeRate).toFixed(2)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{sweet.category}</p>

        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Stock:</span>
            <span className={`text-sm font-bold transition-colors duration-300 ${
              quantity > 10 
                ? 'text-green-600 dark:text-green-400' 
                : quantity > 0 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {quantity} {quantity === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          {canPurchase && (
            <button
              onClick={handleAddToCart}
              disabled={quantity === 0}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 transform text-sm ${
                quantity === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {quantity === 0 ? 'Sold Out!' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
      
      <div className="px-6 pb-6 h-32">
        {allSweets.length > 0 && <Recommendations currentSweet={sweet} allSweets={allSweets} />}
      </div>
    </div>
  );
});

