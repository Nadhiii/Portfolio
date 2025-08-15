// src/components/JourneyDoodles.jsx
import React from 'react';

export const SupportDoodle = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    {/* Person starting their journey - confused but eager */}
    
    {/* Head with question marks around */}
    <circle cx="50" cy="25" r="8" fill="none"/>
    
    {/* Confused expression */}
    <circle cx="47" cy="23" r="1" fill="currentColor"/>
    <circle cx="53" cy="23" r="1" fill="currentColor"/>
    <path d="M47 28 Q50 26 53 28" strokeLinecap="round"/>
    
    {/* Question marks floating around */}
    <text x="35" y="20" fontSize="8" fill="currentColor">?</text>
    <text x="65" y="18" fontSize="8" fill="currentColor">?</text>
    <text x="40" y="35" fontSize="6" fill="currentColor">?</text>
    
    {/* Body - standing upright, eager to learn */}
    <path d="M50 33 L50 55" strokeLinecap="round" strokeWidth="3"/>
    
    {/* Arms - one raised (asking questions), one at side */}
    <path d="M50 40 L40 35" strokeLinecap="round" strokeWidth="2"/>
    <path d="M50 40 L60 45" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Legs - standing ready */}
    <path d="M50 55 L45 70" strokeLinecap="round" strokeWidth="2"/>
    <path d="M50 55 L55 70" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Headset (representing support role) */}
    <path d="M42 25 C42 20, 46 18, 50 18 C54 18, 58 20, 58 25" strokeLinecap="round"/>
    <circle cx="42" cy="25" r="3"/>
    <path d="M39 25 L36 25" strokeLinecap="round"/>
    
    {/* Learning books at feet */}
    <rect x="42" y="72" width="6" height="8" rx="1"/>
    <rect x="52" y="72" width="6" height="8" rx="1"/>
  </svg>
);

export const AnalyticsDoodle = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    {/* Person analyzing - focused and determined */}
    
    {/* Head with focused expression */}
    <circle cx="50" cy="25" r="8" fill="none"/>
    
    {/* Focused eyes */}
    <path d="M45 23 L49 23" strokeLinecap="round"/>
    <path d="M51 23 L55 23" strokeLinecap="round"/>
    <path d="M47 28 Q50 30 53 28" strokeLinecap="round"/>
    
    {/* Body leaning forward (analyzing) */}
    <path d="M50 33 L48 55" strokeLinecap="round" strokeWidth="3"/>
    
    {/* Arms - one pointing at chart, one holding tablet */}
    <path d="M48 40 L35 30" strokeLinecap="round" strokeWidth="2"/>
    <path d="M48 45 L60 42" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Tablet/device in hand */}
    <rect x="58" y="40" width="8" height="6" rx="1"/>
    <path d="M60 42 L66 42" strokeLinecap="round" strokeWidth="0.5"/>
    <path d="M60 44 L64 44" strokeLinecap="round" strokeWidth="0.5"/>
    
    {/* Legs - standing confidently */}
    <path d="M48 55 L43 70" strokeLinecap="round" strokeWidth="2"/>
    <path d="M48 55 L53 70" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Analytics chart they're pointing at */}
    <rect x="25" y="25" width="15" height="10" rx="1"/>
    <path d="M27 32 L30 29 L33 30 L36 27" strokeLinecap="round"/>
    <circle cx="30" cy="29" r="0.5" fill="currentColor"/>
    <circle cx="36" cy="27" r="0.5" fill="currentColor"/>
    
    {/* Data points floating around */}
    <circle cx="70" cy="20" r="1" fill="currentColor"/>
    <circle cx="75" cy="25" r="1" fill="currentColor"/>
    <circle cx="68" cy="30" r="1" fill="currentColor"/>
  </svg>
);
export const BuilderDoodle = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    {/* Person having the "Aha!" moment - excited and energetic */}
    
    {/* Head with excited expression */}
    <circle cx="50" cy="25" r="8" fill="none"/>
    
    {/* Wide excited eyes */}
    <circle cx="47" cy="22" r="1.5" fill="currentColor"/>
    <circle cx="53" cy="22" r="1.5" fill="currentColor"/>
    <path d="M45 28 Q50 32 55 28" strokeLinecap="round" strokeWidth="1.5"/>
    
    {/* Body - leaning forward with energy */}
    <path d="M50 33 L52 55" strokeLinecap="round" strokeWidth="3"/>
    
    {/* Arms - both raised in celebration/building gesture */}
    <path d="M52 38 L42 25" strokeLinecap="round" strokeWidth="2"/>
    <path d="M52 38 L62 25" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Hands holding tools */}
    <circle cx="42" cy="25" r="2"/>
    <path d="M40 25 L38 22" strokeLinecap="round"/>
    <rect x="60" y="23" width="4" height="4" rx="1"/>
    
    {/* Legs - dynamic stance */}
    <path d="M52 55 L46 70" strokeLinecap="round" strokeWidth="2"/>
    <path d="M52 55 L58 70" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Lightbulb above head (Aha moment!) */}
    <circle cx="50" cy="8" r="4"/>
    <rect x="48" y="12" width="4" height="3" rx="1"/>
    <path d="M46 10 L54 10" strokeLinecap="round" strokeWidth="0.5"/>
    <path d="M47 8 L53 8" strokeLinecap="round" strokeWidth="0.5"/>
    
    {/* Sparkles around lightbulb */}
    <path d="M38 12 L40 10 L38 8 L36 10 Z" fill="currentColor"/>
    <path d="M62 12 L64 10 L62 8 L60 10 Z" fill="currentColor"/>
    <circle cx="35" cy="15" r="0.5" fill="currentColor"/>
    <circle cx="65" cy="15" r="0.5" fill="currentColor"/>
    
    {/* Building blocks/code elements at feet */}
    <rect x="40" y="72" width="6" height="6" rx="1"/>
    <rect x="54" y="72" width="6" height="6" rx="1"/>
    <path d="M42 74 L44 74" strokeLinecap="round" strokeWidth="0.5"/>
    <path d="M56 74 L58 74" strokeLinecap="round" strokeWidth="0.5"/>
  </svg>
);

export const ProductDoodle = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    {/* Person as confident leader - presenting/visionary pose */}
    
    {/* Head with confident expression */}
    <circle cx="50" cy="25" r="8" fill="none"/>
    
    {/* Confident eyes */}
    <path d="M45 22 L49 24" strokeLinecap="round"/>
    <path d="M51 24 L55 22" strokeLinecap="round"/>
    <path d="M46 28 Q50 30 54 28" strokeLinecap="round"/>
    
    {/* Body - upright, confident posture */}
    <path d="M50 33 L50 55" strokeLinecap="round" strokeWidth="3"/>
    
    {/* Arms - one presenting, one on hip */}
    <path d="M50 38 L35 32" strokeLinecap="round" strokeWidth="2"/>
    <path d="M50 42 L58 45" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Hand pointing at vision board */}
    <circle cx="35" cy="32" r="1"/>
    
    {/* Legs - confident stance */}
    <path d="M50 55 L45 70" strokeLinecap="round" strokeWidth="2"/>
    <path d="M50 55 L55 70" strokeLinecap="round" strokeWidth="2"/>
    
    {/* Vision board/roadmap they're presenting */}
    <rect x="18" y="25" width="15" height="12" rx="2"/>
    <path d="M20 30 L31 30" strokeLinecap="round" strokeWidth="0.8"/>
    <path d="M20 33 L28 33" strokeLinecap="round" strokeWidth="0.8"/>
    <path d="M20 36 L30 36" strokeLinecap="round" strokeWidth="0.8"/>
    
    {/* Success metrics/charts floating around */}
    <rect x="68" y="20" width="8" height="8" rx="1"/>
    <path d="M70 26 L72 24 L74 25 L76 22" strokeLinecap="round" strokeWidth="0.8"/>
    
    {/* Product icons */}
    <circle cx="70" cy="35" r="2"/>
    <rect x="68" y="33" width="4" height="4" rx="1"/>
    
    {/* Team collaboration symbols */}
    <circle cx="75" cy="50" r="1.5"/>
    <circle cx="72" cy="53" r="1.5"/>
    <circle cx="78" cy="53" r="1.5"/>
    <path d="M72 53 L78 53" strokeLinecap="round" strokeWidth="0.5"/>
    
    {/* Success arrow pointing up */}
    <path d="M85 45 L85 35" strokeLinecap="round" strokeWidth="2"/>
    <path d="M82 38 L85 35 L88 38" strokeLinecap="round" strokeWidth="2"/>
  </svg>
);
