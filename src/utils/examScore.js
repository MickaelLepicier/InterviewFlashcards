export const POINTS_PER_CORRECT = 100;
export const EXAM_QUESTION_COUNT = 10;
export const HIGH_SCORE_PREFIX = 'highScore_';

export function getHighScoreKey(subjectId) {
  return `${HIGH_SCORE_PREFIX}${subjectId}`;
}

export function getBestScore(subjectId) {
  if (!subjectId) return 0;

  try {
    const value = localStorage.getItem(getHighScoreKey(subjectId));
    return value ? Number.parseInt(value, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveBestScore(subjectId, correctCount) {
  if (!subjectId) return;

  try {
    localStorage.setItem(getHighScoreKey(subjectId), String(correctCount));
  } catch {
    // ignore storage errors
  }
}

export function formatHighScore(correctCount, totalQuestions = EXAM_QUESTION_COUNT) {
  if (!correctCount) return '—';
  return `${correctCount}/${totalQuestions}`;
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
