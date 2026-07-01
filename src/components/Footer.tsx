import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/10 bg-navy-900/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            <span className="font-bold text-white">ClickWise</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Measuring digital behavior and transforming weaknesses into safer lifelong habits.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">Platform</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/register" className="hover:text-cyan-300">Assessment</Link></li>
            <li><Link to="/missions" className="hover:text-cyan-300">Missions</Link></li>
            <li><Link to="/games" className="hover:text-cyan-300">Cyber Games</Link></li>
            <li><Link to="/learn" className="hover:text-cyan-300">Learning Center</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">Support</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/emergency" className="hover:text-cyan-300">Emergency Mode</Link></li>
            <li><a href="#how" className="hover:text-cyan-300">How it works</a></li>
            <li><a href="#benefits" className="hover:text-cyan-300">Benefits</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">Trust</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Privacy-first design</li>
            <li>Accessibility minded</li>
            <li>Behavior-change science</li>
            <li>No fear-based marketing</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-500/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ClickWise. Built for long-term digital safety.
      </div>
    </footer>
  );
}
