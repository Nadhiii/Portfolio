// src/pages/PlutoPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import FsLightbox from 'fslightbox-react';
import { trackEvent, trackPageView } from '../utils/analytics';
import OptimizedImage from '../components/OptimizedImage';

// --- Importing all your screenshots ---
import PlutoShot1 from '../assets/intro.png';
import PlutoShot2 from '../assets/intro1.png';
import PlutoShot3 from '../assets/intro2.png';
import PlutoShot4 from '../assets/intro3.png';
import PlutoShot5 from '../assets/intro4.png';
import PlutoShot6 from '../assets/intro5.png';
import PlutoShot7 from '../assets/homepage.png';
import PlutoShot8 from '../assets/money_flow.png';
import PlutoShot9 from '../assets/money_flow2.png';
import PlutoShot10 from '../assets/debt_management.png';
import PlutoShot11 from '../assets/debt_management1.png';
import PlutoShot12 from '../assets/debt_management2.png';
import PlutoShot13 from '../assets/debt_management3.png';
import PlutoShot14 from '../assets/debt_management4.png';
import PlutoShot15 from '../assets/settings.png';
import PlutoShot16 from '../assets/settings1.png';

const screenshots = [
  PlutoShot1, PlutoShot2, PlutoShot3, PlutoShot4, PlutoShot5, PlutoShot6,
  PlutoShot7, PlutoShot8, PlutoShot9, PlutoShot10, PlutoShot11, PlutoShot12,
  PlutoShot13, PlutoShot14, PlutoShot15, PlutoShot16
];

const PlutoPage = () => {
  const [lightbox, setLightbox] = useState({
    toggler: false,
    slide: 1,
  });

  // Track page view
  React.useEffect(() => {
    trackPageView('Pluto Project Details', 'pluto');
  }, []);

  const openLightboxOnSlide = (slideIndex) => {
    trackEvent('screenshot_view', 'Engagement', `Pluto screenshot ${slideIndex} viewed`);
    setLightbox({
      toggler: !lightbox.toggler,
      slide: slideIndex,
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  // Animation variants matching HomePage for consistency
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
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1]
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
      className="max-w-7xl mx-auto py-12 md:py-24 px-8"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <motion.header className="text-center mb-20" variants={childVariants}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl mb-4">Pluto</h1>
          <p className="text-lg text-text-light/60 dark:text-text-dark/60 mb-6">
            Previously known as Finance Manager
          </p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed">
            Because Your Wallet Deserves{' '}
            <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent font-medium">
              Better
            </span>
          </p>
          
          {/* Key Metrics */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">16</div>
              <div className="text-sm text-text-light/60 dark:text-text-dark/60">Screenshots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">0₹</div>
              <div className="text-sm text-text-light/60 dark:text-text-dark/60">Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">100%</div>
              <div className="text-sm text-text-light/60 dark:text-text-dark/60">Privacy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">1st</div>
              <div className="text-sm text-text-light/60 dark:text-text-dark/60">App Built</div>
            </div>
          </div>
          
          {/* Quick Download Button */}
          <div className="mt-8">
            <motion.a 
              href="https://drive.google.com/drive/folders/1xpOz7nBaKJ3IBFPERQ8IAU_lBi5PXdL9?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('download_click_top', 'Engagement', 'Pluto APK download clicked - top button')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-300 dark:border-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download APK
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* --- ENHANCED CONTENT WITH MINIMAL DESIGN --- */}
      <motion.div className="max-w-4xl mx-auto space-y-20 mb-24" variants={childVariants}>
        
        {/* Problem & Solution with Clash Animation */}
        <motion.div variants={childVariants} className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.25, 0, 1],
              delay: 0.2
            }}
          >
            <h2 className="font-heading text-3xl mb-6 text-gray-600 dark:text-gray-400">The Problem</h2>
            <p className="text-lg leading-relaxed text-text-light/80 dark:text-text-dark/80">
              I wanted to track my finances without giving apps access to my SMS, email, or bank accounts. 
              Most apps demand subscriptions, invade privacy, or still don't deliver what you need.
            </p>
            <p className="text-lg leading-relaxed text-text-light/80 dark:text-text-dark/80 mt-4">
              So, I thought:
            </p>
            <motion.p 
              className="text-lg font-medium mt-2 text-primary-light dark:text-primary-dark"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5, ease: "backOut" }}
            >
              "Fine. I'll build it myself."
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.25, 0, 1],
              delay: 0.2
            }}
          >
            <h2 className="font-heading text-3xl mb-6 text-gray-600 dark:text-gray-400">The Solution</h2>
            <p className="text-lg leading-relaxed text-text-light/80 dark:text-text-dark/80">
              A privacy-first finance app that works entirely offline. No permissions needed, 
              no subscriptions required, no data harvesting. Just clean, simple money management.
            </p>
          </motion.div>
          
          {/* Clash Effect - Invisible collision point */}
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              delay: 1.0,
              duration: 0.6,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 bg-primary-light/20 dark:bg-primary-dark/20 rounded-full blur-sm"></div>
          </motion.div>
        </motion.div>

        {/* Core Features */}
        <motion.div variants={childVariants}>
          <h2 className="font-heading text-3xl mb-8 text-center text-gray-600 dark:text-gray-400">What It Actually Does</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Check className="text-accent-green-light dark:text-accent-green-dark mb-3" size={24} />
              <h3 className="font-semibold mb-2">Complete Financial Tracking</h3>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">Income, expenses, debts, and investments in one place</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Check className="text-accent-green-light dark:text-accent-green-dark mb-3" size={24} />
              <h3 className="font-semibold mb-2">Smart Budgets & Goals</h3>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">Set savings targets and debt payoff plans</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Check className="text-accent-green-light dark:text-accent-green-dark mb-3" size={24} />
              <h3 className="font-semibold mb-2">Cross-Device Sync</h3>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">Works seamlessly across all your devices</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Check className="text-accent-green-light dark:text-accent-green-dark mb-3" size={24} />
              <h3 className="font-semibold mb-2">2 AM Friendly</h3>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">Light and dark modes for late-night budgeting</p>
            </div>
          </div>
        </motion.div>
        
        {/* Privacy & Learning */}
        <motion.div variants={childVariants} className="grid md:grid-cols-2 gap-12 items-start">
          <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-semibold text-lg mb-4 text-blue-700 dark:text-blue-300">Privacy Promise</h3>
            <p className="text-blue-600 dark:text-blue-400">
              No SMS reading. No bank scraping. No subscriptions. No data collection. 
              Your financial data stays yours, period.
            </p>
          </div>
          <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
            <h3 className="font-semibold text-lg mb-4 text-green-700 dark:text-green-300">Learning Journey</h3>
            <p className="text-green-600 dark:text-green-400">
              My first mobile app taught me full-stack development from scratch. 
              Every bug was a lesson, every feature a breakthrough.
            </p>
          </div>
        </motion.div>

        {/* Tech Approach */}
        <motion.div variants={childVariants} className="text-center">
          <h2 className="font-heading text-3xl mb-6 text-gray-600 dark:text-gray-400">Built With Purpose</h2>
          <p className="text-lg leading-relaxed text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
            Rather than learning theory, I built something I actually needed. 
            This hands-on approach taught me more about mobile development, 
            databases, and user experience than any tutorial could.
          </p>
        </motion.div>
      </motion.div>

      <motion.div className="mb-24" variants={childVariants}>
        <h2 className="font-heading text-3xl mb-8 text-center text-gray-600 dark:text-gray-400 flex items-center justify-center gap-3">
          <Smartphone size={30} className="text-primary-light dark:text-primary-dark" />
          App Walkthrough
        </h2>
        <p className="text-center text-text-light/60 dark:text-text-dark/60 mb-8">
          Click any screenshot to view full-size
        </p>
        <div className="px-4">
          <Slider {...sliderSettings}>
            {screenshots.map((shot, index) => (
              <div key={index} className="px-2" onClick={() => openLightboxOnSlide(index + 1)}>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md aspect-[9/16] cursor-pointer group">
                  <OptimizedImage
                    src={shot}
                    alt={`Pluto Screenshot ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

      <motion.div className="text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-12" variants={childVariants}>
        <h3 className="font-heading text-2xl mb-4">Ready to Try It?</h3>
        <p className="text-text-light/70 dark:text-text-dark/70 mb-8 max-w-md mx-auto">
          Download the APK and start managing your finances without compromising your privacy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a 
            href="https://drive.google.com/drive/folders/1xpOz7nBaKJ3IBFPERQ8IAU_lBi5PXdL9?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackEvent('download_click', 'Engagement', 'Pluto APK download clicked')}
            className="bg-primary-light text-white font-medium py-4 px-8 rounded-xl hover:bg-primary-light/90 transition-all text-lg shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download APK
          </motion.a>
          <Link 
            to="/" 
            onClick={() => trackEvent('back_to_home', 'Navigation', 'Back to home from Pluto page')}
            className="flex items-center gap-2 text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>
      </motion.div>

      <FsLightbox
        toggler={lightbox.toggler}
        sources={screenshots}
        slide={lightbox.slide}
      />
    </motion.div>
  );
};

export default PlutoPage;