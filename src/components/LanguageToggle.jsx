export default function LanguageToggle({ lang, label, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:bg-white/20 hover:shadow-xl active:scale-[0.98]"
      aria-label={`Switch to ${lang === 'en' ? 'Hebrew' : 'English'}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">
          {lang === 'en' ? '🇮🇱' : '🇬🇧'}
        </span>
        {label}
      </span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    </button>
  );
}
