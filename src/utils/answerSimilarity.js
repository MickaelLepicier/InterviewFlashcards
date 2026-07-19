/**
 * Keyword & Semantic Concept Counter
 * Rewards concept coverage / synonyms; penalizes incomplete cut-off answers.
 * Does NOT rely on raw full-string Levenshtein distance for pass/fail.
 */

export const PASS_THRESHOLD = 55;
export const PARTIAL_THRESHOLD = 45;
export const STRONG_THRESHOLD = 70;
/** Cap when fewer than 2 of 3 conceptual pillars are present. */
export const INCOMPLETE_SCORE_CAP = 40;

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
  'allow', 'allows', 'allowed', 'let', 'lets', 'get', 'gets', 'set',
  'sets', 'still', 'must', 'required', 'simply', 'tells', 'tell',
  'puts', 'put', 'keeps', 'keep', 'know', 'knows', 'need', 'needs',
  'needed', 'without', 'while', 'during', 'before', 'after', 'because',
  'through', 'across', 'under', 'above', 'being', 'been', 'having',
  'ה', 'ב', 'ל', 'מ', 'ו', 'כ', 'ש', 'את', 'של', 'על', 'עם', 'או',
  'גם', 'לא', 'כי', 'אם', 'יש', 'אין', 'כל', 'זה', 'זו', 'הוא', 'היא',
  'הם', 'הן', 'אך', 'כך', 'עוד', 'רק', 'בין', 'אשר', 'כדי', 'יותר',
  'פחות', 'ניתן', 'אפשר', 'צריך', 'כאשר', 'עבור', 'בלי', 'בלעדיהן',
  'בלעדיו', 'מה', 'מי', 'איזה', 'איזו', 'דרך', 'כמו', 'שימוש',
  'משתמשים', 'מאפשר', 'מאפשרת', 'מאפשרים', 'אומר', 'אומרת', 'פשוט',
  'עדיין', 'נדרש', 'חייב', 'חיבת', 'להיות', 'השורה',
]);

const HEBREW_PREFIXES = ['ה', 'ב', 'ל', 'מ', 'ו', 'כ', 'ש'];

/** Synonym / related-term groups (any member can satisfy a concept). */
const SYNONYM_GROUPS = [
  ['doctype', 'documenttype', 'document', 'סוגמסמך', 'מסמך'],
  ['html5', 'html', 'htm'],
  ['browser', 'browsers', 'דפדפן', 'דפדפנים'],
  ['standards', 'standard', 'סטנדרט', 'סטנדרטים'],
  ['quirks', 'quirk', 'קוורקס'],
  ['mode', 'modes', 'מצב', 'מצבים'],
  ['rendering', 'render', 'רינדור', 'רינדורים'],
  ['first', 'ראשונה', 'ראשון', 'בראש'],
  ['line', 'שורה'],
  ['parsing', 'parse', 'parser'],
  ['declaration', 'declare', 'הצהרה'],
  ['syntax', 'תחביר'],
  ['undefined', 'לאמוגדר'],
  ['null', 'נאל'],
  ['hoisting', 'העמסה', 'הרמה'],
  ['closure', 'closures', 'סגירה', 'סגור'],
  ['prototype', 'prototypes'],
  ['spread', 'מפרק', 'מפזר', 'unpack', 'unpacks'],
  ['rest', 'אוסף'],
  ['promise', 'promises'],
  ['callback', 'callbacks'],
  ['async', 'asynchronous', 'אסינכרוני'],
  ['sync', 'synchronous', 'סינכרוני'],
  ['mutable', 'immutable'],
  ['virtual', 'vdom'],
  ['jsx'],
  ['hook', 'hooks'],
  ['context'],
  ['memo', 'usememo', 'usecallback'],
  ['ref', 'refs', 'useref'],
  ['hydration', 'hydrate'],
  ['ssr', 'serverside'],
  ['restapi', 'restful'],
  ['graphql'],
  ['docker', 'container', 'containers'],
  ['flexbox', 'flex'],
  ['grid'],
  ['padding', 'margin'],
  ['canvas', 'svg'],
  ['localstorage', 'sessionstorage', 'cookies', 'cookie'],
  ['entity', 'entities', 'escape'],
  ['worker', 'workers'],
  ['storage'],
];

const MULTI_WORD_PHRASES = [
  'standards mode',
  'quirks mode',
  'doctype html',
  'document type',
  'first line',
  'server side',
  'virtual dom',
  'event loop',
  'higher order',
  'one way',
  'two way',
  'סוג מסמך',
  'מצב סטנדרטי',
  'שורה ראשונה',
];

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

export function stripHebrewPrefix(token) {
  if (!isHebrewToken(token) || token.length < 4) return token;
  for (const prefix of HEBREW_PREFIXES) {
    if (token.startsWith(prefix) && token.length - prefix.length >= 3) {
      return token.slice(prefix.length);
    }
  }
  return token;
}

function compactToken(token) {
  return stripHebrewPrefix(token).replace(/[^a-z0-9\u0590-\u05ff]/gi, '');
}

function tokenize(normalized) {
  return normalized
    .split(' ')
    .map((token) => stripHebrewPrefix(token))
    .filter(Boolean);
}

function isContentWord(token) {
  const compact = compactToken(token);
  if (!compact || STOP_WORDS.has(token) || STOP_WORDS.has(compact)) return false;
  if (compact.length <= 1) return false;
  if (compact.length <= 2 && !/^[a-z0-9]+$/i.test(compact)) return false;
  // Keep short technical tokens (js, api, dom, html, ssr…)
  if (compact.length <= 3) {
    return /^[a-z0-9_$]+$/i.test(compact);
  }
  return true;
}

function synonymKey(token) {
  const compact = compactToken(token);
  if (!compact) return '';

  for (const group of SYNONYM_GROUPS) {
    if (group.some((alias) => compactToken(alias) === compact || compact.includes(compactToken(alias)))) {
      return group[0];
    }
  }
  return compact;
}

function expandWithSynonyms(token) {
  const compact = compactToken(token);
  const keys = new Set([compact, synonymKey(token)].filter(Boolean));

  for (const group of SYNONYM_GROUPS) {
    if (group.some((alias) => keys.has(compactToken(alias)))) {
      group.forEach((alias) => keys.add(compactToken(alias)));
    }
  }
  return keys;
}

/** Unique meaningful content words from text. */
export function extractKeywords(text) {
  const tokens = tokenize(normalizeAnswer(text));
  const keywords = [];
  const seen = new Set();

  for (const token of tokens) {
    if (!isContentWord(token)) continue;
    const key = synonymKey(token);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    keywords.push(token);
  }

  return keywords;
}

function extractMultiWordHits(normalizedText) {
  const hits = [];
  for (const phrase of MULTI_WORD_PHRASES) {
    if (normalizedText.includes(phrase)) {
      hits.push(phrase);
    }
  }
  return hits;
}

/**
 * Build up to 3 conceptual pillars from the official answer.
 * Prefer real sentence boundaries (before stripping periods); else keyword thirds.
 * Terms are de-duplicated across pillars so each pillar stays distinct.
 */
export function buildConceptPillars(officialAnswer) {
  const raw = String(officialAnswer ?? '').trim();
  if (!raw) return [];

  const sentenceChunks = raw
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((part) => part.trim())
    .filter((part) => extractKeywords(part).length >= 2);

  let chunks = [];
  if (sentenceChunks.length >= 3) {
    chunks = [
      sentenceChunks[0],
      sentenceChunks[Math.floor((sentenceChunks.length - 1) / 2)],
      sentenceChunks[sentenceChunks.length - 1],
    ];
  } else if (sentenceChunks.length === 2) {
    const midKeywords = extractKeywords(sentenceChunks[0] + ' ' + sentenceChunks[1]);
    const mid = midKeywords.slice(Math.floor(midKeywords.length / 3), Math.ceil((midKeywords.length * 2) / 3)).join(' ');
    chunks = [sentenceChunks[0], mid || sentenceChunks[1], sentenceChunks[1]];
  } else {
    const keywords = extractKeywords(officialAnswer);
    if (keywords.length === 0) return [];
    const size = Math.max(1, Math.ceil(keywords.length / 3));
    chunks = [0, 1, 2]
      .map((index) => keywords.slice(index * size, index * size + size).join(' '))
      .filter((chunk) => chunk.trim().length > 0);
  }

  while (chunks.length < 3 && chunks.length > 0) {
    chunks.push(chunks[chunks.length - 1]);
  }
  chunks = chunks.slice(0, 3);

  const usedTerms = new Set();
  const usedPhrases = new Set();

  return chunks
    .map((chunk, index) => {
      const keywords = extractKeywords(chunk);
      const phrases = extractMultiWordHits(normalizeAnswer(chunk));

      // Prefer phrases/terms unique to this pillar.
      const uniquePhrases = phrases.filter((phrase) => !usedPhrases.has(phrase));
      uniquePhrases.forEach((phrase) => usedPhrases.add(phrase));

      const uniqueTerms = [];
      for (const keyword of keywords) {
        const key = synonymKey(keyword);
        if (!key || usedTerms.has(key)) continue;
        usedTerms.add(key);
        uniqueTerms.push(key);
      }

      // Keep at least one signal even if overlap was heavy.
      if (uniqueTerms.length === 0 && uniquePhrases.length === 0) {
        for (const keyword of keywords) {
          const key = synonymKey(keyword);
          if (key) {
            uniqueTerms.push(key);
            break;
          }
        }
      }

      return {
        id: index,
        label: normalizeAnswer(chunk).slice(0, 48),
        terms: uniqueTerms,
        phrases: uniquePhrases,
      };
    })
    .filter((pillar) => pillar.terms.length > 0 || pillar.phrases.length > 0);
}

function userContainsTerm(normalizedUser, userTokens, term) {
  if (!term) return false;
  if (normalizedUser.includes(term)) return true;

  const termKeys = expandWithSynonyms(term);
  return userTokens.some((token) => {
    const tokenKeys = expandWithSynonyms(token);
    for (const key of termKeys) {
      if (tokenKeys.has(key)) return true;
      // Soft stem: standards/standard, browsers/browser
      if (key.length >= 4 && [...tokenKeys].some((tk) => tk.startsWith(key) || key.startsWith(tk))) {
        return true;
      }
    }
    return false;
  });
}

export function pillarIsMatched(userAnswer, pillar) {
  const normalizedUser = normalizeAnswer(userAnswer);
  const userTokens = tokenize(normalizedUser);

  // Multi-word phrase hit is enough for the pillar.
  for (const phrase of pillar.phrases) {
    if (normalizedUser.includes(phrase)) return true;
  }

  if (pillar.terms.length === 0) return false;

  let hits = 0;
  for (const term of pillar.terms) {
    if (userContainsTerm(normalizedUser, userTokens, term)) {
      hits += 1;
    }
  }

  // Need at least one strong term, or ~40% of pillar terms for denser pillars.
  const required = pillar.terms.length <= 2 ? 1 : Math.max(1, Math.ceil(pillar.terms.length * 0.34));
  return hits >= required;
}

/** Count how many official concept terms appear (with synonyms) in the user answer. */
export function countMatchedConcepts(userAnswer, officialAnswer) {
  const pillars = buildConceptPillars(officialAnswer);
  const matchedPillars = pillars.filter((pillar) => pillarIsMatched(userAnswer, pillar));

  const officialKeywords = extractKeywords(officialAnswer);
  const normalizedUser = normalizeAnswer(userAnswer);
  const userTokens = tokenize(normalizedUser);

  let matchedKeywords = 0;
  for (const keyword of officialKeywords) {
    if (userContainsTerm(normalizedUser, userTokens, keyword)) {
      matchedKeywords += 1;
    }
  }

  const phraseHits = extractMultiWordHits(normalizedUser).filter((phrase) =>
    normalizeAnswer(officialAnswer).includes(phrase)
      || MULTI_WORD_PHRASES.includes(phrase),
  );

  return {
    pillars,
    matchedPillars,
    pillarHitCount: matchedPillars.length,
    pillarTotal: Math.max(pillars.length, 1),
    matchedKeywords,
    totalKeywords: Math.max(officialKeywords.length, 1),
    phraseHits,
  };
}

/**
 * Score based on conceptual pillars + keyword hits.
 * Incomplete answers (≤1 of 3 pillars) are capped at INCOMPLETE_SCORE_CAP.
 */
export function scoreAnswer(userAnswer, officialAnswer) {
  if (!normalizeAnswer(userAnswer)) {
    return {
      score: 0,
      keyword: 0,
      precision: 0,
      jaccard: 0,
      similarity: 0,
      pillarHits: 0,
      pillarTotal: 0,
      incomplete: true,
    };
  }

  const concepts = countMatchedConcepts(userAnswer, officialAnswer);
  const { pillarHitCount, pillarTotal, matchedKeywords, totalKeywords, phraseHits } =
    concepts;

  const keywordCoverage = Math.round((matchedKeywords / totalKeywords) * 100);
  const pillarCoverage = Math.round((pillarHitCount / pillarTotal) * 100);

  // User-keyword precision: are the user's content words on-topic?
  const userKeywords = extractKeywords(userAnswer);
  let onTopic = 0;
  const officialKeys = new Set(extractKeywords(officialAnswer).map(synonymKey));
  for (const keyword of userKeywords) {
    const keys = expandWithSynonyms(keyword);
    if ([...keys].some((key) => officialKeys.has(key) || [...officialKeys].some((ok) => ok.startsWith(key) || key.startsWith(ok)))) {
      onTopic += 1;
    }
  }
  const precision =
    userKeywords.length === 0 ? 0 : Math.round((onTopic / userKeywords.length) * 100);

  // Phrase bonus for explicit technical multi-word concepts.
  const phraseBonus = Math.min(20, phraseHits.length * 10);

  // Base score from pillars (main signal) + keyword coverage (secondary).
  let score = Math.round(pillarCoverage * 0.7 + keywordCoverage * 0.2 + precision * 0.1);
  score = Math.min(100, score + phraseBonus);

  // Strong paraphrase: hit most pillars → push into 90–100 band.
  if (pillarHitCount >= 3) {
    score = Math.max(score, 90 + Math.min(10, Math.floor(keywordCoverage / 20)));
  } else if (pillarHitCount === 2) {
    score = Math.max(score, 72 + Math.min(15, Math.floor(keywordCoverage / 15)));
  }

  // Completeness gate: missing 2 of 3 pillars ⇒ fail, even if wording matched.
  const incomplete = pillarTotal >= 3 && pillarHitCount <= 1;
  if (incomplete) {
    score = Math.min(score, INCOMPLETE_SCORE_CAP);
  }

  // Very short cutoffs with almost no content words.
  if (userKeywords.length > 0 && userKeywords.length <= 2 && pillarHitCount <= 1) {
    score = Math.min(score, INCOMPLETE_SCORE_CAP);
  }

  return {
    score,
    keyword: keywordCoverage,
    precision,
    jaccard: pillarCoverage,
    similarity: 0, // kept for API compatibility; no longer Levenshtein-driven
    pillarHits: pillarHitCount,
    pillarTotal,
    incomplete,
    phraseHits: phraseHits.length,
  };
}

export function scoreAgainstAnswers(userAnswer, officialAnswers) {
  let best = {
    score: 0,
    keyword: 0,
    precision: 0,
    jaccard: 0,
    similarity: 0,
    pillarHits: 0,
    pillarTotal: 0,
    incomplete: true,
    phraseHits: 0,
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

/** @deprecated Prefer scoreAnswer — kept for older imports */
export function calculateSimilarityPercent(userAnswer, officialAnswer) {
  return scoreAnswer(userAnswer, officialAnswer).score;
}

export function keywordCoveragePercent(userAnswer, officialAnswer) {
  return scoreAnswer(userAnswer, officialAnswer).keyword;
}

export function userKeywordPrecisionPercent(userAnswer, officialAnswer) {
  return scoreAnswer(userAnswer, officialAnswer).precision;
}

export function keywordJaccardPercent(userAnswer, officialAnswer) {
  return scoreAnswer(userAnswer, officialAnswer).jaccard;
}
