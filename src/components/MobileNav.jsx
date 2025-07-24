// src/components/MobileNav.jsx (Final Navigation Fix)

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

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

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} aria-label="Open navigation menu"><Menu size={24} /></button>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50" onClick={toggleMenu}>
          <div 
            className="fixed top-4 right-4 w-[calc(100%-2rem)] max-w-xs bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold">Navigation</span>
              <button onClick={toggleMenu} aria-label="Close navigation menu"><X size={24} /></button>
            </div>
            <ul className="space-y-4 text-lg">
              <li><NavLink to="/projects" onClick={() => handleNavClick('Projects')} className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Projects</NavLink></li>
              <li><NavLink to="/skills" onClick={() => handleNavClick('Skills')} className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Skills</NavLink></li>
              <li><NavLink to="/contact" onClick={() => handleNavClick('Contact')} className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Contact</NavLink></li>
              <li><NavLink to="/pluto" onClick={() => handleNavClick('Pluto')} className="block py-2 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Pluto</NavLink></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;