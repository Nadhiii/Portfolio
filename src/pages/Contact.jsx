// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Phone, Send, User, MessageSquare, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { trackEvent, trackFormSubmissionWithEnhancedConversion } from '../utils/analytics';
import { containerVariants, itemVariants } from '../config/animations';
import CalendarModal from '../components/CalendarModal';
import Button from '../components/Button';
import { supabase } from '../utils/supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [isVisible, setIsVisible] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const form = useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Removed: trackEvent('contact_form_submit', 'Engagement', 'Contact form submitted');
    
    const serviceID = 'service_yr5fl2q';
    const templateID = 'template_a8h4rjw';
    const publicKey = 'iOjr3dwBPBnhBOiGn';

    const messagePayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      source: 'portfolio',
      status: 'new',
      created_at: new Date().toISOString()
    };

    if (supabase) {
      const { error } = await supabase
        .from('contact_messages')
        .insert([messagePayload]);

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Supabase logging failed:', error);
        }
        trackEvent('contact_form_supabase_error', 'Error', error.message || 'Supabase insert failed');
      } else {
        trackEvent('contact_form_supabase_logged', 'Engagement', 'Contact form saved to Supabase');
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase client not configured; skipping DB logging.');
    }
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Mahanadi',
    };
    
    try {
      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      if (process.env.NODE_ENV === 'development') {
        console.log('Email sent successfully:', result);
      }
      setStatus('success');
      
      // Push Enhanced Conversion Data to dataLayer (single event)
      trackFormSubmissionWithEnhancedConversion({
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ')
      });
      
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Email sending failed:', error);
      }
      setStatus('error');
      trackEvent('contact_form_error', 'Error', `Contact form failed: ${error.text || error.message || 'Unknown error'}`);
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mahanadhip@gmail.com',
      href: 'mailto:mahanadhip@gmail.com',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/mahanadhi',
      href: 'https://www.linkedin.com/in/mahanadhi/',
      color: 'text-blue-700 dark:text-blue-300'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6363149672',
      href: 'tel:+916363149672',
      color: 'text-green-600 dark:text-green-400'
    }
  ];

  const getButtonContent = () => {
    switch (status) {
      case 'sending':
        return (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            Sending...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle size={20} />
            Message Sent!
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle size={20} />
            Failed. Try Again.
          </>
        );
      default:
        return (
          <>
            <Send size={20} />
            Send Message
          </>
        );
    }
  };

  return (
    <section id="contact" className="pt-24 pb-20 lg:pt-32 lg:pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl mb-4">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl text-text-light dark:text-text-dark max-w-2xl mx-auto">
            I'm always open to discussing new products, ideas, or opportunities to create meaningful user experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="text-text-light dark:text-text-dark mb-6">
                  Got a product idea that's keeping you up at night? A user problem that needs solving? Or just want to chat about the intersection of tech and common sense? Let's talk.
                </p>
              </div>

              {/* UPDATED: Changed from space-y-6 to grid to ensure consistent sizing and alignment */}
              <div className="grid grid-cols-1 gap-4 relative">
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => trackEvent(`${item.label.toLowerCase()}_click`, 'Contact', `${item.label} clicked`)}
                    // UPDATED: Changed justify-center to justify-start and added px-6 to align icons to the left
                    className="flex items-center justify-start px-6 py-4 w-full rounded-2xl gap-4 bg-white/28 dark:bg-black/24 backdrop-blur-3xl backdrop-saturate-150 text-text-light dark:text-text-dark hover:bg-white/40 dark:hover:bg-black/35 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`flex items-center justify-center w-12 h-12 ${item.color} bg-gray-100/80 dark:bg-gray-700/80 rounded-lg transition-colors flex-shrink-0`}>
                      <item.icon size={20} />
                    </div>
                    {/* UPDATED: Changed text-center to text-left */}
                    <div className="text-left">
                      <p className="font-medium text-text-light dark:text-text-dark truncate">{item.label}</p>
                      <p className="text-sm text-text-light dark:text-text-dark opacity-75 truncate">{item.value}</p>
                    </div>
                  </a>
                ))}
                
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCalendarOpen(true);
                      trackEvent('calendar_click', 'Contact', 'Schedule call button clicked');
                    }}
                    onMouseEnter={() => setShowCallTooltip(true)}
                    onMouseLeave={() => setShowCallTooltip(false)}
                    // UPDATED: Changed justify-center to justify-start and added px-6 for alignment
                    className="flex items-center justify-start px-6 py-4 w-full rounded-2xl gap-4 bg-white/28 dark:bg-black/24 backdrop-blur-3xl backdrop-saturate-150 text-text-light dark:text-text-dark hover:bg-white/40 dark:hover:bg-black/35 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-12 h-12 text-green-600 dark:text-green-400 bg-gray-100/80 dark:bg-gray-700/80 rounded-lg transition-colors flex-shrink-0">
                      <Calendar size={20} />
                    </div>
                    {/* UPDATED: Changed text-center to text-left */}
                    <div className="text-left">
                      <p className="font-medium text-text-light dark:text-text-dark truncate">Schedule Call</p>
                      <p className="text-sm text-text-light dark:text-text-dark opacity-75 truncate">15-30 min chat</p>
                    </div>
                  </button>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={showCallTooltip ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700 shadow-lg z-10"
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="absolute top-0 left-6 transform -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-50 dark:border-b-blue-900/20"></div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Prefer a quick chat?</strong> Schedule a 15-30 minute call to discuss your project ideas, timeline, and how we can collaborate effectively.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-white/40 dark:border-white/20 shadow-xl shadow-gray-200/20 dark:shadow-black/40">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare size={24} className="text-primary-light dark:text-primary-dark" />
                  <h3 className="text-xl font-bold">Send a Message</h3>
                </div>
                
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                        Your Email *
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300"
                        placeholder="Let's discuss a project..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, timeline, and how I can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'sending'}
                    variant={
                      status === 'success'
                        ? 'primary'
                        : status === 'error'
                        ? 'primary'
                        : 'primary'
                    }
                    size="lg"
                    className={`w-full flex items-center justify-center gap-2 ${
                      status === 'success'
                        ? 'bg-green-500 text-white'
                        : status === 'error'
                        ? 'bg-red-500 text-white'
                        : ''
                    }`}
                  >
                    {getButtonContent()}
                  </Button>
                </form>

                {/* Alternative Contact Methods */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center space-x-4">
                    <Button
                      asLink
                      href="mailto:mahanadhip@gmail.com"
                      onClick={() => trackEvent('email_click', 'Contact', 'Email clicked')}
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Mail size={20} />
                    </Button>
                    <Button
                      asLink
                      href="https://www.linkedin.com/in/mahanadhi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('linkedin_click', 'Contact', 'LinkedIn clicked')}
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Linkedin size={20} />
                    </Button>
                    <Button
                      onClick={() => {
                        setIsCalendarOpen(true);
                        trackEvent('calendar_click', 'Contact', 'Schedule call button clicked');
                      }}
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Calendar Modal */}
        <CalendarModal 
          isOpen={isCalendarOpen} 
          onClose={() => setIsCalendarOpen(false)} 
          theme="light" 
        />
      </div>
    </section>
  );
};

export default Contact;