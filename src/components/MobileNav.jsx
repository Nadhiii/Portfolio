// src/components/MobileNav.jsx (Final Navigation Fix)

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';
import { EASING } from '../config/animations';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent('mobile_menu_open', 'Navigation', 'Mobile menu opened');
    }
  };

  const handleNavClick = (section) => {
    trackEvent('mobile_nav_click', 'Navigation', `${section} section visited (mobile)`);
    setIsOpen(false);
  };

  // Animation variants for mobile menu
  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: EASING
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: EASING
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      x: 20,
      transition: {
        duration: 0.2,
        ease: EASING
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: EASING,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 10
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: EASING
      }
    }
  };

  return (
    <div className="md:hidden">
      <motion.button 
        onClick={toggleMenu} 
        aria-label="Open navigation menu"
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <Menu size={24} />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black/50" 
            onClick={toggleMenu}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div 
              className="fixed top-4 right-4 w-[calc(100%-2rem)] max-w-xs bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div 
                className="flex justify-between items-center mb-6"
                variants={itemVariants}
              >
                <span className="font-bold">Navigation</span>
                <motion.button 
                  onClick={toggleMenu} 
                  aria-label="Close navigation menu"
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
              <motion.ul 
                className="space-y-4 text-lg"
                variants={itemVariants}
              >
                <motion.li variants={itemVariants}>
                  <NavLink 
                    to="/projects" 
                    onClick={() => handleNavClick('Projects')} 
                    className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                  >
                    Projects
                  </NavLink>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <NavLink 
                    to="/skills" 
                    onClick={() => handleNavClick('Skills')} 
                    className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                  >
                    Skills
                  </NavLink>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <NavLink 
                    to="/experience" 
                    onClick={() => handleNavClick('Experience')} 
                    className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                  >
                    Experience
                  </NavLink>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <NavLink 
                    to="/contact" 
                    onClick={() => handleNavClick('Contact')} 
                    className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                  >
                    Contact
                  </NavLink>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <NavLink 
                    to="/pluto" 
                    onClick={() => handleNavClick('Pluto')} 
                    className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                  >
                    Pluto
                  </NavLink>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;