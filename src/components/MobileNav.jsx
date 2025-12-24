// src/components/MobileNav.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) trackEvent('mobile_menu_open', 'Navigation', 'Mobile menu opened');
  };

  const handleNavClick = (section) => {
    trackEvent('mobile_nav_click', 'Navigation', `${section} section visited (mobile)`);
    setIsOpen(false);
  };

  const menuOverlay = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            onClick={toggleMenu}
          />
          
          {/* GLASS DRAWER */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-xs bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-l border-white/20 dark:border-white/10 shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <span className="font-heading text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Menu
              </span>
              <motion.button 
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/20 dark:bg-white/10 border border-white/20 text-gray-900 dark:text-white"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Links */}
            <ul className="space-y-3 flex-1">
              {[
                { name: 'Projects', path: '/projects' },
                { name: 'Skills', path: '/skills' },
                { name: 'Experience', path: '/experience' },
                { name: 'Contact', path: '/contact' },
                { name: 'Pluto', path: '/pluto' }
              ].map((item, i) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <NavLink 
                    to={item.path}
                    onClick={() => handleNavClick(item.name)} 
                    className={({ isActive }) => `
                      group flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 border
                      ${isActive 
                        ? 'bg-primary-light/10 dark:bg-primary-dark/10 border-primary-light/20 dark:border-primary-dark/20 text-primary-light dark:text-primary-dark shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                        : 'bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.name}</span>
                        {isActive && (
                          <ChevronRight size={18} className="animate-pulse" />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            {/* Footer */}
            <div className="pt-8 border-t border-gray-200/20 dark:border-white/10">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 font-medium">
                © 2025 Mahanadhi Parisara
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <motion.button 
        onClick={toggleMenu} 
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-sm"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </motion.button>
      
      {mounted && createPortal(menuOverlay, document.body)}
    </div>
  );
};

export default MobileNav;