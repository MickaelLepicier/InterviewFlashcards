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
  card(1, 'React / Core',
    {
      q: 'Challenge: what is the Virtual-Dom?',
      a: 'The virtual DOM is a lightweight JavaScript copy of the real DOM. React updates the virtual DOM first, then applies only the differences to the real DOM as an optimization.',
    },
    {
      q: 'אתגר: מהו Virtual-DOM?',
      a: 'virtual DOM הוא עותק JavaScript קל של ה-DOM האמיתי. React מעדכן קודם את ה-virtual DOM, ואז מחיל רק את ההבדלים על ה-DOM האמיתי כאופטימיזציה.',
    },
  ),
  card(2, 'React / Core',
    {
      q: 'Challenge: What is JSX?',
      a: 'JSX is a syntax extension to JavaScript that allows HTML-like markup inside JS code.',
    },
    {
      q: 'אתגר: מהו JSX?',
      a: 'JSX הוא הרחבת תחביר ל-JavaScript שמאפשרת markup דמוי HTML בתוך קוד JS.',
    },
    { code: "const heading = <h1>Hello JSX</h1>" },
  ),
  card(3, 'React / Lifecycle',
    {
      q: 'Challenge: Describe React Component life-cycle',
      a: 'In hooks: mount/update via useEffect, cleanup via the function returned from useEffect. In class components: componentDidMount, componentDidUpdate, and componentWillUnmount.',
    },
    {
      q: 'אתגר: תאר את מחזור החיים של React Component',
      a: 'ב-hooks: mount/update דרך useEffect, cleanup דרך הפונקציה שמוחזרת מ-useEffect. ב-class components: componentDidMount, componentDidUpdate ו-componentWillUnmount.',
    },
  ),
  card(4, 'React / Hooks',
    {
      q: 'Challenge: When would you use refs?',
      a: 'Use refs to store values that do not affect rendering, such as DOM nodes, timeout IDs, or other imperative handles.',
    },
    {
      q: 'אתגר: מתי משתמשים ב-refs?',
      a: 'משתמשים ב-refs לשמירת ערכים שלא משפיעים על rendering, כמו DOM nodes, timeout IDs או handles אימפרטיביים אחרים.',
    },
    { code: "const inputEl = useRef(null)\ninputEl.current.focus()" },
  ),
  card(5, 'React / Context',
    {
      q: 'Challenge: What is React Context?',
      a: 'Context passes data through the component tree without manually passing props at every level, useful for theme, locale, or authenticated user.',
    },
    {
      q: 'אתגר: מהו React Context?',
      a: 'Context מעביר נתונים דרך עץ הקומפוננטות בלי להעביר props ידנית בכל רמה, שימושי ל-theme, locale או משתמש מאומת.',
    },
  ),
  card(6, 'React / Performance',
    {
      q: 'Challenge: What is React memo?',
      a: 'memo skips re-rendering a component when its props are unchanged.',
    },
    {
      q: 'אתגר: מהו React memo?',
      a: 'memo מדלג על re-render של קומפוננטה כשה-props שלה לא השתנו.',
    },
    { code: "const Greeting = memo(function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>\n})" },
  ),
  card(7, 'React / Hooks',
    {
      q: 'Challenge: What is useMemo?',
      a: 'useMemo caches the result of a calculation between re-renders until dependencies change.',
    },
    {
      q: 'אתגר: מהו useMemo?',
      a: 'useMemo שומר ב-cache את תוצאת חישוב בין re-renders עד שה-dependencies משתנים.',
    },
    { code: "const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])" },
  ),
  card(8, 'React / Hooks',
    {
      q: 'Challenge: What is useCallback?',
      a: 'useCallback caches a function definition between re-renders until dependencies change.',
    },
    {
      q: 'אתגר: מהו useCallback?',
      a: 'useCallback שומר ב-cache הגדרת פונקציה בין re-renders עד שה-dependencies משתנים.',
    },
    { code: "const handleSubmit = useCallback((orderDetails) => { /* ... */ }, [productId])" },
  ),
  card(9, 'React / Props',
    {
      q: 'Challenge: What is props-validation?',
      a: 'PropTypes and defaultProps let you validate and default props passed from a parent component.',
    },
    {
      q: 'אתגר: מהו props-validation?',
      a: 'PropTypes ו-defaultProps מאפשרים לאמת ולהגדיר ברירות מחדל ל-props שמועברים מקומפוננטת הורה.',
    },
    { code: "MyCmp.propTypes = { name: PropTypes.string.isRequired }\nMyCmp.defaultProps = { count: 0 }" },
  ),
  card(10, 'React / Hooks',
    {
      q: 'Challenge: when should you code a custom-hook?',
      a: 'Custom hooks extract reusable stateful logic at the component layer, such as online status or data fetching patterns.',
    },
    {
      q: 'אתגר: מתי כדאי לכתוב custom-hook?',
      a: 'custom hooks מחלצים לוגיקה stateful לשימוש חוזר בשכבת הקומפוננטות, כמו סטטוס online או דפוסי data fetching.',
    },
    { code: "export function useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(true)\n  useEffect(() => { /* listeners */ }, [])\n  return isOnline\n}" },
  ),
  card(11, 'React / Redux',
    {
      q: 'Challenge: List down the components of Redux',
      a: 'Redux is composed of Actions, Reducers, Store, and View.',
    },
    {
      q: 'אתגר: פרט את רכיבי Redux',
      a: 'Redux מורכב מ-Actions, Reducers, Store ו-View.',
    },
  ),
  card(12, 'React / Patterns',
    {
      q: 'Challenge: What are Higher-Order Components?',
      a: 'A higher-order component is a function that takes a component and returns a new enhanced component, such as withRouter or connect.',
    },
    {
      q: 'אתגר: מהם Higher-Order Components?',
      a: 'higher-order component היא פונקציה שמקבלת קומפוננטה ומחזירה קומפוננטה משופרת חדשה, כמו withRouter או connect.',
    },
    { code: 'const EnhancedComponent = higherOrderComponent(WrappedComponent)' },
  ),
  card(13, 'React / Components',
    {
      q: 'Challenge: Code an Accordion',
      a: 'An accordion group tracks the active item index and passes isActive and onToggle to each AccordionItem, often using React.Children.map and cloneElement.',
    },
    {
      q: 'אתגר: קוד Accordion',
      a: 'קבוצת accordion עוקבת אחר אינדקס הפריט הפעיל ומעבירה isActive ו-onToggle לכל AccordionItem, לעיתים עם React.Children.map ו-cloneElement.',
    },
    { code: "<AccordionGroup>\n  <AccordionItem title=\"The Team\">...</AccordionItem>\n</AccordionGroup>" },
  ),
];
