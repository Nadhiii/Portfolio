// src/components/CalendarModal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CalendarModal = ({ isOpen, onClose, theme }) => {
  // Track when modal is opened
  useEffect(() => {
    if (isOpen) {
      trackEvent('calendar_modal_opened', 'Engagement', `Calendar modal opened in ${theme} mode`);
    }
  }, [isOpen, theme]);

  if (!isOpen) {
    return null;
  }

  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PrInWpWnFVLWvxUVR_Dr_mUK1D_FY_gHhG7MLaPBpHwPn10_IouKmbTqcnPeZwIKxzUQOG9y-?gv=true';

  const handleClose = () => {
    trackEvent('calendar_modal_closed', 'Engagement', 'Calendar modal closed');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Modal container */}
      <div 
        className="relative w-11/12 max-w-4xl h-5/6 bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 z-10 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close calendar modal"
        >
          <X size={24} />
        </button>
        
        {/* Iframe container */}
        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src={calendarUrl}
            className="w-full h-full"
            style={{ border: 0 }}
            title="Google Calendar Appointments"
            allow="camera; microphone"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;