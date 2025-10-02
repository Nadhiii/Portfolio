// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackPageView } from '../utils/analytics';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const HomePage = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Set the current section based on the pathname
    const path = location.pathname;
    
    if (path === '/projects') {
      setCurrentSection('projects');
      trackPageView('Projects Section', 'projects');
    } else if (path === '/skills') {
      setCurrentSection('skills');
      trackPageView('Skills Section', 'skills');
    } else if (path === '/contact') {
      setCurrentSection('contact');
      trackPageView('Contact Section', 'contact');
    } else {
      setCurrentSection('home');
      trackPageView('Home Page', 'home');
    }
  }, [location.pathname]);

  // Animation variants for smooth transitions
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
        ease: [0.25, 0.25, 0, 1], // Custom cubic-bezier for smooth feel
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

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'projects':
        return (
          <motion.div
            key="projects"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-20"
          >
            <Projects />
          </motion.div>
        );
      case 'skills':
        return (
          <motion.div
            key="skills"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-20"
          >
            <Skills />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-20"
          >
            <Contact />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <motion.div variants={childVariants}>
              <Hero />
            </motion.div>
            <motion.div variants={childVariants}>
              <About />
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderCurrentSection()}
    </AnimatePresence>
  );
};

export default HomePage;