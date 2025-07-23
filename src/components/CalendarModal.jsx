// src/components/CalendarModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const CalendarModal = ({ isOpen, onClose, theme }) => {
  if (!isOpen) {
    return null;
  }

  const calendarUrl = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PrInWpWnFVLWvxUVR_Dr_mUK1D_FY_gHhG7MLaPBpHwPn10_IouKmbTqcnPeZwIKxzUQOG9y-?gv=true${theme === 'dark' ? '&cs=1' : ''}`;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* THIS IS THE LINE TO CHANGE: We remove dark:bg-background-dark */}
      <div 
        className="relative w-11/12 max-w-4xl h-5/6 bg-background-light rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg"
          aria-label="Close calendar modal"
        >
          <X size={24} />
        </button>
        
        <iframe
          src={calendarUrl}
          className="w-full h-full rounded-lg"
          style={{ border: 0 }}
          title="Google Calendar Appointments"
        ></iframe>
      </div>
    </div>
  );
};

export default CalendarModal;