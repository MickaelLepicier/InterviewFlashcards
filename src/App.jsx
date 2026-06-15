import { useCallback, useEffect, useState } from 'react';
import cards from '../data.json';
import FlashCard from './components/FlashCard';
import LanguageToggle from './components/LanguageToggle';
import Navigation from './components/Navigation';
import ProgressBar from './components/ProgressBar';
import { UI } from './i18n';

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const t = UI[lang];
  const isRtl = lang === 'he';
  const currentCard = cards[currentIndex];

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
    setIsFlipped(false);
  }, []);

  const handlePrevious = () => goTo(Math.max(0, currentIndex - 1));
  const handleNext = () => goTo(Math.min(cards.length - 1, currentIndex + 1));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goTo(Math.max(0, currentIndex - 1));
      if (event.key === 'ArrowRight') goTo(Math.min(cards.length - 1, currentIndex + 1));
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, goTo]);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute top-1/3 end-0 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-0 start-1/3 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8 sm:px-6 sm:py-10">
        <header className="animate-fade-up mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">{t.subtitle}</p>
          </div>
          <LanguageToggle
            lang={lang}
            label={t.languageToggle}
            onToggle={() => setLang((prev) => (prev === 'en' ? 'he' : 'en'))}
          />
        </header>

        <div className="animate-fade-up mb-8" style={{ animationDelay: '0.08s' }}>
          <ProgressBar
            current={currentIndex + 1}
            total={cards.length}
            label={t.progress}
          />
        </div>

        <main className="animate-fade-up flex flex-1 flex-col justify-center" style={{ animationDelay: '0.14s' }}>
          <FlashCard
            key={currentCard.id}
            card={currentCard}
            lang={lang}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((prev) => !prev)}
            questionLabel={t.question}
            answerLabel={t.answer}
            flipHint={t.tapToFlip}
            flipBackHint={t.tapToFlipBack}
          />
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
          />
        </footer>
      </div>
    </div>
  );
}
