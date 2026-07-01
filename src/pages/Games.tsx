import { useMemo, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, Globe, KeyRound, Users, QrCode, Smartphone, Wifi, Skull, Search, DoorOpen, X, Check, AlertTriangle,
} from 'lucide-react';
import { games, phishingEmails, websitePairs } from '../data/games';
import { useUser } from '../context/UserContext';
import Card from '../components/Card';
import Badge from '../components/Badge';

const iconMap = { Mail, Globe, KeyRound, Users, QrCode, Smartphone, Wifi, Skull, Search, DoorOpen } as const;

export default function Games() {
  const { user, completeGame } = useUser();
  const [active, setActive] = useState<string | null>(null);

  if (!user.registered) return <Navigate to="/register" replace />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Cyber Games</h1>
        <p className="mt-2 text-slate-400">Every game teaches a real defensive skill — fun with a purpose.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {games.map((g) => {
          const Icon = iconMap[g.icon as keyof typeof iconMap] || ShieldFallback;
          const done = user.completedGames.includes(g.id);
          return (
            <Card key={g.id}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                  <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                </div>
                <Badge label={g.difficulty} tone={g.difficulty} />
              </div>
              <h2 className="text-lg font-semibold text-white">{g.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{g.description}</p>
              <p className="mt-3 text-xs text-slate-500"><span className="font-semibold text-slate-400">Teaches:</span> {g.concept}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-300">+{g.xp} XP {done && '· Played'}</span>
                <button
                  type="button"
                  onClick={() => setActive(g.id)}
                  className="rounded-lg bg-cyan-500/15 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/25"
                >
                  Play
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {active === 'g1' && <PhishingGame onClose={() => setActive(null)} onComplete={(xp, perfect) => { completeGame('g1', xp, perfect); setActive(null); }} />}
      {active === 'g2' && <WebsiteGame onClose={() => setActive(null)} onComplete={(xp) => { completeGame('g2', xp); setActive(null); }} />}
      {active === 'g3' && <PasswordGame onClose={() => setActive(null)} onComplete={(xp, perfect) => { completeGame('g3', xp, perfect); setActive(null); }} />}
      {active && !['g1', 'g2', 'g3'].includes(active) && (
        <ScenarioGame
          gameId={active}
          onClose={() => setActive(null)}
          onComplete={(xp) => { completeGame(active, xp); setActive(null); }}
        />
      )}
    </div>
  );
}

function ShieldFallback(props: { className?: string }) {
  return <AlertTriangle {...props} />;
}

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" role="dialog" aria-modal="true">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/5" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

function PhishingGame({ onClose, onComplete }: { onClose: () => void; onComplete: (xp: number, perfect: boolean) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [lastCorrect, setLastCorrect] = useState(false);
  const email = phishingEmails[idx];

  const choose = (isPhishing: boolean) => {
    const correct = email.isPhishing === isPhishing;
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? `Correct. ${email.explanation}` : `Not quite. ${email.explanation}`);
  };

  const next = () => {
    setFeedback(null);
    setIdx((i) => i + 1);
  };

  const finish = () => {
    const finalScore = score;
    onComplete(120, finalScore === phishingEmails.length);
  };

  return (
    <ModalShell title="Phishing Hunter" onClose={onClose}>
      <p className="mb-4 text-sm text-slate-400">Mark each message as phishing or legitimate. Score: {score}/{phishingEmails.length}</p>
      <div className="rounded-2xl border border-white/10 bg-navy-950/50 p-4">
        <div className="text-xs text-slate-500">From</div>
        <div className="font-medium text-white">{email.from}</div>
        <div className="mt-2 text-xs text-slate-500">Subject</div>
        <div className="font-medium text-cyan-200">{email.subject}</div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{email.body}</p>
      </div>
      {feedback ? (
        <div className="mt-4 space-y-3">
          <p className={`text-sm ${lastCorrect ? 'text-green-300' : 'text-orange-300'}`}>{feedback}</p>
          {idx + 1 >= phishingEmails.length ? (
            <button type="button" onClick={finish} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white">
              Collect XP
            </button>
          ) : (
            <button type="button" onClick={next} className="rounded-xl bg-blue-500/20 px-4 py-2.5 text-sm font-semibold text-blue-200">Next email</button>
          )}
        </div>
      ) : (
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={() => choose(true)} className="flex-1 rounded-xl bg-red-500/15 py-3 text-sm font-semibold text-red-300">Phishing</button>
          <button type="button" onClick={() => choose(false)} className="flex-1 rounded-xl bg-green-500/15 py-3 text-sm font-semibold text-green-300">Legitimate</button>
        </div>
      )}
    </ModalShell>
  );
}

function WebsiteGame({ onClose, onComplete }: { onClose: () => void; onComplete: (xp: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const pair = websitePairs[idx];

  const pick = (choice: 'A' | 'B') => {
    const correct = choice === pair.correct;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? `Correct. ${pair.explanation}` : `Incorrect. ${pair.explanation}`);
  };

  return (
    <ModalShell title="Fake Website Spotter" onClose={onClose}>
      <p className="mb-4 text-sm text-slate-400">Which URL is legitimate? ({idx + 1}/{websitePairs.length})</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(['A', 'B'] as const).map((k) => {
          const opt = k === 'A' ? pair.optionA : pair.optionB;
          return (
            <button
              key={k}
              type="button"
              disabled={!!feedback}
              onClick={() => pick(k)}
              className="rounded-2xl border border-white/10 bg-navy-950/50 p-4 text-left hover:border-cyan-500/40 disabled:opacity-70"
            >
              <div className="text-xs text-slate-500">{opt.label}</div>
              <div className="mt-1 break-all font-mono text-sm text-cyan-200">{opt.url}</div>
            </button>
          );
        })}
      </div>
      {feedback && (
        <div className="mt-4">
          <p className="text-sm text-slate-300">{feedback}</p>
          <button
            type="button"
            className="mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white"
            onClick={() => {
              if (idx + 1 >= websitePairs.length) onComplete(110);
              else { setFeedback(null); setIdx((i) => i + 1); }
            }}
          >
            {idx + 1 >= websitePairs.length ? `Finish (+110 XP) · ${score + (feedback.startsWith('Correct') ? 0 : 0)}` : 'Next'}
          </button>
        </div>
      )}
    </ModalShell>
  );
}

function PasswordGame({ onClose, onComplete }: { onClose: () => void; onComplete: (xp: number, perfect: boolean) => void }) {
  const [password, setPassword] = useState('');
  const analysis = useMemo(() => {
    const lengthScore = Math.min(40, password.length * 3);
    const variety =
      (/[a-z]/.test(password) ? 10 : 0) +
      (/[A-Z]/.test(password) ? 10 : 0) +
      (/[0-9]/.test(password) ? 10 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 15 : 0);
    const penalty = /password|12345|qwerty|admin/i.test(password) ? 30 : 0;
    const score = Math.max(0, Math.min(100, lengthScore + variety - penalty + (password.length >= 16 ? 15 : 0)));
    return score;
  }, [password]);

  return (
    <ModalShell title="Password Forge" onClose={onClose}>
      <p className="mb-4 text-sm text-slate-400">Craft a strong password. Aim for length, variety, and uniqueness. Do not use a real password.</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 font-mono text-white"
        placeholder="Type a practice password..."
        aria-label="Practice password"
      />
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-slate-400">Strength</span>
          <span className="font-semibold text-white">{analysis}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-navy-700">
          <div
            className={`h-full rounded-full transition-all ${analysis >= 80 ? 'bg-green-500' : analysis >= 50 ? 'bg-orange-500' : 'bg-red-500'}`}
            style={{ width: `${analysis}%` }}
          />
        </div>
      </div>
      <ul className="mt-4 space-y-1 text-xs text-slate-400">
        <li className="flex items-center gap-2">{password.length >= 12 ? <Check className="h-3.5 w-3.5 text-green-400" /> : <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />} At least 12–16 characters</li>
        <li className="flex items-center gap-2">{/[A-Z]/.test(password) && /[a-z]/.test(password) ? <Check className="h-3.5 w-3.5 text-green-400" /> : <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />} Mixed case letters</li>
        <li className="flex items-center gap-2">{/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? <Check className="h-3.5 w-3.5 text-green-400" /> : <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />} Numbers and symbols</li>
      </ul>
      <button
        type="button"
        disabled={analysis < 50}
        onClick={() => onComplete(100, analysis >= 85)}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
      >
        Submit Password (+100 XP)
      </button>
    </ModalShell>
  );
}

const scenarioData: Record<string, { title: string; prompt: string; options: { text: string; correct: boolean; why: string }[] }> = {
  g4: {
    title: 'Social Engineering Detector',
    prompt: 'A caller says they are from your bank fraud team and asks you to read a one-time code "to cancel a fraudulent transfer." What do you do?',
    options: [
      { text: 'Read the code so they can cancel the fraud', correct: false, why: 'Attackers use codes to approve their own login or transfer.' },
      { text: 'Hang up and call the bank using the number on your card', correct: true, why: 'Independent verification defeats impersonation.' },
      { text: 'Ask them to prove identity by naming your balance', correct: false, why: 'Skilled attackers may already have partial data.' },
    ],
  },
  g5: {
    title: 'QR Code Integrity',
    prompt: 'You see a parking payment QR sticker placed over another sticker. Best action?',
    options: [
      { text: 'Scan it — parking QR codes are usually safe', correct: false, why: 'Overlay stickers are a common quishing tactic.' },
      { text: 'Use the official parking app or meter URL instead', correct: true, why: 'Avoid untrusted QR redirects for payments.' },
      { text: 'Scan but don\'t enter card details', correct: false, why: 'Malicious pages can still phish credentials or install prompts.' },
    ],
  },
  g6: {
    title: 'Smartphone Lockdown',
    prompt: 'Which configuration set is strongest for a daily-driver phone?',
    options: [
      { text: 'No lock screen, auto-updates off, all permissions allowed', correct: false, why: 'Maximizes theft and exploit risk.' },
      { text: 'PIN only, install apps from any source, SMS 2FA everywhere', correct: false, why: 'Better than nothing but still weak in multiple places.' },
      { text: 'Strong biometrics + PIN, auto updates, minimal permissions, authenticator 2FA, encrypted backups', correct: true, why: 'Defense in depth for device and accounts.' },
    ],
  },
  g7: {
    title: 'Secure Wi-Fi Builder',
    prompt: 'Best home Wi-Fi design?',
    options: [
      { text: 'Single open network for easy guest access', correct: false, why: 'Open networks invite interception and abuse.' },
      { text: 'WPA3 (or best available), unique admin password, guest network for visitors/IoT', correct: true, why: 'Encryption + admin hygiene + segmentation.' },
      { text: 'Hide SSID only and keep default router password', correct: false, why: 'Hidden SSIDs are weak security; defaults are dangerous.' },
    ],
  },
  g8: {
    title: 'Ransomware Escape',
    prompt: 'Your screen shows encrypted files and a ransom note. First priorities?',
    options: [
      { text: 'Pay immediately to restore work', correct: false, why: 'Payment funds crime and may not restore data.' },
      { text: 'Isolate the device/network, avoid paying, restore from offline backups', correct: true, why: 'Containment and clean recovery are the resilient path.' },
      { text: 'Post the ransom note online and keep working on the infected PC', correct: false, why: 'Continued use can spread encryption.' },
    ],
  },
  g9: {
    title: 'Cyber Detective',
    prompt: 'Clues: reused passwords, public vacation posts, and a phishing SMS. Most likely attack chain?',
    options: [
      { text: 'Random malware with no human factor', correct: false, why: 'Clues point to credential + social context abuse.' },
      { text: 'Credential stuffing aided by public personal details and SMS phishing', correct: true, why: 'Attackers combine leaked passwords, OSINT, and phishing.' },
      { text: 'Only Wi-Fi encryption failure', correct: false, why: 'Wi-Fi may matter but evidence highlights identity/password/social risk.' },
    ],
  },
  g10: {
    title: 'Security Escape Room',
    prompt: 'Final door requires three locks: password, phishing, privacy. Which combination opens it?',
    options: [
      { text: 'Reuse passwords, click urgent links, overshare locations', correct: false, why: 'That combination keeps the door sealed — and accounts exposed.' },
      { text: 'Unique passwords + manager, verify senders, minimize public personal data', correct: true, why: 'These habits close the most common consumer attack paths.' },
      { text: 'Antivirus alone solves all three', correct: false, why: 'Tools help, but behavior remains essential.' },
    ],
  },
};

function ScenarioGame({ gameId, onClose, onComplete }: { gameId: string; onClose: () => void; onComplete: (xp: number) => void }) {
  const data = scenarioData[gameId];
  const game = games.find((g) => g.id === gameId);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  if (!data || !game) return null;

  return (
    <ModalShell title={data.title} onClose={onClose}>
      <p className="text-sm leading-relaxed text-slate-300">{data.prompt}</p>
      <div className="mt-4 space-y-2">
        {data.options.map((o) => (
          <button
            key={o.text}
            type="button"
            disabled={!!feedback}
            onClick={() => { setCorrect(o.correct); setFeedback(o.why); }}
            className="w-full rounded-xl border border-white/10 bg-navy-950/50 p-3 text-left text-sm text-slate-200 hover:border-cyan-500/40 disabled:opacity-70"
          >
            {o.text}
          </button>
        ))}
      </div>
      {feedback && (
        <div className="mt-4">
          <p className={`text-sm ${correct ? 'text-green-300' : 'text-orange-300'}`}>{correct ? 'Excellent.' : 'Learning moment.'} {feedback}</p>
          <button type="button" onClick={() => onComplete(game.xp)} className="mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white">
            Collect {game.xp} XP
          </button>
        </div>
      )}
    </ModalShell>
  );
}
