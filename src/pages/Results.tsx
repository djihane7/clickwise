import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import ScoreRing from '../components/ScoreRing';
import DimensionBar from '../components/DimensionBar';
import Card from '../components/Card';
import { DIMENSION_LABELS, type Dimension } from '../data/types';
import { ArrowRight, Sparkles, AlertTriangle, Shield } from 'lucide-react';

export default function Results() {
  const { user } = useUser();
  if (!user.registered) return <Navigate to="/register" replace />;
  if (!user.assessmentComplete) return <Navigate to="/assessment" replace />;
  const dims = Object.keys(DIMENSION_LABELS) as Dimension[];
  const sorted = [...dims].sort((a, b) => user.dimensionScores[a] - user.dimensionScores[b]);
  const weakest = sorted.slice(0, 3);
  const strongest = [...sorted].reverse().slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
            <Sparkles className="h-3.5 w-3.5" /> Digital DNA Generated
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {user.name ? `${user.name}'s` : 'Your'} Security DNA
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            This profile reflects behavioral patterns from realistic scenarios — not memorized facts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center text-center lg:col-span-1">
            <ScoreRing score={user.overallScore} size={160} stroke={12} label="Overall" />
            <h2 className="mt-4 text-xl font-semibold text-white">Security Score</h2>
            <p className="mt-2 text-sm text-slate-400">
              {user.overallScore >= 80
                ? 'Strong foundation — refine advanced habits.'
                : user.overallScore >= 60
                  ? 'Solid start with clear growth opportunities.'
                  : 'High-impact improvements available through missions.'}
            </p>
            <img src="/images/dna-profile.jpg" alt="Visual representation of digital DNA profile" className="mt-6 w-full max-w-[220px] rounded-2xl border border-purple-500/20" />
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-white">Dimension Scores</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dims.map((d) => (
                <DimensionBar key={d} dimension={d} score={user.dimensionScores[d]} />
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Shield className="h-5 w-5 text-green-400" /> DNA Traits
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.traits.map((t) => (
                <span
                  key={t.id}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                    t.type === 'strength'
                      ? 'border-green-500/25 bg-green-500/10 text-green-300'
                      : t.type === 'risk'
                        ? 'border-orange-500/25 bg-orange-500/10 text-orange-300'
                        : 'border-blue-500/25 bg-blue-500/10 text-blue-300'
                  }`}
                  title={t.description}
                >
                  {t.title}
                </span>
              ))}
              {user.traits.length === 0 && <p className="text-sm text-slate-400">Complete assessment to unlock traits.</p>}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <AlertTriangle className="h-5 w-5 text-orange-400" /> Priority Growth Areas
            </h2>
            <ul className="space-y-3">
              {weakest.map((d) => (
                <li key={d} className="flex items-center justify-between rounded-xl bg-navy-950/50 px-4 py-3">
                  <span className="text-sm text-slate-300">{DIMENSION_LABELS[d]}</span>
                  <span className="text-sm font-bold text-orange-300">{user.dimensionScores[d]}</span>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">Strongest instincts</h3>
            <ul className="space-y-2">
              {strongest.map((d) => (
                <li key={d} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{DIMENSION_LABELS[d]}</span>
                  <span className="font-semibold text-green-400">{user.dimensionScores[d]}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
          >
            Open Personal Improvement Plan
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/missions" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
            Start Missions
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
