// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

// Eagerly loaded (critical path)
import HomePage from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ExperiencePage from './pages/Experience.jsx';
import NexusPage from './pages/Nexus.jsx';
import ProjectsPage from './pages/Projects.jsx';
import ContactPage from './pages/Contact.jsx';
import SkillsPage from './pages/Skills.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />, 
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'nexus',
        element: <NexusPage />
      },
      { path: 'projects', element: <ProjectsPage /> },
      {
        path: 'skills',
        element: <SkillsPage />
      },
      { path: 'contact', element: <ContactPage /> },
      {
        path: 'experience',
        element: <ExperiencePage />
      },
      { 
        path: '*', 
        element: <NotFoundPage />
      }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);