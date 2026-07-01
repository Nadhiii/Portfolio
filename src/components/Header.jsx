// src/components/Header.jsx
// CHANGES: Removed theme toggle (dark-only now). Kept glass pill, MP collapse, nav links.
// Updated colors to brand tokens.
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import MobileNav from './MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-300 relative group text-brand-text text-sm
font-medium
${isActive ? 'text-brand-orange' : 'hover:text-brand-orange'}`;
  return (
    <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-6xl"
      >
        <div className={`px-6 py-3 rounded-full
      bg-brand-surface/65 backdrop-blur-xl
      border border-brand-border/70
transition-all duration-300
${isScrolled ? 'shadow-2xl shadow-black/60' : 'shadow-lg shadow-black/30'}`}
        >
          <div className="flex justify-between items-center">
            {/* Logo / Name */}
            <Link to="/" aria-label="Home" onClick={() => trackEvent('logo_click', 'Navigation',

              'Header logo')}>

              <LayoutGroup>
                <motion.div className="flex items-center gap-2 h-8 font-heading text-lg

text-brand-text">

                  <AnimatePresence mode="wait">
                    {!isScrolled ? (
                      <motion.div key="full" className="flex gap-2"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.span layoutId="t1">Mahanadhi</motion.span>
                        <motion.span layoutId="t2"
                          className="text-brand-orange">Parisara</motion.span>

                      </motion.div>
                    ) : (
                      <motion.div key="init" className="flex gap-1"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                        <motion.span layoutId="t1" className="text-2xl

font-bold">M</motion.span>

                        <motion.span layoutId="t2" className="text-2xl font-bold

text-brand-orange">P</motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            </Link>
            {/* Nav */}
            <nav className="flex items-center gap-2">
              <ul className="hidden md:flex items-center gap-1 font-body">
                {[
                  { to: '/projects', label: 'Projects' },
                  { to: '/skills', label: 'Skills' },
                  { to: '/experience', label: 'Experience' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className={navLinkClass}
                      onClick={() => trackEvent('nav_click', 'Navigation', label)}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:mahanadhip@gmail.com"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full
bg-brand-orange text-brand-bg text-sm font-semibold
hover:brightness-110 transition-all duration-200"
              >
                Let's Talk
              </a>
              <MobileNav />
            </nav>
          </div>
        </div>
      </motion.header>
    </div>
  );
};
export default Header;