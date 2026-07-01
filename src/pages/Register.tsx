import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Register() {
  const { register, user } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setError('Please enter a valid name and email.');
      return;
    }
    register(name.trim(), email.trim());
    navigate(user.assessmentComplete ? '/dashboard' : '/assessment');
  };

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.18),_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30">
            <Shield className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create your ClickWise profile</h1>
          <p className="mt-2 text-sm text-slate-400">Your progress is stored locally in this browser for privacy.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">Full name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-navy-950/60 py-3 pl-10 pr-3 text-white placeholder:text-slate-600 focus:border-cyan-500/50"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-navy-950/60 py-3 pl-10 pr-3 text-white placeholder:text-slate-600 focus:border-cyan-500/50"
                placeholder="alex@email.com"
                autoComplete="email"
                required
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
          >
            Continue to Assessment
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already exploring? <Link to="/dashboard" className="text-cyan-400 hover:underline">Go to dashboard</Link>
        </p>
      </motion.div>
    </div>
  );
}
