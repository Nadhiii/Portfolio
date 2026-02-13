// src/hooks/useSmoothScroll.js
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Hook to initialize Lenis smooth scrolling.
 * Provides buttery-smooth momentum scrolling with customizable options.
 */
const useSmoothScroll = (enabled = true) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    
    // Respect user preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
};

export default useSmoothScroll;
