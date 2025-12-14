import React, { useState, useEffect } from 'react';

export const FestivalCountdown: React.FC = () => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const diwali = new Date('2025-10-20');
    const today = new Date();
    const diff = Math.ceil((diwali.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDays(diff);
  }, []);

  if (days < 0 || days > 365) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl p-4 mb-8 shadow-lg animate-pulse">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🪔</span>
          <div>
            <p className="font-bold text-lg">Diwali in {days} days!</p>
            <p className="text-sm">Stock up on sweets now 🎉</p>
          </div>
        </div>
        <span className="text-3xl font-bold">{days}</span>
      </div>
    </div>
  );
};
