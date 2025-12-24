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
import { useThemeTransition } from './hooks/useThemeTransition';
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

  // Handle route transitions
  useEffect(() => {
    if (showIntro) return;
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, showIntro]);

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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-emerald-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 text-text-light dark:text-text-dark font-body transition-all duration-500">
      
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
            
            <main className="min-h-screen">
              <AnimatePresence mode="wait">
                <div key={location.pathname} className="min-h-full">
                  <Outlet />
                </div>
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