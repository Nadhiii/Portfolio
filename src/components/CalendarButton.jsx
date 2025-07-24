// src/components/CalendarButton.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CalendarButton = ({ onClick }) => {
  const handleClick = () => {
    trackEvent('calendar_click', 'Engagement', 'Calendar modal opened');
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-primary-light text-white font-bold py-3 px-5 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1"
      aria-label="Book an appointment"
    >
      <Calendar size={20} />
      <span className="hidden sm:inline">Book an appointment</span>
    </button>
  );
};

export default CalendarButton;