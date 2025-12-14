import React from 'react';
import type { Sweet } from '../types';

interface Props {
  currentSweet: Sweet;
  allSweets: Sweet[];
}

export const Recommendations: React.FC<Props> = ({ currentSweet, allSweets }) => {
  const recommended = allSweets
    .filter(s => s.category === currentSweet.category && s.id !== currentSweet.id)
    .slice(0, 3);

  if (recommended.length === 0) return null;

  return (
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        🤝 People who bought this also bought:
      </p>
      <div className="flex gap-2 overflow-x-auto">
        {recommended.map(sweet => (
          <div key={sweet.id} className="flex-shrink-0 text-center">
            <img 
              src={`/images/${sweet.image}`} 
              alt={sweet.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">{sweet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
