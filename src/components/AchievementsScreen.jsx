import { ACHIEVEMENTS } from '../data/achievements';
import { getAchievementProgress, isAchievementUnlocked } from '../utils/achievements';

export default function AchievementsScreen({ lang, t, achievementsVersion, onBack }) {
  void achievementsVersion;
  const { unlockedCount, totalCount } = getAchievementProgress();
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((unlockedCount / totalCount) * 100);

  return (
    <section className="animate-fade-up flex flex-1 flex-col">
      <div className="achievements-header mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
            {t.achievementsLabel}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            {t.achievementsTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
        >
          {t.backToSubjects}
        </button>
      </div>

      <div
        className="achievements-intro mb-5 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-500/15 via-violet-500/10 to-fuchsia-500/10 p-4 sm:p-5"
        role="note"
      >
        <p className="text-sm leading-relaxed text-amber-50 sm:text-base">
          {t.achievementsIntro}
        </p>
      </div>

      <div className="achievements-progress mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-white">
            {t.achievementsProgressDetail(unlockedCount, totalCount)}
          </p>
          <span className="text-xs font-medium text-violet-200">{progressPercent}%</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-slate-800/80"
          role="progressbar"
          aria-valuenow={unlockedCount}
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-label={t.achievementsProgressDetail(unlockedCount, totalCount)}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-violet-400 to-fuchsia-400 transition-[width] duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="achievements-grid grid gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = isAchievementUnlocked(achievement.id);
          const title = lang === 'he' ? achievement.title_he : achievement.title_en;
          const description =
            lang === 'he' ? achievement.description_he : achievement.description_en;
          const howToUnlock =
            lang === 'he' ? achievement.how_to_unlock_he : achievement.how_to_unlock_en;

          return (
            <article
              key={achievement.id}
              className={`achievement-card relative overflow-hidden rounded-3xl border p-5 transition-all ${
                unlocked
                  ? 'achievement-card--unlocked border-emerald-400/50 bg-gradient-to-br from-emerald-500/20 via-violet-500/10 to-fuchsia-500/10 shadow-lg shadow-emerald-500/20'
                  : 'achievement-card--locked border-white/10 bg-slate-900/40'
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div
                  className={`achievement-badge relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl ${
                    unlocked
                      ? 'bg-white/15 ring-2 ring-emerald-300/40'
                      : 'bg-slate-800/70'
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={
                      unlocked ? '' : 'achievement-badge-icon opacity-55 grayscale'
                    }
                  >
                    {achievement.badge_icon}
                  </span>
                  {!unlocked ? (
                    <span className="achievement-lock-overlay absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-950/45 text-2xl">
                      🔒
                    </span>
                  ) : null}
                </div>

                <span
                  className={`inline-flex min-h-8 items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${
                    unlocked
                      ? 'bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/40'
                      : 'bg-slate-700/70 text-slate-300 ring-1 ring-white/10'
                  }`}
                >
                  {unlocked ? t.achievementUnlockedBadge : t.achievementLockedBadge}
                </span>
              </div>

              <p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  unlocked ? 'text-violet-200' : 'text-slate-400'
                }`}
              >
                {achievement.character_name}
              </p>

              <h3
                className={`mt-1 text-lg font-bold ${
                  unlocked ? 'text-white' : 'text-slate-200'
                }`}
              >
                {title}
              </h3>

              <div
                className={`mt-3 rounded-xl border px-3 py-2.5 ${
                  unlocked
                    ? 'border-emerald-400/20 bg-emerald-500/10'
                    : 'border-amber-400/25 bg-amber-500/10'
                }`}
              >
                <p
                  className={`text-[11px] font-bold uppercase tracking-wide ${
                    unlocked ? 'text-emerald-200/90' : 'text-amber-200'
                  }`}
                >
                  {t.achievementHowToUnlock}
                </p>
                <p
                  className={`mt-1 text-sm font-medium leading-snug ${
                    unlocked ? 'text-emerald-50' : 'text-amber-50'
                  }`}
                >
                  {howToUnlock}
                </p>
              </div>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  unlocked ? 'text-slate-200' : 'text-slate-400'
                }`}
              >
                {description}
              </p>

              {unlocked ? (
                <p className="mt-3 text-xs font-semibold text-emerald-300">✓ {t.achievementUnlocked}</p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
