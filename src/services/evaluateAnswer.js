import { matchCorePhrases } from '../utils/phraseMatch';
import { getCorePhrases } from '../data/corePhrases';

export function evaluateAnswer({ cardId, studentAnswer, lang }) {
  const corePhrases = getCorePhrases(cardId, lang);
  const result = matchCorePhrases(studentAnswer, corePhrases);

  const explanation = buildExplanation({
    lang,
    isCorrect: result.isCorrect,
    foundCount: result.foundCount,
    totalPhrases: result.totalPhrases,
    averageMatchRate: result.averageMatchRate,
    phraseResults: result.phraseResults,
  });

  return {
    isCorrect: result.isCorrect,
    explanation,
    foundCount: result.foundCount,
    totalPhrases: result.totalPhrases,
    averageMatchRate: result.averageMatchRate,
  };
}

function buildExplanation({
  lang,
  isCorrect,
  foundCount,
  totalPhrases,
  averageMatchRate,
  phraseResults,
}) {
  if (isCorrect) {
    return lang === 'he'
      ? `כל הכבוד! זיהית את כל ${totalPhrases} הנקודות המרכזיות בתשובה שלך.`
      : `Great job! You covered all ${totalPhrases} core points in your answer.`;
  }

  const missingPhrases = phraseResults.filter((item) => !item.found);

  if (lang === 'he') {
    const missingHint =
      missingPhrases.length > 0
        ? ` חסרו ${missingPhrases.length} מתוך ${totalPhrases} נקודות מרכזיות.`
        : '';
    return `לא נורא, נסה לכלול את כל הרעיונות המרכזיים.${missingHint} (התאמה ממוצעת: ${averageMatchRate}%)`;
  }

  const missingHint =
    missingPhrases.length > 0
      ? ` ${missingPhrases.length} of ${totalPhrases} core points were missing.`
      : '';
  return `Not quite — try to include every core idea.${missingHint} (Average match: ${averageMatchRate}%)`;
}
