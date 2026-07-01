const colors = {
  beginner: 'bg-green-500/15 text-green-300 border-green-500/20',
  intermediate: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  advanced: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  expert: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  common: 'bg-slate-500/15 text-slate-300 border-slate-500/20',
  rare: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  epic: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  legendary: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  critical: 'bg-red-500/15 text-red-300 border-red-500/20',
  high: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  medium: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
};

export default function Badge({ label, tone }: { label: string; tone: keyof typeof colors }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${colors[tone]}`}>
      {label}
    </span>
  );
}
