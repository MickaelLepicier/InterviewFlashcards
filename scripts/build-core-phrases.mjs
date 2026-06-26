import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cards = JSON.parse(readFileSync(join(root, 'data.json'), 'utf8'));

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

const phrasesById = Object.fromEntries(
  cards.map((card) => [
    card.id,
    {
      he: splitIntoPhrases(card.answer_he),
      en: splitIntoPhrases(card.answer_en),
    },
  ]),
);

const output = `// Auto-generated core semantic phrases per question.
// Run: node scripts/build-core-phrases.mjs

const CORE_PHRASES_BY_ID = ${JSON.stringify(phrasesById, null, 2)};

export function getCorePhrases(cardId, lang) {
  const phrases = CORE_PHRASES_BY_ID[cardId];
  if (!phrases) return [];
  return lang === 'he' ? phrases.he : phrases.en;
}
`;

mkdirSync(join(root, 'src', 'data'), { recursive: true });
writeFileSync(join(root, 'src', 'data', 'corePhrases.js'), output, 'utf8');
console.log(`Wrote core phrases for ${cards.length} cards.`);
