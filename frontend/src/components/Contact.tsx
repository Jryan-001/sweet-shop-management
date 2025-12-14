import React from 'react';
import { ContactCard } from './ContactCard';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Us</h1>
      <ContactCard />
    </div>
  );
};
