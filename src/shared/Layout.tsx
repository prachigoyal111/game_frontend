import { Link, NavLink, Outlet } from 'react-router-dom';
import { ToastProvider } from './toast/ToastContext';
import Toaster from './toast/Toaster';
import controller from '../assets/controller.svg';

export default function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded hover:bg-white/40 ${isActive ? 'font-semibold text-indigo-700 bg-white/60' : 'text-indigo-800 hover:text-indigo-900'}`;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-pink-50">
        <header className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-lg shadow-sm" aria-label="Logo" />
              <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-800">Gaming Club</Link>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm bg-white/50 backdrop-blur rounded-lg px-2 py-1 border border-white/70">
              <NavLink to="/" className={linkClass} end>Dashboard</NavLink>
              <NavLink to="/members" className={linkClass}>Members</NavLink>
              <NavLink to="/games" className={linkClass}>Games</NavLink>
              <NavLink to="/recharges" className={linkClass}>Recharges</NavLink>
              <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
              <NavLink to="/collections/daily" className={linkClass}>Collections</NavLink>
              <NavLink to="/admin-users" className={linkClass}>Admin Users</NavLink>
            </nav>
          </div>
          <img src={controller} alt="controller" className="pointer-events-none select-none opacity-20 absolute -top-6 right-4 h-24" />
        </header>
        <main className="max-w-6xl mx-auto w-full px-4 py-8">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </ToastProvider>
  );
}
