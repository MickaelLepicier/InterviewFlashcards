import { useCallback, useEffect, useState } from 'react';
import AchievementToast from './components/AchievementToast';
import AchievementsScreen from './components/AchievementsScreen';
import AiExamMode from './components/AiExamMode';
import FlashcardsMode from './components/FlashcardsMode';
import GameModeSelector from './components/GameModeSelector';
import LanguageToggle from './components/LanguageToggle';
import LoadingSpinner from './components/LoadingSpinner';
import SubjectSelector from './components/SubjectSelector';
import { UI } from './i18n';
import {
  getSubjectById,
  getSubjectLabel,
  getSubjects,
  loadSubjectCards,
} from './services/subjectData';
import { formatHighScore, getBestScore } from './utils/examScore';
import { pickSessionQuestions } from './utils/sessionQuestions';

export default function App() {
  const [lang, setLang] = useState('he');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectCards, setSubjectCards] = useState([]);
  const [sessionCards, setSessionCards] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
  const [isLoadingSubject, setIsLoadingSubject] = useState(false);
  const [gameMode, setGameMode] = useState('flashcards');
  const [bestScore, setBestScore] = useState(0);
  const [highScoreVersion, setHighScoreVersion] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);
  const [homeView, setHomeView] = useState('subjects');
  const [achievementToasts, setAchievementToasts] = useState([]);
  const [achievementsVersion, setAchievementsVersion] = useState(0);

  const t = UI[lang];
  const isRtl = lang === 'he';
  const activeSubject = selectedSubject ? getSubjectById(selectedSubject) : null;

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

  useEffect(() => {
    let isMounted = true;

    async function loadQuestionCounts() {
      const subjects = getSubjects();
      const counts = {};

      await Promise.all(
        subjects.map(async (subject) => {
          const cards = await loadSubjectCards(subject.id);
          counts[subject.id] = cards.length;
        }),
      );

      if (isMounted) {
        setQuestionCounts(counts);
      }
    }

    loadQuestionCounts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubjectSelect = useCallback(async (subjectId) => {
    setSelectedSubject(subjectId);
    setIsLoadingSubject(true);

    try {
      const cards = await loadSubjectCards(subjectId);
      setSubjectCards(cards);
      setSessionCards(pickSessionQuestions(cards));
      setBestScore(getBestScore(subjectId));
      setGameMode('flashcards');
      setSessionKey((prev) => prev + 1);
      setQuestionCounts((prev) => ({ ...prev, [subjectId]: cards.length }));
    } finally {
      setIsLoadingSubject(false);
    }
  }, []);

  const handleBestScoreUpdated = useCallback((score) => {
    setBestScore(score);
    setHighScoreVersion((version) => version + 1);
  }, []);

  const handleChangeSubject = () => {
    setSelectedSubject(null);
    setSubjectCards([]);
    setSessionCards([]);
    setBestScore(0);
    setGameMode('flashcards');
    setHighScoreVersion((version) => version + 1);
  };

  const handleNewExamSession = useCallback(() => {
    setSessionCards(pickSessionQuestions(subjectCards));
    setSessionKey((prev) => prev + 1);
  }, [subjectCards]);

  const handleAchievementsUnlocked = useCallback((achievements) => {
    if (!achievements?.length) return;
    setAchievementToasts((current) => [
      ...current,
      ...achievements.map((achievement) => ({
        id: `${achievement.id}-${Date.now()}-${Math.random()}`,
        achievement,
      })),
    ]);
    setAchievementsVersion((version) => version + 1);
  }, []);

  const dismissAchievementToast = useCallback((toastId) => {
    setAchievementToasts((current) => current.filter((toast) => toast.id !== toastId));
  }, []);

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
            {activeSubject ? (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-200">
                  <span aria-hidden="true">{activeSubject.icon}</span>
                  <span>{getSubjectLabel(activeSubject, lang)}</span>
                </span>
                <button
                  type="button"
                  onClick={handleChangeSubject}
                  className="text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
                >
                  {t.changeSubject}
                </button>
              </div>
            ) : null}
          </div>
          <LanguageToggle
            lang={lang}
            label={t.languageToggle}
            onToggle={() => setLang((prev) => (prev === 'en' ? 'he' : 'en'))}
          />
        </header>

        {!selectedSubject ? (
          homeView === 'achievements' ? (
            <AchievementsScreen
              lang={lang}
              t={t}
              achievementsVersion={achievementsVersion}
              onBack={() => setHomeView('subjects')}
            />
          ) : (
            <SubjectSelector
              lang={lang}
              t={t}
              questionCounts={questionCounts}
              highScoreVersion={highScoreVersion}
              achievementsVersion={achievementsVersion}
              onSelect={handleSubjectSelect}
              onOpenAchievements={() => setHomeView('achievements')}
            />
          )
        ) : isLoadingSubject ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <LoadingSpinner label={t.loadingSubject} />
          </div>
        ) : (
          <>
            <section className="animate-fade-up mb-8" style={{ animationDelay: '0.05s' }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t.gameModeLabel}
              </p>
              <GameModeSelector
                modes={gameModes}
                activeMode={gameMode}
                onSelect={setGameMode}
              />
              <div className="mt-4 flex flex-wrap gap-3">
                {bestScore > 0 ? (
                  <p className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                    <span>🏆</span>
                    <span>
                      {t.bestRecord}: <strong>{formatHighScore(bestScore)}</strong>
                    </span>
                  </p>
                ) : null}
                {gameMode === 'exam' ? (
                  <p className="inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-200">
                    <span>🎯</span>
                    <span>{t.examQuestionCount}</span>
                  </p>
                ) : null}
              </div>
            </section>

            {gameMode === 'flashcards' ? (
              <FlashcardsMode
                cards={subjectCards}
                lang={lang}
                t={t}
                isRtl={isRtl}
              />
            ) : (
              <AiExamMode
                key={sessionKey}
                cards={sessionCards}
                subjectId={selectedSubject}
                lang={lang}
                t={t}
                isRtl={isRtl}
                bestScore={bestScore}
                onBestScoreUpdated={handleBestScoreUpdated}
                onNewSession={handleNewExamSession}
                onAchievementsUnlocked={handleAchievementsUnlocked}
              />
            )}
          </>
        )}
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4">
        {achievementToasts.map((toast) => (
          <AchievementToast
            key={toast.id}
            achievement={toast.achievement}
            lang={lang}
            t={t}
            onDismiss={() => dismissAchievementToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
