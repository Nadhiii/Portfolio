// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import PlutoPage from './pages/PlutoPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx'; // 1. Import the new page
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // We add the errorElement here to catch any loading errors
    errorElement: <NotFoundPage />, 
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/pluto', element: <PlutoPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/skills', element: <SkillsPage /> },
      { path: '/contact', element: <ContactPage /> },
      // 2. Add this "catch-all" route at the end
      { path: '*', element: <NotFoundPage /> }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);