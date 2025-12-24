// src/components/ThemeTransition.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeTransition = ({ isActive, onComplete, theme }) => {
  const [stage, setStage] = useState('idle'); // idle, covering, revealing

  useEffect(() => {
    if (isActive) {
      setStage('covering');
      // Wait for cover to fully close before switching theme (approx 400ms)
      setTimeout(() => {
        onComplete(); 
        setStage('revealing');
        // Wait for reveal to finish before resetting
        setTimeout(() => {
          setStage('idle');
        }, 500);
      }, 500);
    }
  }, [isActive, onComplete]);

  if (!isActive && stage === 'idle') return null;

  const isDarkTarget = theme === 'dark'; // The theme we are switching TO

  return (
    <AnimatePresence>
      {stage !== 'idle' && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Top Shutter */}
          <motion.div
            className={`flex-1 w-full ${isDarkTarget ? 'bg-black' : 'bg-white'}`}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: stage === 'covering' ? 1 : 0,
              transformOrigin: 'top'
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* Bottom Shutter */}
          <motion.div
            className={`flex-1 w-full ${isDarkTarget ? 'bg-black' : 'bg-white'}`}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: stage === 'covering' ? 1 : 0,
              transformOrigin: 'bottom'
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;