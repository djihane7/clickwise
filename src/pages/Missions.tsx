import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { missions } from '../data/missions';
import { useUser } from '../context/UserContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { DIMENSION_LABELS } from '../data/types';
import { CheckCircle2, Target, X } from 'lucide-react';

export default function Missions() {
  const { user, completeMission } = useUser();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  if (!user.registered) return <Navigate to="/register" replace />;

  const active = missions.find((m) => m.id === activeId);
  const allChecked = active ? active.steps.every((_, i) => checked[i]) : false;

  const openMission = (id: string) => {
    setActiveId(id);
    setChecked({});
  };

  const finish = () => {
    if (!active || !allChecked) return;
    completeMission(active.id, active.xp);
    setActiveId(null);
  };

  const filters = ['all', 'beginner', 'intermediate', 'advanced', 'expert'] as const;
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const list = missions.filter((m) => filter === 'all' || m.difficulty === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Cyber Missions</h1>
        <p className="mt-2 text-slate-400">Progressive challenges that convert weak habits into protective routines.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
              filter === f ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((m) => {
          const done = user.completedMissions.includes(m.id);
          return (
            <Card key={m.id} className={done ? 'opacity-80' : ''}>
              <div className="mb-3 flex items-start justify-between gap-2">
                <Badge label={m.difficulty} tone={m.difficulty} />
                {done && <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400"><CheckCircle2 className="h-3.5 w-3.5" /> Done</span>}
              </div>
              <h2 className="text-lg font-semibold text-white">{m.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{m.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{DIMENSION_LABELS[m.dimension]}</span>
                <span className="font-semibold text-purple-300">+{m.xp} XP</span>
              </div>
              <button
                type="button"
                onClick={() => openMission(m.id)}
                className="mt-4 w-full rounded-xl bg-blue-500/15 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/25"
              >
                {done ? 'Review Mission' : 'Start Mission'}
              </button>
            </Card>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-title"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="glass-strong max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 text-cyan-300">
                    <Target className="h-4 w-4" /> Mission Briefing
                  </div>
                  <h2 id="mission-title" className="text-xl font-bold text-white">{active.title}</h2>
                </div>
                <button type="button" onClick={() => setActiveId(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-slate-400">{active.description}</p>
              <ol className="mt-5 space-y-3">
                {active.steps.map((step, i) => (
                  <li key={step}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-navy-950/40 p-3">
                      <input
                        type="checkbox"
                        checked={!!checked[i]}
                        onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                        className="mt-1"
                      />
                      <span className="text-sm text-slate-200"><span className="mr-2 font-semibold text-cyan-400">{i + 1}.</span>{step}</span>
                    </label>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                disabled={!allChecked || user.completedMissions.includes(active.id)}
                onClick={finish}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {user.completedMissions.includes(active.id) ? 'Mission Already Completed' : `Complete Mission (+${active.xp} XP)`}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
