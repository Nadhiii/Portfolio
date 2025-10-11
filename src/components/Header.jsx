// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import MobileNav from './MobileNav';

const Header = ({ theme, onThemeSwitch }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLinkStyle = {
    color: theme === 'light' ? '#4C6EF5' : '#A5B4FC'
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-30 flex justify-center px-4">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-6xl"
      >
      <div className={`
        relative px-6 py-3 rounded-full 
        bg-white/40 dark:bg-gray-900/40 
        backdrop-blur-xl 
        border border-gray-300/30 dark:border-gray-600/30
        transition-all duration-300
        ${isScrolled 
          ? 'shadow-2xl shadow-gray-400/30 dark:shadow-black/50' 
          : 'shadow-xl shadow-gray-300/40 dark:shadow-black/40'
        }
      `}>
        <div className="flex justify-between items-center">
        
        {/* === THE ANIMATED NAME/INITIALS (NOW A LINK) === */}
        <Link to="/" aria-label="Back to homepage" onClick={() => trackEvent('logo_click', 'Navigation', 'Header logo clicked')}>
          <LayoutGroup>
            <motion.div className="flex items-center gap-2 font-heading text-xl h-8">
              <AnimatePresence>
                {!isScrolled ? (
                  <motion.div key="fullName" className="flex items-center gap-2">
                    <motion.span layoutId="first-token">Mahanadhi</motion.span>
                    <motion.span layoutId="second-token">Parisara</motion.span>
                  </motion.div>
                ) : (
                  <motion.div key="initials" className="flex items-center gap-1 group relative">
                    <motion.span layoutId="first-token" className="text-2xl">M</motion.span>
                    <motion.span layoutId="second-token" className="text-2xl">P</motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </Link>

        {/* Right Side: Navigation */}
        <nav className="flex items-center gap-2 md:gap-3">
          <ul className="hidden md:flex items-center gap-2 font-body">
            <li>
              <NavLink 
                to="/projects" 
                onClick={() => trackEvent('nav_click', 'Navigation', 'Projects section visited')}
                className={({isActive}) => `
                  px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-gray-600 dark:bg-gray-700 text-white' 
                    : 'hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/skills" 
                onClick={() => trackEvent('nav_click', 'Navigation', 'Skills section visited')}
                className={({isActive}) => `
                  px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-gray-600 dark:bg-gray-700 text-white' 
                    : 'hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/experience" 
                onClick={() => trackEvent('nav_click', 'Navigation', 'Experience page visited')}
                className={({isActive}) => `
                  px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-gray-600 dark:bg-gray-700 text-white' 
                    : 'hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                onClick={() => trackEvent('nav_click', 'Navigation', 'Contact section visited')}
                className={({isActive}) => `
                  px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-gray-600 dark:bg-gray-700 text-white' 
                    : 'hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/pluto" 
                onClick={() => trackEvent('nav_click', 'Navigation', 'Pluto page visited')}
                className={({isActive}) => `
                  px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-gray-600 dark:bg-gray-700 text-white' 
                    : 'hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                Pluto
              </NavLink>
            </li>
          </ul>
          
          <button 
            onClick={(event) => {
              onThemeSwitch(event);
              trackEvent('theme_toggle', 'Engagement', `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`);
            }} 
            className="bg-white/40 dark:bg-gray-800/40 p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white transition-all duration-300" 
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <MobileNav />
        </nav>
        </div>
      </div>
    </motion.header>
    </div>
  );
};

export default Header;