import { useEffect } from 'react';

export default function AchievementToast({ achievement, lang, t, onDismiss }) {
  const title = lang === 'he' ? achievement.title_he : achievement.title_en;

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4500);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="achievement-toast pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-500/95 to-orange-500/95 px-4 py-4 text-white shadow-2xl shadow-amber-900/40"
    >
      <span className="text-3xl" aria-hidden="true">
        {achievement.badge_icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{t.achievementUnlockedToast(title)}</p>
        <p className="mt-1 text-xs text-amber-50/90">
          {lang === 'he' ? achievement.description_he : achievement.description_en}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-lg px-2 py-1 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        aria-label={t.closeToast}
      >
        ✕
      </button>
    </div>
  );
}
