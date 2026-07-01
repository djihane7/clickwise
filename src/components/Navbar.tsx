import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/missions', label: 'Missions' },
  { to: '/games', label: 'Games' },
  { to: '/learn', label: 'Learn' },
  { to: '/emergency', label: 'Emergency' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-blue-500/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to={user.registered ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
            <Shield className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Click<span className="text-cyan-400">Wise</span>
          </span>
        </Link>

        {user.registered && (
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-500/15 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user.registered ? (
            <>
              <div className="hidden items-center gap-3 sm:flex">
                <div className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">
                  Lv {user.level}
                </div>
                <div className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
                  {user.xp} XP
                </div>
              </div>
              <button
                type="button"
                onClick={() => { logout(); navigate('/'); }}
                className="hidden rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white md:inline-flex"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex rounded-lg p-2 text-slate-300 hover:bg-white/5 md:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/register" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && user.registered && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-blue-500/10 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive ? 'bg-blue-500/15 text-cyan-300' : 'text-slate-300'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={() => { logout(); setOpen(false); navigate('/'); }}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-300"
              >
                Log out
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
