// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Phone, Send, User, MessageSquare, Calendar, CheckCircle, AlertCircle, Briefcase, Sparkles, Coffee } from 'lucide-react';
import { trackEvent, trackFormSubmissionWithEnhancedConversion } from '../utils/analytics';

const inquiryTypes = [
  { id: 'project', label: 'Project Inquiry', icon: Briefcase },
  { id: 'feedback', label: 'Feedback on a Project', icon: Sparkles },
  { id: 'hello', label: 'Just Saying Hi', icon: Coffee }
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mahanadhip@gmail.com',
    href: 'mailto:mahanadhip@gmail.com'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/mahanadhi',
    href: 'https://www.linkedin.com/in/mahanadhi/'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6363149672',
    href: 'tel:+916363149672'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [inquiryType, setInquiryType] = useState('project');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const messagePlaceholder = () => {
    if (inquiryType === 'feedback') return "What did you try, what worked, what didn't, anything helps...";
    if (inquiryType === 'hello') return "No agenda needed, just say hello...";
    return "Tell me about your project, timeline, and how I can help...";
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const subjectLabel = inquiryTypes.find((t) => t.id === inquiryType)?.label || 'Message';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: subjectLabel,
      message: formData.message,
      to_name: 'Mahanadhi'
    };

    try {
      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      if (import.meta.env.DEV) {
        console.log('Email sent successfully:', result);
      }
      setStatus('success');

      // GA4 side enhanced conversion
      trackFormSubmissionWithEnhancedConversion({
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ')
      });

      // Explicit GTM dataLayer push for Enhanced Conversions, user provided data
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'generate_lead',
          form_type: inquiryType,
          user_data: {
            email_address: formData.email,
            phone_number: formData.phone,
            address: {
              first_name: formData.name.split(' ')[0],
              last_name: formData.name.split(' ').slice(1).join(' ')
            }
          }
        });
      }

      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setInquiryType('project');
      }, 3000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Email sending failed:', error);
      }
      setStatus('error');
      trackEvent('contact_form_error', 'Error', 'Contact form failed: ' + (error.text || error.message || 'Unknown error'));
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'sending':
        return (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full"
            />
            Sending...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle size={20} />
            Message Sent
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle size={20} />
            Failed, Try Again
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
    <section id="contact" className="relative py-24 px-4 md:px-8 bg-brand-bg">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-brand-gold tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
            Let's Talk
          </h2>
          <p className="font-body text-brand-text/60 mt-4 max-w-xl">
            Got a project in mind, or feedback on something I have built? Either way works;
            I would genuinely like to hear it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => trackEvent(item.label.toLowerCase() + '_click', 'Contact', item.label + ' clicked')}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.02] border border-brand-border hover:border-brand-orange/40 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                  <item.icon size={18} />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-body text-sm font-medium text-brand-text">{item.label}</p>
                  <p className="font-mono text-xs text-brand-text/50 truncate">{item.value}</p>
                </div>
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-calendar-modal'));
                trackEvent('calendar_click', 'Contact', 'Schedule call button clicked');
              }}
              className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl bg-white/[0.02] border border-brand-border hover:border-brand-orange/40 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-body text-sm font-medium text-brand-text">Schedule a Call</p>
                <p className="font-mono text-xs text-brand-text/50">15 to 30 minutes</p>
              </div>
            </button>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl p-6 md:p-8 bg-white/[0.02] border border-brand-border">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={20} className="text-brand-orange" />
                <h3 className="font-heading text-lg text-brand-text">Send a Message</h3>
              </div>

              {/* Inquiry type pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInquiryType(type.id)}
                    className={
                      "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs border transition-colors " +
                      (inquiryType === type.id
                        ? "bg-brand-orange/15 border-brand-orange/40 text-brand-orange"
                        : "bg-transparent border-brand-border text-brand-text/50 hover:text-brand-text/80")
                    }
                  >
                    <type.icon size={14} />
                    {type.label}
                  </button>
                ))}
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs text-brand-text/50 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/30" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 rounded-lg bg-brand-bg border border-brand-border text-brand-text font-body text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-brand-text/50 mb-2">
                      Your Email *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/30" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 rounded-lg bg-brand-bg border border-brand-border text-brand-text font-body text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block font-mono text-xs text-brand-text/50 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/30" />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-brand-bg border border-brand-border text-brand-text font-body text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-brand-text/50 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-brand-bg border border-brand-border text-brand-text font-body text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-colors resize-none"
                    placeholder={messagePlaceholder()}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={
                    "w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-body text-sm font-semibold transition-colors disabled:opacity-60 " +
                    (status === 'success'
                      ? "bg-brand-green text-brand-text"
                      : status === 'error'
                      ? "bg-red-500/90 text-white"
                      : "bg-brand-orange text-brand-bg hover:bg-brand-orange/90")
                  }
                  aria-describedby="form-status"
                >
                  {getButtonContent()}
                </button>

                {/* Screen reader status announcements */}
                <div id="form-status" role="status" aria-live="polite" className="sr-only">
                  {status === 'sending' && 'Sending your message...'}
                  {status === 'success' && 'Message sent successfully!'}
                  {status === 'error' && 'Failed to send message. Please try again.'}
                </div>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
