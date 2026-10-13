import { useCallback, useEffect, useRef, useState } from 'react';
import { STOPS } from '../stops.js';
import { trackPageView } from '../utils/analytics.js';
import TopBar from './TopBar.jsx';
import RiverBar from './RiverBar.jsx';
import HomePanel from '../panels/HomePanel.jsx';
import WorkPanel from '../panels/WorkPanel.jsx';
import NandiniPanel from '../panels/NandiniPanel.jsx';
import NexusPanel from '../panels/NexusPanel.jsx';
import TeamPanel from '../panels/TeamPanel.jsx';
import ExperiencePanel from '../panels/ExperiencePanel.jsx';
import SkillsPanel from '../panels/SkillsPanel.jsx';
import AboutPanel from '../panels/AboutPanel.jsx';
import ContactPanel from '../panels/ContactPanel.jsx';

// Landscape screens wide enough get the sideways river; phones and portrait screens stack.
const SIDEWAYS_QUERY = '(min-width: 1024px) and (orientation: landscape)';
const WHEEL_THRESHOLD = 40; // how much scrolling counts as "next stop"
const WHEEL_LOCK_MS = 750; // one stop per gesture

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return match;
}

const PANELS = {
  home: HomePanel,
  work: WorkPanel,
  nandini: NandiniPanel,
  nexus: NexusPanel,
  team: TeamPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  about: AboutPanel,
  contact: ContactPanel,
};

// Each desktop stop is designed at 1440 x 756 (a 1440 x 900 screen minus the two bars)
// and scaled to fit the window, so it looks the same on a laptop or a big monitor.
const DESIGN_W = 1440;
const DESIGN_H = 756;
function useStageScale(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const set = () => {
      const bars = 2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar') || 72);
      const s = Math.min(window.innerWidth / DESIGN_W, (window.innerHeight - bars) / DESIGN_H);
      document.documentElement.style.setProperty('--s', String(s));
    };
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [enabled]);
}

export default function River() {
  const sideways = useMedia(SIDEWAYS_QUERY);
  const scroller = useRef(null);
  const panels = useRef([]);
  const [index, setIndex] = useState(0);
  useStageScale(sideways);

  const goTo = useCallback(
    (i) => {
      const clamped = Math.max(0, Math.min(STOPS.length - 1, i));
      const el = panels.current[clamped];
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
      history.replaceState(null, '', `#${STOPS[clamped].id}`);
    },
    []
  );

  const goToId = useCallback((id) => goTo(STOPS.findIndex((s) => s.id === id)), [goTo]);

  // Track which stop is in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIndex(Number(e.target.dataset.index));
        });
      },
      // Sideways, the track scrolls and a stop counts once 60% is in view. Stacked, the
      // page itself scrolls and panels are taller than the screen, so the stop is
      // whichever one crosses the middle of the viewport.
      sideways
        ? { root: scroller.current, threshold: 0.6 }
        : { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    panels.current.forEach((p) => p && io.observe(p));
    return () => io.disconnect();
  }, [sideways]);

  // One page_view per stop, once it has settled (also on first load). The short
  // wait means a fast wheel run or a deep link doesn't count the stops it passes.
  useEffect(() => {
    const stop = STOPS[index];
    const t = setTimeout(() => trackPageView(stop.label, stop.id), 400);
    return () => clearTimeout(t);
  }, [index]);

  // Open at the stop in the URL (#nexus etc).
  useEffect(() => {
    const id = location.hash.slice(1);
    const i = STOPS.findIndex((s) => s.id === id);
    if (i > 0) panels.current[i]?.scrollIntoView({ inline: 'start', block: 'start' });
  }, [sideways]);

  // Desktop: vertical wheel and arrow keys move along the river.
  useEffect(() => {
    if (!sideways) return;
    const el = scroller.current;
    let acc = 0;
    let locked = false;
    let cur = index;

    const step = (dir) => {
      if (locked) return;
      locked = true;
      cur = Math.max(0, Math.min(STOPS.length - 1, Math.round(el.scrollLeft / el.clientWidth) + dir));
      goTo(cur);
      setTimeout(() => {
        locked = false;
        acc = 0;
      }, WHEEL_LOCK_MS);
    };

    const onWheel = (e) => {
      // Let inner areas that scroll sideways (like the project rail) keep their own scroll.
      if (e.target.closest?.('[data-own-scroll]') && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      acc += d;
      if (Math.abs(acc) >= WHEEL_THRESHOLD) step(acc > 0 ? 1 : -1);
    };

    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(STOPS.length - 1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideways, goTo]);

  return (
    <div className={`river ${sideways ? 'river--sideways' : 'river--stacked'}`}>
      <TopBar current={STOPS[index].id} onGo={goToId} />
      <main ref={scroller} className="river__track">
        {STOPS.map((s, i) => {
          const Panel = PANELS[s.id];
          return (
            <section
              key={s.id}
              id={s.id}
              data-index={i}
              ref={(el) => (panels.current[i] = el)}
              className={`panel panel--${s.id}`}
              aria-label={s.label}
            >
              <div className="stage-wrap">
                <div className="stage">
                  <Panel onGo={goToId} />
                </div>
              </div>
            </section>
          );
        })}
      </main>
      {sideways && <RiverBar index={index} onGo={goToId} />}
    </div>
  );
}
