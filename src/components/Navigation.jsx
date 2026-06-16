function NavButton({ children, onClick, disabled, variant = 'secondary' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40';

  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110 active:scale-[0.97]',
    secondary:
      'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 active:scale-[0.97]',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default function Navigation({
  current,
  total,
  cardLabel,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  isRtl,
}) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between"
    >
      <NavButton onClick={onPrevious} disabled={isFirst}>
        {isRtl ? (
          <span className="inline-flex items-center gap-2" dir="ltr">
            <span>{previousLabel}</span>
            <span aria-hidden="true">→</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2" dir="ltr">
            <span aria-hidden="true">←</span>
            <span>{previousLabel}</span>
          </span>
        )}
      </NavButton>

      <p className="text-sm font-medium text-slate-300">{cardLabel}</p>

      <NavButton onClick={onNext} disabled={isLast} variant="primary">
        {isRtl ? (
          <span className="inline-flex items-center gap-2">
            <span>{nextLabel}</span>
            <span aria-hidden="true">←</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2" dir="ltr">
            <span>{nextLabel}</span>
            <span aria-hidden="true">→</span>
          </span>
        )}
      </NavButton>
    </div>
  );
}
