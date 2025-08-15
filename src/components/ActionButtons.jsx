// src/components/ActionButtons.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, FileText } from 'lucide-react';

const ActionButtons = () => {
  const buttons = [
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
      href: 'https://docs.google.com/document/d/1SY0n8gL8hD3dVIOvuu23wc3vctT3ozAOoHaFzGcsSw0/edit?usp=sharing'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mahanadhi/'
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      href: 'mailto:mahanadhip@gmail.com'
    }
  ];

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-4">
        {buttons.map((button, index) => (
          <motion.a
            key={button.id}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              x: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-14 h-14 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-text-light/70 dark:text-text-dark/70 hover:text-primary-light dark:hover:text-primary-dark hover:bg-white/60 dark:hover:bg-gray-800/60"
            title={button.label}
          >
            <button.icon size={20} />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
