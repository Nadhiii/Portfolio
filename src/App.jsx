// src/App.jsx (Simple and Reliable Transition Approach)

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import CalendarButton from './components/CalendarButton';
import CalendarModal from './components/CalendarModal';
import IntroAnimation from './components/IntroAnimation';
import Footer from './components/Footer';
import ActionButtons from './components/ActionButtons';
import ThemeTransition from './components/ThemeTransition';
import ScrollToTop from './components/ScrollToTop';
import { useThemeTransition } from './hooks/useThemeTransition';

// Utility to check if we're on the server (for SSR compatibility)
const isBrowser = typeof window !== "undefined";

function App() {
  const [theme, setTheme] = useState(() => {
    if (!isBrowser) return 'light';
    return localStorage.getItem('theme') || 'light';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  
  const [showIntro, setShowIntro] = useState(() => {
    if (!isBrowser) return false;
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    const isRootPath = location.pathname === '/';
    return isRootPath && !hasSeenIntro;
  });

  const [showMainContent, setShowMainContent] = useState(false);

  // Simple transition state
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Theme transition hook
  const {
    isTransitioning: isThemeTransitioning,
    startPosition,
    triggerThemeTransition,
    completeTransition,
  } = useThemeTransition((newTheme) => {
    setTheme(newTheme || (theme === 'light' ? 'dark' : 'light'));
  });

  const handleThemeSwitch = (event) => {
    triggerThemeTransition(event);
  };
  
  const handleIntroComplete = () => {
    if (!isBrowser) return;
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    // Show main content immediately for seamless transition
    setShowMainContent(true);
  };

  // Scroll to top on initial load (page refresh)
  useEffect(() => {
    if (!isBrowser) return;
    window.scrollTo(0, 0);
  }, []);

  // Theme management
  useLayoutEffect(() => {
    if (!isBrowser) return;
    
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Body overflow management for intro animation
  useEffect(() => {
    if (!isBrowser) return;
    
    document.body.style.overflow = showIntro ? 'hidden' : 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showIntro]);

  // Handle route transitions
  useEffect(() => {
    if (showIntro) return; // Skip during intro
    
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 50); // Very short delay just to trigger the transition
    
    return () => clearTimeout(timer);
  }, [location.pathname, showIntro]);

  // Initialize main content visibility for users who have seen intro
  useEffect(() => {
    if (!showIntro && !showMainContent) {
      setShowMainContent(true);
    }
  }, [showIntro, showMainContent]);

  // Animation variants for main content slide up with bounce
  const mainContentVariants = {
    hidden: {
      y: '100vh',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 60,
        mass: 1.2,
        duration: 1.8,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  // Individual component animation
  const contentItemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // CSS classes for route transition
  const transitionClasses = isTransitioning 
    ? 'opacity-0 transform translate-x-4' 
    : 'opacity-100 transform translate-x-0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-emerald-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 text-text-light dark:text-text-dark font-body transition-all duration-500">
      
      {/* Enhanced animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top left - Blue/Purple orb */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/50 via-indigo-400/45 to-purple-400/40 dark:from-blue-600/30 dark:via-purple-600/25 dark:to-blue-700/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Bottom right - Green/Blue orb */}
        <div className="absolute bottom-1/4 -right-40 w-[32rem] h-[32rem] bg-gradient-to-r from-emerald-400/50 via-cyan-400/45 to-teal-400/40 dark:from-green-600/25 dark:via-blue-600/20 dark:to-green-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Center left - Purple/Pink accent */}
        <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/45 via-fuchsia-400/40 to-pink-400/35 dark:from-purple-600/20 dark:via-pink-600/15 dark:to-purple-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Top right - Accent orb */}
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-gradient-to-r from-cyan-400/40 via-sky-400/35 to-blue-400/35 dark:from-cyan-600/15 dark:to-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        
        {/* Middle center - Warm accent for light mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-rose-300/25 via-amber-300/20 to-yellow-300/20 dark:from-transparent dark:to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onAnimationComplete={handleIntroComplete} />
        ) : (
          <motion.div
            key="main-content"
            variants={mainContentVariants}
            initial="hidden"
            animate={showMainContent ? "visible" : "hidden"}
            className="min-h-screen"
          >
            <ScrollToTop />
            <motion.div variants={contentItemVariants}>
              <Header theme={theme} onThemeSwitch={handleThemeSwitch} />
            </motion.div>
            <main className="min-h-screen">
              <AnimatePresence mode="wait">
                <div key={location.pathname} className="min-h-full">
                  <Outlet />
                </div>
              </AnimatePresence>
            </main>
            <motion.div variants={contentItemVariants}>
              <CalendarButton onClick={() => setIsModalOpen(true)} />
            </motion.div>
            <motion.div variants={contentItemVariants}>
              <CalendarModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                theme={theme} 
              />
            </motion.div>
            <motion.div variants={contentItemVariants}>
              <ActionButtons />
            </motion.div>
            <motion.div variants={contentItemVariants}>
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Transition */}
      <ThemeTransition
        isActive={isThemeTransitioning}
        onComplete={completeTransition}
        startPosition={startPosition}
        theme={theme}
      />
    </div>
  );
}

export default App;