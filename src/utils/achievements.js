import { ACHIEVEMENTS } from '../data/achievements';
import { EXAM_QUESTION_COUNT, POINTS_PER_CORRECT } from './examScore';

const UNLOCKED_KEY = 'unlocked_achievements';
const COMPLETED_TESTS_KEY = 'completed_tests_count';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export function getUnlockedAchievementIds() {
  const ids = readJson(UNLOCKED_KEY, []);
  return Array.isArray(ids) ? ids : [];
}

export function isAchievementUnlocked(achievementId) {
  return getUnlockedAchievementIds().includes(achievementId);
}

export function getCompletedTestsCount() {
  try {
    const value = localStorage.getItem(COMPLETED_TESTS_KEY);
    return value ? Number.parseInt(value, 10) : 0;
  } catch {
    return 0;
  }
}

function incrementCompletedTestsCount() {
  const nextCount = getCompletedTestsCount() + 1;

  try {
    localStorage.setItem(COMPLETED_TESTS_KEY, String(nextCount));
  } catch {
    // ignore storage errors
  }

  return nextCount;
}

function unlockAchievementIds(ids) {
  const current = getUnlockedAchievementIds();
  const merged = [...current];

  ids.forEach((id) => {
    if (!merged.includes(id)) {
      merged.push(id);
    }
  });

  writeJson(UNLOCKED_KEY, merged);
}

function isConditionMet(achievement, context) {
  const { condition } = achievement;
  const { correctCount, totalQuestions, subjectId, completedTestsCount } = context;

  switch (condition.type) {
    case 'first_exam_complete':
      return completedTestsCount >= 1;
    case 'exact_score':
      return (
        totalQuestions === condition.total && correctCount === condition.correct
      );
    case 'perfect_score':
      return (
        totalQuestions === condition.total && correctCount === condition.total
      );
    case 'min_score_subject':
      return (
        subjectId === condition.subject &&
        totalQuestions === condition.total &&
        correctCount >= condition.minCorrect
      );
    case 'total_exams_completed':
      return completedTestsCount >= condition.count;
    default:
      return false;
  }
}

/**
 * Evaluates achievements after an exam session completes.
 * @param {number} sessionScore - Total session points (correctCount * 100)
 * @param {string} subject - Subject id (e.g. 'css', 'javascript')
 * @param {number} [totalQuestions=10] - Questions in the session
 * @returns {import('../data/achievements').ACHIEVEMENTS[number][]} Newly unlocked achievements
 */
export function checkAchievements(
  sessionScore,
  subject,
  totalQuestions = EXAM_QUESTION_COUNT,
) {
  const correctCount = Math.round(sessionScore / POINTS_PER_CORRECT);
  const completedTestsCount = incrementCompletedTestsCount();
  const alreadyUnlocked = new Set(getUnlockedAchievementIds());
  const context = {
    correctCount,
    totalQuestions,
    subjectId: subject,
    completedTestsCount,
  };

  const newlyUnlocked = [];

  ACHIEVEMENTS.forEach((achievement) => {
    if (alreadyUnlocked.has(achievement.id)) {
      return;
    }

    if (isConditionMet(achievement, context)) {
      newlyUnlocked.push(achievement);
    }
  });

  if (newlyUnlocked.length > 0) {
    unlockAchievementIds(newlyUnlocked.map((achievement) => achievement.id));
  }

  return newlyUnlocked;
}

export function getAchievementProgress() {
  const unlocked = getUnlockedAchievementIds();
  return {
    unlockedCount: unlocked.length,
    totalCount: ACHIEVEMENTS.length,
  };
}
