import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { courses, dailyTips } from '../data/courses';
import { useUser } from '../context/UserContext';
import Card from '../components/Card';
import { BookOpen, Lightbulb, Play } from 'lucide-react';

export default function Learn() {
  const { user, updateCourseProgress } = useUser();
  const [tipIndex] = useState(() => new Date().getDate() % dailyTips.length);

  if (!user.registered) return <Navigate to="/register" replace />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Learning Center</h1>
        <p className="mt-2 text-slate-400">Interactive courses, labs, and daily tips for continuous growth.</p>
      </div>

      <Card className="mb-6 border-cyan-500/20">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15">
            <Lightbulb className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Daily Tip</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{dailyTips[tipIndex]}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => {
          const progress = user.courseProgress[c.id] ?? c.progress;
          return (
            <Card key={c.id}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{c.category}</div>
              <h2 className="text-lg font-semibold text-white">{c.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {c.lessons} lessons</span>
                <span>{c.duration}</span>
                <span>{c.level}</span>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-300">{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-navy-700">
                  <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => updateCourseProgress(c.id, Math.min(100, progress + 20))}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500/15 py-2.5 text-sm font-semibold text-blue-300 hover:bg-blue-500/25"
              >
                <Play className="h-4 w-4" />
                {progress >= 100 ? 'Review Course' : 'Continue Learning'}
              </button>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { title: 'Practice Labs', text: 'Apply concepts in guided simulations without real-world risk.' },
          { title: 'Latest Cyber Threats', text: 'Short briefings on emerging scams and defensive habits.' },
          { title: 'Interactive Simulations', text: 'Decision-based scenarios that reinforce critical thinking under pressure.' },
        ].map((item) => (
          <Card key={item.title}>
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
