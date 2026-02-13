// src/components/CalendarModal.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CalendarModal = ({ isOpen, onClose, theme }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Track when modal is opened
  useEffect(() => {
    if (isOpen) {
      trackEvent('calendar_modal_opened', 'Engagement', `Calendar modal opened in ${theme} mode`);
      // Focus close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, theme]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    trackEvent('calendar_modal_closed', 'Engagement', 'Calendar modal closed');
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PrInWpWnFVLWvxUVR_Dr_mUK1D_FY_gHhG7MLaPBpHwPn10_IouKmbTqcnPeZwIKxzUQOG9y-?gv=true';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a call"
    >
      {/* Modal container */}
      <div 
        ref={modalRef}
        className="relative w-11/12 max-w-4xl h-5/6 bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
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