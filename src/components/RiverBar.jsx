import { STOPS, stopNumber } from '../stops.js';
import { trackEvent } from '../utils/analytics.js';

// The wavy river along the bottom. Stops sit where the wave crosses its centre line.
const W = 1376;
const HALF = W / (2 * STOPS.length); // half a wavelength, so every stop sits on a crossing
const WAVE = (() => {
  let d = `M0 12 Q${HALF / 2} 2 ${HALF} 12`;
  for (let x = HALF * 2; x <= W + 0.5; x += HALF) d += ` T${x} 12`;
  return d;
})();
const STOP_X = STOPS.map((_, i) => HALF * (2 * i + 1)); 

export default function RiverBar({ index, onGo }) {
  let done = `M0 12 Q${HALF / 2} 2 ${HALF} 12`;
  for (let x = HALF * 2; x <= STOP_X[index] + 0.5; x += HALF) done += ` T${x} 12`;

  return (
    <nav className="riverbar" aria-label="Site stops">
      <div className="riverbar__inner">
        <svg className="riverbar__wave" viewBox={`0 0 ${W} 24`} preserveAspectRatio="none" aria-hidden="true">
          <path d={WAVE} className="riverbar__line" />
          <path d={done} className="riverbar__done" />
        </svg>
        {STOPS.map((s, i) => {
          const state = i === index ? 'here' : i < index ? 'passed' : 'ahead';
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`riverbar__stop riverbar__stop--${state}`}
              style={{ left: `${(STOP_X[i] / W) * 100}%` }}
              aria-current={i === index ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                trackEvent('nav_click', 'Navigation', `riverbar:${s.id}`);
                onGo(s.id);
              }}
            >
              <span className="riverbar__dot" />
              <span className="riverbar__label">
                {stopNumber(i)} {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
