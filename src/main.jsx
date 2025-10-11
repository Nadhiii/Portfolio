// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

// Import pages
import HomePage from './pages/Home.jsx';
import ExperiencePage from './pages/ExperiencePage.jsx';
import PlutoPage from './pages/Pluto.jsx';
import PlutoPageTest from './pages/PlutoPageTest.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />, 
    children: [
      { 
        path: '/', 
        element: <HomePage />
      },
      { 
        path: '/projects', 
        element: <HomePage />
      },
      { 
        path: '/skills', 
        element: <HomePage />
      },
      { 
        path: '/contact', 
        element: <HomePage />
      },
      { 
        path: '/experience', 
        element: <ExperiencePage />
      },
      { 
        path: '/pluto', 
        element: <PlutoPage />
      },
      { 
        path: '/pluto-test', 
        element: <PlutoPageTest />
      },
      { 
        path: '*', 
        element: <NotFoundPage />
      }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);