// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200/50 dark:border-gray-700/50 py-8 px-8">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Centered Copyright Text */}
        <p className="text-sm text-text-light dark:text-text-dark">
          © 2025 Mahanadhi Parisara. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;