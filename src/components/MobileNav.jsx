// src/components/MobileNav.jsx

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
  // State to manage whether the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // This menu will only be visible on medium screens and below (md:hidden)
    <div className="md:hidden">
      <button onClick={toggleMenu} aria-label="Open navigation menu">
        <Menu size={24} />
      </button>

      {/* The full-screen overlay and menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
          <div className="fixed top-4 right-4 w-[calc(100%-2rem)] max-w-xs bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold">Navigation</span>
              <button onClick={toggleMenu} aria-label="Close navigation menu">
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-4 text-lg">
              <li>
                <a onClick={toggleMenu} href="/#projects" className="block py-2">Projects</a>
              </li>
              <li>
                <a onClick={toggleMenu} href="/#skills" className="block py-2">Skills</a>
              </li>
              <li>
                <a onClick={toggleMenu} href="/#contact" className="block py-2">Contact</a>
              </li>
              <li>
                <Link onClick={toggleMenu} to="/pluto" className="block py-2">Pluto</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;