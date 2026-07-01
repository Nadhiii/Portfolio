// src/components/SectionMarker.jsx
// Editorial spaced-letter section dividers, like irinamoi.com.
// Usage: <SectionMarker label="W O R K" />
import React from 'react';
import FadeUp from './FadeUp';
const SectionMarker = ({ label }) => (
    <FadeUp delay={0.4}>
        <div className="flex items-center gap-6 w-full my-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-[0.65rem] tracking-[0.5em] uppercase text-brand-muted font-body
font-medium whitespace-nowrap">
                {label}
            </span>
            <div className="flex-1 h-px bg-brand-border" />
        </div>
    </FadeUp>
);
export default SectionMarker;