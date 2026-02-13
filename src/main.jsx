// src/main.jsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PageLoader from './components/PageLoader.jsx';
import './index.css';

// Eagerly loaded (critical path)
import HomePage from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Lazy loaded (non-critical routes)
const ExperiencePage = React.lazy(() => import('./pages/Experience.jsx'));
const PlutoPage = React.lazy(() => import('./pages/Pluto.jsx'));

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
        element: <Suspense fallback={<PageLoader />}><ExperiencePage /></Suspense>
      },
      { 
        path: '/pluto', 
        element: <Suspense fallback={<PageLoader />}><PlutoPage /></Suspense>
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