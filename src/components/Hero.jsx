// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Hero = () => {
  const switchingWords = [
    "Problems",
    "Ideas", 
    "Challenges",
    "Insights",
    "Opportunities"
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasSpread, setHasSpread] = useState(false);

  // Trigger the spreading effect after component mounts
  useEffect(() => {
    const spreadTimer = setTimeout(() => {
      setHasSpread(true);
    }, 800); // Start spreading after 800ms

    return () => clearTimeout(spreadTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % switchingWords.length);
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, [switchingWords.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1]
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Enhanced background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-accent-green-light/5 dark:from-primary-dark/5 dark:to-accent-green-dark/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple-light/10 to-primary-light/10 dark:from-accent-purple-dark/10 dark:to-primary-dark/10 rounded-full blur-3xl animate-pulse"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center w-full"
      >
        {/* Role Badge */}
        <motion.div variants={itemVariants} className="mb-10">
          <span className="inline-block px-4 py-2 md:px-6 md:py-3 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark font-bold rounded-full text-xs md:text-sm tracking-wider border border-primary-light/20 dark:border-primary-dark/20 shadow-lg">
            SME @ COGNIZANT
          </span>
        </motion.div>

        {/* Main Heading with Animation */}
        <motion.div 
          variants={itemVariants}
          className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight overflow-visible"
        >
          {/* Vertical Spreading Animation Container */}
          <div className="relative">
            {/* "I Transform" - slides UP from center */}
            <motion.div 
              initial={{ y: 80, opacity: 0.3 }}
              animate={{ 
                y: hasSpread ? 0 : 80,
                opacity: hasSpread ? 1 : 0.3,
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="bg-gradient-to-br from-text-light via-text-light/90 to-text-light/70 dark:from-text-dark dark:via-text-dark/90 dark:to-text-dark/70 bg-clip-text text-transparent"
            >
              I Transform
            </motion.div>
            
            {/* Animated Word Switcher - stays in center, emerges/expands */}
            <motion.div 
              initial={{ scaleY: 0.3, opacity: 0 }}
              animate={{ 
                scaleY: hasSpread ? 1 : 0.3,
                opacity: hasSpread ? 1 : 0,
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.1,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="h-32 lg:h-40 flex items-center justify-center my-6 py-4"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-gradient-to-r from-primary-light via-accent-green-light to-primary-light dark:from-primary-dark dark:via-accent-green-dark dark:to-primary-dark bg-clip-text text-transparent font-bold inline-block"
                >
                  {switchingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            
            {/* "Into Impactful Solutions" - slides DOWN from center */}
            <motion.div 
              initial={{ y: -80, opacity: 0.3 }}
              animate={{ 
                y: hasSpread ? 0 : -80,
                opacity: hasSpread ? 1 : 0.3,
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.15,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="bg-gradient-to-br from-text-light via-text-light/90 to-text-light/70 dark:from-text-dark dark:via-text-dark/90 dark:to-text-dark/70 bg-clip-text text-transparent"
            >
              Into Impactful Solutions
            </motion.div>
          </div>
        </motion.div>

        {/* Clear Summary - What I Actually Do */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 space-y-3 max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-text-light/90 dark:text-text-dark/90 font-medium leading-relaxed">
            Subject Matter Expert at Cognizant, working on Google's advertising measurement tools.
          </p>
          <p className="text-base md:text-lg text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
            I implement and troubleshoot conversion tracking solutions—making sure advertisers can accurately measure what's working.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: showScrollIndicator ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm text-text-light/50 dark:text-text-dark/50 mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-text-light/20 dark:border-text-dark/20 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary-light dark:bg-primary-dark rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
