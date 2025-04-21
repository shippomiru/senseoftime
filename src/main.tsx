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
    // 找到当前路由的meta标签
    const metaTag = document.querySelector(`meta[data-route="${location.pathname}"]`);
    if (metaTag) {
      // 更新默认meta描述
      const defaultMeta = document.querySelector('meta[name="description"]:not([data-route])');
      if (defaultMeta) {
        defaultMeta.setAttribute('content', metaTag.getAttribute('content') || '');
      }
      
      // 更新canonical链接
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        const pathname = location.pathname;
        // 如果是主页，使用根URL
        if (pathname === '/') {
          canonicalLink.setAttribute('href', 'https://senseoftime.online/');
        } else {
          // 否则使用完整的内页URL
          canonicalLink.setAttribute('href', `https://senseoftime.online${pathname}`);
        }
        console.log(`已更新canonical链接为: ${canonicalLink.getAttribute('href')}`);
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