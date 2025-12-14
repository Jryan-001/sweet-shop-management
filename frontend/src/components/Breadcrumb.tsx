import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="mb-4 flex items-center gap-2 text-sm">
      <Link to="/" className="text-orange-600 dark:text-yellow-400 hover:underline">
        Home
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 dark:text-gray-300 capitalize">{path}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};
