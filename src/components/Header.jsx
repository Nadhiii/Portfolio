// src/components/Header.jsx (Final Fix with Home Link)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
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
    <header className="fixed top-0 left-0 right-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto py-4 px-8 flex justify-between items-center">
        
        {/* === THIS ENTIRE BLOCK IS NOW A LINK TO THE HOMEPAGE === */}
        <Link to="/" aria-label="Back to homepage">
          <LayoutGroup>
            <motion.div className="flex items-center gap-2 font-heading text-xl">
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
        <nav className="flex items-center gap-4 md:gap-6">
          <ul className="hidden md:flex items-center gap-6 font-body">
            <li><NavLink to="/projects" style={({isActive}) => isActive ? activeLinkStyle : undefined} className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">Projects</NavLink></li>
            <li><NavLink to="/skills" style={({isActive}) => isActive ? activeLinkStyle : undefined} className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">Skills</NavLink></li>
            <li><NavLink to="/contact" style={({isActive}) => isActive ? activeLinkStyle : undefined} className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">Contact</NavLink></li>
            <li><NavLink to="/pluto" style={({isActive}) => isActive ? activeLinkStyle : undefined} className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">Pluto</NavLink></li>
          </ul>
          
          <button onClick={onThemeSwitch} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <MobileNav />
        </nav>
      </div>
    </header>
  );
};

export default Header;