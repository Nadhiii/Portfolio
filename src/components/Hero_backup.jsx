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
    <section id="hero" className="relative max-w-4xl mx-auto pt-40 pb-24 lg:pt-48 lg:pb-32 text-center overflow-visible">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-accent-green-light/5 dark:from-primary-dark/5 dark:to-accent-green-dark/5 rounded-full blur-3xl transform -translate-y-1/2 scale-150"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-2 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark font-bold rounded-full text-sm tracking-wider">
            ASPIRING PRODUCT MANAGER | BUILDER BY NATURE
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-4 leading-none pt-4"
        >
          <div className="bg-gradient-to-br from-text-light via-text-light/90 to-text-light/70 dark:from-text-dark dark:via-text-dark/90 dark:to-text-dark/70 bg-clip-text text-transparent leading-none">
            I Transform
          </div>
          
          <div className="h-20 lg:h-24 flex items-center justify-center my-2 overflow-visible">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gradient-to-r from-primary-light via-accent-green-light to-primary-light dark:from-primary-dark dark:via-accent-green-dark dark:to-primary-dark bg-clip-text text-transparent font-bold inline-block py-2"
              >
                {switchingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <div className="bg-gradient-to-br from-text-light via-text-light/90 to-text-light/70 dark:from-text-dark dark:via-text-dark/90 dark:to-text-dark/70 bg-clip-text text-transparent leading-none">
            Into Impactful Products
          </div>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="mt-8 text-xl text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto leading-relaxed"
        >
          A hands-on professional transitioning into product management. I've built apps, automated workflows, and spent enough time talking to frustrated users to know what good products actually need. (Spoiler: it's usually simpler than you think.)
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center"
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
