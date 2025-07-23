// src/components/Logo.jsx
import React from 'react';

const Logo = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* This is a much simpler design using basic shapes to ensure clarity.
        The 'M' is made of three rectangles.
        The 'P' is made of two rectangles.
      */}
      <g className="fill-primary-light dark:fill-primary-dark">
        {/* The 'M' */}
        <rect x="20" y="30" width="18" height="80" rx="4" />
        <path d="M38 45L56 75L74 45V110H56V85L38 110V45Z" fill="currentColor"/>
        
        {/* The 'P' */}
        <rect x="85" y="30" width="18" height="80" rx="4" />
        <rect x="85" y="30" width="35" height="45" rx="4" fill="currentColor"/>
      </g>
    </svg>
  );
};

export default Logo;