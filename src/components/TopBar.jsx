import { useState } from 'react';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
];

const WORK_STOPS = ['work', 'nandini', 'nexus', 'team'];

export default function TopBar({ current: stop, onGo }) {
  const current = WORK_STOPS.includes(stop) ? 'work' : stop;
  const [open, setOpen] = useState(false);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    onGo(id);
  };

  return (
    <header className="topbar">
      <a href="#home" className="topbar__brand" onClick={(e) => go(e, 'home')}>
        <span className="topbar__mark">MP</span>
        <span>Mahanadhi Parisara</span>
      </a>
      <button
        type="button"
        className="topbar__menu"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="main-nav" aria-label="Main" className={`topbar__nav${open ? ' is-open' : ''}`}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`topbar__link${current === l.id ? ' is-current' : ''}`}
            aria-current={current === l.id ? 'page' : undefined}
            onClick={(e) => go(e, l.id)}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" className="topbar__cta" onClick={(e) => go(e, 'contact')}>
          Let&rsquo;s talk
        </a>
      </nav>
    </header>
  );
}
