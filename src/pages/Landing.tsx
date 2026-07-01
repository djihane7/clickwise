import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Brain, Target, Trophy, Lock, Fingerprint, Sparkles,
  CheckCircle2, ArrowRight, BarChart3, Gamepad2, BookOpen, Zap,
} from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const benefits = [
  { icon: Fingerprint, title: 'Personalized DNA Profile', text: 'See your unique digital security personality — strengths and risk patterns included.' },
  { icon: Target, title: 'Missions That Matter', text: 'Weaknesses become actionable missions that build real habits, not trivia knowledge.' },
  { icon: Brain, title: 'Behavior-First Learning', text: 'Designed for long-term change using practice, feedback, and progressive difficulty.' },
  { icon: Gamepad2, title: 'Meaningful Cyber Games', text: 'Play scenarios that teach phishing, social engineering, passwords, and more.' },
  { icon: Shield, title: 'Emergency Mode', text: 'Calm, practical playbooks when accounts, devices, or identity are at risk.' },
  { icon: Trophy, title: 'Progress You Can Feel', text: 'XP, ranks, streaks, and achievements reinforce consistency without gimmicks.' },
];

const steps = [
  { n: '01', title: 'Assess', text: 'Answer realistic scenarios that map to 12 security dimensions.' },
  { n: '02', title: 'Analyze', text: 'Receive your Digital DNA profile, security score, and risk map.' },
  { n: '03', title: 'Improve', text: 'Follow personalized missions, games, and courses that target weak spots.' },
  { n: '04', title: 'Evolve', text: 'Reassess monthly and watch safer habits become automatic.' },
];

const stats = [
  { value: '12', label: 'Security Dimensions' },
  { value: '10+', label: 'Cyber Games' },
  { value: '9', label: 'Emergency Guides' },
  { value: '∞', label: 'Habit Potential' },
];

const audiences = ['Individuals', 'Families', 'Students', 'Teams', 'Educators'];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.25),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(34,211,238,0.12),_transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Behavior-changing cybersecurity education
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your{' '}
              <span className="gradient-text">Digital Security DNA</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              ClickWise measures how you actually behave online, identifies your weakest security instincts,
              and transforms them into personalized missions until safer habits stick.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 transition hover:brightness-110"
              >
                Start Free Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> No credit card</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> Privacy-first</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> Built for real life</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="animate-float overflow-hidden rounded-3xl border border-blue-400/20 shadow-2xl shadow-blue-500/20 glow-blue">
              <img
                src="/images/hero-dna.jpg"
                alt="Abstract digital DNA helix representing cybersecurity behavior profiling"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl glass-strong p-4 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Security Score</p>
                  <p className="text-lg font-bold text-white">Personalized</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="border-y border-blue-500/10 bg-navy-900/50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <motion.div {...fade}>
            <Lock className="mx-auto mb-4 h-8 w-8 text-cyan-400" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              ClickWise does not simply teach cybersecurity. It measures digital behavior, diagnoses weaknesses,
              and coaches people through personalized learning missions until safer decisions become second nature.
              The goal is lasting behavioral change — not certificates that fade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} {...fade} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <motion.div {...fade} className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-white">Why ClickWise feels different</h2>
          <p className="mt-3 text-slate-400">Every screen, color, and mission is designed for trust, intelligence, safety, growth, progress, and achievement.</p>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <motion.div key={b.title} {...fade} className="glass rounded-2xl p-6 transition hover:border-cyan-500/30 hover:glow-blue">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15">
                <b.icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div {...fade} className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">How it works</h2>
          <p className="mt-3 text-slate-400">A clear path from awareness to automatic safer behavior.</p>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <motion.div key={s.n} {...fade} className="relative glass rounded-2xl p-6">
              <div className="text-sm font-bold text-cyan-400">{s.n}</div>
              <h3 className="mt-2 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-blue-400/15">
          <img src="/images/protection.jpg" alt="Person protected by a digital security shield illustrating safer digital habits" className="max-h-80 w-full object-cover" />
        </div>
      </section>

      {/* Audiences */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Built for everyone who lives online</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {audiences.map((p) => (
            <div key={p} className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-400">{p}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <motion.div {...fade} className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-navy-800 to-navy-900 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(34,211,238,0.15),_transparent_50%)]" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold text-white">Your security personality is already forming habits.</h2>
            <p className="mt-3 text-slate-300">Measure it. Improve it. Reassess it. Make safer digital behavior part of who you are.</p>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 transition hover:brightness-110"
            >
              Generate My ClickWise
              <Zap className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <BookOpen className="absolute bottom-6 right-8 hidden h-24 w-24 text-cyan-500/10 sm:block" aria-hidden="true" />
        </motion.div>
      </section>
    </div>
  );
}
