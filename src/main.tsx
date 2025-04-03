import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import Timer5 from './pages/Timer5';
import Timer10 from './pages/Timer10';
import Timer15 from './pages/Timer15';
import Timer20 from './pages/Timer20';
import Timer30 from './pages/Timer30';
import './index.css';

// Meta tag updater component
function MetaUpdater() {
  const location = useLocation();

  React.useEffect(() => {
    // Find the meta tag for the current route
    const metaTag = document.querySelector(`meta[data-route="${location.pathname}"]`);
    if (metaTag) {
      // Update the default meta description
      const defaultMeta = document.querySelector('meta[name="description"]:not([data-route])');
      if (defaultMeta) {
        defaultMeta.setAttribute('content', metaTag.getAttribute('content') || '');
      }
    }
  }, [location]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MetaUpdater />
        <Timer15 />
      </>
    ),
  },
  {
    path: "/5-minute-timer",
    element: (
      <>
        <MetaUpdater />
        <Timer5 />
      </>
    ),
  },
  {
    path: "/10-minute-timer",
    element: (
      <>
        <MetaUpdater />
        <Timer10 />
      </>
    ),
  },
  {
    path: "/15-minute-timer",
    element: (
      <>
        <MetaUpdater />
        <Timer15 />
      </>
    ),
  },
  {
    path: "/20-minute-timer",
    element: (
      <>
        <MetaUpdater />
        <Timer20 />
      </>
    ),
  },
  {
    path: "/30-minute-timer",
    element: (
      <>
        <MetaUpdater />
        <Timer30 />
      </>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);