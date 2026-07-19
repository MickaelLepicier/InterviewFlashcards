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
 * Open-answer check via Keyword & Semantic Concept Counter.
 * Phrase pairs may soft-boost only when the answer is conceptually complete.
 */
export function evaluateAnswer({
  subjectId,
  cardId,
  studentAnswer,
  correctAnswerEn = '',
  correctAnswerHe = '',
}) {
  const officialAnswers = [correctAnswerEn, correctAnswerHe].filter(Boolean);
  const concept = scoreAgainstAnswers(studentAnswer, officialAnswers);

  let phraseScore = 0;
  let foundCount = 0;
  let totalPhrases = 0;

  try {
    const phrasePairs = getPhrasePairs(subjectId, cardId);
    totalPhrases = phrasePairs.length;

    if (totalPhrases > 0) {
      const phraseResult = matchBilingualPhrasePairs(studentAnswer, phrasePairs);
      foundCount = phraseResult.foundCount;
      phraseScore = Math.round((foundCount / totalPhrases) * 100);
    }
  } catch {
    // Missing phrase data should not fail the answer.
  }

  // Incomplete conceptual answers stay capped — phrase fragments must not inflate them.
  let averageMatchRate = concept.score;
  if (!concept.incomplete && phraseScore > averageMatchRate) {
    // Soft boost only when at least 2 pillars were hit.
    averageMatchRate = Math.round(averageMatchRate * 0.7 + phraseScore * 0.3);
  }

  const isCorrect = isAnswerCorrect(averageMatchRate);
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
      conceptScore: concept.score,
      keywordCoverage: concept.keyword,
      pillarHits: concept.pillarHits,
      pillarTotal: concept.pillarTotal,
      incomplete: concept.incomplete,
      phraseScore,
      passThreshold: PASS_THRESHOLD,
    },
  };
}
