import { getPhrasePairs } from '../data/corePhrases';
import {
  PARTIAL_THRESHOLD,
  PASS_THRESHOLD,
  STRONG_THRESHOLD,
  isAnswerCorrect,
  isAnswerPartial,
  scoreAgainstAnswers,
} from '../utils/answerSimilarity';
import { matchBilingualPhrasePairs } from '../utils/phraseMatch';

/**
 * Forgiving open-answer check:
 * 1) Normalize + keyword/similarity score vs official EN/HE answers
 * 2) Optional soft boost from core phrase pairs (majority, not all-or-nothing)
 */
export function evaluateAnswer({
  subjectId,
  cardId,
  studentAnswer,
  correctAnswerEn = '',
  correctAnswerHe = '',
}) {
  const officialAnswers = [correctAnswerEn, correctAnswerHe].filter(Boolean);
  const similarity = scoreAgainstAnswers(studentAnswer, officialAnswers);

  let phraseScore = 0;
  let foundCount = 0;
  let totalPhrases = 0;

  try {
    const phrasePairs = getPhrasePairs(subjectId, cardId);
    totalPhrases = phrasePairs.length;

    if (totalPhrases > 0) {
      const phraseResult = matchBilingualPhrasePairs(studentAnswer, phrasePairs);
      foundCount = phraseResult.foundCount;
      // Majority of phrases is enough — no longer require every phrase.
      phraseScore = Math.round((foundCount / totalPhrases) * 100);
    }
  } catch {
    // Missing phrase data should not fail the answer.
  }

  const averageMatchRate = Math.max(similarity.score, phraseScore);
  const passedBySimilarity = isAnswerCorrect(averageMatchRate);
  const passedByPhrases = totalPhrases > 0 && phraseScore >= 50;
  const isCorrect = passedBySimilarity || passedByPhrases;
  // Fun mode: mid scores still count as correct for scoring, but labeled partial.
  const isPartial =
    isCorrect &&
    (isAnswerPartial(averageMatchRate) ||
      (averageMatchRate >= PARTIAL_THRESHOLD && averageMatchRate < STRONG_THRESHOLD));

  return {
    isCorrect,
    isPartial: Boolean(isPartial && averageMatchRate < STRONG_THRESHOLD),
    foundCount,
    totalPhrases,
    averageMatchRate,
    detail: {
      similarityScore: similarity.score,
      keywordCoverage: similarity.keyword,
      phraseScore,
      passThreshold: PASS_THRESHOLD,
    },
  };
}
