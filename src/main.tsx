import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Timer5 from './pages/Timer5';
import Timer10 from './pages/Timer10';
import Timer15 from './pages/Timer15';
import Timer20 from './pages/Timer20';
import Timer30 from './pages/Timer30';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Timer15 />,
  },
  {
    path: "/5-minute-timer",
    element: <Timer5 />,
  },
  {
    path: "/10-minute-timer",
    element: <Timer10 />,
  },
  {
    path: "/15-minute-timer",
    element: <Timer15 />,
  },
  {
    path: "/20-minute-timer",
    element: <Timer20 />,
  },
  {
    path: "/30-minute-timer",
    element: <Timer30 />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);