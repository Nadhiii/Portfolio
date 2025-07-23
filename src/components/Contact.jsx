// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('Send Message');
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const serviceID = 'service_yr5fl2q';
    const templateID = 'template_a8h4rjw';
    const publicKey = 'iOjr3dwBPBnhBOiGn';
    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        setStatus('Message Sent!');
        setTimeout(() => {
          setStatus('Send Message');
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }, (error) => {
        setStatus('Failed. Try Again.');
      });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl">Get In Touch</h2>
          <p className="text-lg text-text-light/80 dark:text-text-dark/80 mt-2">
            I'm always open to discussing new products, ideas, or opportunities.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">Reach Out Directly</h3>
               <div className="flex justify-center items-center flex-wrap gap-4">
                  <a href="mailto:mahanadhip@gmail.com" className="flex items-center gap-3 bg-primary-light text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all">
                    <Mail size={20} />
                    Email Me
                  </a>
                  <a href="https://www.linkedin.com/in/mahanadhi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    <Linkedin size={20} />
                    LinkedIn
                  </a>
              </div>
            </div>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1">Your Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1">Your Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-bold mb-1">Subject</label>
                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-1">Your Message</label>
                <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary-light text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all">
                {status}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;