import { useEffect, useState } from 'react';

// Nadhi and Claude Code on a bench with two cold coffees. The bubbles take turns.
const LINES = [
  ['me', 'Hey Claude, I’ve got something on my mind.'],
  ['claude', 'I’m in.'],
  ['me', 'But I didn’t even finish.'],
  ['claude', 'Don’t need to. I’m in.'],
  ['me', 'Woah, hold on. Let’s finish the cold coffee first.'],
];
const LINE_MS = 2600;

// Pixel-art Nadhi: [x, y, width, colour, blinks?] on an 8px grid.
const NADHI = [
  [144, 160, 48, '#1A1A1A'],
  [136, 168, 64, '#1A1A1A'],
  [136, 176, 64, '#1A1A1A'],
  [136, 184, 8, '#1A1A1A'],
  [144, 184, 48, '#8D5A3B'],
  [192, 184, 8, '#1A1A1A'],
  [144, 192, 8, '#8D5A3B'],
  [152, 192, 8, '#111111', true],
  [160, 192, 16, '#8D5A3B'],
  [176, 192, 8, '#111111', true],
  [184, 192, 8, '#8D5A3B'],
  [144, 200, 16, '#8D5A3B'],
  [160, 200, 16, '#6B3F27'],
  [176, 200, 16, '#8D5A3B'],
  [160, 208, 16, '#8D5A3B'],
  [136, 216, 64, '#0E5A5E'],
  [128, 224, 80, '#0E5A5E'],
  [128, 232, 80, '#0E5A5E'],
  [128, 240, 80, '#0E5A5E'],
  [128, 248, 80, '#0E5A5E'],
  [128, 256, 80, '#0E5A5E'],
  [128, 264, 8, '#8D5A3B'],
  [136, 264, 64, '#0E5A5E'],
  [200, 264, 8, '#8D5A3B'],
  [144, 272, 48, '#33322F'],
  [144, 280, 48, '#33322F'],
  [144, 288, 16, '#33322F'],
  [176, 288, 16, '#33322F'],
  [144, 296, 16, '#33322F'],
  [176, 296, 16, '#33322F'],
  [144, 304, 16, '#33322F'],
  [176, 304, 16, '#33322F'],
  [144, 312, 16, '#33322F'],
  [176, 312, 16, '#33322F'],
  [144, 320, 16, '#33322F'],
  [176, 320, 16, '#33322F'],
  [136, 328, 24, '#111111'],
  [176, 328, 24, '#111111'],];

function CoffeeGlass({ x, sipping }) {
  return (
    <g className={sipping ? 'px-sip' : undefined}>
      <rect x={x + 12} y="232" width="4" height="24" fill="#B4430F" />
      <rect x={x} y="248" width="24" height="40" fill="#A9744F" />
      <rect x={x} y="248" width="24" height="8" fill="#E8D5B5" />
      <rect x={x + 4} y="262" width="6" height="6" fill="#F4F3EF" opacity="0.8" />
      <rect x={x + 14} y="270" width="6" height="6" fill="#F4F3EF" opacity="0.8" />
    </g>
  );
}

export default function BenchScene() {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [i, setI] = useState(reduced ? LINES.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % LINES.length), LINE_MS);
    return () => clearInterval(t);
  }, [reduced]);

  const [who, text] = LINES[i];

  return (
    <div className="bench">
      <svg
        className="bench__svg"
        viewBox="0 0 560 360"
        role="img"
        aria-label="Pixel art of Nadhi and the Claude Code character sitting on a bench with two cold coffees"
      >
        <rect x="24" y="344" width="512" height="4" fill="#CFCDC6" />
        <rect x="112" y="300" width="12" height="44" fill="#33322F" />
        <rect x="436" y="300" width="12" height="44" fill="#33322F" />
        <g>
          {NADHI.map(([x, y, w, fill, blink], k) => (
            <rect key={k} x={x} y={y} width={w} height="8" fill={fill} className={blink ? 'px-blink' : undefined} />
          ))}
        </g>
        {/* Seat drawn after Nadhi so it sits in front of his lap. */}
        <rect x="96" y="288" width="368" height="12" fill="#33322F" />
        <CoffeeGlass x={214} sipping />
        <CoffeeGlass x={294} />
        <g className="px-bob">
          <image href="/img/claude-code.png" x="330" y="188" width="160" height="100" className="bench__claude" />
        </g>
      </svg>

      <p key={i} className={`bench__bubble bench__bubble--${who}`}>
        {text}
      </p>
      <p className="bench__names" aria-hidden="true">
        <span>NADHI</span>
        <span>CLAUDE CODE</span>
      </p>
      {/* Not a live region: the chat cycles forever, which would make screen readers repeat it. */}
      <p className="visually-hidden">
        {who === 'me' ? 'Nadhi' : 'Claude Code'}: {text}
      </p>
    </div>
  );
}
