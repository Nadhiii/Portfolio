// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../config/animations';

// CONSTANTS: Strictly professional nouns that fit "I Engineer [X]"
const SWITCHING_WORDS = [
  "Efficiency",    // Ref: Apps Script automation saving time 
  "Clarity",       // Ref: Ensuring 100% data accuracy 
  "Impact",        // Ref: Driving 25-40% effectiveness 
  "Trust",         // Ref: Safeguarding high-spend client ROI
  "Solutions"      // Ref: Technical Solutions Professional 
];

const GLYPHS = '01/>_<!?-+X';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let interval;
    let iteration = 0;
    
    clearInterval(interval);

    interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      });

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 0.5; 
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="font-mono text-primary-light dark:text-primary-dark inline-block min-w-[200px] text-left">
      {displayText}
    </span>
  );
};

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % SWITCHING_WORDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-5xl mx-auto text-center w-full"
      >
        {/* 1. GLASS BADGE - Barney Stinson Reference */}
        <motion.div variants={itemVariants} className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-primary-light/20 dark:border-primary-dark/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] group hover:border-primary-light/50 transition-colors cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-primary-light dark:text-primary-dark uppercase group-hover:text-white transition-colors">
              Suiting Up @ Cognizant
            </span>
          </div>
        </motion.div>

        {/* 2. MAIN HEADING - Static "I Engineer" + Dynamic Word */}
        <motion.div 
          variants={itemVariants}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-none text-gray-900 dark:text-white"
        >
          <div className="mb-2">I Engineer</div>
          
          <div className="h-[1.3em] relative flex justify-center items-center">
            <ScrambleText text={SWITCHING_WORDS[currentWordIndex]} />
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1.5 h-10 sm:h-14 ml-1 bg-primary-light dark:bg-primary-dark align-middle"
            />
          </div>
        </motion.div>

        {/* 3. SUBTEXT - Contextualized to your Resume */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto space-y-6 mt-8"
        >
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            Technical Consultant at <span className="text-gray-900 dark:text-white font-bold">Cognizant (Measurement CoE)</span>.
            <br className="hidden md:block" />
            I troubleshoot high-stakes setups for <span className="text-gray-900 dark:text-white font-bold">Google Ads, GTM, GA4, & Firebase</span>. 
            If the tracking isn't right, the ROI isn't real.
          </p>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            Aspiring <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">Product Manager</span>—because after fixing thousands of broken implementations, I know how to build a product that actually works.
          </p>
          
          {/* Footer Quote - Barney Stinson */}
          <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-6 opacity-80">
            (It’s going to be legen... wait for it.... dary)
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;