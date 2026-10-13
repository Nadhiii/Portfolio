import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { redirectLegacyPath } from './legacyRoutes.js';
import './styles.css';

// Must run before River mounts and reads the hash.
redirectLegacyPath();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
