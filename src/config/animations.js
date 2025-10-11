// src/config/animations.js
// Centralized animation variants for consistent animations across the portfolio

/**
 * Standard easing curve for smooth, natural animations
 */
export const EASING = [0.25, 0.25, 0, 1];

/**
 * Bounce easing for playful entrance effects
 */
export const BOUNCE_EASING = [0.34, 1.56, 0.64, 1];

/**
 * Page-level animation variants for route transitions
 * Features a slow bounce effect with content spreading from center
 */
export const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.85,
    y: 0
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: BOUNCE_EASING,
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: EASING
    }
  }
};

/**
 * Container variants for sections with staggered children
 * Used for parent elements that contain multiple animated items
 */
export const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

/**
 * Section-level variants for main content areas
 * Similar to container but with y-axis movement
 */
export const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASING,
      staggerChildren: 0.15
    }
  }
};

/**
 * Child/Item variants for individual elements within containers
 * Used for cards, list items, and other repeated elements
 */
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASING
    }
  }
};

/**
 * Subtle child variants with scale from center effect
 * Good for nested elements or secondary content - spreads from center with bounce
 */
export const childVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 0
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: BOUNCE_EASING
    }
  }
};

/**
 * Card variants for project cards, experience cards, etc.
 * Includes hover and tap interactions
 */
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: EASING
    }
  },
  tap: {
    scale: 0.98
  }
};

/**
 * Fade-in variants for simple opacity transitions
 */
export const fadeInVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASING
    }
  }
};

/**
 * Slide-in from left variants
 */
export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASING
    }
  }
};

/**
 * Slide-in from right variants
 */
export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASING
    }
  }
};

/**
 * Scale-in variants for emphasis
 */
export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASING
    }
  }
};

/**
 * Stagger container for lists with custom timing
 * @param {number} staggerDelay - Delay between each child (default: 0.1)
 * @param {number} delayChildren - Initial delay before first child (default: 0.2)
 */
export const createStaggerContainer = (staggerDelay = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren: staggerDelay
    }
  }
});

/**
 * Custom animation creator for unique cases
 * @param {object} config - Animation configuration
 */
export const createCustomVariants = (config) => ({
  initial: config.initial || { opacity: 0 },
  animate: {
    ...config.animate,
    transition: {
      duration: config.duration || 0.5,
      ease: config.ease || EASING,
      delay: config.delay || 0,
      ...config.transition
    }
  },
  exit: config.exit || { opacity: 0 }
});
