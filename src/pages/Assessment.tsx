import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assessmentQuestions } from '../data/assessment';
import { computeAssessment, useUser } from '../context/UserContext';
import { Brain, ChevronRight } from 'lucide-react';

export default function Assessment() {
  const { user, submitAssessment } = useUser();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ scores: Record<string, number>; trait?: string }[]>([]);

  const question = assessmentQuestions[index];
  const progress = ((index) / assessmentQuestions.length) * 100;

  const canContinue = selected !== null;

  const onNext = () => {
    if (selected === null) return;
    const option = question.options[selected];
    const nextAnswers = [...answers, { scores: option.scores as Record<string, number>, trait: option.trait }];
    setAnswers(nextAnswers);
    setSelected(null);

    if (index + 1 >= assessmentQuestions.length) {
      const result = computeAssessment(nextAnswers);
      submitAssessment(result.scores, result.traits);
      navigate('/results');
    } else {
      setIndex((i) => i + 1);
    }
  };

  const greeting = useMemo(() => (user.name ? `${user.name}, r` : 'R'), [user.name]);

  if (!user.registered) return <Navigate to="/register" replace />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
          <span className="inline-flex items-center gap-2 font-medium text-cyan-300">
            <Brain className="h-4 w-4" aria-hidden="true" /> ClickWise Assessment
          </span>
          <span>
            Question {index + 1} of {assessmentQuestions.length}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-navy-700" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={assessmentQuestions.length}>
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <p className="text-sm text-slate-400">{greeting}eact to this real-world scenario:</p>
          <h1 className="mt-3 text-2xl font-bold leading-snug text-white">{question.scenario}</h1>
          {question.context && (
            <p className="mt-3 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3 text-sm text-slate-300">
              Context: {question.context}
            </p>
          )}

          <fieldset className="mt-6 space-y-3">
            <legend className="sr-only">Choose your response</legend>
            {question.options.map((opt, i) => (
              <label
                key={opt.text}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                  selected === i
                    ? 'border-cyan-400/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : 'border-white/10 bg-navy-950/40 hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  className="mt-1"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <span className="text-sm leading-relaxed text-slate-200">{opt.text}</span>
              </label>
            ))}
          </fieldset>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!canContinue}
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {index + 1 >= assessmentQuestions.length ? 'Generate My DNA' : 'Next scenario'}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
