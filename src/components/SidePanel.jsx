// src/components/SidePanel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Download } from 'lucide-react';

const SidePanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mahanadhi/',
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      id: 'email',
      label: 'Send Email',
      icon: Mail,
      href: 'mailto:mahanadhip@gmail.com',
      color: 'text-green-600 hover:text-green-700',
      bgColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
    },
    {
      id: 'resume',
      label: 'Download Resume',
      icon: Download,
      href: 'https://drive.google.com/file/d/1dBcASDXDvYTuDoaSr4-7XQS0-kH9QZ_T/view?usp=drive_link',
      color: 'text-purple-600 hover:text-purple-700',
      bgColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
    }
  ];

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        initial={{ width: 56 }}
        animate={{ width: isExpanded ? 200 : 56 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-full shadow-lg overflow-hidden"
      >
        <div className="flex flex-col items-center gap-4 p-4">
          {actions.map((action, index) => (
            <motion.a
              key={action.id}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center w-full h-12 rounded-full transition-all duration-300 group ${action.color} ${action.bgColor}`}
            >
              {/* Icon - Always visible */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full">
                <action.icon size={20} />
              </div>
              
              {/* Label - Only visible when expanded */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="ml-2 text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {action.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SidePanel;
