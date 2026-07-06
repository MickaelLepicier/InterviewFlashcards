import CodeBlock from './CodeBlock';
import CopyButton from './CopyButton';
import { useState } from 'react';
import { getCorrectAnswer, getHint, getQuestion } from '../utils/cardContent';

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
  hintText,
  showHintLabel,
  hideHintLabel,
  hintTitle,
}) {
  const displayContent = isBack ? content : getQuestionText(content, code);
  const [isHintOpen, setIsHintOpen] = useState(false);

  return (
    <div
      className={`flashcard-face content-card absolute inset-0 flex flex-col rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8 ${
        isBack ? 'flashcard-back' : ''
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3 card-meta-row">
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

      <div className="mt-4 space-y-2">
        {!isBack && hintText ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsHintOpen((prev) => !prev);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100"
            >
              <span>{isHintOpen ? hideHintLabel : showHintLabel}</span>
            </button>
            {isHintOpen ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                  {hintTitle}
                </p>
                <p className="select-text whitespace-pre-wrap">{hintText}</p>
              </div>
            ) : null}
          </>
        ) : null}
        <p className="text-center text-xs text-slate-400">{hint}</p>
      </div>
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
  showHintLabel,
  hideHintLabel,
  hintTitle,
}) {
  const question = getQuestion(card, lang);
  const answer = getCorrectAnswer(card, lang);
  const hintText = getHint(card, lang);

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
        className="flashcard-shell relative h-[min(68vh,520px)] w-full cursor-pointer text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
            hintText={hintText}
            showHintLabel={showHintLabel}
            hideHintLabel={hideHintLabel}
            hintTitle={hintTitle}
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
