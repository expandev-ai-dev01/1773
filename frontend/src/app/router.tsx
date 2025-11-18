import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { DashboardLayout } from '@/pages/layouts/DashboardLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const LibraryPage = lazy(() => import('@/pages/Library'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'library',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LibraryPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
