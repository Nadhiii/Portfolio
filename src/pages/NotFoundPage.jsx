// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 lg:py-32">
      <AlertTriangle className="w-16 h-16 text-primary-light dark:text-primary-dark mb-6" />
      <h1 className="font-heading text-6xl md:text-8xl">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="mt-8 bg-primary-light text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;