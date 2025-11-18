import { NavLink, Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';
import { cn } from '@/core/lib/utils';

const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'px-3 py-2 rounded-md text-sm font-medium',
      isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'
    );

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-900">
          BookNest
        </NavLink>
        <div className="flex items-center space-x-4">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/library" className={linkClass}>
            Library
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export const DashboardLayout = () => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};
