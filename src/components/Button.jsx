// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Standardized Button Component with 3-tier system
 * 
 * Variants:
 * - primary: Solid gradient background (main CTA)
 * - secondary: Translucent background (secondary action)
 * - tertiary: Outlined/bordered (minimal action)
 * - ghost: Text only with underline on hover
 */

const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  align = 'center',
  children,
  className = '',
  disabled = false,
  asLink = false,
  href = '#',
  target = undefined,
  rel = undefined,
  onClick = undefined,
  ...props
}, ref) => {
  
  // Size mappings
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-3 rounded-full',
  };

  // Variant styles
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-light to-accent-green-light 
      dark:from-primary-dark dark:to-accent-green-dark 
      text-white font-semibold
      hover:shadow-lg hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30
      disabled:opacity-60 disabled:cursor-not-allowed
      transition-all duration-300
    `,
    secondary: `
      bg-white/28 dark:bg-black/24 
      backdrop-blur-3xl backdrop-saturate-150 
      border border-transparent
      text-text-light dark:text-text-dark
      hover:bg-white/40 dark:hover:bg-black/35
      hover:shadow-md
      disabled:opacity-60 disabled:cursor-not-allowed
      transition-all duration-300
    `,
    tertiary: `
      bg-transparent
      border-2 border-gray-300 dark:border-gray-600
      text-text-light dark:text-text-dark
      hover:border-primary-light dark:hover:border-primary-dark
      hover:text-primary-light dark:hover:text-primary-dark
      disabled:opacity-60 disabled:cursor-not-allowed
      transition-all duration-300
    `,
    ghost: `
      bg-transparent
      text-text-light dark:text-text-dark
      relative
      hover:text-primary-light dark:hover:text-primary-dark
      after:content-['']
      after:absolute
      after:bottom-0
      after:left-0
      after:w-0
      after:h-0.5
      after:bg-primary-light
      dark:after:bg-primary-dark
      after:transition-all
      after:duration-300
      hover:after:w-full
      disabled:opacity-60 disabled:cursor-not-allowed
      transition-all duration-300
    `,
  };

  const baseClasses = `
    inline-flex items-center
    gap-2 font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark
    transition-all duration-300
  `;

  // Alignment control
  const justifyClasses = align === 'start'
    ? 'justify-start'
    : align === 'end'
    ? 'justify-end'
    : align === 'between'
    ? 'justify-between'
    : 'justify-center';

  const allClasses = `${baseClasses} ${justifyClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  if (asLink) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={allClasses}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={allClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
