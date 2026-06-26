import { getPhrasePairs } from '../data/corePhrases';
import { matchBilingualPhrasePairs } from '../utils/phraseMatch';

export function evaluateAnswer({ subjectId, cardId, studentAnswer }) {
  const phrasePairs = getPhrasePairs(subjectId, cardId);
  const result = matchBilingualPhrasePairs(studentAnswer, phrasePairs);

  return {
    isCorrect: result.isCorrect,
    foundCount: result.foundCount,
    totalPhrases: result.totalPhrases,
    averageMatchRate: result.averageMatchRate,
  };
}
