import { Link, NavLink, Outlet } from 'react-router-dom';
import { ToastProvider } from './toast/ToastContext';
import Toaster from './toast/Toaster';

export default function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded hover:bg-white/10 ${isActive ? 'font-semibold text-white bg-white/10' : 'text-white/80'}`;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-violet-50">
        <header className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-extrabold tracking-tight">Gaming Club</Link>
            <nav className="flex flex-wrap gap-2 text-sm">
              <NavLink to="/" className={linkClass} end>Dashboard</NavLink>
              <NavLink to="/members" className={linkClass}>Members</NavLink>
              <NavLink to="/games" className={linkClass}>Games</NavLink>
              <NavLink to="/recharges" className={linkClass}>Recharges</NavLink>
              <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
              <NavLink to="/collections/daily" className={linkClass}>Collections</NavLink>
              <NavLink to="/admin-users" className={linkClass}>Admin Users</NavLink>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto w-full px-4 py-8">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </ToastProvider>
  );
}
