export function getQuestion(card, lang) {
  return lang === 'he' ? card.question_he : card.question_en;
}

export function getHint(card, lang) {
  return lang === 'he' ? card.hint_he : card.hint_en;
}

export function getCorrectAnswer(card, lang) {
  if (lang === 'he') {
    return card.correctAnswer_he ?? card.answer_he ?? '';
  }
  return card.correctAnswer_en ?? card.answer_en ?? '';
}
