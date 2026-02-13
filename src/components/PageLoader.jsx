// src/components/PageLoader.jsx
import React from 'react';

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary-light dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
    </div>
  </div>
);

export default PageLoader;
