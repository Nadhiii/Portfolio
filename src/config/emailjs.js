// EmailJS settings for the contact form. These are public by design: EmailJS
// expects them in the browser, and every visitor's copy of the site has them.
// They live in the repo so the site builds the same way everywhere, with no
// settings on the host. An env var of the same name still wins if one is set.
export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

export const emailjsReady = () => Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);
