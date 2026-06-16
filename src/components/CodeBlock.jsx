import CopyButton from './CopyButton';

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'in', 'of',
  'class', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof',
]);

function highlightLine(line) {
  const tokens = [];
  let i = 0;

  while (i < line.length) {
    if (line.slice(i, i + 2) === '//') {
      tokens.push({ type: 'comment', text: line.slice(i) });
      break;
    }

    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push({ type: 'string', text: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push({ type: 'number', text: line.slice(i, j) });
      i = j;
      continue;
    }

    if (/[a-zA-Z_$#]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w$#]/.test(line[j])) j++;
      const word = line.slice(i, j);
      let type = 'plain';
      if (KEYWORDS.has(word)) type = 'keyword';
      else if (line[j] === '(') type = 'function';
      else if (['console', 'String', 'Array', 'Object'].includes(word)) type = 'builtin';
      tokens.push({ type, text: word });
      i = j;
      continue;
    }

    if ('{}[]();=<>!&|+-*/%?:.,'.includes(line[i])) {
      tokens.push({ type: 'operator', text: line[i] });
      i++;
      continue;
    }

    tokens.push({ type: 'plain', text: line[i] });
    i++;
  }

  return tokens;
}

function Token({ type, text }) {
  const classMap = {
    keyword: 'code-keyword',
    string: 'code-string',
    number: 'code-number',
    comment: 'code-comment',
    function: 'code-function',
    builtin: 'code-builtin',
    operator: 'code-operator',
  };

  return (
    <span className={classMap[type] ?? 'text-slate-300'}>{text}</span>
  );
}

export default function CodeBlock({ code, copyLabel, copiedLabel }) {
  if (!code) return null;

  const lines = code.split('\n');

  return (
    <div
      dir="ltr"
      className="mt-4 overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1117] text-left shadow-inner"
    >
      <div className="flex items-center gap-1.5 border-b border-slate-700/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto flex items-center gap-2">
          <CopyButton
            text={code}
            label={copyLabel}
            copiedLabel={copiedLabel}
            className="border-slate-600 bg-slate-800 text-slate-300 hover:border-violet-500 hover:bg-slate-700 hover:text-white"
          />
          <span className="font-mono text-xs text-slate-500">JavaScript</span>
        </span>
      </div>
      <pre className="select-text overflow-x-auto p-4 text-left font-mono text-[13px] leading-relaxed text-slate-300">
        <code>
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="table-row">
              <span className="table-cell select-none pr-4 text-right text-slate-600">
                {lineIndex + 1}
              </span>
              <span className="table-cell whitespace-pre select-text">
                {highlightLine(line).map((token, tokenIndex) => (
                  <Token key={tokenIndex} {...token} />
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
