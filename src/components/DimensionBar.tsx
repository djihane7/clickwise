import { DIMENSION_LABELS, type Dimension } from '../data/types';

function barColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}

export default function DimensionBar({ dimension, score }: { dimension: Dimension; score: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{DIMENSION_LABELS[dimension]}</span>
        <span className="font-semibold text-white">{score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-navy-700" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={DIMENSION_LABELS[dimension]}>
        <div className={`h-full rounded-full transition-all duration-700 ${barColor(score)}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
