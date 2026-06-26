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
  card(1, 'HTML / Entities',
    {
      q: 'Challenge: What are HTML Entities?',
      a: 'HTML entities are used to output special characters safely in HTML, such as &lt;, &amp;, &copy;, and currency symbols.',
    },
    {
      q: 'אתגר: מהם HTML Entities?',
      a: 'HTML entities משמשים להצגה בטוחה של תווים מיוחדים ב-HTML, כמו &lt;, &amp;, &copy; וסמלי מטבע.',
    },
    { code: "<ul>\n  <li>&lt;Aha&gt;</li>\n  <li>Me &amp; You</li>\n  <li>&copy; &nbsp; &reg;</li>\n</ul>" },
  ),
  card(2, 'HTML / Document',
    {
      q: 'Challenge: What is the doctype?',
      a: 'The doctype is a legacy browser compatibility declaration. HTML5 uses the simple <!DOCTYPE html>.',
    },
    {
      q: 'אתגר: מהו doctype?',
      a: 'doctype הוא הצהרת תאימות לדפדפנים ישנים. ב-HTML5 משתמשים ב-<!DOCTYPE html> הפשוט.',
    },
    { code: '<!DOCTYPE html>' },
  ),
  card(3, 'HTML / HTML5',
    {
      q: 'Challenge: What are the building blocks of HTML5?',
      a: 'Semantic elements, richer form controls and validation, data- attributes, Web Storage, audio/video, geolocation, web sockets, web workers, and more.',
    },
    {
      q: 'אתגר: מהם אבני הבניין של HTML5?',
      a: 'אלמנטים סמנטיים, בקרות טופס ו-validation עשירים יותר, data- attributes, Web Storage, audio/video, geolocation, web sockets, web workers ועוד.',
    },
  ),
  card(4, 'HTML / HTML5',
    {
      q: 'Challenge: What are Web Workers?',
      a: 'Worker threads perform tasks without blocking the UI. Workers have no access to window or document.',
    },
    {
      q: 'אתגר: מהם Web Workers?',
      a: 'worker threads מבצעים משימות בלי לחסום את ה-UI. ל-workers אין גישה ל-window או ל-document.',
    },
    { code: 'const worker = new Worker("primesWorker.js")\nworker.onmessage = (ev) => { /* use ev.data */ }' },
  ),
  card(5, 'HTML / Storage',
    {
      q: 'Challenge: What are the Different types of Browser storage?',
      a: 'localStorage, sessionStorage, indexedDB, cookies, and the Cache API.',
    },
    {
      q: 'אתגר: מהם סוגי האחסון השונים בדפדפן?',
      a: 'localStorage, sessionStorage, indexedDB, cookies ו-Cache API.',
    },
  ),
  card(6, 'HTML / Storage',
    {
      q: 'What is the difference between local storage and cookies?',
      hint: 'Compare persistence and server communication.',
      a: 'Both are browser storage. localStorage persists until manually cleared. sessionStorage is short term. Cookies are automatically sent by the browser to the server on subsequent requests.',
    },
    {
      q: 'מה ההבדל בין local storage ל-cookies?',
      hint: 'השוו בין התמדה (persistence) לתקשורת עם השרת.',
      a: 'שניהם אחסון בדפדפן. localStorage נשמר עד ניקוי ידני. sessionStorage לטווח קצר. cookies נשלחים אוטומטית על ידי הדפדפן לשרת בבקשות הבאות.',
    },
  ),
  card(7, 'HTML / Graphics',
    {
      q: 'Challenge: Canvas vs. SVG',
      a: 'Canvas is pixel based and modified through script only. SVG is vector based, part of the DOM, supports CSS and accessibility, and is resolution independent with better animation support.',
    },
    {
      q: 'אתגר: Canvas לעומת SVG',
      a: 'Canvas מבוסס פיקסלים ומשתנה רק דרך script. SVG מבוסס וקטורי, חלק מה-DOM, תומך ב-CSS ו-accessibility, בלתי תלוי ברזולוציה ועם תמיכה טובה יותר באנימציה.',
    },
  ),
];
