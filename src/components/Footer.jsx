// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 py-8 text-center">
      {/* Subtle Divider Line */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6 opacity-50" />
      
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Mahanadhi Parisara. Built with curiosity.
      </p>
    </footer>
  );
};

export default Footer;