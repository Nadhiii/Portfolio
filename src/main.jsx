// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import PlutoPage from './pages/PlutoPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />, 
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/projects', element: <HomePage /> },
      { path: '/skills', element: <HomePage /> },
      { path: '/contact', element: <HomePage /> },
      { path: '/pluto', element: <PlutoPage /> },
      { path: '*', element: <NotFoundPage /> }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);