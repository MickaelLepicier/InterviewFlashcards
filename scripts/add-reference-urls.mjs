import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const references = {
  javascript: {
    1: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null',
    2: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in',
    3: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
    4: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes',
    5: 'https://developer.mozilla.org/en-US/docs/Glossary/IIFE',
    6: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let',
    7: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
    8: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    9: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
    10: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties',
    11: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#anonymous_functions',
    12: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
    13: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function',
    14: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake',
    15: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake',
    16: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call',
    17: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind',
    18: 'https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function',
    19: 'https://developer.mozilla.org/en-US/docs/Glossary/Mutable',
    20: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    21: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    22: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    23: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify',
    24: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex',
    25: 'https://www.geeksforgeeks.org/bubble-sort/',
    26: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
    27: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion',
    28: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures',
    29: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    30: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling',
    31: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation',
    32: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText',
    33: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
    34: 'https://nodejs.org/api/events.html',
    35: 'https://nodejs.org/api/util.html#utilpromisifyoriginal',
    36: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
    37: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
    38: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    39: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
    40: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event',
    41: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
  },
  html: {
    1: 'https://developer.mozilla.org/en-US/docs/Glossary/Entity',
    2: 'https://developer.mozilla.org/en-US/docs/Glossary/Doctype',
    3: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
    4: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API',
    5: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage_API',
    6: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage',
    7: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
  },
  css: {
    1: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
    2: 'https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text',
    3: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
    4: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing',
    5: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes',
    6: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries',
    7: 'https://developer.mozilla.org/en-US/docs/Web/CSS/float',
    8: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox',
    9: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design',
    10: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade',
    11: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing',
    12: 'https://developer.mozilla.org/en-US/docs/Web/CSS/display',
  },
  react: {
    1: 'https://react.dev/learn/preserving-and-resetting-state',
    2: 'https://react.dev/learn/writing-markup-with-jsx',
    3: 'https://react.dev/learn/lifecycle-of-reactive-effects',
    4: 'https://react.dev/reference/react/useRef',
    5: 'https://react.dev/learn/passing-data-deeply-with-context',
    6: 'https://react.dev/reference/react/memo',
    7: 'https://react.dev/reference/react/useMemo',
    8: 'https://react.dev/reference/react/useCallback',
    9: 'https://react.dev/learn/typescript#typing-component-props',
    10: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
    11: 'https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow',
    12: 'https://legacy.reactjs.org/docs/higher-order-components.html',
    13: 'https://react.dev/learn/managing-state',
    14: 'https://react.dev/reference/react/useContext',
    15: 'https://react.dev/reference/react/useRef',
  },
  architecture: {
    1: 'https://vite.dev/guide/why.html',
    2: 'https://react.dev/learn/sharing-state-between-components',
    3: 'https://redux.js.org/understanding/thinking-in-redux/three-principles',
    4: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts',
    5: 'https://redux.js.org/usage/implementing-undo-history',
    6: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection',
    7: 'https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX',
    8: 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy',
    9: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools',
    10: 'https://jestjs.io/docs/getting-started',
    11: 'https://developer.mozilla.org/en-US/docs/Glossary/MVC',
    12: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang',
    13: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming',
    14: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes',
    15: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static',
    16: 'https://react.dev/reference/react-dom/client/hydrateRoot',
    17: 'https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering',
    18: 'https://microservices.io/patterns/microservices.html',
    19: 'https://microservices.io/patterns/communication-style/messaging.html',
    20: 'https://owasp.org/www-project-top-ten/',
    21: 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
    22: 'https://graphql.org/learn/',
    23: 'https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql',
    24: 'https://docs.docker.com/get-started/docker-overview/',
    25: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server',
    26: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
    27: 'https://angular.dev/overview',
    28: 'https://www.techinterviewhandbook.org/behavioral-questions/',
    29: 'https://web.dev/articles/fast',
    30: 'https://react.dev/learn/thinking-in-react',
  },
};

// Prefer React virtual DOM docs for q1
references.react[1] = 'https://react.dev/learn/understanding-ui-as-a-tree';

let total = 0;
for (const [subject, urls] of Object.entries(references)) {
  const path = join(root, 'data', `${subject}.json`);
  const data = JSON.parse(readFileSync(path, 'utf8'));

  for (const item of data) {
    const url = urls[item.id];
    if (!url) throw new Error(`Missing reference_url for ${subject} id ${item.id}`);
    item.reference_url = url;
    total += 1;
  }

  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated ${subject}.json (${data.length} questions)`);
}

console.log(`Done. Added reference_url to ${total} questions.`);
