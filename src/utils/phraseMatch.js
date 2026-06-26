import { normalizeAnswer } from './answerSimilarity';
import {
  getConceptConflictAnchors,
  getPrimaryAnchorSet,
  tokenMatchesPrimaryAnchor,
} from './conceptAnchors';

export const PHRASE_MATCH_THRESHOLD = 75;

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'of', 'in', 'to', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'that', 'this', 'it', 'be',
  'has', 'have', 'been', 'will', 'can', 'or', 'and', 'but', 'not', 'use',
  'used', 'where', 'when', 'which', 'who', 'how', 'what', 'why', 'if',
  'do', 'does', 'did', 'into', 'over', 'also', 'than', 'then', 'them',
  'their', 'there', 'these', 'those', 'such', 'only', 'just', 'about',
  'כל', 'הוא', 'היא', 'הם', 'של', 'על', 'את', 'זה', 'זו', 'אך', 'או',
  'גם', 'לא', 'כי', 'אם', 'עם', 'יש', 'אין', 'כדי', 'היא', 'הוא',
  'זו', 'או', 'גם', 'עם', 'את', 'של', 'על', 'כל', 'זה',
]);

function tokenize(text) {
  return text.split(' ').filter(Boolean);
}

function extractAnchors(normalizedPhrase) {
  const anchors = [];
  for (const token of tokenize(normalizedPhrase)) {
    if (token.length < 2 || STOP_WORDS.has(token)) continue;
    anchors.push(token);
    if (anchors.length >= 4) break;
  }
  return anchors;
}

function buildWordNgrams(tokens, n) {
  if (tokens.length < n) {
    return tokens.length ? [tokens.join(' ')] : [];
  }

  const ngrams = [];
  for (let i = 0; i <= tokens.length - n; i += 1) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

function selectNgrams(phraseTokens) {
  const trigrams = buildWordNgrams(phraseTokens, 3);
  if (trigrams.length >= 2) return trigrams;

  const bigrams = buildWordNgrams(phraseTokens, 2);
  if (bigrams.length >= 1) return bigrams;

  return phraseTokens.length ? [phraseTokens.join(' ')] : [];
}

function anchorsInOrder(windowTokens, anchors) {
  if (anchors.length === 0) return true;

  let searchFrom = 0;
  for (const anchor of anchors) {
    const index = windowTokens.indexOf(anchor, searchFrom);
    if (index === -1) return false;
    searchFrom = index + 1;
  }
  return true;
}

function orderedNgramCoverage(windowText, ngrams) {
  if (ngrams.length === 0) return 100;

  let found = 0;
  let searchFrom = 0;
  for (const ngram of ngrams) {
    const index = windowText.indexOf(ngram, searchFrom);
    if (index === -1) continue;
    found += 1;
    searchFrom = index + 1;
  }

  return Math.round((found / ngrams.length) * 100);
}

function buildConflictAnchors(phrasePairs, currentIndex) {
  const conflicts = new Set();

  phrasePairs.forEach((pair, index) => {
    if (index === currentIndex) return;

    for (const phrase of [pair.en, pair.he]) {
      const primary = extractAnchors(phrase)[0];
      if (!primary) continue;

      expandConflictTokens(primary, conflicts);
      getConceptConflictAnchors(primary).forEach((token) => conflicts.add(token));
    }
  });

  return conflicts;
}

function expandConflictTokens(primary, conflicts) {
  const normalized = primary.toLowerCase();
  conflicts.add(normalized);
  getConceptConflictAnchors(primary).forEach((token) => conflicts.add(token));
}

function findExactPhraseMatch(normalizedUserAnswer, normalizedPhrase, searchStart) {
  const userTokens = tokenize(normalizedUserAnswer);
  const phraseTokenCount = tokenize(normalizedPhrase).length;
  const searchPrefix = userTokens.slice(0, searchStart).join(' ');
  const charOffset = searchPrefix.length > 0 ? searchPrefix.length + 1 : 0;
  const slice = normalizedUserAnswer.slice(charOffset);

  if (!slice.includes(normalizedPhrase)) return null;

  const relativeIndex = slice.indexOf(normalizedPhrase);
  const absoluteIndex = charOffset + relativeIndex;
  const matchedTokens = tokenize(normalizedUserAnswer.slice(absoluteIndex));
  const endIndex = searchStart + Math.min(phraseTokenCount, matchedTokens.length);

  return { matchRate: 100, endIndex, found: true };
}

function findOrderedPhraseMatch(
  normalizedUserAnswer,
  normalizedPhrase,
  searchStart,
  conflictAnchors,
  primaryAnchorSet,
) {
  const exactMatch = findExactPhraseMatch(
    normalizedUserAnswer,
    normalizedPhrase,
    searchStart,
  );
  if (exactMatch) return exactMatch;

  const userTokens = tokenize(normalizedUserAnswer);
  const phraseTokens = tokenize(normalizedPhrase);
  const anchors = extractAnchors(normalizedPhrase);
  const ngrams = selectNgrams(phraseTokens);

  const minWindow = Math.max(phraseTokens.length, 3);
  const maxWindow = Math.ceil(phraseTokens.length * 1.35);

  let best = { matchRate: 0, endIndex: searchStart, found: false };

  for (let start = searchStart; start < userTokens.length; start += 1) {
    const startToken = userTokens[start];

    if (
      primaryAnchorSet.size > 0 &&
      !tokenMatchesPrimaryAnchor(startToken, primaryAnchorSet)
    ) {
      continue;
    }

    if (conflictAnchors.has(startToken.toLowerCase())) continue;

    for (let windowSize = minWindow; windowSize <= maxWindow; windowSize += 1) {
      if (start + windowSize > userTokens.length) break;

      const windowTokens = userTokens.slice(start, start + windowSize);
      const windowText = windowTokens.join(' ');

      if (!anchorsInOrder(windowTokens, anchors)) continue;

      const ngramRate = orderedNgramCoverage(windowText, ngrams);

      if (ngramRate > best.matchRate) {
        best = {
          matchRate: ngramRate,
          endIndex: start + windowSize,
          found: ngramRate >= PHRASE_MATCH_THRESHOLD,
        };
      }
    }
  }

  return best;
}

function findBestBilingualPhraseMatch(
  normalizedUserAnswer,
  phrasePair,
  searchStart,
  conflictAnchors,
) {
  const primaryAnchorSet = getPrimaryAnchorSet(
    phrasePair.en,
    phrasePair.he,
    extractAnchors,
  );

  const enMatch = findOrderedPhraseMatch(
    normalizedUserAnswer,
    phrasePair.en,
    searchStart,
    conflictAnchors,
    primaryAnchorSet,
  );
  const heMatch = findOrderedPhraseMatch(
    normalizedUserAnswer,
    phrasePair.he,
    searchStart,
    conflictAnchors,
    primaryAnchorSet,
  );

  if (enMatch.matchRate >= heMatch.matchRate) {
    return { ...enMatch, matchedLang: 'en', phrase: phrasePair.sourceEn };
  }

  return { ...heMatch, matchedLang: 'he', phrase: phrasePair.sourceHe };
}

export function matchBilingualPhrasePairs(studentAnswer, phrasePairs) {
  const normalizedUserAnswer = normalizeAnswer(studentAnswer);
  const normalizedPairs = phrasePairs.map(({ en, he }) => ({
    en: normalizeAnswer(en),
    he: normalizeAnswer(he),
    sourceEn: en,
    sourceHe: he,
  }));

  let searchStart = 0;

  const phraseResults = normalizedPairs.map((pair, index) => {
    const conflictAnchors = buildConflictAnchors(normalizedPairs, index);
    const match = findBestBilingualPhraseMatch(
      normalizedUserAnswer,
      pair,
      searchStart,
      conflictAnchors,
    );

    if (match.found) {
      searchStart = match.endIndex;
    }

    return {
      phrase: match.phrase,
      matchRate: match.matchRate,
      found: match.found,
      matchedLang: match.matchedLang,
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

/** @deprecated Use matchBilingualPhrasePairs — kept for single-language tests */
export function matchCorePhrases(studentAnswer, corePhrases) {
  const pairs = corePhrases.map((phrase) => ({ en: phrase, he: phrase }));
  return matchBilingualPhrasePairs(studentAnswer, pairs);
}
