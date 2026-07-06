import { formatHighScore, getBestScore } from '../utils/examScore';
import { getAchievementProgress } from '../utils/achievements';
import {
  getSubjectDescription,
  getSubjectLabel,
  getSubjects,
} from '../services/subjectData';

export default function SubjectSelector({
  lang,
  t,
  questionCounts,
  highScoreVersion,
  achievementsVersion,
  onSelect,
  onOpenAchievements,
}) {
  const subjects = getSubjects();
  void highScoreVersion;
  void achievementsVersion;
  const { unlockedCount, totalCount } = getAchievementProgress();

  return (
    <section className="animate-fade-up flex flex-1 flex-col justify-center">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
          {t.subjectSelectionLabel}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {t.subjectSelectionTitle}
        </h2>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          {t.subjectSelectionDesc}
        </p>
        <button
          type="button"
          onClick={onOpenAchievements}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-100 transition-all hover:border-amber-300/50 hover:bg-amber-400/15"
        >
          <span aria-hidden="true">🏅</span>
          <span>{t.achievementsButton}</span>
          <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs text-amber-50">
            {unlockedCount}/{totalCount}
          </span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const bestScore = getBestScore(subject.id);
          const questionCount = questionCounts[subject.id] ?? 0;

          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelect(subject.id)}
              className="group rounded-3xl border border-white/15 bg-white/5 p-5 text-start transition-all duration-200 hover:border-violet-400/50 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {subject.icon}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {questionCount} {t.questions}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-violet-100">
                {getSubjectLabel(subject, lang)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {getSubjectDescription(subject, lang)}
              </p>

              <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-sm text-amber-200">
                <span aria-hidden="true">🏆</span>
                <span>
                  {t.bestRecord}:{' '}
                  <strong>{formatHighScore(bestScore, Math.min(10, questionCount || 10))}</strong>
                </span>
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
