// src/components/ThemeTransition.jsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeTransition = ({ isActive, onComplete, startPosition, theme }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setProgress(0);
      
      const duration = 800; // Faster, cleaner transition
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function
        const eased = 1 - Math.pow(1 - currentProgress, 3); // Ease out cubic
        setProgress(eased);
        
        if (currentProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            onComplete();
          }, 100);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  
  // Create a diagonal sweep from top-left to bottom-right
  const sweepPosition = progress * (screenWidth + screenHeight);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      >
        {/* Main gradient sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              transparent 0%, 
              transparent ${Math.max(0, progress * 100 - 15)}%, 
              ${theme === 'dark' 
                ? 'rgba(59, 130, 246, 0.15)' 
                : 'rgba(147, 197, 253, 0.15)'
              } ${progress * 100}%, 
              ${theme === 'dark' 
                ? 'rgba(99, 102, 241, 0.2)' 
                : 'rgba(59, 130, 246, 0.2)'
              } ${Math.min(100, progress * 100 + 5)}%, 
              transparent ${Math.min(100, progress * 100 + 15)}%, 
              transparent 100%)`,
          }}
        />

        {/* Ripple effect from start position */}
        {startPosition && (
          <>
            <motion.div
              className="absolute rounded-full border-2 border-primary-light/60 dark:border-primary-dark/60"
              style={{
                left: startPosition.x - 25,
                top: startPosition.y - 25,
                width: 50,
                height: 50,
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="absolute rounded-full bg-primary-light/20 dark:bg-primary-dark/20"
              style={{
                left: startPosition.x - 15,
                top: startPosition.y - 15,
                width: 30,
                height: 30,
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />
          </>
        )}

        {/* Subtle particle effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />

        {/* Leading edge highlight */}
        <motion.div
          className="absolute w-1 h-full bg-gradient-to-b from-transparent via-primary-light/40 to-transparent dark:via-primary-dark/40"
          style={{
            left: `${progress * 100}%`,
            transform: 'translateX(-50%) skewX(-15deg)',
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeTransition;
