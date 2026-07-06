import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');

const FILES = [
  'javascript.json',
  'react.json',
  'css.json',
  'html.json',
  'architecture.json',
];

const HINTS = {
  'javascript.json:1': {
    hint_en: 'Think about declared-but-unassigned vs intentionally empty.',
    hint_he: 'חשוב על משתנה שהוכרז אך לא הוקצה לו ערך, לעומת השמה מכוונת של "אין ערך".',
  },
  'javascript.json:2': {
    hint_en: 'Does for...in iterate values or keys?',
    hint_he: 'האם for...in עובר על ערכים או על מפתחות?',
  },
  'javascript.json:3': {
    hint_en: 'What happens to declarations before the code actually runs?',
    hint_he: 'מה קורה להכרזות (declarations) לפני שהקוד באמת רץ?',
  },
  'javascript.json:4': {
    hint_en: 'Think about the mechanism JavaScript uses for object inheritance and sharing methods.',
    hint_he: 'חשוב על המנגנון שבו אובייקטים ב-JavaScript משתפים מתודות ומבצעים ירושה.',
  },
  'javascript.json:5': {
    hint_en: 'What does it mean when a function runs immediately after being defined?',
    hint_he: 'מה קורה כשפונקציה רצה מיד לאחר שהיא הוגדרה?',
  },
  'javascript.json:6': {
    hint_en: 'Compare function scope vs block scope, and how each behaves with hoisting.',
    hint_he: 'השוו בין function scope ל-block scope, ואיך כל אחד מתנהג עם hoisting.',
  },
  'javascript.json:7': {
    hint_en: 'Think about which one unpacks/spreads elements out of an array, and which one gathers/packs multiple items into a new array.',
    hint_he: 'חשוב מי מהם מפרק/מפזר אלמנטים מתוך מערך, ומי מהם אוסף/אורז מספר פריטים לתוך מערך חדש.',
  },
  'javascript.json:8': {
    hint_en: 'How can you pull values out of arrays or objects into variables in one line?',
    hint_he: 'איך אפשר לשלוף ערכים ממערכים או אובייקטים למשתנים בשורה אחת?',
  },
  'javascript.json:9': {
    hint_en: 'How can an inner function still access variables from its outer function after the outer finishes?',
    hint_he: 'איך פונקציה פנימית עדיין יכולה לגשת למשתנים של הפונקציה החיצונית אחרי שהיא סיימה?',
  },
  'javascript.json:10': {
    hint_en: 'Think about ES modules, closures, or the # syntax in classes.',
    hint_he: 'חשוב על ES modules, closures, או תחביר ה-# במחלקות.',
  },
  'javascript.json:11': {
    hint_en: 'When is a function only needed once, such as in map or setTimeout?',
    hint_he: 'מתי פונקציה נדרשת רק פעם אחת, למשל ב-map או setTimeout?',
  },
  'javascript.json:12': {
    hint_en: 'Focus on this, arguments, and whether the function is anonymous.',
    hint_he: 'התמקד ב-this, ב-arguments, ובשאלה האם הפונקציה אנונימית.',
  },
  'javascript.json:13': {
    hint_en: 'Which one can be called before its definition line because of hoisting?',
    hint_he: 'איזו מהן ניתן לקרוא לה לפני שורת ההגדרה בזכות hoisting?',
  },
  'javascript.json:14': {
    hint_en: 'What happens when async callbacks are created inside a loop with var?',
    hint_he: 'מה קורה כשיוצרים callbacks אסינכרוניים בתוך לולאה עם var?',
  },
  'javascript.json:15': {
    hint_en: 'How can an IIFE capture the loop index for each iteration?',
    hint_he: 'איך IIFE יכול ללכוד את אינדקס הלולאה בכל איטרציה?',
  },
  'javascript.json:16': {
    hint_en: 'Both set this manually — how do they differ in passing extra arguments?',
    hint_he: 'שניהם קובעים this ידנית — מה ההבדל בהעברת ארגומנטים נוספים?',
  },
  'javascript.json:17': {
    hint_en: 'Does bind run the function immediately, or return something else?',
    hint_he: 'האם bind מריץ את הפונקציה מיד, או מחזיר משהו אחר?',
  },
  'javascript.json:18': {
    hint_en: 'Does the function take another function as input, return one, or both?',
    hint_he: 'האם הפונקציה מקבלת פונקציה כקלט, מחזירה אחת, או שניהם?',
  },
  'javascript.json:19': {
    hint_en: 'Which types can be changed in place, and which return new values?',
    hint_he: 'אילו טיפוסים ניתן לשנות במקום, ואילו מחזירים ערכים חדשים?',
  },
  'javascript.json:20': {
    hint_en: 'Which array methods mutate in place, and what immutable alternatives exist?',
    hint_he: 'אילו מתודות מערך משנות במקום, ומה החלופות ה-immutable?',
  },
  'javascript.json:21': {
    hint_en: 'What role does the accumulator play as you loop through items?',
    hint_he: 'מה תפקיד ה-accumulator כשעוברים על פריטים בלולאה?',
  },
  'javascript.json:22': {
    hint_en: 'When you hit a nested array, what should happen recursively?',
    hint_he: 'כשפוגשים מערך מקונן, מה צריך לקרות ברקורסיה?',
  },
  'javascript.json:23': {
    hint_en: 'Think about circular references and types JSON cannot represent.',
    hint_he: 'חשוב על circular references ועל טיפוסים ש-JSON לא יכול לייצג.',
  },
  'javascript.json:24': {
    hint_en: 'Think binary search on a sorted array.',
    hint_he: 'חשוב על binary search במערך ממוין.',
  },
  'javascript.json:25': {
    hint_en: 'Compare adjacent elements and swap — what is the time complexity?',
    hint_he: 'השוו אלמנטים סמוכים והחליפו — מה סיבוכיות הזמן?',
  },
  'javascript.json:26': {
    hint_en: 'Which built-in structure enforces unique values in O(N) time?',
    hint_he: 'איזה מבנה מובנה שומר על ערכים ייחודיים בזמן O(N)?',
  },
  'javascript.json:27': {
    hint_en: 'How can caching previous results turn exponential recursion into linear?',
    hint_he: 'איך שמירת תוצאות קודמות ב-cache הופכת רקורסיה אקספוננציאלית ללינארית?',
  },
  'javascript.json:28': {
    hint_en: 'What should happen on repeated calls with the same key?',
    hint_he: 'מה צריך לקרות בקריאות חוזרות עם אותו מפתח?',
  },
  'javascript.json:29': {
    hint_en: 'Which data structure helps match opening and closing brackets?',
    hint_he: 'איזה מבנה נתונים עוזר להתאים סוגריים פותחים וסוגרים?',
  },
  'javascript.json:30': {
    hint_en: 'After an event fires on a child, where does it travel next?',
    hint_he: 'אחרי שאירוע נורה על ילד, לאן הוא ממשיך?',
  },
  'javascript.json:31': {
    hint_en: 'Why attach one handler on a parent instead of many on children?',
    hint_he: 'למה לחבר handler אחד על הורה במקום רבים על ילדים?',
  },
  'javascript.json:32': {
    hint_en: 'How can you highlight matching text as the user types?',
    hint_he: 'איך אפשר להדגיש טקסט תואם בזמן שהמשתמש מקליד?',
  },
  'javascript.json:33': {
    hint_en: 'Which style blocks the thread, and which schedules work for later?',
    hint_he: 'איזה סגנון חוסם את ה-thread, ואיזה מתזמן עבודה למועד מאוחר יותר?',
  },
  'javascript.json:34': {
    hint_en: 'How do you register listeners and notify them when something happens?',
    hint_he: 'איך רושמים listeners ומודיעים להם כשמשהו קורה?',
  },
  'javascript.json:35': {
    hint_en: 'How do you turn an err-first callback into a Promise?',
    hint_he: 'איך הופכים callback עם err ראשון ל-Promise?',
  },
  'javascript.json:36': {
    hint_en: 'Which approach chains dependent async steps more cleanly?',
    hint_he: 'איזו גישה משרשרת שלבי async תלויים בצורה נקייה יותר?',
  },
  'javascript.json:37': {
    hint_en: 'When should it resolve, and what happens if one promise rejects?',
    hint_he: 'מתי הוא צריך להתממש, ומה קורה אם promise אחד נדחה?',
  },
  'javascript.json:38': {
    hint_en: 'Remember: call stack first, then microtasks, then macrotasks.',
    hint_he: 'זכרו: קודם call stack, אחר כך microtasks, ואז macrotasks.',
  },
  'javascript.json:39': {
    hint_en: 'What happens when the call stack is empty?',
    hint_he: 'מה קורה כשה-call stack ריק?',
  },
  'javascript.json:40': {
    hint_en: 'When is a resource fully loaded and ready to use?',
    hint_he: 'מתי משאב נטען לגמרי ומוכן לשימוש?',
  },
  'javascript.json:41': {
    hint_en: 'What is the modern way to share code between JavaScript files?',
    hint_he: 'מה הדרך המודרנית לשתף קוד בין קבצי JavaScript?',
  },

  'react.json:1': {
    hint_en: 'Why does React compare a lightweight copy before touching the real DOM?',
    hint_he: 'למה React משווה עותק קל לפני שנוגע ב-DOM האמיתי?',
  },
  'react.json:2': {
    hint_en: 'What lets you write HTML-like syntax inside JavaScript?',
    hint_he: 'מה מאפשר לכתוב תחביר דמוי HTML בתוך JavaScript?',
  },
  'react.json:3': {
    hint_en: 'Think mount, update, and cleanup — in hooks and class components.',
    hint_he: 'חשוב על mount, update ו-cleanup — ב-hooks וב-class components.',
  },
  'react.json:4': {
    hint_en: 'When do you need a value that should not trigger a re-render?',
    hint_he: 'מתי צריך ערך שלא אמור לגרום ל-re-render?',
  },
  'react.json:5': {
    hint_en: 'How can data reach deep components without passing props at every level?',
    hint_he: 'איך נתונים יכולים להגיע לקומפוננטות עמוקות בלי להעביר props בכל רמה?',
  },
  'react.json:6': {
    hint_en: 'When should React skip re-rendering a component?',
    hint_he: 'מתי React צריך לדלג על re-render של קומפוננטה?',
  },
  'react.json:7': {
    hint_en: 'What expensive calculation should be cached between re-renders?',
    hint_he: 'איזה חישוב יקר כדאי לשמור ב-cache בין re-renders?',
  },
  'react.json:8': {
    hint_en: 'Why cache a function reference instead of recreating it each render?',
    hint_he: 'למה לשמור reference לפונקציה במקום ליצור אותה מחדש בכל render?',
  },
  'react.json:9': {
    hint_en: 'How can a parent enforce expected prop types and defaults?',
    hint_he: 'איך קומפוננטת הורה יכולה לאכוף סוגי props וברירות מחדל?',
  },
  'react.json:10': {
    hint_en: 'When is the same stateful logic reused across multiple components?',
    hint_he: 'מתי אותה לוגיקה stateful משמשת חוזר בכמה קומפוננטות?',
  },
  'react.json:11': {
    hint_en: 'Name the core building blocks of the Redux data flow.',
    hint_he: 'פרט את אבני הבניין המרכזיות של זרימת הנתונים ב-Redux.',
  },
  'react.json:12': {
    hint_en: 'What kind of function takes a component and returns an enhanced one?',
    hint_he: 'איזו פונקציה מקבלת קומפוננטה ומחזירה אחת משופרת?',
  },
  'react.json:13': {
    hint_en: 'How does an accordion track which item is open?',
    hint_he: 'איך accordion עוקב אחרי איזה פריט פתוח?',
  },
  'react.json:14': {
    hint_en: 'Think about global state and avoiding passing props through many levels.',
    hint_he: 'חשוב על סטייט גלובלי ומניעת העברת פרופס דרך הרבה רמות.',
  },
  'react.json:15': {
    hint_en: 'Think about persisting values without re-rendering or accessing DOM elements directly.',
    hint_he: 'חשוב על שמירת ערכים ללא רינדור מחדש או גישה ישירה לאלמנטים ב-DOM.',
  },

  'css.json:1': {
    hint_en: 'How are element, class, id, inline, and !important weighted?',
    hint_he: 'איך שוקללים element, class, id, inline ו-!important?',
  },
  'css.json:2': {
    hint_en: 'Which techniques hide content visually but may differ for screen readers?',
    hint_he: 'אילו טכניקות מסתירות תוכן ויזואלית אך עשויות להשפיע אחרת על screen readers?',
  },
  'css.json:3': {
    hint_en: 'Name the layers that wrap an element from inside out.',
    hint_he: 'פרט את השכבות שעוטפות אלמנט מבפנים החוצה.',
  },
  'css.json:4': {
    hint_en: 'What changes when width includes padding and borders?',
    hint_he: 'מה משתנה כש-width כולל padding ו-borders?',
  },
  'css.json:5': {
    hint_en: 'One styles a state, the other styles a part of the element — which is which?',
    hint_he: 'אחד מעצב מצב ואחד מעצב חלק מהאלמנט — מה ההבדל?',
  },
  'css.json:6': {
    hint_en: 'When should CSS rules apply based on screen size or device conditions?',
    hint_he: 'מתי כללי CSS צריכים לחול לפי גודל מסך או תנאי מכשיר?',
  },
  'css.json:7': {
    hint_en: 'What layout problems do floats create, and how do you contain them?',
    hint_he: 'אילו בעיות פריסה יוצרים floats, ואיך מכילים אותם?',
  },
  'css.json:8': {
    hint_en: 'One is for overall 2D layout, the other for flexible one-dimensional alignment.',
    hint_he: 'אחד לפריסה דו-ממדית כוללת, השני ליישור גמיש חד-ממדי.',
  },
  'css.json:9': {
    hint_en: 'Which screen size do you design for first?',
    hint_he: 'לאיזה גודל מסך מתכננים קודם?',
  },
  'css.json:10': {
    hint_en: 'Does the approach remove all defaults or harmonize useful ones across browsers?',
    hint_he: 'האם הגישה מסירה את כל ברירות המחדל או מתאימה שימושיות בין דפדפנים?',
  },
  'css.json:11': {
    hint_en: 'Think consistency, maintainability, and avoiding overly specific selectors.',
    hint_he: 'חשוב על עקביות, תחזוקה, והימנעות מ-selectors ספציפיים מדי.',
  },
  'css.json:12': {
    hint_en: 'Think about new lines, width/height properties, and content size.',
    hint_he: 'חשוב על שורות חדשות, הגדרות רוחב/גובה, וגודל התוכן.',
  },

  'html.json:1': {
    hint_en: 'How do you safely display characters like <, &, or © in HTML?',
    hint_he: 'איך מציגים בבטחה תווים כמו <, & או © ב-HTML?',
  },
  'html.json:2': {
    hint_en: 'What declaration tells the browser which HTML version to expect?',
    hint_he: 'איזו הצהרה אומרת לדפדפן איזו גרסת HTML לצפות?',
  },
  'html.json:3': {
    hint_en: 'Think semantic tags, richer forms, storage, media, and APIs.',
    hint_he: 'חשוב על תגיות סמנטיות, טפסים עשירים, storage, מדיה ו-APIs.',
  },
  'html.json:4': {
    hint_en: 'How can heavy work run without blocking the main UI thread?',
    hint_he: 'איך עבודה כבדה יכולה לרוץ בלי לחסום את ה-main UI thread?',
  },
  'html.json:5': {
    hint_en: 'Name the main ways browsers can persist data on the client.',
    hint_he: 'פרט את הדרכים העיקריות שבהן דפדפן שומר נתונים בצד הלקוח.',
  },
  'html.json:6': {
    hint_en: 'Compare persistence and server communication.',
    hint_he: 'השוו בין התמדה (persistence) לתקשורת עם השרת.',
  },
  'html.json:7': {
    hint_en: 'Pixel-based scripting vs vector DOM graphics — what are the tradeoffs?',
    hint_he: 'גרפיקה מבוססת פיקסלים מול וקטורית ב-DOM — מה היתרונות והחסרונות?',
  },

  'architecture.json:1': {
    hint_en: 'What does Vite handle in modern frontend development workflows?',
    hint_he: 'מה Vite מטפל בו ב-workflows מודרניים של frontend?',
  },
  'architecture.json:2': {
    hint_en: 'Does data travel one way, or sync back from the UI to the model?',
    hint_he: 'האם נתונים נעים בכיוון אחד, או מסתנכרנים חזרה מה-UI למודל?',
  },
  'architecture.json:3': {
    hint_en: 'What problem does a central store and unidirectional flow solve?',
    hint_he: 'איזו בעיה store מרכזי וזרימה חד-כיוונית פותרים?',
  },
  'architecture.json:4': {
    hint_en: 'What product features become easier once state is centralized?',
    hint_he: 'אילו תכונות מוצר נהיות קלות יותר כשה-state מרכזי?',
  },
  'architecture.json:5': {
    hint_en: 'Which LIFO structure fits saving and restoring previous states?',
    hint_he: 'איזה מבנה LIFO מתאים לשמירה ושחזור של מצבים קודמים?',
  },
  'architecture.json:6': {
    hint_en: 'How do you check at runtime whether a browser supports a feature?',
    hint_he: 'איך בודקים בזמן ריצה האם דפדפן תומך ביכולת מסוימת?',
  },
  'architecture.json:7': {
    hint_en: 'How can the page update data without a full reload?',
    hint_he: 'איך הדף יכול לעדכן נתונים בלי רענון מלא?',
  },
  'architecture.json:8': {
    hint_en: 'When can scripts from one origin call another origin\'s API?',
    hint_he: 'מתי scripts מ-origin אחד יכולים לקרוא ל-API של origin אחר?',
  },
  'architecture.json:9': {
    hint_en: 'What tools and habits help you find and fix bugs?',
    hint_he: 'אילו כלים והרגלים עוזרים למצוא ולתקן באגים?',
  },
  'architecture.json:10': {
    hint_en: 'How do you verify code behaves as expected automatically?',
    hint_he: 'איך מאמתים שהקוד מתנהג כצפוי באופן אוטומטי?',
  },
  'architecture.json:11': {
    hint_en: 'What are the roles of Model, View, and Controller?',
    hint_he: 'מה התפקידים של Model, View ו-Controller?',
  },
  'architecture.json:12': {
    hint_en: 'Beyond translation — what locale-specific formats matter?',
    hint_he: 'מעבר לתרגום — אילו פורמטים תלויי locale חשובים?',
  },
  'architecture.json:13': {
    hint_en: 'How does OOP organize code around objects and core principles?',
    hint_he: 'איך OOP מארגן קוד סביב אובייקטים ועקרונות מרכזיים?',
  },
  'architecture.json:14': {
    hint_en: 'What older JavaScript features do classes build on?',
    hint_he: 'על אילו מנגנונים ישנים ב-JavaScript classes נשענים?',
  },
  'architecture.json:15': {
    hint_en: 'Who does this refer to inside a static method — the class or an instance?',
    hint_he: 'למי this מתייחס בתוך static method — למחלקה או ל-instance?',
  },
  'architecture.json:16': {
    hint_en: 'How does server-rendered HTML become interactive in the browser?',
    hint_he: 'איך HTML שרונדר בשרת הופך לאינטראקטיבי בדפדפן?',
  },
  'architecture.json:17': {
    hint_en: 'Why do teams choose server-side rendering for SEO and first paint?',
    hint_he: 'למה צוותים בוחרים ב-server-side rendering ל-SEO ול-first paint?',
  },
  'architecture.json:18': {
    hint_en: 'Why split a large backend into independently deployable services?',
    hint_he: 'למה לפצל backend גדול לשירותים שניתן לפרוס בנפרד?',
  },
  'architecture.json:19': {
    hint_en: 'How do separate services exchange messages or data?',
    hint_he: 'איך שירותים נפרדים מחליפים הודעות או נתונים?',
  },
  'architecture.json:20': {
    hint_en: 'Think auth, injection attacks, XSS, CSRF, and data protection.',
    hint_he: 'חשוב על auth, התקפות injection, XSS, CSRF והגנת מידע.',
  },
  'architecture.json:21': {
    hint_en: 'How do HTTP methods map to CRUD operations?',
    hint_he: 'איך מתודות HTTP ממופות לפעולות CRUD?',
  },
  'architecture.json:22': {
    hint_en: 'One uses many endpoints; the other lets clients choose exact fields.',
    hint_he: 'אחד משתמש ב-endpoints רבים; השני מאפשר לבחור שדות מדויקים.',
  },
  'architecture.json:23': {
    hint_en: 'Compare structured schemas with flexible, horizontally scalable storage.',
    hint_he: 'השוו סכמות מובנות מול אחסון גמיש עם scaling אופקי.',
  },
  'architecture.json:24': {
    hint_en: 'How do containers isolate apps from the host infrastructure?',
    hint_he: 'איך containers מבודדים אפליקציות מתשתית המארח?',
  },
  'architecture.json:25': {
    hint_en: 'Can a frontend developer work with any backend through APIs?',
    hint_he: 'האם מפתח frontend יכול לעבוד עם כל backend דרך APIs?',
  },
  'architecture.json:26': {
    hint_en: 'What does typeof return for an array, and how do you check properly?',
    hint_he: 'מה typeof מחזיר למערך, ואיך בודקים נכון?',
  },
  'architecture.json:27': {
    hint_en: 'Think TypeScript, RxJS, DI, router, forms, and directives.',
    hint_he: 'חשוב על TypeScript, RxJS, DI, router, forms ו-directives.',
  },
  'architecture.json:28': {
    hint_en: 'Describe a real problem, the approach you took, and the outcome.',
    hint_he: 'תאר בעיה אמיתית, את הגישה שלקחת, ואת התוצאה.',
  },
  'architecture.json:29': {
    hint_en: 'Think images, caching, fewer requests, memory leaks, and indexes.',
    hint_he: 'חשוב על תמונות, caching, פחות בקשות, memory leaks ו-indexes.',
  },
  'architecture.json:30': {
    hint_en: 'Start from UI actions and decide where each piece of state should live.',
    hint_he: 'התחל מפעולות UI והחלט היכן כל חלק מה-state צריך לחיות.',
  },
};

for (const filename of FILES) {
  const filePath = join(dataDir, filename);
  const questions = JSON.parse(readFileSync(filePath, 'utf8'));
  let updated = 0;

  for (const question of questions) {
    const key = `${filename}:${question.id}`;
    const hints = HINTS[key];

    if (!hints) {
      console.warn(`No hint defined for ${key}`);
      continue;
    }

    question.hint_en = hints.hint_en;
    question.hint_he = hints.hint_he;
    updated += 1;
  }

  writeFileSync(filePath, `${JSON.stringify(questions, null, 2)}\n`, 'utf8');
  console.log(`${filename}: ${updated} hint(s) updated`);
}
