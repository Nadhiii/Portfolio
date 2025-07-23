// src/components/Footer.jsx

import React from 'react';
import { Linkedin, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200/50 dark:border-gray-700/50 py-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        
        <p className="text-sm text-center sm:text-left text-text-light/70 dark:text-text-dark/70">
          © 2025 Mahanadi Parisara. Built with React & Tailwind CSS.
        </p>

        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/mahanadhi/" target="_blank" rel="noopener noreferrer" aria-label="Mahanadi's LinkedIn Profile" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:mahanadhip@gmail.com" aria-label="Email Mahanadi" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
            <Mail size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Mahanadi's GitHub Profile" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
            <Github size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;