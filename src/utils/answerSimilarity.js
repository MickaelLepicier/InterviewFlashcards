export const SIMILARITY_THRESHOLD = 65;

export function normalizeAnswer(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()`[\]{}״׳־–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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

export function calculateSimilarityPercent(userAnswer, officialAnswer) {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedOfficial = normalizeAnswer(officialAnswer);

  if (!normalizedUser && !normalizedOfficial) return 100;
  if (!normalizedUser || !normalizedOfficial) return 0;

  const distance = levenshteinDistance(normalizedUser, normalizedOfficial);
  const maxLength = Math.max(normalizedUser.length, normalizedOfficial.length);

  return Math.round((1 - distance / maxLength) * 100);
}

export function isAnswerCorrect(similarityPercent) {
  return similarityPercent >= SIMILARITY_THRESHOLD;
}
