export default function GameModeSelector({ modes, activeMode, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {modes.map(({ id, label, description }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`flex-1 rounded-2xl border px-5 py-4 text-start transition-all duration-200 sm:min-w-[220px] ${
            activeMode === id
              ? 'border-violet-400/60 bg-violet-500/20 shadow-lg shadow-violet-500/10'
              : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
          }`}
        >
          <span className="block text-sm font-semibold text-white">{label}</span>
          <span className="mt-1 block text-xs text-slate-400">{description}</span>
        </button>
      ))}
    </div>
  );
}
