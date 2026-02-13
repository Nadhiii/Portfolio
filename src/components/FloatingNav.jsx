// src/components/FloatingNav.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUp, FileText, // FileText represents a Document/Resume
  MessageSquare, Linkedin, Github, 
  Mail, Calendar
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingNav = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const contextualActions = useMemo(() => {
    const pathname = location.pathname;
    
    // 1. PROJECT PAGE
    if (pathname === '/projects') {
      return [
        { id: 'github', label: 'GitHub', icon: Github, action: 'github', color: 'hover:text-black dark:hover:text-white' },
        { id: 'contact-quick', label: 'Let\'s Talk', icon: MessageSquare, action: 'contact', color: 'hover:text-green-500' }
      ];
    }
    
    // 2. CONTACT PAGE
    if (pathname === '/contact') {
      return [
        { id: 'email', label: 'Email', icon: Mail, action: 'email', color: 'hover:text-blue-500' },
        { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, action: 'linkedin', color: 'hover:text-blue-600' }
      ];
    }

    // 3. HOME / DEFAULT
    return [
      { id: 'resume', label: 'Resume', icon: FileText, action: 'resume', color: 'hover:text-purple-500' },
      { id: 'linkedin-main', label: 'LinkedIn', icon: Linkedin, action: 'linkedin', color: 'hover:text-blue-600' }
    ];
  }, [location.pathname]);

  const handleAction = useCallback((actionId) => {
    switch (actionId) {
      case 'github': window.open('https://github.com/Nadhiii', '_blank'); break;
      case 'contact': navigate('/contact'); break;
      case 'email': window.open('mailto:mahanadhip@gmail.com', '_blank'); break;
      case 'linkedin': window.open('https://www.linkedin.com/in/mahanadhi/', '_blank'); break;
      case 'resume': window.open('https://drive.google.com/file/d/1dBcASDXDvYTuDoaSr4-7XQS0-kH9QZ_T/view?usp=drive_link', '_blank'); break;
      default: break;
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          // FIXED: True Center Positioning
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center gap-3"
        >
          {/* 1. Integrated Scroll Gauge (The futuristic line) */}
          <div className="h-32 w-[3px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative hidden lg:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark shadow-[0_0_10px_rgba(59,130,246,0.6)]"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* 2. Main Glass Pill (Unified Container) */}
          <div className="flex flex-col gap-4 p-3 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20">
            
            {/* Contextual Icons */}
            {contextualActions.map((action, index) => (
              <motion.button
                key={action.id}
                onClick={() => handleAction(action.action)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 transition-colors bg-transparent hover:bg-white dark:hover:bg-gray-800 ${action.color} group relative`}
              >
                <action.icon size={20} strokeWidth={1.5} />
                
                {/* Tooltip (Left side) */}
                <span className="absolute right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap pointer-events-none shadow-lg">
                  {action.label}
                  {/* Tiny triangle pointing right */}
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100"></span>
                </span>
              </motion.button>
            ))}

            {/* Divider */}
            <div className="w-5 h-[1px] bg-gray-300 dark:bg-gray-600 mx-auto opacity-50"></div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              <ArrowUp size={20} strokeWidth={1.5} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;