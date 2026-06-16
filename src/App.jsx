import { useEffect, useState } from 'react';
import AiExamMode from './components/AiExamMode';
import FlashcardsMode from './components/FlashcardsMode';
import GameModeSelector from './components/GameModeSelector';
import LanguageToggle from './components/LanguageToggle';
import { UI } from './i18n';

export default function App() {
  const [lang, setLang] = useState('en');
  const [gameMode, setGameMode] = useState('flashcards');

  const t = UI[lang];
  const isRtl = lang === 'he';

  const gameModes = [
    {
      id: 'flashcards',
      label: t.flashcardsMode,
      description: t.flashcardsModeDesc,
    },
    {
      id: 'exam',
      label: t.aiExamMode,
      description: t.aiExamModeDesc,
    },
  ];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

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

        <section className="animate-fade-up mb-8" style={{ animationDelay: '0.05s' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t.gameModeLabel}
          </p>
          <GameModeSelector
            modes={gameModes}
            activeMode={gameMode}
            onSelect={setGameMode}
          />
        </section>

        {gameMode === 'flashcards' ? (
          <FlashcardsMode lang={lang} t={t} isRtl={isRtl} />
        ) : (
          <AiExamMode lang={lang} t={t} isRtl={isRtl} />
        )}
      </div>
    </div>
  );
}
