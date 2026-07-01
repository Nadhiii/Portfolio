// src/components/FadeUp.jsx
// Reusable scroll-reveal wrapper. Wrap any section or card with this.
// Usage: <FadeUp delay={0.2}><YourComponent /></FadeUp>
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
const FadeUp = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-5%' });
    const prefersReduced = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return <div className={className}>{children}</div>;
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
};
export default FadeUp;