// src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  // Animation variants matching other pages for consistency
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-8"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <motion.div className="text-center max-w-md" variants={childVariants}>
        <motion.div variants={childVariants}>
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary-light dark:text-primary-dark mb-4">
            404
          </h1>
        </motion.div>
        
        <motion.div variants={childVariants}>
          <h2 className="font-heading text-2xl md:text-3xl mb-6 text-text-light dark:text-text-dark">
            Page Not Found
          </h2>
        </motion.div>
        
        <motion.div variants={childVariants}>
          <p className="text-text-light/70 dark:text-text-dark/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>
        
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={childVariants}>
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            <Home size={18} />
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-lg hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
