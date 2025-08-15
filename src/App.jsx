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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 text-text-light dark:text-text-dark font-body transition-all duration-500">
      
      {/* Subtle animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/60 to-purple-200/60 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-green-200/60 to-blue-200/60 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200/50 to-pink-200/50 dark:from-purple-900/15 dark:to-pink-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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
            <motion.div variants={contentItemVariants}>
              <Header theme={theme} onThemeSwitch={handleThemeSwitch} />
            </motion.div>
            <main className="min-h-screen">
              <motion.div 
                variants={contentItemVariants}
                className={`min-h-full transition-all duration-500 ease-out ${transitionClasses}`}
              >
                <Outlet />
              </motion.div>
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