import { useCallback, useEffect, useState } from 'react';
import FlashCard from './FlashCard';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';

export default function FlashcardsMode({ cards, lang, t, isRtl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[currentIndex];

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
    setIsFlipped(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  const handlePrevious = () => goTo(Math.max(0, currentIndex - 1));
  const handleNext = () => goTo(Math.min(cards.length - 1, currentIndex + 1));

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goTo(Math.max(0, currentIndex - 1));
      if (event.key === 'ArrowRight') goTo(Math.min(cards.length - 1, currentIndex + 1));
      if (event.key === ' ' || event.key === 'Enter') {
        const selection = window.getSelection();
        if (selection?.toString().length > 0) return;
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, goTo, cards.length]);

  if (!currentCard) return null;

  return (
    <>
      <div className="animate-fade-up mb-8" style={{ animationDelay: '0.08s' }}>
        <ProgressBar
          current={currentIndex + 1}
          total={cards.length}
          label={t.progress}
          detail={t.cardOf(currentIndex + 1, cards.length)}
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
          copyTextLabel={t.copyText}
          copyCodeLabel={t.copyCode}
          copiedLabel={t.copied}
          showHintLabel={t.showHint}
          hideHintLabel={t.hideHint}
          hintTitle={t.hintTitle}
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
          isRtl={isRtl}
        />
      </footer>
    </>
  );
}
