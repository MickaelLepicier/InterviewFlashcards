import { ACHIEVEMENTS } from '../data/achievements';
import { getAchievementProgress, isAchievementUnlocked } from '../utils/achievements';

export default function AchievementsScreen({ lang, t, achievementsVersion, onBack }) {
  void achievementsVersion;
  const { unlockedCount, totalCount } = getAchievementProgress();

  return (
    <section className="animate-fade-up flex flex-1 flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
            {t.achievementsLabel}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            {t.achievementsTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {t.achievementsProgress(unlockedCount, totalCount)}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
        >
          {t.backToSubjects}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = isAchievementUnlocked(achievement.id);
          const title = lang === 'he' ? achievement.title_he : achievement.title_en;
          const description =
            lang === 'he' ? achievement.description_he : achievement.description_en;

          return (
            <article
              key={achievement.id}
              className={`relative overflow-hidden rounded-3xl border p-5 transition-all ${
                unlocked
                  ? 'border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 via-white/5 to-violet-500/10 shadow-lg shadow-emerald-500/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {unlocked ? (
                <span className="absolute end-4 top-4 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                  ✓ {t.achievementUnlocked}
                </span>
              ) : (
                <span
                  className="absolute end-4 top-4 text-lg text-slate-500"
                  aria-hidden="true"
                >
                  🔒
                </span>
              )}

              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl ${
                  unlocked ? 'bg-white/10' : 'bg-slate-800/50 grayscale blur-[1px] opacity-50'
                }`}
                aria-hidden="true"
              >
                {achievement.badge_icon}
              </div>

              <h3
                className={`text-lg font-semibold ${
                  unlocked ? 'text-white' : 'text-slate-500'
                }`}
              >
                {title}
              </h3>
              <p className="mt-1 text-xs font-medium text-violet-300">
                {achievement.character_name}
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  unlocked ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
