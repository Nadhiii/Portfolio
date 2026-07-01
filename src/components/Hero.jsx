// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeUp from './FadeUp';
import RevealText from './RevealText';
import StackPhysics from './StackPhysics';

const SWITCHING_WORDS = [
  'Measurement',
  'Clarity',
  'Conversion',
  'Accountability',
  'Trust',
];

const GLYPHS = '01/>_<!?-+X';
const ScrambleText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) =>
        i < Math.floor(iteration) ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      ).join(''));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 50);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="font-mono text-brand-orange">{display}</span>
    </>
  );
};

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setWordIdx(i => (i + 1) % SWITCHING_WORDS.length), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      <div className="relative z-20 w-full max-w-6xl mx-auto">
        {/* ── BENTO GRID ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* CARD 1: Identity (large, left) */}
          <FadeUp className="lg:col-span-7">
            <div className="h-full p-8 md:p-10 rounded-2xl bg-brand-surface border border-brand-border flex flex-col justify-between min-h-[320px]">
              {/* Live status badge */}
              <div className="flex items-center gap-2 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs tracking-widest uppercase text-brand-muted font-body">
                  Cognizant · Bengaluru
                </span>
              </div>

              {/* Main heading */}
              <div className="flex-1">
                <h1 className="font-monument text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6 text-brand-text">
                  I Build<br />
                  <span className="inline-flex items-center mt-2 whitespace-nowrap">
                    <ScrambleText text={SWITCHING_WORDS[wordIdx]} />
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1 h-12 ml-2 bg-brand-orange"
                    />
                  </span>
                </h1>
                <RevealText
                  text="MarTech & Analytics Specialist at Cognizant. I build measurement systems that make every rupee of ad spend accountable."
                  className="text-base md:text-lg text-brand-muted leading-relaxed max-w-lg"
                />
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="/projects"
                  className="px-6 py-3 rounded-xl bg-brand-orange text-brand-bg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all duration-200"
                >
                  View My Work
                </a>
                <a
                  href="mailto:mahanadhip@gmail.com"
                  className="px-6 py-3 rounded-xl border border-brand-border text-brand-text font-semibold text-sm hover:border-brand-orange hover:text-brand-orange transition-all duration-200"
                >
                  Let's Talk
                </a>
                <a
                  href="https://rxresu.me/nadhiii/general"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl border border-brand-border text-brand-muted font-semibold text-sm hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
                >
                  Resume ↗
                </a>
              </div>
            </div>
          </FadeUp>

          {/* CARD 2: Stack Physics */}
          <FadeUp delay={0.1} className="lg:col-span-5">
            <div className="h-full rounded-2xl bg-brand-surface border border-brand-border flex flex-col overflow-hidden min-h-[320px]">
              {/* Wrapped both in a single container with the padding */}
              <div className="p-8 pb-0">
                <p className="text-xs tracking-[0.3em] uppercase text-brand-muted font-body">Skills</p>
                {/* Reduced font size (text-[10px]) and lowered opacity/color (opacity-70) */}
                <p className="text-[10px] tracking-[0.1em] lowercase text-brand-muted font-body opacity-70 mt-1">more to fill...</p>
              </div>
              <div className="flex-1">
                <StackPhysics />
              </div>
            </div>
          </FadeUp>

          {/* CARD 3: Metric - Accounts */}
          <FadeUp delay={0.15} className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border">
              <p className="text-xs tracking-widest uppercase text-brand-muted mb-2">Implementations & Troubleshooting</p>
              <p className="font-heading text-5xl font-bold text-brand-text">1000+</p>
              <p className="text-xs text-brand-muted mt-2">Page views to E-commerce tracking setup</p>
            </div>
          </FadeUp>

          {/* CARD 4: Metric - Spend */}
          <FadeUp delay={0.2} className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border">
              <p className="text-xs tracking-widest uppercase text-brand-muted mb-2">Enterprise Accounts</p>
              <p className="font-heading text-5xl font-bold text-brand-orange">100+</p>
              <p className="text-xs text-brand-muted mt-2">Google LCS · Titanium & Platinum</p>
            </div>
          </FadeUp>

          {/* CARD 5: Years */}
          <FadeUp delay={0.25} className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border">
              <p className="text-xs tracking-widest uppercase text-brand-muted mb-2">Experience</p>
              <p className="font-heading text-5xl font-bold text-brand-text">5+ years</p>
              <p className="text-xs text-brand-muted mt-2">Jan 2021 – present</p>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
};

export default Hero;