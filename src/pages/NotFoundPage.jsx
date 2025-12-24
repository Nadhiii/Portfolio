// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center p-12 rounded-3xl bg-white/30 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl"
      >
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-600 mb-2">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lost in Space?
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          The page you're looking for seems to have drifted away into the void. Let's get you back to solid ground.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-xl font-medium shadow-lg hover:scale-105 transition-transform"
          >
            <Home size={18} />
            Mission Control
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;