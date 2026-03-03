// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/404.json';

const NotFoundPage = () => {
  return (
    <div 
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #4893B9, #E4ECF9)' }}
    >
      {/* Light overlay behind the header area so nav text stays readable */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/60 to-transparent z-10" />
      {/* Full Screen Lottie Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Lottie 
          animationData={animationData}
          loop={true}
          autoplay={true}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          style={{ 
            width: '100%', 
            height: '100%',
          }}
        />
      </motion.div>
      
      {/* Mission Control Button at Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-10 inset-x-0 flex justify-center z-20"
      >
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-md text-[#2a6a8a] border border-white/50 rounded-full font-semibold hover:bg-white transition-all hover:scale-105 shadow-lg"
        >
          <Home size={20} />
          Mission Control
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;