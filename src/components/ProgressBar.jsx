export default function ProgressBar({ current, total, label, detail }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">
        <span>{label}</span>
        <div className="flex items-center gap-3">
          {detail ? <span className="text-slate-300">{detail}</span> : null}
          <span>{Math.round(percent)}%</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
