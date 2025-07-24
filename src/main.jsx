// src/main.jsx
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

// Lazy load components to reduce initial bundle size
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const PlutoPage = lazy(() => import('./pages/PlutoPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// Loading fallback component
const PageLoading = () => (
  <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />, 
    children: [
      { 
        path: '/', 
        element: (
          <Suspense fallback={<PageLoading />}>
            <HomePage />
          </Suspense>
        )
      },
      { 
        path: '/projects', 
        element: (
          <Suspense fallback={<PageLoading />}>
            <HomePage />
          </Suspense>
        )
      },
      { 
        path: '/skills', 
        element: (
          <Suspense fallback={<PageLoading />}>
            <HomePage />
          </Suspense>
        )
      },
      { 
        path: '/contact', 
        element: (
          <Suspense fallback={<PageLoading />}>
            <HomePage />
          </Suspense>
        )
      },
      { 
        path: '/pluto', 
        element: (
          <Suspense fallback={<PageLoading />}>
            <PlutoPage />
          </Suspense>
        )
      },
      { 
        path: '*', 
        element: (
          <Suspense fallback={<PageLoading />}>
            <NotFoundPage />
          </Suspense>
        )
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