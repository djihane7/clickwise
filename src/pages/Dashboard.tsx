import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ScoreRing from '../components/ScoreRing';
import DimensionBar from '../components/DimensionBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { missions } from '../data/missions';
import { achievements, getCyberRank } from '../data/achievements';
import { DIMENSION_LABELS, type Dimension } from '../data/types';
import { Flame, Target, Trophy, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user } = useUser();
  if (!user.registered) return <Navigate to="/register" replace />;
  if (!user.assessmentComplete) return <Navigate to="/assessment" replace />;

  const dims = Object.keys(DIMENSION_LABELS) as Dimension[];
  const weakest = [...dims].sort((a, b) => user.dimensionScores[a] - user.dimensionScores[b]).slice(0, 3);
  const recommended = missions
    .filter((m) => !user.completedMissions.includes(m.id))
    .sort((a, b) => {
      const aw = weakest.includes(a.dimension) ? 0 : 1;
      const bw = weakest.includes(b.dimension) ? 0 : 1;
      return aw - bw;
    })
    .slice(0, 3);

  const unlocked = achievements.filter((a) => user.unlockedAchievements.includes(a.id));
  const completion = Math.round((user.completedMissions.length / missions.length) * 100);
  const riskAlerts = weakest.filter((d) => user.dimensionScores[d] < 55);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-300">Welcome back, {user.name}</p>
          <h1 className="text-3xl font-bold text-white">Security Command Center</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">{getCyberRank(user.level)}</div>
          <div className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300 inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {user.streak} day streak
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="flex flex-col items-center">
          <ScoreRing score={user.overallScore} size={140} stroke={11} label="Score" />
          <p className="mt-3 text-sm text-slate-400">Overall Security Score</p>
          <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl bg-navy-950/50 p-2">
              <div className="font-bold text-white">{user.level}</div>
              <div className="text-slate-500">Level</div>
            </div>
            <div className="rounded-xl bg-navy-950/50 p-2">
              <div className="font-bold text-white">{user.xp}</div>
              <div className="text-slate-500">XP</div>
            </div>
            <div className="rounded-xl bg-navy-950/50 p-2">
              <div className="font-bold text-white">{completion}%</div>
              <div className="text-slate-500">Missions</div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">DNA Dimension Map</h2>
            <Link to="/results" className="text-xs font-medium text-cyan-400 hover:underline">View full DNA</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {dims.map((d) => (
              <DimensionBar key={d} dimension={d} score={user.dimensionScores[d]} />
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Target className="h-5 w-5 text-cyan-400" /> Recommended Actions
          </h2>
          <div className="space-y-3">
            {recommended.map((m) => (
              <Link key={m.id} to="/missions" className="flex items-center justify-between rounded-xl border border-white/5 bg-navy-950/40 px-4 py-3 transition hover:border-cyan-500/30">
                <div>
                  <div className="font-medium text-white">{m.title}</div>
                  <div className="text-xs text-slate-500">{DIMENSION_LABELS[m.dimension]} · {m.xp} XP</div>
                </div>
                <Badge label={m.difficulty} tone={m.difficulty} />
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <AlertTriangle className="h-5 w-5 text-orange-400" /> Risk Alerts
          </h2>
          {riskAlerts.length === 0 ? (
            <p className="text-sm text-green-300">No critical dimension risks. Keep your streak alive.</p>
          ) : (
            <ul className="space-y-2">
              {riskAlerts.map((d) => (
                <li key={d} className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-sm text-orange-100">
                  {DIMENSION_LABELS[d]} needs attention ({user.dimensionScores[d]})
                </li>
              ))}
            </ul>
          )}
          <Link to="/emergency" className="mt-4 inline-block text-sm font-medium text-cyan-400 hover:underline">Open Emergency Mode →</Link>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Trophy className="h-5 w-5 text-purple-400" /> Achievements
          </h2>
          <div className="flex flex-wrap gap-2">
            {unlocked.length === 0 && <p className="text-sm text-slate-400">Complete missions and games to unlock badges.</p>}
            {unlocked.map((a) => (
              <span key={a.id} className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200">
                {a.title}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <TrendingUp className="h-5 w-5 text-green-400" /> Recent Improvements
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-400" /> Assessment completed · DNA profile active</li>
            <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-400" /> {user.completedMissions.length} missions completed</li>
            <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-400" /> {user.completedGames.length} games practiced</li>
            <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-400" /> Current rank: {getCyberRank(user.level)}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/games" className="rounded-lg bg-blue-500/15 px-3 py-2 text-xs font-semibold text-blue-300">Play Games</Link>
            <Link to="/learn" className="rounded-lg bg-green-500/15 px-3 py-2 text-xs font-semibold text-green-300">Learning Center</Link>
            <Link to="/profile" className="rounded-lg bg-purple-500/15 px-3 py-2 text-xs font-semibold text-purple-300">View Profile</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
