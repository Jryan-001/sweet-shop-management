import React, { useState, useEffect } from 'react';
import type { Sweet } from '../types';

interface Props {
  sweets: Sweet[];
}

export const SweetOfTheDay: React.FC<Props> = ({ sweets }) => {
  const [sweetOfDay, setSweetOfDay] = useState<Sweet | null>(null);

  useEffect(() => {
    if (sweets.length === 0) return;

    const stored = localStorage.getItem('sweetOfTheDay');
    const now = new Date().getTime();

    if (stored) {
      const { sweet, timestamp } = JSON.parse(stored);
      // Check if 24 hours have passed
      if (now - timestamp < 24 * 60 * 60 * 1000) {
        const foundSweet = sweets.find(s => s.id === sweet.id);
        if (foundSweet) {
          setSweetOfDay(foundSweet);
          return;
        }
      }
    }

    // Set new sweet of the day
    const randomSweet = sweets[Math.floor(Math.random() * sweets.length)];
    localStorage.setItem('sweetOfTheDay', JSON.stringify({
      sweet: randomSweet,
      timestamp: now
    }));
    setSweetOfDay(randomSweet);
  }, [sweets]);

  const scrollToSweet = () => {
    const element = document.getElementById(`sweet-${sweetOfDay?.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-yellow-400');
      setTimeout(() => element.classList.remove('ring-4', 'ring-yellow-400'), 2000);
    }
  };

  if (!sweetOfDay) return null;

  const discount = 20;
  const discountedPrice = sweetOfDay.price * (1 - discount / 100);

  return (
    <div 
      onClick={scrollToSweet}
      className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 rounded-2xl p-6 mb-8 shadow-2xl animate-slide-up relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-2xl font-bold text-lg animate-pulse">
        {discount}% OFF
      </div>
      <div className="flex items-center gap-4">
        <div className="text-6xl animate-bounce-slow">⭐</div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">Sweet of the Day!</h2>
          <p className="text-white text-xl font-semibold">{sweetOfDay.name}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-white line-through text-lg">${sweetOfDay.price.toFixed(2)}</span>
            <span className="text-yellow-300 text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
            <span className="text-white text-sm italic">Limited time only! 🔥</span>
          </div>
        </div>
        <img 
          src={`/images/${sweetOfDay.image}`} 
          alt={sweetOfDay.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
        />
      </div>
    </div>
  );
};
