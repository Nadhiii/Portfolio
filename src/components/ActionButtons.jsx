// src/components/ActionButtons.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, FileText } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const ActionButton = ({ button, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    // Track the click event
    if (button.id === 'email') {
      trackEvent('email_click', 'Engagement', 'Email clicked from floating button');
    } else if (button.id === 'linkedin') {
      trackEvent('linkedin_click', 'Engagement', 'LinkedIn clicked from floating button');
    } else if (button.id === 'resume') {
      trackEvent('resume_click', 'Engagement', 'Resume clicked from floating button');
    }
  };
  
  return (
    <motion.a
      href={button.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 backdrop-blur-lg border rounded-full shadow-lg transition-colors duration-300 py-3 px-3 overflow-hidden ${
        isHovered
          ? 'bg-gray-600 dark:bg-gray-700 text-white shadow-xl' 
          : 'bg-white/40 dark:bg-gray-900/40 border-gray-200/30 dark:border-gray-700/30 text-text-light dark:text-text-dark'
      }`}
    >
      <button.icon size={20} className="flex-shrink-0" />
      
      {/* Expanding label on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="whitespace-nowrap overflow-hidden font-medium"
          >
            {button.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

const ActionButtons = () => {
  const buttons = [
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
      href: 'https://drive.google.com/file/d/1dBcASDXDvYTuDoaSr4-7XQS0-kH9QZ_T/view?usp=drive_link'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mahanadhi/'
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      href: 'mailto:mahanadhip@gmail.com'
    }
  ];

  return (
    <div className="hidden lg:block fixed right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-4 items-end">
        {buttons.map((button, index) => (
          <ActionButton key={button.id} button={button} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
