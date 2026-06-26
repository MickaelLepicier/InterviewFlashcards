export const EXAM_QUESTION_COUNT = 10;

export function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function pickSessionQuestions(cards, count = EXAM_QUESTION_COUNT) {
  if (!cards.length) return [];
  return shuffleArray(cards).slice(0, Math.min(count, cards.length));
}
