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
  card(1, 'Architecture / Frontend',
    {
      q: 'Challenge: Name some benefits of using Vite',
      a: 'Vite powers modern framework CLIs and handles the dev server, compilation (Babel, SCSS), tests, and production builds.',
    },
    {
      q: 'אתגר: ציין יתרונות בשימוש ב-Vite',
      a: 'Vite מניע CLIs מודרניים של frameworks ומטפל ב-dev server, קומפילציה (Babel, SCSS), בדיקות ו-production builds.',
    },
  ),
  card(2, 'Architecture / Data Flow',
    {
      q: 'Challenge: What are two-way-data-binding and one-way-data-flow, and how are they different?',
      a: 'One-way data flow sends data in a single direction via props, store state, or observables. Two-way binding synchronizes form controls and the data model in both directions.',
    },
    {
      q: 'אתגר: מהם two-way-data-binding ו-one-way-data-flow, ומה ההבדל ביניהם?',
      a: 'one-way data flow שולח נתונים בכיוון אחד דרך props, store state או observables. two-way binding מסנכרן בקרות טופס ומודל הנתונים בשני הכיוונים.',
    },
  ),
  card(3, 'Architecture / State',
    {
      q: 'What is the purpose of flux / redux / vuex?',
      a: 'They manage frontend state in a store, provide a single source of truth, and enforce unidirectional data flow through a dispatcher.',
    },
    {
      q: 'מה מטרת flux / redux / vuex?',
      a: 'הם מנהלים state בצד הלקוח ב-store, מספקים single source of truth, ואוכפים זרימת נתונים חד-כיוונית דרך dispatcher.',
    },
  ),
  card(4, 'Architecture / State',
    {
      q: 'Name some easy features coming from state management',
      a: 'Session recording, analytics collection, error handling, optimistic mutations, undo, and collaborative editing.',
    },
    {
      q: 'ציין תכונות קלות שמגיעות מניהול state',
      a: 'הקלטת session, איסוף analytics, טיפול בשגיאות, optimistic mutations, undo ועריכה שיתופית.',
    },
  ),
  card(5, 'Architecture / Patterns',
    {
      q: 'Challenge: How to implement Undo?',
      a: 'Use a stack (LIFO): push states on change and pop to restore the previous state.',
    },
    {
      q: 'אתגר: איך מממשים Undo?',
      a: 'השתמשו ב-stack (LIFO): דחפו states בשינוי והוציאו (pop) כדי לשחזר את המצב הקודם.',
    },
    { code: "function createStack() {\n  const items = []\n  return { push(item) { items.push(item) }, pop() { return items.pop() } }\n}" },
  ),
  card(6, 'Architecture / Browser',
    {
      q: 'Challenge: What is feature detection?',
      a: 'Feature detection checks at runtime whether a capability is supported and provides graceful degradation if not.',
    },
    {
      q: 'אתגר: מהו feature detection?',
      a: 'feature detection בודק בזמן ריצה האם יכולת נתמכת ומספק graceful degradation אם לא.',
    },
    { code: 'if ("geolocation" in navigator) { /* use geolocation */ }' },
  ),
  card(7, 'Architecture / HTTP',
    {
      q: 'Challenge: Explain Ajax',
      a: 'AJAX (Asynchronous JavaScript And XML) uses JavaScript and HTTP requests so the frontend can communicate with the backend without full page reloads.',
    },
    {
      q: 'אתגר: הסבר Ajax',
      a: 'AJAX (Asynchronous JavaScript And XML) משתמש ב-JavaScript ובבקשות HTTP כדי שה-frontend יתקשר עם ה-backend בלי רענון מלא של הדף.',
    },
  ),
  card(8, 'Architecture / Security',
    {
      q: 'Challenge: Explain the same-origin policy with regards to JavaScript',
      a: 'A script from one origin is blocked from making AJAX calls to another origin unless CORS headers explicitly allow it.',
    },
    {
      q: 'אתגר: הסבר את same-origin policy בהקשר של JavaScript',
      a: 'script מ-origin אחד נחסם מביצוע קריאות AJAX ל-origin אחר אלא אם כותרות CORS מאפשרות זאת במפורש.',
    },
  ),
  card(9, 'Architecture / Debugging',
    {
      q: 'Challenge: How do you debug?',
      a: 'Use browser or IDE debuggers, logs, unit tests, console.log, documentation, Stack Overflow, and AI assistants.',
    },
    {
      q: 'אתגר: איך אתה מדבג?',
      a: 'השתמשו ב-debuggers של דפדפן או IDE, logs, unit tests, console.log, תיעוד, Stack Overflow ועוזרי AI.',
    },
  ),
  card(10, 'Architecture / Testing',
    {
      q: 'Challenge: Have you done testing?',
      a: 'Yes. Write unit tests for your code and use testing tools such as Jest to verify expected behavior.',
    },
    {
      q: 'אתגר: האם ביצעת testing?',
      a: 'כן. כתבו unit tests לקוד והשתמשו בכלי בדיקה כמו Jest לאימות התנהגות צפויה.',
    },
    { code: "it('adds 1 + 2 to equal 3', () => {\n  expect(sum(1, 2)).toBe(3)\n})" },
  ),
  card(11, 'Architecture / Patterns',
    {
      q: 'Challenge: What is MVC',
      a: 'Model-View-Controller separates application logic: Model manages data, View renders UI, and Controller handles input and updates the model and view.',
    },
    {
      q: 'אתגר: מהו MVC',
      a: 'Model-View-Controller מפריד לוגיקת אפליקציה: Model מנהל נתונים, View מרנדר UI, ו-Controller מטפל בקלט ומעדכן את ה-model וה-view.',
    },
  ),
  card(12, 'Architecture / i18n',
    {
      q: 'Challenge: What to consider when developing a multilingual site?',
      a: 'Number formats, currencies, units, date formats, timezones, text direction, and translation.',
    },
    {
      q: 'אתגר: מה לקחת בחשבון בפיתוח אתר רב-לשוני?',
      a: 'פורמטי מספרים, מטבעות, יחידות, פורמטי תאריך, אזורי זמן, כיוון טקסט ותרגום.',
    },
  ),
  card(13, 'Architecture / OOP',
    {
      q: 'Challenge: What is OOP?',
      a: 'Object-Oriented Programming organizes software around objects that combine data and behavior, using concepts like encapsulation, inheritance, and polymorphism.',
    },
    {
      q: 'אתגר: מהו OOP?',
      a: 'Object-Oriented Programming מארגן תוכנה סביב אובייקטים שמשלבים נתונים והתנהגות, עם מושגים כמו encapsulation, inheritance ו-polymorphism.',
    },
  ),
  card(14, 'Architecture / OOP',
    {
      q: 'Challenge: What is an OOP class in JS?',
      a: 'A JavaScript class is syntactic sugar based on constructor functions and prototypes.',
    },
    {
      q: 'אתגר: מהי OOP class ב-JS?',
      a: 'class ב-JavaScript הוא syntactic sugar המבוסס על constructor functions ו-prototypes.',
    },
  ),
  card(15, 'Architecture / OOP',
    {
      q: "Challenge: Why can't I use 'this' inside a static method",
      a: 'Static methods belong to the class itself, not to instances, so this inside a static method does not refer to an instance object.',
    },
    {
      q: "אתגר: למה אי אפשר להשתמש ב-'this' בתוך static method",
      a: 'static methods שייכים למחלקה עצמה ולא ל-instances, ולכן this בתוך static method לא מתייחס לאובייקט instance.',
    },
  ),
  card(16, 'Architecture / SSR',
    {
      q: 'Challenge: What is Hydration',
      a: 'Hydration is the process of attaching interactivity and event handlers to server-rendered HTML so the app becomes interactive in the browser.',
    },
    {
      q: 'אתגר: מהו Hydration',
      a: 'hydration הוא התהליך של חיבור אינטראקטיביות ו-event handlers ל-HTML שרונדר בשרת, כך שהאפליקציה הופכת לאינטראקטיבית בדפדפן.',
    },
  ),
  card(17, 'Architecture / SSR',
    {
      q: "Challenge: What's the story of SSR",
      a: 'SSR is largely about SEO and faster first paint. Solutions include template engines, PHP, frameworks like Next/Nuxt, and prerendering for bots.',
    },
    {
      q: 'אתגר: מה הסיפור של SSR',
      a: 'SSR עוסק בעיקר ב-SEO וב-first paint מהיר יותר. פתרונות כוללים template engines, PHP, frameworks כמו Next/Nuxt ו-prerendering לבוטים.',
    },
  ),
  card(18, 'Architecture / Microservices',
    {
      q: 'Challenge: Why would you break the backend to Micro Services?',
      a: 'Microservices enable rapid, frequent, and reliable delivery of large, complex applications by splitting them into independently deployable services.',
    },
    {
      q: 'אתגר: למה לפצל את ה-backend ל-Micro Services?',
      a: 'microservices מאפשרים אספקה מהירה, תכופה ואמינה של אפליקציות גדולות ומורכבות על ידי פיצול לשירותים שניתן לפרוס בנפרד.',
    },
  ),
  card(19, 'Architecture / Microservices',
    {
      q: 'Challenge: How do Micro Services communicate?',
      a: 'Microservices often communicate through message brokers or HTTP APIs for cross-service communication.',
    },
    {
      q: 'אתגר: איך Micro Services מתקשרים?',
      a: 'microservices לעיתים מתקשרים דרך message brokers או HTTP APIs לתקשורת בין שירותים.',
    },
  ),
  card(20, 'Architecture / Security',
    {
      q: 'Challenge: Name some Security issues',
      a: 'Authentication, authorization, information leakage, encryption, bots/captchas, DOS, XSS, SQL/NoSQL injection, and CSRF.',
    },
    {
      q: 'אתגר: ציין נושאי אבטחה',
      a: 'authentication, authorization, דליפת מידע, encryption, bots/captchas, DOS, XSS, SQL/NoSQL injection ו-CSRF.',
    },
  ),
  card(21, 'Architecture / APIs',
    {
      q: 'Challenge: What is REST API',
      a: 'REST is an architectural style for backend APIs. Common HTTP methods POST, GET, PUT, and DELETE map to CRUDL operations.',
    },
    {
      q: 'אתגר: מהו REST API',
      a: 'REST הוא סגנון ארכיטקטוני ל-backend APIs. מתודות HTTP נפוצות POST, GET, PUT ו-DELETE ממופות לפעולות CRUDL.',
    },
  ),
  card(22, 'Architecture / APIs',
    {
      q: 'Challenge: REST API vs. GraphQL',
      a: 'REST exposes multiple endpoints with fixed response shapes. GraphQL uses a single endpoint where clients request exactly the fields they need.',
    },
    {
      q: 'אתגר: REST API לעומת GraphQL',
      a: 'REST חושף endpoints מרובים עם צורות תגובה קבועות. GraphQL משתמש ב-endpoint יחיד שבו clients מבקשים בדיוק את השדות שהם צריכים.',
    },
  ),
  card(23, 'Architecture / Databases',
    {
      q: 'Challenge: Relational (SQL) vs Non-Relational Databases (NoSQL)',
      a: 'SQL databases use structured schemas and relations with ACID guarantees. NoSQL databases favor flexible schemas and horizontal scaling for unstructured or rapidly changing data.',
    },
    {
      q: 'אתגר: מסדי נתונים Relational (SQL) לעומת Non-Relational (NoSQL)',
      a: 'מסדי SQL משתמשים בסכמות מובנות ויחסים עם ערבויות ACID. NoSQL מעדיפים סכמות גמישות ו-scaling אופקי לנתונים לא מובנים או משתנים במהירות.',
    },
  ),
  card(24, 'Architecture / DevOps',
    {
      q: 'Challenge: What are Docker containers?',
      a: 'Docker packages applications in loosely isolated containers, separating apps from infrastructure and reducing delay between writing code and running it in production.',
    },
    {
      q: 'אתגר: מהם Docker containers?',
      a: 'Docker אורז אפליקציות ב-containers מבודדים באופן רופף, מפריד אפליקציות מתשתית ומקצר את הפער בין כתיבת קוד להרצה ב-production.',
    },
  ),
  card(25, 'Architecture / Career',
    {
      q: 'Challenge: Our backend in another technology — Is it a problem for you?',
      a: 'No. A frontend developer should be able to collaborate with any backend stack through clear API contracts.',
    },
    {
      q: 'אתגר: ה-backend שלנו בטכנולוגיה אחרת — האם זו בעיה עבורך?',
      a: 'לא. מפתח frontend צריך לשתף פעולה עם כל backend stack דרך חוזי API ברורים.',
    },
  ),
  card(26, 'Architecture / JavaScript',
    {
      q: 'Challenge: What is the type of the array?',
      a: 'In JavaScript, arrays are objects. typeof [] returns "object", and Array.isArray([]) returns true.',
    },
    {
      q: 'אתגר: מהו ה-type של מערך?',
      a: 'ב-JavaScript מערכים הם objects. typeof [] מחזיר "object", ו-Array.isArray([]) מחזיר true.',
    },
  ),
  card(27, 'Architecture / Angular',
    {
      q: 'Challenge: Name the features of Angular',
      a: 'TypeScript and RxJS, signals, decorators, NgModules/standalone components, structural and attribute directives, components, dependency injection, advanced router features, two-way binding, reactive forms, and pipes including async.',
    },
    {
      q: 'אתגר: ציין את התכונות של Angular',
      a: 'TypeScript ו-RxJS, signals, decorators, NgModules/standalone components, structural ו-attribute directives, components, dependency injection, יכולות router מתקדמות, two-way binding, reactive forms ו-pipes כולל async.',
    },
  ),
  card(28, 'Architecture / Career',
    {
      q: 'Challenge: Describe a tech challenge and how you dealt with it',
      a: 'Describe a real challenge such as complex state management, marketplace booking flows, camera access, or reusable UI, and explain the concrete approach you used to solve it.',
    },
    {
      q: 'אתגר: תאר אתגר טכנולוגי ואיך התמודדת איתו',
      a: 'תארו אתגר אמיתי כמו ניהול state מורכב, תהליכי הזמנה ב-marketplace, גישה למצלמה או UI לשימוש חוזר, והסבירו את הגישה הקונקרטית שבה השתמשתם לפתרון.',
    },
  ),
  card(29, 'Architecture / Performance',
    {
      q: 'Challenge: Web optimizations',
      a: 'Examples include optimizing images, reducing requests, adding caching and compression, fixing memory leaks, removing unused listeners, effective pagination, and adding database indexes.',
    },
    {
      q: 'אתגר: אופטימיזציות web',
      a: 'דוגמאות: אופטימיזציה של תמונות, הפחתת בקשות, הוספת caching ו-compression, תיקון memory leaks, הסרת listeners לא בשימוש, pagination יעיל והוספת database indexes.',
    },
  ),
  card(30, 'Architecture / Design',
    {
      q: 'Challenge: Plan Model and data-flow based on UI',
      a: 'Identify UI entities and user actions, define models and state shape, map data flow between components and services, and decide where state lives (local, lifted, or global store).',
    },
    {
      q: 'אתגר: תכנון Model ו-data-flow על בסיס UI',
      a: 'זהו ישויות UI ופעולות משתמש, הגדירו models וצורת state, מפו data flow בין components ו-services, והחליטו היכן ה-state חי (local, lifted או global store).',
    },
  ),
];
