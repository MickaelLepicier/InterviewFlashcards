// Auto-generated core semantic phrases per question.
// Run: node scripts/build-core-phrases.mjs

const CORE_PHRASES_BY_ID = {
  "1": {
    "he": [
      "Undefined אומר שהמשתנה הוגדר אך עדיין לא שויך לו ערך (ברירת המחדל של השפה).",
      "Null הוא ערך מכוון כדי לייצג משתנה 'ריק' או חוסר ערך."
    ],
    "en": [
      "Undefined means a variable has been declared but has not yet been assigned a value.",
      "Null is an intentional assignment representing the absence of any value."
    ]
  },
  "2": {
    "he": [
      "הפלט יהיה האינדקסים כמחרוזות: \"0\", \"1\", \"2\".",
      "לולאת for...in עוברת על ה-Keys (האינדקסים) של המערך ולא על הערכים שלו.",
      "בשביל לקבל את הערכים עצמם יש להשתמש ב-for...of."
    ],
    "en": [
      "The output will be the indices as strings: \"0\", \"1\", \"2\".",
      "A for...in loop iterates over the enumerable properties (keys/indices) of an array, not its values.",
      "Use for...of for values."
    ]
  },
  "3": {
    "he": [
      "מנגנון שבו המנוע מזיז את ההצהרות של משתנים ופונקציות לראש הסקופ שלהם לפני הרצת הקוד.",
      "פונקציות מורמות במלואן, var מורם עם undefined, ו-let/const מורמים ל-TDZ ויזרקו שגיאה."
    ],
    "en": [
      "A mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase.",
      "Functions are fully hoisted, var is hoisted as undefined, and let/const are hoisted into the TDZ."
    ]
  },
  "4": {
    "he": [
      "מנגנון הירושה של השפה.",
      "כל אובייקט או טיפוס נתונים מקושר לאובייקט אב-טיפוס (Prototype) שממנו הוא מקבל את כל הפונקציות המובנות שלו (למשל toUpperCase במחרוזות)."
    ],
    "en": [
      "The inheritance mechanism in JavaScript.",
      "Every object or data type is linked to a prototype object, from which it inherits built-in methods and properties."
    ]
  },
  "5": {
    "he": [
      "פונקציה שרצה מיד ברגע שהיא מוגדרת.",
      "שימשה בעבר בעיקר ליצירת סקופ מבודד ומניעת זליגה של משתנים לסקופ הגלובלי (לפני עידן let/const ו-Modules)."
    ],
    "en": [
      "Stands for Immediately Invoked Function Expression.",
      "A function that runs as soon as it is defined.",
      "Historically used to create local scope and avoid polluting the global namespace."
    ]
  },
  "6": {
    "he": [
      "Scope: ה-var הוא Function-scoped, ה-let הוא Block-scoped (בתוך {}).",
      "Hoisting: ה-var מאותחל כ-undefined, ה-let מורם ללא אתחול (TDZ).",
      "הצהרה מחדש: ניתן להצהיר מחדש על var באותו סקופ, אך let יזרוק שגיאה."
    ],
    "en": [
      "Scope: var is function-scoped, let is block-scoped.",
      "Hoisting: var is initialized as undefined, let is uninitialized (TDZ).",
      "Redeclaration: var allows redeclaring in the same scope, let throws an error."
    ]
  },
  "7": {
    "he": [
      "Spread מפרק/מפזר מערך או אובייקט לאיברים בודדים (להעתקה או חיבור).",
      "Rest אוסף איברים בודדים לתוך מערך אחד (בפרמטרים של פונקציה או בפירוק)."
    ],
    "en": [
      "Spread unpacks/spreads elements of an array or object into individual items.",
      "Rest packs/gathers multiple separate elements into a single array."
    ]
  },
  "8": {
    "he": [
      "תחביר מודרני המאפשר לשלוף בקלות ובשורה אחת ערכים מתוך מערכים (לפי מיקום) או תכונות מתוך אובייקטים (לפי שם המפתח), ולשמור אותם ישירות במשתנים."
    ],
    "en": [
      "A syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables using a clean and concise single-line expression."
    ]
  },
  "9": {
    "he": [
      "מצב שבו פונקציה פנימית 'זוכרת' ושומרת על גישה למשתנים של הפונקציה החיצונית שעטפה אותה, גם לאחר שהפונקציה החיצונית כבר סיימה לרוץ ויצאה מהזיכרון."
    ],
    "en": [
      "A closure is when an inner function retains access to the variables of its outer enclosing function, even after the outer function has finished executing and returned."
    ]
  },
  "10": {
    "he": [
      "יש שתי דרכים מרכזיות:",
      "במחלקות (Classes) על ידי הוספת סולמית (#) לפני שם המשתנה.",
      "בפונקציות על ידי שימוש ב-Closure שחוסם גישה ישירה למשתנה מבחוץ."
    ],
    "en": [
      "Two main ways:",
      "In Classes, using the '#' prefix before the variable name.",
      "In functions, using Closures to encapsulate variables and expose them only via methods."
    ]
  },
  "11": {
    "he": [
      "כאשר אנו צריכים להעביר פונקציה כארגומנט לפונקציה מסדר גבוה (Higher-Order Function) וההפניה אליה נדרשת פעם אחת בלבד (כמו פונקציות Callback במתודות מערכים או ב-setTimeout)."
    ],
    "en": [
      "When a function reference is only needed once.",
      "Anonymous functions are frequently passed as arguments to higher-order functions like Array.map or timers."
    ]
  },
  "12": {
    "he": [
      "פונקציות חץ הן תמיד אנונימיות.",
      "אין להן אובייקט arguments משלהן.",
      "אין להן this משלהן – הן יורשות את ה-this מההקשר שבו הן נוצרו (Lexical this)."
    ],
    "en": [
      "Arrow functions are always anonymous.",
      "They do not have their own arguments keyword.",
      "They do not have their own this context; instead, they inherit this lexically from the enclosing creation context."
    ]
  },
  "13": {
    "he": [
      "ההבדל הוא Hoisting.",
      "פונקציות מוצהרות (Declarations) מונפות במלואן לראש הסקופ וניתן לקרוא להן לפני הגדרתן.",
      "ביטויי פונקציה (Expressions) השמורים בתוך משתנה לא נגישים לפני שורת יצירתם."
    ],
    "en": [
      "The main difference is Hoisting.",
      "Function declarations are hoisted completely, meaning they can be called before they appear.",
      "Function expressions are not hoisted and cannot be accessed before assignment."
    ]
  },
  "14": {
    "he": [
      "כשמייצרים קולבקים אסינכרוניים בלולאה עם var, כל האיטרציות חולקות את אותו משתנה (כי var הוא פונקציונלי).",
      "כשהקולבק רץ, הלולאה כבר הסתיימה והערך יהיה האחרון בלבד.",
      "הפתרון: שימוש ב-let שיש לו סקופ בלוקי (יוצר משתנה חדש לכל איטרציה)."
    ],
    "en": [
      "When using 'var' inside a loop with async callbacks, all callbacks share the same variable reference.",
      "By the time they execute, the loop has finished, using the final value.",
      "Using 'let' fixes this by creating a new block scope for each iteration."
    ]
  },
  "15": {
    "he": [
      "שתיהן משמשות להרצת פונקציה תוך קביעה ידנית של ה-this שלה.",
      "ההבדל הוא בצורת העברת הפרמטרים: ב-call מעבירים את הארגומנטים הנוספים מופרדים בפסיקים, וב-apply מעבירים אותם ביחד כתוך מערך אחד."
    ],
    "en": [
      "Both execute a function while explicitly setting its 'this' context.",
      "The difference is how they accept additional arguments: .call() accepts arguments separated by commas, while .apply() accepts them as a single array."
    ]
  },
  "16": {
    "he": [
      "המתודה .bind() אינה מריצה את הפונקציה מיד.",
      "במקום זאת, היא מחזירה פונקציה חדשה לחלוטין, שבה הקשר ה-this והארגומנטים ההתחלתיים שנשלחו אליה מקובעים (Bound) לתמיד."
    ],
    "en": [
      "It does not execute the function immediately.",
      "Instead, it returns a brand new function with its 'this' context and initial arguments permanently locked (bound) to the specified values."
    ]
  },
  "17": {
    "he": [
      "פונקציה שמקבלת פונקציה אחרת כארגומנט (Callback), או מחזירה פונקציה חדשה כתוצאה של הריצה שלה (או שניהם).",
      "דוגמאות נפוצות: map, filter, reduce."
    ],
    "en": [
      "A function that either takes one or more functions as arguments (callbacks), or returns a function as its result (or both).",
      "Classic examples include Array.map and Array.filter."
    ]
  },
  "18": {
    "he": [
      "אובייקטים ומערכים הם Mutable (ניתנים לשינוי ישיר בזיכרון).",
      "טיפוסים פרימיטיביים כמו Strings הם Immutable (לא ניתנים לשינוי - מתודות עליהם מחזירות מחרוזת חדשה).",
      "בפיתוח מודרני (כמו React) נהוג לעבוד בצורה אימוטבילית בעזרת Spread Operator ליצירת עותקים חדשים."
    ],
    "en": [
      "Objects and arrays are mutable (can be changed directly in memory).",
      "Primitive values, like strings, are immutable (methods return new values).",
      "In modern dev (like React), working immutably using the spread operator to clone data is recommended."
    ]
  },
  "19": {
    "he": [
      "מתודות ותיקות כמו sort() ו-reverse() משנות את המערך המקורי.",
      "כדי לשמור על אימוטביליות, הוכנסו לשפה מתודות מודרניות חלופיות שמבצעות את אותן פעולות אך מחזירות עותק מערך חדש: toSorted(), toReversed() ו-toSpliced()."
    ],
    "en": [
      "Traditional methods like sort() and reverse() mutate the original array.",
      "To enforce immutability, modern JavaScript introduces built-in alternatives that return a brand-new modified array: toSorted(), toReversed(), and toSpliced()."
    ]
  },
  "20": {
    "he": [
      "פונקציית reduce מקבלת מערך, פונקציית קולבק וערך ראשוני.",
      "היא רצה בלולאה על איברי המערך, מעדכנת את ה-accumulator בכל שלב, ומחזירה ערך בודד סופי.",
      "אם לא סופק ערך ראשוני, האיבר הראשון במערך משמש כערך ההתחלתי."
    ],
    "en": [
      "The reduce function executes a callback function on each element of the array, passing in the return value from the calculation on the preceding element.",
      "If no initial value is provided, it uses the first element of the array as the starting accumulator."
    ]
  },
  "21": {
    "he": [
      "נשתמש ברקורסיה בשילוב עם reduce.",
      "בכל איטרציה נבדוק אם האיבר הנוכחי הוא מערך בעזרת Array.isArray().",
      "אם כן, נקרא לפונקציה שוב באופן רקורסיבי ונפרוש אותו, ואם לא – נדחוף אותו למערך התוצאה."
    ],
    "en": [
      "To completely flatten a nested array of unknown depth, we use a recursive approach combined with reduce.",
      "If an item is an array, we recursively call the function and spread the results; otherwise, we accumulate the primitive item."
    ]
  },
  "22": {
    "he": [
      "לא, יש שתי מגבלות מרכזיות:",
      "אובייקטים עם הפניות מעגליות (Circular References) יגרמו לשגיאה מסוג TypeError.",
      "פונקציות, ערכי undefined וסימבולים אינם נתמכים בפורמט JSON ויושמטו/יימחקו לחלוטין מהתוצאה."
    ],
    "en": [
      "No, you cannot.",
      "First, objects with circular references will throw a TypeError.",
      "Second, functions, undefined values, and Symbols are not valid JSON data types and will be completely omitted."
    ]
  },
  "23": {
    "he": [
      "הסיבוכיות צריכה להיות O(log N).",
      "מכיוון שהמערך כבר ממוין, אין צורך לסרוק אותו איבר-איבר (O(N)).",
      "נשתמש באלגוריתם 'חיפוש בינארי' (Binary Search) שחוצה את המערך לשניים בכל שלב ומגיע לתוצאה במהירות עצומה."
    ],
    "en": [
      "The time complexity should be O(log N).",
      "Since the array is already sorted, we can avoid linear search (O(N)) and use Binary Search instead, which halves the search space with each step."
    ]
  },
  "24": {
    "he": [
      "מיון בועות עובד על ידי השוואת כל זוג איברים סמוכים והחלפתם (Swap) אם הם לא בסדר הנכון.",
      "חוזרים על כך באמצעות לולאות מקוננות.",
      "סיבוכיות הזמן במקרה הגרוע והממוצע היא O(N²), מה שהופך אותו ללא יעיל למערכים גדולים."
    ],
    "en": [
      "Bubble Sort loops through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      "This is repeated using nested loops.",
      "Its time complexity is O(N²), making it inefficient for large datasets."
    ]
  },
  "25": {
    "he": [
      "הסיבוכיות האופטימלית היא O(N).",
      "הדרך היעילה ביותר היא להשתמש ב-Set – מבנה נתונים מובנה ב-JavaScript שמונע כפילויות באופן אוטומטי בזמן ריצה ליניארי, ואז להמיר אותו חזרה למערך בעזרת ה-Spread Operator."
    ],
    "en": [
      "The optimal time complexity is O(N).",
      "The most efficient way to achieve this is by using a 'Set'—a built-in collection that automatically enforces unique values, then converting it back to an array using the spread operator."
    ]
  },
  "26": {
    "he": [
      "חישוב רקורסיבי רגיל הוא בעל סיבוכיות גרועה של O(2^N).",
      "כדי לייעל אותו ל-O(N), משתמשים ב-Memoization (מזכור) – שמירת תוצאות של חישובים קודמים באובייקט זיכרון (Cache), כך שאם נצטרך לחשב איבר שכבר חושב בעבר, פשוט נשלוף אותו מהזיכרון ברגע."
    ],
    "en": [
      "A naive recursive implementation has a time complexity of O(2^N).",
      "To optimize it to O(N), we apply 'Memoization'—storing computed results in a cache object, preventing the function from executing the same recursive sub-problems multiple times."
    ]
  }
};

export function getCorePhrases(cardId, lang) {
  const phrases = CORE_PHRASES_BY_ID[cardId];
  if (!phrases) return [];
  return lang === 'he' ? phrases.he : phrases.en;
}
