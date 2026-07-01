// src/components/Footer.jsx
// FULL REWRITE: editorial sign-off with Kannada brand line and CTAs.
// Replace whatever Footer.jsx you currently have with this.

import React from 'react';
import FadeUp from './FadeUp';
const Footer = () => (
  <footer className="relative z-20 border-t border-brand-border bg-brand-bg">
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
      <FadeUp>
        {/* Sign-off */}
        <div className="text-center mb-16">
          <p className="font-kannada text-3xl md:text-4xl text-brand-gold mb-3">
            ನದಿ ಹರಿಯುತ್ತಲೇ ಇರುತ್ತದೆ.
          </p>
          <p className="text-brand-muted text-sm font-body">The river keeps flowing.</p>
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="mailto:mahanadhip@gmail.com"
            className="px-8 py-3 rounded-xl bg-brand-orange text-brand-bg font-semibold text-sm
hover:brightness-110 active:scale-95 transition-all duration-200">
            Say Hello
          </a>
          <a href="https://rxresu.me/nadhiii/general" target="_blank" rel="noreferrer"
            className="px-8 py-3 rounded-xl border border-brand-border text-brand-muted

font-semibold text-sm

hover:border-brand-gold hover:text-brand-gold transition-all duration-200">
            Download Resume ↗
          </a>
        </div>
      </FadeUp>
      <FadeUp delay={0.2}>
        {/* Links row */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-brand-muted">
          <a href="https://linkedin.com/in/mahanadhi" target="_blank" rel="noreferrer"
            className="hover:text-brand-orange transition-colors">LinkedIn</a>
          <a href="https://github.com/Nadhiii" target="_blank" rel="noreferrer"
            className="hover:text-brand-orange transition-colors">GitHub</a>
          <a href="https://instagram.com/mahanadhi.parisara" target="_blank" rel="noreferrer"
            className="hover:text-brand-orange transition-colors">Instagram</a>
          <a href="https://youtube.com/@MahanadhiParisara" target="_blank" rel="noreferrer"
            className="hover:text-brand-orange transition-colors">YouTube</a>
        </div>
      </FadeUp>
      <FadeUp delay={0.3}>
        <p className="text-center text-xs text-brand-border font-body">
          © {new Date().getFullYear()} Mahanadhi Parisara · Built with React + Framer Motion ·
          mahanadhi.space
        </p>
      </FadeUp>
    </div>
  </footer>
);

export default Footer;