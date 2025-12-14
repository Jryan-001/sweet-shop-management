import React, { useState, useEffect } from 'react';
import type { Sweet } from '../types';
import { sweetsAPI } from '../services/api';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { trackPurchase } from './PurchaseHistory';
import { Recommendations } from './Recommendations';

interface SweetCardProps {
  sweet: Sweet;
  onUpdate: () => void;
  canPurchase: boolean;
  isAdmin: boolean;
  exchangeRate?: number;
  allSweets?: Sweet[];
}

export const SweetCard: React.FC<SweetCardProps> = ({ 
  sweet, 
  onUpdate, 
  canPurchase,
  isAdmin,
  exchangeRate = 84.5,
  allSweets = []
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(sweet.quantity);
  const [purchaseCount] = useState(Math.floor(Math.random() * 50) + 1);
  const [calories] = useState(Math.floor(Math.random() * 300) + 150);
  const [rating] = useState((Math.random() * 2 + 3).toFixed(1));
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [viewing] = useState(Math.floor(Math.random() * 8) + 1);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(sweet.id));
  }, [sweet.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const updated = wishlist.filter((id: string) => id !== sweet.id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      toast.success('Removed from wishlist');
    } else {
      wishlist.push(sweet.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      toast.success('Added to wishlist!');
    }
    setIsWishlisted(!isWishlisted);
  };

  const handlePurchase = async () => {
    if (quantity === 0) return;

    setLoading(true);
    setError('');

    try {
      await sweetsAPI.purchase(sweet.id);
      setQuantity(quantity - 1);
      
      // Track purchase
      trackPurchase(sweet.name);
      
      // Confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Toast notification
      toast.success(`${sweet.name} added! Your diet can wait 😋`, {
        duration: 3000,
        icon: '🎉',
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Oops! Something went wrong');
      setError(err.response?.data?.message || 'Failed to purchase sweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id={`sweet-${sweet.id}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col border-2 border-orange-100 dark:border-purple-700 hover:border-orange-300 dark:hover:border-pink-500 animate-slide-up"
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
          <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-2 py-1 rounded-full font-semibold">
            🔥 {purchaseCount} bought today
          </span>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full font-semibold">
            👀 {viewing} viewing now
          </span>
          {quantity < 10 && (
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-1 rounded-full font-semibold animate-pulse">
              ⚠️ Low Stock!
            </span>
          )}
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors flex-1">{sweet.name}</h3>
            <div className="text-right ml-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                ${sweet.price.toFixed(2)}
              </span>
              <p className="text-sm font-semibold text-orange-500">₹{(sweet.price * exchangeRate).toFixed(2)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{sweet.category}</p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(Number(rating)) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">({rating})</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-orange-600 font-semibold">🔥 Only {calories} calories of pure joy!</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Stock:</span>
            <span className={`text-sm font-medium ${
              quantity > 10 
                ? 'text-green-600' 
                : quantity > 0 
                ? 'text-yellow-600' 
                : 'text-red-600'
            }`}>
              {quantity} {quantity === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        <div className="mt-auto">
          {canPurchase && (
            <button
              onClick={handlePurchase}
              disabled={quantity === 0 || loading}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 transform text-sm ${
                quantity === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {loading ? 'Processing...' : quantity === 0 ? 'Sold Out!' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
      
      <div className="px-6 pb-6 h-32">
        {allSweets.length > 0 && <Recommendations currentSweet={sweet} allSweets={allSweets} />}
      </div>
    </div>
  );
};

