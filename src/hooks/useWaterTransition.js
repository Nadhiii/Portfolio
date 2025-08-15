// src/hooks/useThemeTransition.js

import { useState, useCallback } from 'react';
import { playThemeSound } from '../utils/themeSound';

export const useThemeTransition = (onThemeChange) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startPosition, setStartPosition] = useState(null);

  const triggerThemeTransition = useCallback((event) => {
    if (isTransitioning) return; // Prevent multiple triggers

    // Get click position for ripple effect
    const rect = event.target.getBoundingClientRect();
    const clickPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    setStartPosition(clickPosition);
    setIsTransitioning(true);

    // Add subtle haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate([8]); // Single gentle vibration
    }

    // Play gentle theme sound
    playThemeSound();

    // Start theme change at the right moment
    setTimeout(() => {
      onThemeChange();
    }, 200); // Quick but smooth timing
  }, [isTransitioning, onThemeChange]);

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    setStartPosition(null);
  }, []);

  return {
    isTransitioning,
    startPosition,
    triggerThemeTransition,
    completeTransition,
  };
};
