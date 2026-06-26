/**
 * Generates bilingual subject JSON files from scripts/quiz-data modules.
 * Run: node scripts/generate-pdf-data.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as quizData from './quiz-data/index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');

const subjects = [
  {
    id: 'javascript',
    label_en: 'JavaScript',
    label_he: 'JavaScript',
    description_en: 'Language fundamentals, async, DOM, and algorithms from the CodingAcademy interview guide',
    description_he: 'יסודות השפה, אסינכרון, DOM ואלגוריתמים ממדריך הראיון',
    icon: '⚡',
  },
  {
    id: 'html',
    label_en: 'HTML',
    label_he: 'HTML',
    description_en: 'HTML5, storage, entities, and graphics',
    description_he: 'HTML5, אחסון, entities וגרפיקה',
    icon: '📄',
  },
  {
    id: 'css',
    label_en: 'CSS',
    label_he: 'CSS',
    description_en: 'Layout, specificity, responsive design, and best practices',
    description_he: 'פריסה, ספציפיות, עיצוב רספונסיבי ושיטות עבודה',
    icon: '🎨',
  },
  {
    id: 'react',
    label_en: 'React',
    label_he: 'React',
    description_en: 'Virtual DOM, hooks, context, performance, and patterns',
    description_he: 'Virtual DOM, hooks, context, ביצועים ודפוסים',
    icon: '⚛️',
  },
  {
    id: 'architecture',
    label_en: 'Architecture',
    label_he: 'ארכיטקטורה',
    description_en: 'System design, APIs, SSR, security, and career topics',
    description_he: 'תכנון מערכות, APIs, SSR, אבטחה ונושאי קריירה',
    icon: '🏗️',
  },
];

const datasets = {
  javascript: quizData.javascript,
  html: quizData.html,
  css: quizData.css,
  react: quizData.react,
  architecture: quizData.architecture,
};

mkdirSync(dataDir, { recursive: true });
writeFileSync(join(dataDir, 'subjects.json'), JSON.stringify(subjects, null, 2));

for (const [name, cards] of Object.entries(datasets)) {
  writeFileSync(join(dataDir, `${name}.json`), JSON.stringify(cards, null, 2));
  console.log(`Wrote ${name}.json (${cards.length} bilingual questions)`);
}

console.log('Done.');
