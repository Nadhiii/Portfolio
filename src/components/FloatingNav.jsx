// src/components/FloatingNav.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Mail, ArrowUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [contextualActions, setContextualActions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Base navigation items
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About', icon: User, path: '/' },
    { id: 'projects', label: 'Projects', icon: Code, path: '/projects' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' }
  ];

  // Contextual actions based on current section
  const getContextualActions = (section, pathname) => {
    switch (section) {
      case 'hero':
        return [
          { id: 'resume', label: 'Download Resume', icon: Download, action: () => window.open('https://drive.google.com/file/d/1dBcASDXDvYTuDoaSr4-7XQS0-kH9QZ_T/view?usp=drive_link', '_blank'), color: 'text-blue-500' },
          { id: 'projects-quick', label: 'View Projects', icon: Briefcase, action: () => navigate('/projects'), color: 'text-purple-500' },
          { id: 'contact-quick', label: 'Get in Touch', icon: MessageSquare, action: () => navigate('/contact'), color: 'text-green-500' }
        ];
      
      case 'about':
        return [
          { id: 'skills', label: 'My Skills', icon: Target, action: () => navigate('/skills'), color: 'text-orange-500' },
          { id: 'experience', label: 'Experience', icon: Briefcase, action: () => scrollToSection('experience'), color: 'text-indigo-500' },
          { id: 'linkedin-about', label: 'LinkedIn Profile', icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/mahanadhi/', '_blank'), color: 'text-blue-600' }
        ];
      
      case 'projects':
      case '/projects':
        return [
          { id: 'github', label: 'View Code', icon: Github, action: () => window.open('https://github.com/Nadhiii', '_blank'), color: 'text-gray-700' },
          { id: 'live-demo', label: 'Live Demo', icon: ExternalLink, action: () => window.open('#', '_blank'), color: 'text-green-500' },
          { id: 'project-details', label: 'More Projects', icon: Code, action: () => navigate('/projects'), color: 'text-purple-500' }
        ];
      
      case 'contact':
      case '/contact':
        return [
          { id: 'email', label: 'Send Email', icon: Mail, action: () => window.open('mailto:mahanadhip@gmail.com', '_blank'), color: 'text-blue-500' },
          { id: 'call', label: 'Call Me', icon: Phone, action: () => window.open('tel:+916363149672', '_blank'), color: 'text-green-500' },
          { id: 'schedule', label: 'Schedule Meeting', icon: Calendar, action: () => {}, color: 'text-orange-500' },
          { id: 'linkedin-contact', label: 'LinkedIn', icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/mahanadhi/', '_blank'), color: 'text-blue-600' }
        ];
      
      default:
        return [
          { id: 'resume-default', label: 'Download Resume', icon: Download, action: () => window.open('https://drive.google.com/file/d/1dBcASDXDvYTuDoaSr4-7XQS0-kH9QZ_T/view?usp=drive_link', '_blank'), color: 'text-blue-500' },
          { id: 'contact-default', label: 'Contact Me', icon: MessageSquare, action: () => navigate('/contact'), color: 'text-green-500' }
        ];
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show/hide floating nav based on scroll position
      setIsVisible(window.scrollY > 100);

      // Determine active section based on current path and scroll position
      let currentSection = 'hero';
      
      if (location.pathname === '/projects') {
        currentSection = 'projects';
      } else if (location.pathname === '/contact') {
        currentSection = 'contact';
      } else if (location.pathname === '/skills') {
        currentSection = 'skills';
      } else {
        // On home page, determine section by scroll position
        const sections = ['hero', 'about'];
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }
      
      setActiveSection(currentSection);
      
      // Update contextual actions based on current section
      const newContextualActions = getContextualActions(currentSection, location.pathname);
      setContextualActions(newContextualActions);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavigation = (item) => {
    if (item.path === '/' && (item.id === 'hero' || item.id === 'about')) {
      // Navigate to home and scroll to section
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.id);
        }, 100);
      } else {
        scrollToSection(item.id);
      }
    } else {
      // Navigate to specific page
      navigate(item.path);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-50"
        >
          {/* Main Navigation Container */}
          <div className="flex flex-col items-center gap-4">
            {/* Progress Indicator with Section Label */}
            <div className="flex flex-col items-center gap-2 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-full px-3 py-4 shadow-lg">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${scrollProgress}%` }}
                className="w-1 bg-gradient-to-t from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark rounded-full max-h-16"
              />
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 transform -rotate-90 whitespace-nowrap">
                {Math.round(scrollProgress)}%
              </div>
            </div>

            {/* Navigation Container */}
            <div className="flex flex-col items-center gap-3 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-full px-4 py-6 shadow-lg">
              {/* Navigation Items */}
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'bg-primary-light text-white shadow-lg'
                      : 'text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-white/20 dark:hover:bg-gray-800/20'
                  }`}
                  title={item.label}
                >
                  <item.icon size={18} />
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    {item.label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-white"></div>
                  </motion.div>
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary-light rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Divider */}
              <div className="h-px w-6 bg-gray-300/50 dark:bg-gray-600/50 my-2" />

              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-12 h-12 rounded-full text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 group"
                title="Back to top"
              >
                <ArrowUp size={18} />
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  Back to top
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-white"></div>
                </motion.div>
              </motion.button>
            </div>

            {/* Contextual Actions Panel */}
            <AnimatePresence>
              {contextualActions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col items-center gap-2 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-full px-4 py-4 shadow-lg"
                >
                  {/* Section indicator */}
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {activeSection === 'hero' ? 'Quick Actions' : 
                     activeSection === 'about' ? 'Learn More' :
                     activeSection === 'projects' ? 'Project Actions' :
                     activeSection === 'contact' ? 'Get in Touch' : 'Actions'}
                  </div>
                  
                  {contextualActions.map((action, index) => (
                    <motion.button
                      key={action.id}
                      onClick={action.action}
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group hover:bg-white/20 dark:hover:bg-gray-800/20 ${action.color}`}
                      title={action.label}
                    >
                      <action.icon size={16} />
                      
                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute right-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        {action.label}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-white"></div>
                      </motion.div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
