import React from 'react';

export const ContactCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📞</span>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
            <p className="font-semibold text-gray-800 dark:text-white">+91 98765 43210</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📧</span>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
            <p className="font-semibold text-gray-800 dark:text-white">hello@mithaas.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
            <p className="font-semibold text-gray-800 dark:text-white">123 Sweet Street, Mumbai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

