import { useEffect, useRef } from 'react';

// Google Calendar appointment booking, shown in a pop-up over the page
// (the inline embed from Google Calendar's "Appointment scheduling" share options).
export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PrInWpWnFVLWvxUVR_Dr_mUK1D_FY_gHhG7MLaPBpHwPn10_IouKmbTqcnPeZwIKxzUQOG9y-?gv=true';

export default function BookingDialog({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="booking"
      aria-label="Book a call"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop (the dialog itself, outside the panel) closes it.
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="booking__panel">
        <div className="booking__head">
          <p className="booking__title">Book a call</p>
          <button type="button" className="booking__close" onClick={onClose}>
            Close
          </button>
        </div>
        {open && (
          <iframe
            className="booking__frame"
            src={BOOKING_URL}
            title="Book a call with Mahanadhi on Google Calendar"
          />
        )}
      </div>
    </dialog>
  );
}
