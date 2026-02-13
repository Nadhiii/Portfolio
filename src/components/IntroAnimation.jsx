// src/components/IntroAnimation.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // We handle the sequence with a simple timeout coordination
    // to ensure the exit animation plays fully before unmounting
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Adjust total duration here (2.5s)

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => onAnimationComplete()}
    >
      {isVisible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-black overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Premium "Quart" easing
              delay: 0.2
            }
          }}
        >
          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4">
            
            {/* 1. Top Text (First Name) */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white uppercase">
                <LetterStagger text="Mahanadhi" />
              </h1>
            </motion.div>

            {/* 2. Futuristic Divider Line */}
            <motion.div
              className="h-[2px] bg-gray-900 dark:bg-white my-4 sm:my-6"
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              exit={{ width: 0, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            />

            {/* 3. Bottom Text (Last Name) */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            >
              <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-gray-400 dark:text-gray-500 uppercase">
                <LetterStagger text="Parisara" delay={0.4} />
              </h1>
            </motion.div>

            {/* 4. Loading Progress Bar */}
            <motion.div
              className="mt-8 sm:mt-12 w-32 sm:w-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.8 }}
            >
              <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 dark:bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <motion.p
                className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-600 text-center mt-3 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Loading
              </motion.p>
            </motion.div>
          </div>

          {/* Optional: Subtle Background Grid for "Tech" feel */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
               style={{ 
                 backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
               }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Sub-component for individual letter animation (Blur Reveal)
const LetterStagger = ({ text, delay = 0 }) => {
  const letters = text.split("");
  
  return (
    <span className="inline-flex">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
            delay: delay + (i * 0.05), // Stagger effect
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

export default IntroAnimation;