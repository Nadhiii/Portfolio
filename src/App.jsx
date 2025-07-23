// src/App.jsx (Simple and Reliable Transition Approach)

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './components/Header';
import CalendarButton from './components/CalendarButton';
import CalendarModal from './components/CalendarModal';
import IntroAnimation from './components/IntroAnimation';
import Footer from './components/Footer';

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

  // Simple transition state
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThemeSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
  const handleIntroComplete = () => {
    if (!isBrowser) return;
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
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

  // CSS classes for transition
  const transitionClasses = isTransitioning 
    ? 'opacity-0 transform translate-x-4' 
    : 'opacity-100 transform translate-x-0';

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-body transition-colors duration-300">
      
      {showIntro ? (
        <IntroAnimation onAnimationComplete={handleIntroComplete} />
      ) : (
        <>
          <Header theme={theme} onThemeSwitch={handleThemeSwitch} />
          <main className="pt-20 min-h-screen">
            <div 
              className={`min-h-full transition-all duration-500 ease-out ${transitionClasses}`}
            >
              <Outlet />
            </div>
          </main>
          <CalendarButton onClick={() => setIsModalOpen(true)} />
          <CalendarModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            theme={theme} 
          />
          <Footer /> 
        </>
      )}
    </div>
  );
}

export default App;