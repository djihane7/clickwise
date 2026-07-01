import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Fingerprint, Smartphone, Laptop, Bug, Skull,
  MessageSquareWarning, AlertTriangle, MailWarning, X, CheckCircle2,
} from 'lucide-react';
import { emergencyGuides } from '../data/emergency';
import { useUser } from '../context/UserContext';
import Card from '../components/Card';
import Badge from '../components/Badge';

const icons = {
  ShieldAlert, Fingerprint, Smartphone, Laptop, Bug, Skull,
  MessageSquareWarning, AlertTriangle, MailWarning,
} as const;

export default function Emergency() {
  const { user, markEmergencyViewed } = useUser();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = emergencyGuides.find((g) => g.id === activeId);

  if (!user.registered) return <Navigate to="/register" replace />;

  const open = (id: string) => {
    setActiveId(id);
    markEmergencyViewed();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Emergency Mode</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Calm, practical guidance when something goes wrong. Move step by step — speed matters, panic does not.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {emergencyGuides.map((g) => {
          const Icon = icons[g.icon as keyof typeof icons] || AlertTriangle;
          return (
            <button key={g.id} type="button" onClick={() => open(g.id)} className="text-left">
              <Card className="h-full transition hover:border-red-400/30 hover:glow-blue">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15">
                    <Icon className="h-5 w-5 text-red-300" aria-hidden="true" />
                  </div>
                  <Badge label={g.urgency} tone={g.urgency} />
                </div>
                <h2 className="text-lg font-semibold text-white">{g.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{g.summary}</p>
              </Card>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="glass-strong max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <Badge label={active.urgency} tone={active.urgency} />
                  <h2 className="mt-2 text-2xl font-bold text-white">{active.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{active.summary}</p>
                </div>
                <button type="button" onClick={() => setActiveId(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ol className="space-y-3">
                {active.steps.map((s, i) => (
                  <li key={s.title} className="rounded-2xl border border-white/10 bg-navy-950/40 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-bold text-cyan-300">{i + 1}</div>
                      <div>
                        <h3 className="font-semibold text-white">{s.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{s.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-300">
                  <CheckCircle2 className="h-4 w-4" /> Helpful reminders
                </h3>
                <ul className="space-y-1 text-sm text-green-100/90">
                  {active.tips.map((t) => <li key={t}>• {t}</li>)}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
