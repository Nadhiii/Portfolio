import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track when a section enters the viewport and trigger animations once.
 * @param {Object} options IntersectionObserver options
 * @returns {[React.MutableRefObject, boolean]} ref to attach to the section and visibility flag
 */
const useSectionVisibility = (options = { threshold: 0.1 }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible, options]);

  return [sectionRef, isVisible];
};

export default useSectionVisibility;
