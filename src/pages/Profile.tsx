import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Card from '../components/Card';
import ScoreRing from '../components/ScoreRing';
import { achievements, getCyberRank } from '../data/achievements';
import { missions } from '../data/missions';
import { Award, Flame, History, Medal, Sparkles } from 'lucide-react';

export default function Profile() {
  const { user } = useUser();
  if (!user.registered) return <Navigate to="/register" replace />;

  const unlocked = achievements.map((a) => ({ ...a, unlocked: user.unlockedAchievements.includes(a.id) }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/30">
          {user.name.slice(0, 1).toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-slate-400">{user.email}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-purple-500/15 px-3 py-1 font-semibold text-purple-300">{getCyberRank(user.level)}</span>
            <span className="rounded-full bg-orange-500/15 px-3 py-1 font-semibold text-orange-300 inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {user.streak} streak</span>
            <span className="rounded-full bg-green-500/15 px-3 py-1 font-semibold text-green-300">Level {user.level}</span>
          </div>
        </div>
        <div className="ml-auto">
          <ScoreRing score={user.overallScore || 0} size={100} label="Score" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Sparkles className="h-5 w-5 text-cyan-400" /> DNA Evolution</h2>
          <div className="flex flex-wrap gap-2">
            {user.traits.map((t) => (
              <span key={t.id} className={`rounded-full px-3 py-1 text-xs font-semibold ${t.type === 'strength' ? 'bg-green-500/15 text-green-300' : 'bg-orange-500/15 text-orange-300'}`}>
                {t.title}
              </span>
            ))}
            {user.traits.length === 0 && <p className="text-sm text-slate-400">Complete the assessment to generate DNA traits.</p>}
          </div>
          <img src="/images/dna-profile.jpg" alt="DNA profile visualization" className="mt-4 rounded-2xl border border-blue-500/20" />
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><History className="h-5 w-5 text-blue-400" /> Security History</h2>
          <ul className="space-y-2 text-sm">
            {user.history.length === 0 && <li className="text-slate-400">No assessments recorded yet.</li>}
            {user.history.map((h, i) => (
              <li key={h.date + i} className="flex items-center justify-between rounded-xl bg-navy-950/50 px-3 py-2">
                <span className="text-slate-400">{new Date(h.date).toLocaleDateString()}</span>
                <span className="font-semibold text-white">Score {h.score}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-white/10 p-3 text-xs text-slate-400">
            Monthly reassessment recommended to track behavioral change over time.
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Medal className="h-5 w-5 text-purple-400" /> Mission History</h2>
          <p className="text-sm text-slate-400">{user.completedMissions.length} / {missions.length} missions complete</p>
          <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto text-sm">
            {user.completedMissions.map((id) => {
              const m = missions.find((x) => x.id === id);
              return (
                <li key={id} className="rounded-lg bg-navy-950/50 px-3 py-2 text-slate-300">{m?.title || id}</li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="mt-5">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Award className="h-5 w-5 text-purple-400" /> Badges & Certificates</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {unlocked.map((a) => (
            <div
              key={a.id}
              className={`rounded-2xl border p-4 ${a.unlocked ? 'border-purple-500/30 bg-purple-500/10' : 'border-white/5 bg-white/[0.02] opacity-50'}`}
            >
              <div className="text-sm font-semibold text-white">{a.title}</div>
              <p className="mt-1 text-xs text-slate-400">{a.description}</p>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-purple-300">{a.rarity} · {a.xp} XP</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
