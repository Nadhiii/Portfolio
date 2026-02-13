// src/App.jsx

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import CalendarButton from './components/CalendarButton';
import CalendarModal from './components/CalendarModal';
import IntroAnimation from './components/IntroAnimation';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav'; // REPLACED ActionButtons with FloatingNav
import ThemeTransition from './components/ThemeTransition';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import { useThemeTransition } from './hooks/useThemeTransition';
import useSmoothScroll from './hooks/useSmoothScroll';
import Hero3D from './components/Hero3D';

// Utility to check if we're on the server (for SSR compatibility)
const isBrowser = typeof window !== "undefined";

function App() {
  const [theme, setTheme] = useState(() => {
    if (!isBrowser) return 'light';
    return localStorage.getItem('theme') || 'light';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  
  // Logic to show intro only once per session on the homepage
  const [showIntro, setShowIntro] = useState(() => {
    if (!isBrowser) return false;
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    const isRootPath = location.pathname === '/';
    return isRootPath && !hasSeenIntro;
  });

  const [showMainContent, setShowMainContent] = useState(false);

  // Smooth scroll with Lenis (disabled during intro)
  useSmoothScroll(!showIntro);

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
    setShowMainContent(true);
  };

  // Scroll to top on initial load
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

  // Listen for calendar modal open events from child components
  useEffect(() => {
    const handleOpenCalendar = () => setIsModalOpen(true);
    window.addEventListener('open-calendar-modal', handleOpenCalendar);
    return () => window.removeEventListener('open-calendar-modal', handleOpenCalendar);
  }, []);

  // Ensure content is visible if intro is skipped/done
  useEffect(() => {
    if (!showIntro && !showMainContent) {
      setShowMainContent(true);
    }
  }, [showIntro, showMainContent]);

  // Animation variants
  const mainContentVariants = {
    hidden: { y: '100vh', opacity: 0 },
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

  const contentItemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  return (
    <div className="theme-transition min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-emerald-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 text-text-light dark:text-text-dark font-body transition-all duration-500">
      
      {/* Custom Cursor (desktop only) */}
      <CustomCursor />
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary-light focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      
      {/* 3D Background Layer */}
      <Hero3D theme={theme} />
      
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onAnimationComplete={handleIntroComplete} />
        ) : (
          <motion.div
            key="main-content"
            variants={mainContentVariants}
            initial="hidden"
            animate={showMainContent ? "visible" : "hidden"}
            className="min-h-screen relative z-20"
          >
            <ScrollToTop />
            
            <motion.div variants={contentItemVariants}>
              <Header theme={theme} onThemeSwitch={handleThemeSwitch} />
            </motion.div>
            
            <main id="main-content" className="min-h-screen">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={location.pathname} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="min-h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Floating Elements */}
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

            {/* NEW: FloatingNav replaces ActionButtons */}
            <motion.div variants={contentItemVariants}>
              <FloatingNav />
            </motion.div>
            
            <motion.div variants={contentItemVariants}>
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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