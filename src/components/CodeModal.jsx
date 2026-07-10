// src/components/CodeModal.jsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Highlight } from 'prism-react-renderer';
import { X, Copy, Check } from 'lucide-react';

// Syntax theme mapped to the portfolio's own brand tokens, not a stock Prism theme
const brandTheme = {
  plain: {
    color: '#F5F0E8',
    backgroundColor: 'transparent',
  },
  styles: [
    { types: ['comment'], style: { color: '#8a8578', fontStyle: 'italic' } },
    { types: ['string', 'char'], style: { color: '#C9A84C' } },
    { types: ['keyword', 'builtin'], style: { color: '#E8732A' } },
    { types: ['function'], style: { color: '#F5F0E8', fontWeight: '600' } },
    { types: ['number', 'boolean'], style: { color: '#C9A84C' } },
    { types: ['punctuation', 'operator'], style: { color: '#8a8578' } },
    { types: ['variable', 'property'], style: { color: '#F5F0E8' } },
    { types: ['class-name'], style: { color: '#E8732A' } },
  ],
};

const CodeModal = ({ isOpen, onClose, title, code, language = 'javascript' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // clipboard not available, fail silently rather than throwing
    }
  };

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup to prevent body getting locked if modal unmounts unexpectedly
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-brand-bg/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-brand-surface border border-brand-border overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border flex-shrink-0">
              <h3 className="font-heading text-lg font-bold text-brand-text truncate pr-4">
                {title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border text-xs text-brand-muted hover:border-brand-orange hover:text-brand-orange transition-colors duration-200"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-brand-border text-brand-muted hover:border-brand-orange hover:text-brand-orange transition-colors duration-200"
                  aria-label="Close code view"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Code body */}
            <div className="overflow-auto px-6 py-5 font-mono text-[13px] leading-relaxed">
              <Highlight theme={brandTheme} code={code.trim()} language={language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="table-row">
                        <span className="table-cell pr-4 text-right select-none text-brand-muted/40">
                          {i + 1}
                        </span>
                        <span className="table-cell">
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeModal;
