// src/components/CalendarButton.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CalendarButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackEvent('calendar_click', 'Engagement', 'Calendar modal opened');
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-primary-light text-white font-bold py-3 px-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      aria-label="Book an appointment"
    >
      <Calendar size={20} className="flex-shrink-0" />
      
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="whitespace-nowrap overflow-hidden"
          >
            Book an appointment
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CalendarButton;