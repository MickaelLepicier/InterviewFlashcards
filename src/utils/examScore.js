export const POINTS_PER_CORRECT = 100;
export const BEST_SCORE_KEY = 'ai-exam-best-score';

export function getBestScore() {
  try {
    const value = localStorage.getItem(BEST_SCORE_KEY);
    return value ? Number.parseInt(value, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveBestScore(score) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // ignore storage errors
  }
}

export function getSuccessPercentage(correctCount, totalQuestions) {
  if (totalQuestions === 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function getStarCount(percentage) {
  if (percentage >= 80) return 5;
  if (percentage >= 60) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 20) return 2;
  return 1;
}

export function renderStars(starCount) {
  return Array.from({ length: 5 }, (_, index) => (index < starCount ? '⭐' : '☆')).join('');
}

export function calculateSessionStats(results, totalQuestions) {
  const entries = Object.values(results);
  const correctCount = entries.filter((entry) => entry.isCorrect).length;
  const answeredCount = entries.length;
  const sessionScore = correctCount * POINTS_PER_CORRECT;
  const percentage = getSuccessPercentage(correctCount, totalQuestions);

  return {
    correctCount,
    answeredCount,
    sessionScore,
    percentage,
    starCount: getStarCount(percentage),
  };
}
