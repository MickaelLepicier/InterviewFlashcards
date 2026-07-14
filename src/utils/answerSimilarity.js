export const PASS_THRESHOLD = 55;
export const PARTIAL_THRESHOLD = 45;
export const STRONG_THRESHOLD = 70;

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'of', 'in', 'to', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'that', 'this', 'it', 'be',
  'has', 'have', 'had', 'will', 'can', 'or', 'and', 'but', 'not', 'use',
  'used', 'using', 'where', 'when', 'which', 'who', 'how', 'what', 'why',
  'if', 'do', 'does', 'did', 'into', 'over', 'also', 'than', 'then',
  'them', 'their', 'there', 'these', 'those', 'such', 'only', 'just',
  'about', 'you', 'your', 'we', 'our', 'they', 'its', 'more', 'most',
  'via', 'like', 'may', 'should', 'would', 'could', 'between', 'both',
  'each', 'other', 'same', 'very', 'much', 'many', 'some', 'any', 'all',
  'one', 'two', 'so', 'no', 'yes', 'new', 'make', 'makes', 'made',
  'allow', 'allows', 'let', 'lets', 'get', 'gets', 'set', 'sets',
  'כל', 'הוא', 'היא', 'הם', 'הן', 'של', 'על', 'את', 'זה', 'זו', 'אך',
  'או', 'גם', 'לא', 'כי', 'אם', 'עם', 'יש', 'אין', 'כדי', 'בין', 'אשר',
  'כך', 'עוד', 'רק', 'יותר', 'פחות', 'ניתן', 'אפשר', 'צריך', 'כאשר',
  'מאפשר', 'מאפשרת', 'מאפשרים', 'משתמשים', 'שימוש', 'דרך', 'כמו',
  'הוא', 'היא',
]);

const HEBREW_PREFIXES = ['ה', 'ב', 'ל', 'מ', 'ו', 'כ', 'ש'];

/** Strip punctuation, lowercase, collapse whitespace. */
export function normalizeAnswer(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[.,!?;:'"`~()[\]{}<>\\/|@#$%^&*=+_״׳־–—…·]/g, ' ')
    .replace(/[\u200e\u200f\u202a-\u202e]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isHebrewToken(token) {
  return /[\u0590-\u05FF]/.test(token);
}

/** Soft-strip common Hebrew grammar prefixes before technical keywords. */
export function stripHebrewPrefix(token) {
  if (!isHebrewToken(token) || token.length < 4) return token;

  for (const prefix of HEBREW_PREFIXES) {
    if (token.startsWith(prefix) && token.length - prefix.length >= 3) {
      return token.slice(prefix.length);
    }
  }
  return token;
}

function tokenize(normalized) {
  return normalized
    .split(' ')
    .map((token) => stripHebrewPrefix(token))
    .filter(Boolean);
}

function isKeyword(token) {
  if (STOP_WORDS.has(token)) return false;
  if (token.length <= 2) return false;
  // Keep short technical tokens (JS APIs etc.)
  if (/^[a-z0-9_$]+$/i.test(token) && token.length >= 2) {
    if (token.length <= 3 && !/[0-9_$]/.test(token) && !STOP_WORDS.has(token)) {
      // allow js-ish short words like map, var, dom, api, spa, ssr
      return true;
    }
  }
  return token.length >= 4 || isHebrewToken(token);
}

export function extractKeywords(text) {
  const tokens = tokenize(normalizeAnswer(text));
  const keywords = [];
  const seen = new Set();

  for (const token of tokens) {
    if (!isKeyword(token) || seen.has(token)) continue;
    seen.add(token);
    keywords.push(token);
  }

  return keywords;
}

function levenshteinDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  // Prefer the shorter string as columns for memory
  if (a.length > b.length) [a, b] = [b, a];

  let previous = Array.from({ length: a.length + 1 }, (_, i) => i);

  for (let j = 1; j <= b.length; j += 1) {
    const current = [j];
    for (let i = 1; i <= a.length; i += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[i] = Math.min(
        previous[i] + 1,
        current[i - 1] + 1,
        previous[i - 1] + cost,
      );
    }
    previous = current;
  }

  return previous[a.length];
}

function tokenSimilarity(a, b) {
  if (a === b) return 1;
  if (!a || !b) return 0;

  const maxLen = Math.max(a.length, b.length);
  if (maxLen <= 2) return a === b ? 1 : 0;

  const distance = levenshteinDistance(a, b);
  const ratio = 1 - distance / maxLen;

  // Prefix / contains soft match for stemmed-ish words
  if (a.length >= 4 && b.length >= 4) {
    if (a.startsWith(b) || b.startsWith(a)) {
      return Math.max(ratio, 0.85);
    }
  }

  return ratio;
}

function tokensMatch(userToken, keyword) {
  return tokenSimilarity(userToken, keyword) >= 0.78;
}

/** % of official keywords found (fuzzily) in the user answer. */
export function keywordCoveragePercent(userAnswer, officialAnswer) {
  const userTokens = tokenize(normalizeAnswer(userAnswer));
  const userKeywords = extractKeywords(userAnswer);
  const keywords = extractKeywords(officialAnswer);

  const pool =
    keywords.length > 0
      ? keywords
      : tokenize(normalizeAnswer(officialAnswer)).filter(
          (token) => token.length >= 3 && !STOP_WORDS.has(token),
        );

  if (pool.length === 0) return 0;

  // Fewer target keywords when the user writes a short paraphrase.
  const targetCount = Math.min(
    pool.length,
    Math.max(4, Math.min(8, userKeywords.length + 2 || 5)),
  );
  const ranked = [...pool].sort((a, b) => b.length - a.length).slice(0, targetCount);

  return keywordCoverageFromLists(userTokens, ranked);
}

/**
 * What fraction of the user's own keywords appear in the official answer.
 * Critical for short, on-topic paraphrases.
 */
export function userKeywordPrecisionPercent(userAnswer, officialAnswer) {
  const userKeywords = extractKeywords(userAnswer);
  const officialTokens = tokenize(normalizeAnswer(officialAnswer));
  const officialKeywords = extractKeywords(officialAnswer);

  if (userKeywords.length === 0) return 0;

  let matched = 0;
  for (const keyword of userKeywords) {
    const inOfficial =
      officialKeywords.some((token) => tokensMatch(token, keyword)) ||
      officialTokens.some((token) => tokensMatch(token, keyword));
    if (inOfficial) matched += 1;
  }

  return Math.round((matched / userKeywords.length) * 100);
}

function keywordCoverageFromLists(userTokens, keywords) {
  if (keywords.length === 0) return 0;

  let matched = 0;
  for (const keyword of keywords) {
    if (userTokens.some((token) => tokensMatch(token, keyword))) {
      matched += 1;
    }
  }

  return Math.round((matched / keywords.length) * 100);
}

/** Jaccard on keyword sets (user ∩ official) / (user ∪ official). */
export function keywordJaccardPercent(userAnswer, officialAnswer) {
  const userSet = new Set(extractKeywords(userAnswer));
  const officialSet = new Set(extractKeywords(officialAnswer));

  if (userSet.size === 0 && officialSet.size === 0) return 100;
  if (userSet.size === 0 || officialSet.size === 0) return 0;

  let intersection = 0;
  for (const token of userSet) {
    for (const official of officialSet) {
      if (tokensMatch(token, official)) {
        intersection += 1;
        break;
      }
    }
  }

  const union = userSet.size + officialSet.size - intersection;
  return union === 0 ? 0 : Math.round((intersection / union) * 100);
}

/**
 * Character-level similarity against the official text, but also against a
 * keyword "essence" so short paraphrases aren't crushed by paragraph length.
 */
export function calculateSimilarityPercent(userAnswer, officialAnswer) {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedOfficial = normalizeAnswer(officialAnswer);

  if (!normalizedUser && !normalizedOfficial) return 100;
  if (!normalizedUser || !normalizedOfficial) return 0;

  const fullDistance = levenshteinDistance(normalizedUser, normalizedOfficial);
  const fullMax = Math.max(normalizedUser.length, normalizedOfficial.length);
  const fullScore = Math.round((1 - fullDistance / fullMax) * 100);

  const essence = extractKeywords(officialAnswer).slice(0, 12).join(' ');
  let essenceScore = 0;
  if (essence) {
    const essenceDistance = levenshteinDistance(normalizedUser, essence);
    const essenceMax = Math.max(normalizedUser.length, essence.length);
    essenceScore = Math.round((1 - essenceDistance / essenceMax) * 100);
  }

  // Windowed match: score user against the closest chunk of the official answer
  const userLen = normalizedUser.length;
  let windowScore = 0;
  if (userLen >= 12 && normalizedOfficial.length > userLen) {
    const step = Math.max(8, Math.floor(userLen / 4));
    for (let i = 0; i <= normalizedOfficial.length - userLen; i += step) {
      const window = normalizedOfficial.slice(i, i + userLen + Math.floor(userLen * 0.2));
      const distance = levenshteinDistance(normalizedUser, window);
      const maxLen = Math.max(normalizedUser.length, window.length);
      const score = Math.round((1 - distance / maxLen) * 100);
      if (score > windowScore) windowScore = score;
    }
  }

  return Math.max(fullScore, essenceScore, windowScore);
}

/** Combined score used for pass/fail. */
export function scoreAnswer(userAnswer, officialAnswer) {
  if (!normalizeAnswer(userAnswer)) {
    return { score: 0, keyword: 0, jaccard: 0, similarity: 0, precision: 0 };
  }

  const keyword = keywordCoveragePercent(userAnswer, officialAnswer);
  const precision = userKeywordPrecisionPercent(userAnswer, officialAnswer);
  const jaccard = keywordJaccardPercent(userAnswer, officialAnswer);
  const similarity = calculateSimilarityPercent(userAnswer, officialAnswer);
  const userKeywordCount = extractKeywords(userAnswer).length;

  // Short on-topic paraphrases: trust precision highly.
  const shortAnswerBoost =
    userKeywordCount > 0 && userKeywordCount <= 10
      ? Math.round(precision * 0.75 + keyword * 0.25)
      : 0;

  const blended = Math.round(
    keyword * 0.35 + precision * 0.35 + jaccard * 0.15 + similarity * 0.15,
  );

  // Three keyword hits at high precision is enough for a pass signal.
  const strongConceptHit =
    userKeywordCount >= 3 && precision >= 70 && keyword >= 35
      ? Math.max(PASS_THRESHOLD, Math.round((precision + keyword) / 2))
      : 0;

  const score = Math.max(blended, shortAnswerBoost, strongConceptHit, similarity);

  return {
    score,
    keyword,
    jaccard,
    similarity,
    precision,
  };
}

export function scoreAgainstAnswers(userAnswer, officialAnswers) {
  let best = {
    score: 0,
    keyword: 0,
    jaccard: 0,
    similarity: 0,
    precision: 0,
  };

  for (const official of officialAnswers) {
    if (!official) continue;
    const result = scoreAnswer(userAnswer, official);
    if (result.score > best.score) best = result;
  }

  return best;
}

export function isAnswerCorrect(score) {
  return score >= PASS_THRESHOLD;
}

export function isAnswerPartial(score) {
  return score >= PARTIAL_THRESHOLD && score < STRONG_THRESHOLD;
}
