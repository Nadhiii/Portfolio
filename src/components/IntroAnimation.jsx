// src/components/IntroAnimation.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Name Cycle Data ────────────────────────────────────────────────────────
const NAME_CYCLE = [
  { text: 'ಮಹಾನದಿ ಪರಿಸರ', duration: 600, font: 'font-kannada' },
  { text: 'മഹാനദി പരിസര', duration: 600, font: 'font-kannada' },
  { text: 'மஹாநதி பரிசர', duration: 600, font: 'font-kannada' },
  { text: 'మహానది పరిసర', duration: 600, font: 'font-kannada' },
  { text: 'महानदी परिसर', duration: 600, font: 'font-kannada' },
  { text: 'Mahanadhi Parisara', duration: 2000, font: 'font-heading' },
];

// ── Name Cycler ────────────────────────────────────────────────────────────
const NameCycler = ({ onCycleComplete }) => {
  const [index, setIndex] = useState(0);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) {
      onCycleComplete();
      return;
    }

    const current = NAME_CYCLE[index];
    const timer = setTimeout(() => {
      if (index < NAME_CYCLE.length - 1) {
        setIndex(i => i + 1);
      } else {
        onCycleComplete();
      }
    }, current.duration);

    return () => clearTimeout(timer);
  }, [index, prefersReduced]); // ← onCycleComplete intentionally omitted

  const current = NAME_CYCLE[prefersReduced ? NAME_CYCLE.length - 1 : index];

  return (
    <div className="flex flex-col items-center gap-3">
      <AnimatePresence mode="wait">
        <motion.p
          key={current.text}
          className={`${current.font} text-4xl sm:text-6xl md:text-7xl font-bold text-brand-text tracking-tight`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {current.text}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={current.lang}
          className="text-xs tracking-[0.3em] uppercase text-brand-gold font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {current.lang}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ── Intro Animation ────────────────────────────────────────────────────────
const IntroAnimation = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCycleComplete = useCallback(() => setIsVisible(false), []);

  const totalDuration = NAME_CYCLE.reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <AnimatePresence mode="wait" onExitComplete={onAnimationComplete}>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
          }}
        >
          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl px-4">
            {/* Eyebrow */}
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-brand-muted font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              MarTech & Analytics Specialist
            </motion.p>

            {/* Name Cycler */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <NameCycler onCycleComplete={handleCycleComplete} />
            </motion.div>

            {/* Divider line */}
            <motion.div
              className="h-px bg-brand-border"
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
            />

            {/* Progress bar */}
            <motion.div
              className="w-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-px w-full bg-brand-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-orange rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: totalDuration / 1000,
                    delay: 0.3,
                    ease: 'linear',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Dot grid background */}
          <div
            className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #F5F0E8 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;