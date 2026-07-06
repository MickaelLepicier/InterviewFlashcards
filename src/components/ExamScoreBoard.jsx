import { renderStars } from '../utils/examScore';

export default function ExamScoreBoard({ score, correctCount, totalQuestions, stars, label, correctLabel }) {
  return (
    <div className="score-board flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-amber-300">
          {score.toLocaleString()} <span className="text-sm font-medium text-amber-200/80">pts</span>
        </p>
      </div>
      <div className="text-end">
        <p className="text-xs text-slate-400">{correctLabel}</p>
        <p className="mt-1 text-lg font-semibold text-white">
          {correctCount}/{totalQuestions}
        </p>
      </div>
      <div className="w-full text-center sm:w-auto">
        <p className="text-2xl tracking-widest" aria-label={`${stars} out of 5 stars`}>
          {renderStars(stars)}
        </p>
      </div>
    </div>
  );
}
