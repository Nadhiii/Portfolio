// src/components/RevealText.jsx
// Word-by-word reveal on scroll, like yeqq.com.tr.
// Each word starts dim and lights up as it enters the viewport.

// Usage: <RevealText text="I build measurement systems..." className="text-xl" />
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const RevealText = ({ text, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });
    const prefersReduced = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = text.split(' ');
    if (prefersReduced) {
        return <p className={`text-brand-text ${className}`}>{text}</p>;
    }
    return (
        <p ref={ref} className={`${className}`} aria-label={text}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0.15, color: '#444444' }}
                    animate={isInView
                        ? { opacity: 1, color: '#F5F0E8' }
                        : { opacity: 0.15, color: '#444444' }
                    }
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.055,
                        ease: 'easeOut',
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
};
export default RevealText;