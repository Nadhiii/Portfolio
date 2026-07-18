// src/components/SkillsConsole.jsx
// Skills rendered as a tag-debug console readout — the interface Nadhi actually
// lives in every day (GTM Preview mode, GA4 DebugView). Finite reveal on scroll,
// no infinite motion: rows stagger in once, then sit still until hovered.
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'GTM', level: 'Expert', segments: 10, note: 'Web containers, custom templates, tag audits.' },
  { name: 'GA4', level: 'Expert', segments: 10, note: 'Event schemas, ecommerce tracking, BigQuery exports.' },
  { name: 'Enhanced Conversions', level: 'Expert', segments: 10, note: 'Hashed first-party data pipelines for Google Ads.' },
  { name: 'Consent Mode v2', level: 'Expert', segments: 10, note: 'Basic and Advanced rollouts, signal validation.' },
  { name: 'Google Ads', level: 'Expert', segments: 10, note: 'Conversion tracking, attribution, floodlight tags.' },
  { name: 'BigQuery', level: 'Proficient', segments: 6, note: 'GA4 raw exports, SQL for session and funnel analysis.' },
  { name: 'Looker Studio', level: 'Proficient', segments: 6, note: 'Measurement dashboards for client reporting.' },
  { name: 'Amplitude', level: 'Familiar', segments: 3, note: 'Event instrumentation, funnel analysis basics.' },
];

const LEVEL_COLOR = {
  Expert: '#E8732A',
  Proficient: '#C9A84C',
  Familiar: '#888888',
};

const LEVEL_TAG = {
  Expert: '[OK]',
  Proficient: '[OK]',
  Familiar: '[~~]',
};

export default function SkillsConsole() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Console header line */}
      <p className="text-[11px] text-brand-muted mb-3">
        <span className="text-brand-orange">$</span> whoami --skills --verbose
      </p>

      {/* Log rows */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {SKILLS.map((skill, i) => {
          const color = LEVEL_COLOR[skill.level];
          const isHovered = hovered === skill.name;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-2 text-[11px] px-2 py-1.5 rounded-md transition-colors duration-150 cursor-default"
              style={{ backgroundColor: isHovered ? 'rgba(255,255,255,0.04)' : 'transparent' }}
            >
              <span style={{ color }} className="flex-shrink-0 w-8">
                {LEVEL_TAG[skill.level]}
              </span>

              <span className="text-brand-text flex-shrink-0 w-[132px] truncate">
                {skill.name}
              </span>

              {/* Segmented meter */}
              <span className="flex items-center gap-[2px] flex-shrink-0">
                {Array.from({ length: 10 }).map((_, seg) => (
                  <span
                    key={seg}
                    className="block rounded-[1px]"
                    style={{
                      width: 4,
                      height: 8,
                      backgroundColor: seg < skill.segments ? color : '#2A2A2A',
                    }}
                  />
                ))}
              </span>

              {/* Note appears only on hover, replaces nothing else's layout */}
              <span
                className="hidden md:inline text-brand-muted truncate transition-opacity duration-150"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                {skill.note}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Blinking cursor footer, same pattern as the Hero headline caret */}
      <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center gap-2">
        <span className="text-[11px] text-brand-muted">
          8/8 signals healthy
        </span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3 bg-brand-orange"
        />
      </div>
    </div>
  );
}