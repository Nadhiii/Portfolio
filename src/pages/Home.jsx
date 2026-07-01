import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, childVariants } from '../config/animations';
import Hero from '../components/Hero';
import About from './About';

const HomePage = () => {
  return (
    <motion.div
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={childVariants}>
        <Hero />
      </motion.div>
      <motion.div variants={childVariants}>
        <About />
      </motion.div>
      <div className="h-12" />
    </motion.div>
  );
};

export default HomePage;