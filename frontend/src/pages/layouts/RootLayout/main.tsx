import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

export const RootLayout = () => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong in the layout.</p>}>
      <div className="min-h-screen flex flex-col">
        {/* Header can go here */}
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* Footer can go here */}
      </div>
    </ErrorBoundary>
  );
};
