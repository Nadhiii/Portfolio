// The river's stops, in order. `id` doubles as the URL hash (#work, #nexus, ...).
export const STOPS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'nandini', label: 'Nandini POS' },
  { id: 'nexus', label: 'Nexus' },
  { id: 'team', label: 'Team tools' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const stopNumber = (i) => String(i + 1).padStart(2, '0');
