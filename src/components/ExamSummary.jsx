import { formatHighScore, renderStars } from '../utils/examScore';

export default function ExamSummary({
  sessionScore,
  correctCount,
  totalQuestions,
  percentage,
  starCount,
  bestScore,
  isNewBest,
  t,
  onPlayAgain,
}) {
  const displayedBest = Math.max(correctCount, bestScore);

  return (
    <main className="animate-fade-up flex flex-1 flex-col justify-center">
      <div className="content-card rounded-3xl border border-white/20 bg-white/95 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
          {t.examCompletedTitle}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          {t.examCompletedScore(correctCount, totalQuestions)}
        </h2>

        {isNewBest ? (
          <p className="mt-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
            {t.newPersonalBest}
          </p>
        ) : null}

        <div className="exam-summary-grid mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.successRate}
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-800">{percentage}%</p>
            <p className="mt-1 text-sm text-slate-600">
              {correctCount}/{totalQuestions} {t.correctAnswers}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.yourRating}
            </p>
            <p className="mt-2 text-3xl tracking-widest">{renderStars(starCount)}</p>
            <p className="mt-2 text-sm text-slate-600">
              {starCount}/5 {t.stars}
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          {t.totalScore}:{' '}
          <span className="font-semibold text-slate-700">
            {sessionScore.toLocaleString()} {t.points}
          </span>
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {t.bestRecord}:{' '}
          <span className="font-semibold text-slate-700">
            {formatHighScore(displayedBest, totalQuestions)}
          </span>
        </p>

        <button
          type="button"
          onClick={onPlayAgain}
          className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110 active:scale-[0.98]"
        >
          {t.playAgain}
        </button>
      </div>
    </main>
  );
}
