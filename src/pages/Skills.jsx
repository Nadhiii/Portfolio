// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import FadeUp from "../components/FadeUp";


const measurement = [
  {
    name: 'Google Tag Manager',
    level: 'Expert',
    note: 'Web containers, data layers, custom templates, tag audits across 100+ enterprise accounts.',
  },
  {
    name: 'GA4',
    level: 'Expert',
    note: 'Full implementation: event schemas, ecommerce tracking, custom dimensions, BigQuery exports.',
  },
  {
    name: 'Enhanced Conversions',
    level: 'Expert',
    note: 'Hashed first-party data pipelines for Google Ads. Primary focus for Titanium and Platinum clients.',
  },
  {
    name: 'Consent Mode v2',
    level: 'Expert',
    note: 'Basic and Advanced mode rollouts, consent signal validation, modeled conversion impact.',
  },
  {
    name: 'Google Ads Measurement',
    level: 'Expert',
    note: 'Conversion tracking, attribution modeling, floodlight tags, cross-account audit workflows.',
  },
  {
    name: 'BigQuery',
    level: 'Proficient',
    note: 'GA4 raw event exports, SQL querying for session and funnel analysis.',
  },
  {
    name: 'Looker Studio',
    level: 'Proficient',
    note: 'Measurement dashboards for client reporting and internal team visibility.',
  },
  {
    name: 'Amplitude',
    level: 'Familiar',
    note: 'Event instrumentation and basic funnel analysis. Used during Spiralyze analytics exercise.',
  },
];

const build = [
  { name: 'Apps Script', note: 'Automation at scale. First thing I ever built independently.' },
  { name: 'Flutter + Firebase', note: 'Nexus, my personal finance app. Provider, go_router, custom UI.' },
  { name: 'React + Vite', note: 'This portfolio. Learning by building, not by tutorial.' },
  { name: 'JavaScript', note: 'GTM custom templates, tag logic, data layer manipulation daily.' },
  { name: 'HTML + CSS', note: 'Enough to debug any tracking implementation in a browser.' },
];

const levelColor = (level) => {
  if (level === 'Expert') return 'text-brand-orange';
  if (level === 'Proficient') return 'text-brand-gold';
  if (level === 'Familiar') return 'text-brand-muted';
  return 'text-brand-muted';
};

const levelDot = (level) => {
  if (level === 'Expert') return 'bg-brand-orange';
  if (level === 'Proficient') return 'bg-brand-gold';
  return 'bg-brand-border';
};

const Skills = () => (
  <section id="skills" className="relative py-24 px-4 md:px-8">
    <div className="max-w-6xl mx-auto">

      {/* Section header */}
      <FadeUp>
        <div className="flex items-end justify-between mb-16 pb-6 border-b border-brand-border">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-brand-muted font-body mb-3">
              What I work with
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
              Skills
            </h2>
          </div>
          <span className="font-mono text-xs text-brand-muted hidden md:block">
            Measurement first
          </span>
        </div>
      </FadeUp>

      {/* Measurement grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-16">
        {measurement.map((skill, i) => (
          <FadeUp key={skill.name} delay={i * 0.06}>
            <motion.div
              whileInView={{ opacity: 1 }}
              className="group p-6 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-orange/40 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-bold text-brand-text text-base group-hover:text-brand-orange transition-colors duration-200">
                  {skill.name}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <span className={'text-[10px] tracking-[0.15em] uppercase font-mono ' + levelColor(skill.level)}>
                    {skill.level}
                  </span>
                  <span className={'w-1.5 h-1.5 rounded-full flex-shrink-0 ' + levelDot(skill.level)} />
                </div>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                {skill.note}
              </p>
            </motion.div>
          </FadeUp>
        ))}
      </div>

      {/* Divider + build section */}
      <FadeUp delay={0.1}>
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-brand-border" />
          <p className="text-xs tracking-[0.3em] uppercase text-brand-muted font-body flex-shrink-0">
            Also comfortable with
          </p>
          <div className="flex-1 h-px bg-brand-border" />
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {build.map((skill) => (
            <div
              key={skill.name}
              className="group p-5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-border/80 transition-colors duration-300"
            >
              <p className="font-mono text-sm font-bold text-brand-text mb-1.5 group-hover:text-brand-gold transition-colors duration-200">
                {skill.name}
              </p>
              <p className="text-xs text-brand-muted leading-relaxed">
                {skill.note}
              </p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* Closing line */}
      <FadeUp delay={0.2}>
        <div className="mt-16 pt-8 border-t border-brand-border">
          <p className="text-brand-muted text-sm max-w-xl">
            The build side is self-taught and genuinely works. The measurement side is what I do every day for enterprise clients handling millions in ad spend.
          </p>
        </div>
      </FadeUp>

    </div>
  </section>
);

export default Skills;