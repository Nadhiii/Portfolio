// The old site had real routes (/projects, /skills, ...). The river uses one
// hash per stop instead, so old links and bookmarks are mapped to the matching
// stop before River reads the hash.
const LEGACY = {
  '/projects': 'work',
  '/nexus': 'nexus',
  '/pluto': 'nexus',
  '/skills': 'skills',
  '/experience': 'experience',
  '/about': 'about',
  '/contact': 'contact',
};

export function redirectLegacyPath() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  if (path === '') return;
  const stop = LEGACY[path] || 'home';
  history.replaceState(null, '', `/#${stop}`);
}
