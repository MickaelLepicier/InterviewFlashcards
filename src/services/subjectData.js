import subjects from '../../data/subjects.json';

const subjectLoaders = {
  javascript: () => import('../../data/javascript.json'),
  html: () => import('../../data/html.json'),
  css: () => import('../../data/css.json'),
  react: () => import('../../data/react.json'),
  architecture: () => import('../../data/architecture.json'),
};

export function getSubjects() {
  return subjects;
}

export function getSubjectById(subjectId) {
  return subjects.find((subject) => subject.id === subjectId) ?? null;
}

export async function loadSubjectCards(subjectId) {
  const loader = subjectLoaders[subjectId];
  if (!loader) {
    throw new Error(`Unknown subject: ${subjectId}`);
  }

  const module = await loader();
  return module.default;
}

export function getSubjectLabel(subject, lang) {
  return lang === 'he' ? subject.label_he : subject.label_en;
}

export function getSubjectDescription(subject, lang) {
  return lang === 'he' ? subject.description_he : subject.description_en;
}
