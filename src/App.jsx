// src/App.jsx
// CHANGES: Removed light/dark toggle. Dark-only. Removed sky/indigo gradient bg.
// Kept: IntroAnimation, Header, FloatingNav, CalendarButton/Modal, Footer, CustomCursor, Lenis.
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CalendarButton from './components/CalendarButton';
import CalendarModal from './components/CalendarModal';
import IntroAnimation from './components/IntroAnimation';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import useSmoothScroll from './hooks/useSmoothScroll';

const isBrowser = typeof window !== 'undefined';
function App() {

  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Determine if we should show the intro animation
  const [showIntro, setShowIntro] = useState(() => {
    if (!isBrowser) return false;
    return location.pathname === '/' && !sessionStorage.getItem('hasSeenIntro');
  });

  // 2. FIXED: Safe guard internal routes so they instantly load main content
  const [showMainContent, setShowMainContent] = useState(() => {
    if (!isBrowser) return true;
    if (location.pathname !== '/') return true; // Direct link to /projects, /skills, etc.
    return !showIntro;
  });
  // Always force dark mode; brand is dark-only.
  useLayoutEffect(() => {
    if (!isBrowser) return;
    document.documentElement.classList.add('dark');
  }, []);
  useSmoothScroll(!showIntro);
  const handleIntroComplete = () => {
    if (!isBrowser) return;
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    setShowMainContent(true);
  };
  useEffect(() => {
    if (!isBrowser) return;
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!isBrowser) return;
    document.body.style.overflow = showIntro ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showIntro]);
  useEffect(() => {
    const handleOpenCalendar = () => setIsModalOpen(true);
    window.addEventListener('open-calendar-modal', handleOpenCalendar);
    return () => window.removeEventListener('open-calendar-modal', handleOpenCalendar);
  }, []);
  useEffect(() => {
    if (!showIntro && !showMainContent) setShowMainContent(true);
  }, [showIntro, showMainContent]);
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-body">
      <CustomCursor />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z- focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-brand-bg focus:rounded-lg">
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onAnimationComplete={handleIntroComplete} />
        ) : (
          <div className="min-h-screen relative z-20">
            <ScrollToTop />
            <Header />
            <main id="main-content" className="min-h-screen">
              <Outlet />
            </main>
            <CalendarButton onClick={() => setIsModalOpen(true)} />
            <CalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <FloatingNav />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;