import { normalizeAnswer } from './answerSimilarity';

export const PHRASE_MATCH_THRESHOLD = 72;

function levenshteinDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

function similarityPercent(a, b) {
  if (!a && !b) return 100;
  if (!a || !b) return 0;

  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return Math.round((1 - distance / maxLength) * 100);
}

export function bestPhraseMatchRate(normalizedUserAnswer, normalizedPhrase) {
  if (!normalizedPhrase) return 100;
  if (!normalizedUserAnswer) return 0;

  if (normalizedUserAnswer.includes(normalizedPhrase)) {
    return 100;
  }

  const phraseLength = normalizedPhrase.length;
  const minWindow = Math.max(1, Math.floor(phraseLength * 0.65));
  const maxWindow = Math.ceil(phraseLength * 1.35);
  let bestRate = 0;

  for (let windowSize = minWindow; windowSize <= maxWindow; windowSize += 1) {
    if (windowSize > normalizedUserAnswer.length) break;

    for (let start = 0; start <= normalizedUserAnswer.length - windowSize; start += 1) {
      const window = normalizedUserAnswer.slice(start, start + windowSize);
      const rate = similarityPercent(window, normalizedPhrase);
      bestRate = Math.max(bestRate, rate);

      if (bestRate === 100) {
        return 100;
      }
    }
  }

  return bestRate;
}

export function matchCorePhrases(studentAnswer, corePhrases) {
  const normalizedUserAnswer = normalizeAnswer(studentAnswer);

  const phraseResults = corePhrases.map((phrase) => {
    const normalizedPhrase = normalizeAnswer(phrase);
    const matchRate = bestPhraseMatchRate(normalizedUserAnswer, normalizedPhrase);

    return {
      phrase,
      matchRate,
      found: matchRate >= PHRASE_MATCH_THRESHOLD,
    };
  });

  const foundCount = phraseResults.filter((result) => result.found).length;
  const averageMatchRate =
    phraseResults.length === 0
      ? 0
      : Math.round(
          phraseResults.reduce((sum, result) => sum + result.matchRate, 0) /
            phraseResults.length,
        );

  return {
    phraseResults,
    foundCount,
    totalPhrases: phraseResults.length,
    averageMatchRate,
    isCorrect:
      phraseResults.length > 0 && phraseResults.every((result) => result.found),
  };
}
