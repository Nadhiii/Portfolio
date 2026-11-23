import { useCallback, useEffect, useRef, useState } from 'react';
import { createRiverSound } from '../audio/riverSound.js';
import { trackEvent } from '../utils/analytics.js';

// The name, big, in English and Kannada. Around it, the same name in other
// languages, small, like voices along a river bank.
// x/y are % positions on wide screens; mx/my on phones (null = hidden on phones).
const SCATTER = [
  { text: 'മഹാനദി പരിസര', lang: 'ml', font: 'var(--font-malayalam)', x: 13, y: 11, mx: 35, my: 8, size: 22 },
  { text: 'マハナディ・パリサラ', lang: 'ja', font: 'var(--font-japanese)', x: 37, y: 7, mx: null, my: null, size: 16 },
  { text: 'மஹாநதி பரிசர', lang: 'ta', font: 'var(--font-tamil)', x: 63, y: 12, mx: 66, my: 13.5, size: 20 },
  { text: 'Маханади Парисара', lang: 'ru', font: 'var(--font-noto)', x: 87, y: 8, mx: null, my: null, size: 15 },
  { text: 'महानदी परिसर', lang: 'hi', font: 'var(--font-devanagari)', x: 9, y: 31, mx: 32, my: 19, size: 24 },
  { text: '마하나디 파리사라', lang: 'ko', font: 'var(--font-korean)', x: 90, y: 29, mx: 68, my: 24.5, size: 16 },
  { text: 'মহানদী পরিসর', lang: 'bn', font: 'var(--font-bengali)', x: 7, y: 52, mx: null, my: null, size: 18 },
  { text: 'మహానది పరిసర', lang: 'te', font: 'var(--font-telugu)', x: 92, y: 50, mx: 34, my: 30, size: 22 },
  { text: 'મહાનદી પરિસર', lang: 'gu', font: 'var(--font-gujarati)', x: 10, y: 72, mx: 66, my: 70, size: 18 },
  { text: '马哈纳迪·帕里萨拉', lang: 'zh', font: 'var(--font-chinese)', x: 90, y: 71, mx: null, my: null, size: 15 },
  { text: 'ਮਹਾਨਦੀ ਪਰਿਸਰ', lang: 'pa', font: 'var(--font-gurmukhi)', x: 25, y: 84, mx: 32, my: 76, size: 17 },
  { text: 'Μαχανάντι Παρισάρα', lang: 'el', font: 'var(--font-noto)', x: 47, y: 88, mx: null, my: null, size: 14 },
  { text: 'ମହାନଦୀ ପରିସର', lang: 'or', font: 'var(--font-odia)', x: 67, y: 83, mx: 68, my: 82, size: 19 },
  { text: 'මහානදී පරිසර', lang: 'si', font: 'var(--font-sinhala)', x: 85, y: 89, mx: 34, my: 87.5, size: 16 },
  { text: 'ماهانادي باريسارا', lang: 'ar', font: 'var(--font-arabic)', x: 32, y: 22, mx: null, my: null, size: 17, dir: 'rtl' },
];

const HOLD_MS = 3800; // how long the curtain stays before lifting
const SOUND_HOLD_MS = 7000; // a little longer once someone asks to hear the river
const REDUCED_HOLD_MS = 1500;
const LIFT_MS = 1000; // matches the .intro--lifting transition (0.8s + 0.2s delay)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function Intro({ onDone }) {
  const [reduced] = useState(prefersReducedMotion);
  const [lifting, setLifting] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [hold, setHold] = useState({ ms: reduced ? REDUCED_HOLD_MS : HOLD_MS, key: 0 });
  const soundRef = useRef(null);

  // Lift the curtain once the hold runs out. Turning sound on restarts the hold.
  useEffect(() => {
    if (lifting) return undefined;
    const t = setTimeout(() => setLifting(true), hold.ms);
    return () => clearTimeout(t);
  }, [hold, lifting]);

  useEffect(() => {
    if (!lifting) return undefined;
    soundRef.current?.close(0.9);
    const t = setTimeout(onDone, reduced ? 0 : LIFT_MS);
    return () => clearTimeout(t);
  }, [lifting, onDone, reduced]);

  // Release the audio if the intro goes away early (Skip).
  useEffect(() => () => soundRef.current?.close(0.3), []);

  const toggleSound = useCallback(() => {
    if (!soundRef.current) soundRef.current = createRiverSound();
    const sound = soundRef.current;
    if (!sound) return;
    if (soundOn) {
      sound.pause();
      setSoundOn(false);
      trackEvent('intro_sound', 'Engagement', 'off');
    } else {
      sound.play();
      setSoundOn(true);
      setHold((h) => ({ ms: SOUND_HOLD_MS, key: h.key + 1 }));
      trackEvent('intro_sound', 'Engagement', 'on');
    }
  }, [soundOn]);

  const skip = () => {
    trackEvent('intro_skip', 'Engagement', 'Intro skipped');
    onDone();
  };

  return (
    <div
      className={`intro${lifting ? ' intro--lifting' : ''}${reduced ? ' intro--still' : ''}`}
      role="dialog"
      aria-label="Intro"
    >
      <div className="intro__dots" aria-hidden="true" />

      <div className="intro__scatter" aria-hidden="true">
        {SCATTER.map((n, i) => (
          <span
            key={n.lang}
            className={`intro__word${n.mx == null ? ' intro__word--wide' : ''}`}
            lang={n.lang}
            dir={n.dir}
            style={{
              '--x': `${n.x}%`,
              '--y': `${n.y}%`,
              '--mx': `${n.mx ?? 0}%`,
              '--my': `${n.my ?? 0}%`,
              '--delay': `${250 + i * 70}ms`,
              '--bob': `${5 + (i % 4) * 1.3}s`,
              fontFamily: n.font,
              '--size': `${n.size}px`,
            }}
          >
            <span className="intro__word-inner">{n.text}</span>
          </span>
        ))}
      </div>

      <div className="intro__inner">
        <p className="intro__eyebrow">MarTech &amp; Analytics Specialist</p>
        <p className="intro__name">
          <span className="intro__en">Mahanadhi Parisara</span>
          <span className="intro__kn" lang="kn">
            ಮಹಾನದಿ ಪರಿಸರ
          </span>
        </p>
        <p className="intro__meaning">
          <span lang="kn">ಮಹಾನದಿ</span>, the great river
        </p>
        <div className="intro__track" aria-hidden="true">
          <div
            key={hold.key}
            className="intro__fill"
            style={{ animationDuration: `${hold.ms}ms`, animationPlayState: reduced ? 'paused' : 'running' }}
          />
        </div>
      </div>

      <div className="intro__water" aria-hidden="true">
        <div className="intro__wave intro__wave--back" />
        <div className="intro__wave intro__wave--mid" />
        <div className="intro__wave intro__wave--front" />
      </div>

      <button
        type="button"
        className="intro__btn intro__sound"
        aria-pressed={soundOn}
        onClick={toggleSound}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
          {soundOn ? (
            <>
              <path d="M16 9a4 4 0 0 1 0 6" />
              <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" />
            </>
          ) : (
            <path d="M16 9l5 6M21 9l-5 6" />
          )}
        </svg>
        {soundOn ? 'Sound on' : 'Hear the river'}
      </button>

      <button type="button" className="intro__btn intro__skip" autoFocus onClick={skip}>
        Skip intro
      </button>
    </div>
  );
}
