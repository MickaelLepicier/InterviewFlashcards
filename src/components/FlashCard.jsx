import CodeBlock from './CodeBlock';
import CopyButton from './CopyButton';

function getQuestionText(content, code) {
  if (!content) return '';
  if (code && content.includes('\n')) {
    return content.split('\n')[0];
  }
  return content;
}

function CardFace({
  label,
  category,
  content,
  code,
  hint,
  isBack,
  copyTextLabel,
  copiedLabel,
  copyCodeLabel,
}) {
  const displayContent = isBack ? content : getQuestionText(content, code);

  return (
    <div
      className={`flashcard-face absolute inset-0 flex flex-col rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8 ${
        isBack ? 'flashcard-back' : ''
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
            isBack
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-violet-100 text-violet-700'
          }`}
        >
          {label}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="mb-3 flex items-start justify-between gap-3">
          <p className="select-text whitespace-pre-wrap text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
            {displayContent}
          </p>
          <CopyButton
            text={displayContent}
            label={copyTextLabel}
            copiedLabel={copiedLabel}
          />
        </div>
        <CodeBlock
          code={code}
          copyLabel={copyCodeLabel}
          copiedLabel={copiedLabel}
        />
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">{hint}</p>
    </div>
  );
}

export default function FlashCard({
  card,
  lang,
  isFlipped,
  onFlip,
  questionLabel,
  answerLabel,
  flipHint,
  flipBackHint,
  copyTextLabel,
  copyCodeLabel,
  copiedLabel,
}) {
  const question = lang === 'he' ? card.question_he : card.question_en;
  const answer = lang === 'he' ? card.answer_he : card.answer_en;

  const handleFlip = () => {
    const selection = window.getSelection();
    if (selection?.toString().length > 0) return;
    onFlip();
  };

  return (
    <div className="flashcard-scene mx-auto w-full max-w-2xl">
      <div
        role="button"
        tabIndex={0}
        onClick={handleFlip}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleFlip();
          }
        }}
        className="relative h-[min(68vh,520px)] w-full cursor-pointer text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-label={isFlipped ? flipBackHint : flipHint}
        aria-pressed={isFlipped}
      >
        <div className={`flashcard-inner relative h-full w-full ${isFlipped ? 'is-flipped' : ''}`}>
          <CardFace
            label={questionLabel}
            category={card.category}
            content={question}
            code={card.code_snippet}
            hint={flipHint}
            copyTextLabel={copyTextLabel}
            copiedLabel={copiedLabel}
            copyCodeLabel={copyCodeLabel}
          />
          <CardFace
            label={answerLabel}
            category={card.category}
            content={answer}
            code={null}
            hint={flipBackHint}
            isBack
            copyTextLabel={copyTextLabel}
            copiedLabel={copiedLabel}
            copyCodeLabel={copyCodeLabel}
          />
        </div>
      </div>
    </div>
  );
}
