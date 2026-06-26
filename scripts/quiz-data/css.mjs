const DEFAULT_HINT_EN = 'Focus on the key concepts from the official answer.';
const DEFAULT_HINT_HE = 'התמקד במושגים המרכזיים מהתשובה הרשמית.';

export function card(id, category, en, he, opts = {}) {
  return {
    id,
    category,
    question_en: en.q,
    question_he: he.q,
    hint_en: en.hint ?? DEFAULT_HINT_EN,
    hint_he: he.hint ?? DEFAULT_HINT_HE,
    correctAnswer_en: en.a,
    correctAnswer_he: he.a,
    ...(opts.code ? { code_snippet: opts.code } : {}),
  };
}

export default [
  card(1, 'CSS / Specificity',
    {
      q: 'Challenge: CSS selector specificity – how does it work?',
      a: 'Element selectors score 1 point, class/attribute selectors 10, id selectors 100, inline styles 1000, and !important overrides normal specificity.',
    },
    {
      q: 'אתגר: CSS selector specificity – איך זה עובד?',
      a: 'selectors של אלמנטים שווים 1 נקודה, class/attribute selectors שווים 10, id selectors שווים 100, inline styles שווים 1000, ו-!important דורס specificity רגיל.',
    },
    { code: "h1 { color: red }\n.highlite { color: pink }\n.highlite.now { color: brown }\n/* inline style color: blue wins */" },
  ),
  card(2, 'CSS / Accessibility',
    {
      q: 'Challenge: What are the different ways to visually hide content?',
      a: 'Common techniques include display: none, visibility: hidden, zero height, off-screen positioning, opacity: 0, scale: 0, and the hidden attribute.',
    },
    {
      q: 'אתגר: מהן הדרכים השונות להסתרת תוכן ויזואלית?',
      a: 'טכניקות נפוצות כוללות display: none, visibility: hidden, גובה אפס, מיקום מחוץ למסך, opacity: 0, scale: 0 ו-attribute hidden.',
    },
    { code: "div { display: none; visibility: hidden; opacity: 0; }\n<p hidden></p>" },
  ),
  card(3, 'CSS / Box Model',
    {
      q: 'Challenge: Explain the box model',
      a: 'The CSS box model is a box that wraps around an HTML element, consisting of content, padding, border, and margin areas.',
    },
    {
      q: 'אתגר: הסבר את box model',
      a: 'box model ב-CSS הוא קופסה שעוטפת אלמנט HTML, המורכבת מאזורי content, padding, border ו-margin.',
    },
  ),
  card(4, 'CSS / Box Model',
    {
      q: 'Challenge: What does * { box-sizing: border-box; } do?',
      a: 'It changes box-sizing from content-box to border-box so width and height include padding and borders.',
    },
    {
      q: 'אתגר: מה עושה * { box-sizing: border-box; }?',
      a: 'זה משנה את box-sizing מ-content-box ל-border-box כך ש-width ו-height כוללים padding ו-borders.',
    },
    { code: ".box {\n  box-sizing: border-box;\n  padding: 20px;\n  border: 5px solid black;\n  width: 200px;\n}" },
  ),
  card(5, 'CSS / Selectors',
    {
      q: 'Challenge: pseudo-elements and pseudo-classes?',
      a: 'Pseudo-elements style specific parts of an element (e.g. ::first-line, ::after). Pseudo-classes style elements in a particular state (e.g. :hover, :visited).',
    },
    {
      q: 'אתגר: pseudo-elements ו-pseudo-classes?',
      a: 'pseudo-elements מעצבים חלקים ספציפיים של אלמנט (למשל ::first-line, ::after). pseudo-classes מעצבים אלמנטים במצב מסוים (למשל :hover, :visited).',
    },
    { code: "p::first-line { text-transform: uppercase }\na:hover { color: #FF00FF }" },
  ),
  card(6, 'CSS / Responsive',
    {
      q: 'Challenge: What are @media properties?',
      a: '@media rules apply CSS only when certain conditions are met, such as screen width, print mode, or supported features.',
    },
    {
      q: 'אתגר: מהם @media properties?',
      a: 'כללי @media מחילים CSS רק כשתנאים מסוימים מתקיימים, כמו רוחב מסך, מצב הדפסה או features נתמכים.',
    },
    { code: "@media screen and (min-width: 900px) {\n  article { padding: 1rem 3rem }\n}" },
  ),
  card(7, 'CSS / Layout',
    {
      q: 'Challenge: What can you say about CSS Floats',
      a: 'Float is a layout technique. Floated elements may require z-index handling and a clearfix to contain the layout.',
    },
    {
      q: 'אתגר: מה אפשר לומר על CSS Floats',
      a: 'float הוא טכניקת פריסה. אלמנטים עם float עשויים לדרוש טיפול ב-z-index ו-clearfix כדי להכיל את הפריסה.',
    },
    { code: ".btn-close { float: inline-end }\n.clearfix { overflow: auto }" },
  ),
  card(8, 'CSS / Layout',
    {
      q: 'Challenge: When Flexbox and when Grid?',
      a: 'CSS Grid is for overall layout with rows, columns, gaps, and overlap. Flexbox is for alignment and one-dimensional flexible layouts, including dynamic content.',
    },
    {
      q: 'אתגר: מתי Flexbox ומתי Grid?',
      a: 'CSS Grid מיועד לפריסה כוללת עם שורות, עמודות, gaps וחפיפה. Flexbox מיועד ליישור ופריסות גמישות חד-ממדיות, כולל תוכן דינמי.',
    },
  ),
  card(9, 'CSS / Responsive',
    {
      q: 'Challenge: What is mobile-first strategy?',
      a: 'Start designing for mobile constraints first, then progressively enhance the experience for tablet and desktop.',
    },
    {
      q: 'אתגר: מהי אסטרטגיית mobile-first?',
      a: 'מתחילים בעיצוב למגבלות מובייל, ואז משפרים בהדרגה את החוויה לטאבלט ולדסקטופ.',
    },
  ),
  card(10, 'CSS / Fundamentals',
    {
      q: 'Challenge: "resetting" vs "normalizing" CSS?',
      a: 'Normalize sets common defaults across browsers while preserving useful defaults. Reset removes most browser default styles entirely.',
    },
    {
      q: 'אתגר: "resetting" לעומת "normalizing" ב-CSS?',
      a: 'normalize קובע ברירות מחדל משותפות בין דפדפנים תוך שמירה על defaults שימושיים. reset מסיר את רוב סגנונות ברירת המחדל של הדפדפן לחלוטין.',
    },
  ),
  card(11, 'CSS / Best Practices',
    {
      q: 'Challenge: Best practices for CSS',
      a: 'Use a color theme and style guide, write clean consistent code, comment, split into files, minify, use preprocessors like SASS, reset or normalize, prefer classes over IDs, use fallbacks, and avoid !important and overly specific selectors.',
    },
    {
      q: 'אתגר: שיטות עבודה מומלצות ל-CSS',
      a: 'השתמשו בערכת צבעים וב-style guide, כתבו קוד נקי ועקבי, הוסיפו הערות, פצלו לקבצים, בצעו minify, השתמשו ב-preprocessors כמו SASS, reset או normalize, העדיפו classes על IDs, השתמשו ב-fallbacks, והימנעו מ-!important ו-selectors ספציפיים מדי.',
    },
  ),
];
