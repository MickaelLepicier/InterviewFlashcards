import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');

function splitIntoPhrases(text) {
  const numbered = text
    .split(/\n?\s*\d+\.\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 12);

  if (numbered.length > 1) {
    return numbered.map((part) => part.replace(/\s+/g, ' ').trim());
  }

  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => part.length > 12);
}

function getAnswer(card, lang) {
  if (lang === 'he') {
    return card.correctAnswer_he ?? card.answer_he ?? '';
  }
  return card.correctAnswer_en ?? card.answer_en ?? '';
}

function buildPhrasePairs(card) {
  const enPhrases = splitIntoPhrases(getAnswer(card, 'en'));
  const hePhrases = splitIntoPhrases(getAnswer(card, 'he'));
  const count = Math.max(enPhrases.length, hePhrases.length, 1);

  return Array.from({ length: count }, (_, index) => ({
    en: enPhrases[index] ?? enPhrases[enPhrases.length - 1] ?? getAnswer(card, 'en'),
    he: hePhrases[index] ?? hePhrases[hePhrases.length - 1] ?? getAnswer(card, 'he'),
  }));
}

const subjectFiles = readdirSync(dataDir).filter(
  (file) => file.endsWith('.json') && file !== 'subjects.json',
);

const phrasesByKey = {};

for (const file of subjectFiles) {
  const subjectId = file.replace(/\.json$/, '');
  const cards = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));

  for (const card of cards) {
    phrasesByKey[`${subjectId}:${card.id}`] = buildPhrasePairs(card);
  }
}

const output = `// Auto-generated bilingual phrase pairs per question.
// Run: node scripts/build-core-phrases.mjs

const CORE_PHRASES_BY_KEY = ${JSON.stringify(phrasesByKey, null, 2)};

export function getPhrasePairs(subjectId, cardId) {
  return CORE_PHRASES_BY_KEY[\`\${subjectId}:\${cardId}\`] ?? [];
}
`;

mkdirSync(join(root, 'src', 'data'), { recursive: true });
writeFileSync(join(root, 'src', 'data', 'corePhrases.js'), output, 'utf8');
console.log(
  `Wrote bilingual phrase pairs for ${subjectFiles.length} subjects (${Object.keys(phrasesByKey).length} questions).`,
);
