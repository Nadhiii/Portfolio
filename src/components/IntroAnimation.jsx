// src/components/IntroAnimation.jsx (Improved Version)

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const IntroAnimation = ({ onAnimationComplete }) => {
  const name = "Mahanadhi Parisara".split("");
  const controls = useAnimation();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Prevent multiple animation starts
    if (animationStarted) return;
    
    setAnimationStarted(true);
    
    const sequence = async () => {
      try {
        // 1. Small initial delay to ensure everything is loaded
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // 2. Start typewriter animation
        await controls.start("visible");
        
        // 3. Hold the complete text for a moment
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 4. Zoom out and fade
        await controls.start("exit");
        
        // 5. Small delay before calling completion
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 6. Notify parent component
        onAnimationComplete();
      } catch (error) {
        console.error('Animation sequence error:', error);
        // Fallback: still call completion even if animation fails
        onAnimationComplete();
      }
    };
    
    sequence();
  }, [controls, onAnimationComplete, animationStarted]);

  // Container variants with better timing
  const containerVariants = {
    hidden: {
      opacity: 1, // Keep container visible
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Slightly slower for better readability
        delayChildren: 0.2,   // Small delay before letters start
      },
    },
    exit: {
      scale: 12,
      opacity: 0,
      transition: {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother zoom
      },
    },
  };

  // Letter variants with smoother animation
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20, // Start slightly below
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    },
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-background-light dark:bg-background-dark z-50">
      <motion.div
        className="font-heading text-4xl md:text-6xl lg:text-7xl text-center font-bold tracking-wider"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{ 
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          willChange: 'transform, opacity' // Optimize for animations
        }}
      >
        {name.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`} // More unique keys
            variants={letterVariants}
            style={{ 
              display: 'inline-block',
              willChange: 'transform, opacity' // Optimize for animations
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default IntroAnimation;