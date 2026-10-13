import { useEffect, useState } from 'react';
import { trackEvent } from '../utils/analytics.js';

// Kept from the current site: the name cycles through five Indian scripts,
// then lands on English and the teal curtain lifts away.
const NAME_CYCLE = [
  { text: 'ಮಹಾನದಿ ಪರಿಸರ', ms: 600, font: 'var(--font-kannada)' },
  { text: 'മഹാനദി പരിസര', ms: 600, font: 'var(--font-malayalam)' },
  { text: 'மஹாநதி பரிசர', ms: 600, font: 'var(--font-tamil)' },
  { text: 'మహానది పరిసర', ms: 600, font: 'var(--font-telugu)' },
  { text: 'महानदी परिसर', ms: 600, font: 'var(--font-devanagari)' },
  { text: 'Mahanadhi Parisara', ms: 2000, font: 'var(--font-display)' },
];
const TOTAL_MS = NAME_CYCLE.reduce((sum, n) => sum + n.ms, 0);
const LIFT_MS = 1000; // matches the .intro--lifting transition (0.8s + 0.2s delay)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function Intro({ onDone }) {
  const reduced = prefersReducedMotion();
  const [index, setIndex] = useState(reduced ? NAME_CYCLE.length - 1 : 0);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    if (lifting) {
      const t = setTimeout(onDone, LIFT_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (index < NAME_CYCLE.length - 1) setIndex((i) => i + 1);
      else setLifting(true);
    }, NAME_CYCLE[index].ms);
    return () => clearTimeout(t);
  }, [index, lifting, reduced, onDone]);

  const current = NAME_CYCLE[index];

  return (
    <div className={`intro${lifting ? ' intro--lifting' : ''}`} role="presentation">
      <div className="intro__dots" aria-hidden="true" />
      <div className="intro__inner">
        <p className="intro__eyebrow">MarTech &amp; Analytics Specialist</p>
        <p key={current.text} className="intro__name" style={{ fontFamily: current.font }}>
          {current.text}
        </p>
        <div className="intro__rule" />
        <div className="intro__track">
          <div
            className="intro__fill"
            style={{ animationDuration: `${TOTAL_MS}ms`, animationPlayState: reduced ? 'paused' : 'running' }}
          />
        </div>
      </div>
      <button
        type="button"
        className="intro__skip"
        onClick={() => {
          trackEvent('intro_skip', 'Engagement', 'Intro skipped');
          onDone();
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
