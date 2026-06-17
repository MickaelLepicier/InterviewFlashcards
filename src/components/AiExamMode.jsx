import { useState } from 'react';
import cards from '../../data.json';
import { evaluateAnswer } from '../services/gemini';
import CodeBlock from './CodeBlock';
import LoadingSpinner from './LoadingSpinner';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';

function getQuestionText(content, code) {
  if (!content) return '';
  if (code && content.includes('\n')) {
    return content.split('\n')[0];
  }
  return content;
}

export default function AiExamMode({ lang, t, isRtl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');

  const card = cards[currentIndex];
  const question = lang === 'he' ? card.question_he : card.question_en;
  const officialAnswer = lang === 'he' ? card.answer_he : card.answer_en;
  const hint = lang === 'he' ? card.hint_he : card.hint_en;
  const displayQuestion = getQuestionText(question, card.code_snippet);
  const hasFeedback = feedback !== null;

  const resetQuestionState = () => {
    setAnswer('');
    setIsHintOpen(false);
    setFeedback(null);
    setError('');
    setIsLoading(false);
  };

  const goTo = (index) => {
    setCurrentIndex(index);
    resetQuestionState();
  };

  const handlePrevious = () => goTo(Math.max(0, currentIndex - 1));
  const handleNext = () => goTo(Math.min(cards.length - 1, currentIndex + 1));

  const handleSubmit = async () => {
    if (hasFeedback) {
      if (currentIndex < cards.length - 1) {
        goTo(currentIndex + 1);
      } else {
        resetQuestionState();
      }
      return;
    }

    if (!answer.trim()) {
      setError(t.emptyAnswer);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await evaluateAnswer({
        question: displayQuestion,
        officialAnswer,
        codeSnippet: card.code_snippet,
        studentAnswer: answer.trim(),
        lang,
      });
      setFeedback(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t.apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="animate-fade-up mb-8" style={{ animationDelay: '0.08s' }}>
        <ProgressBar
          current={currentIndex + 1}
          total={cards.length}
          label={t.progress}
        />
      </div>

      <main
        className="animate-fade-up flex flex-1 flex-col justify-center"
        style={{ animationDelay: '0.14s' }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700">
              {t.question}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {card.category}
            </span>
          </div>

          <p className="mb-4 whitespace-pre-wrap text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
            {displayQuestion}
          </p>

          {card.code_snippet ? (
            <CodeBlock
              code={card.code_snippet}
              copyLabel={t.copyCode}
              copiedLabel={t.copied}
            />
          ) : null}

          <div className="mt-6 space-y-4">
            <label htmlFor="exam-answer" className="block text-sm font-semibold text-slate-700">
              {t.yourAnswer}
            </label>
            <textarea
              id="exam-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={8}
              disabled={isLoading || hasFeedback}
              placeholder={t.answerPlaceholder}
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-relaxed text-slate-800 shadow-inner outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
            />

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            {feedback ? (
              <div
                className={`rounded-lg border p-4 ${
                  feedback.isCorrect
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-orange-200 bg-orange-50'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    {t.feedbackTitle}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      feedback.isCorrect
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-orange-200 text-orange-800'
                    }`}
                  >
                    {feedback.isCorrect ? t.correct : t.incorrect}
                  </span>
                </div>
                <p
                  className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800"
                  dir={lang === 'he' ? 'rtl' : 'ltr'}
                >
                  {feedback.explanation}
                </p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <LoadingSpinner label={t.evaluating} />
                ) : hasFeedback ? (
                  t.nextQuestion
                ) : (
                  t.submitAnswer
                )}
              </button>
              {hint && !hasFeedback ? (
                <button
                  type="button"
                  onClick={() => setIsHintOpen((prev) => !prev)}
                  disabled={isLoading}
                  className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isHintOpen ? t.hideHint : t.showHint}
                </button>
              ) : null}
            </div>

            {isHintOpen && hint && !hasFeedback ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                  {t.hintTitle}
                </p>
                <p className="whitespace-pre-wrap text-sm text-amber-900">{hint}</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <footer className="animate-fade-up mt-8" style={{ animationDelay: '0.2s' }}>
        <Navigation
          current={currentIndex}
          total={cards.length}
          cardLabel={t.cardOf(currentIndex + 1, cards.length)}
          previousLabel={t.previous}
          nextLabel={t.next}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isRtl={isRtl}
        />
      </footer>
    </>
  );
}
