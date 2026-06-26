/** Linked concept groups — swapping terms within a group should fail validation. */
export const CONCEPT_GROUPS = [
  ['undefined', 'null'],
  ['spread', 'rest'],
  ['var', 'let'],
  ['call', 'apply', 'bind'],
  ['mutable', 'immutable'],
  ['padding', 'margin'],
  ['canvas', 'svg'],
  ['localstorage', 'cookies', 'sessionstorage'],
  ['flexbox', 'grid'],
  ['promise', 'callback'],
  ['synchronous', 'asynchronous', 'sync', 'async'],
];

/** Cross-language aliases for technical anchors (English + Hebrew). */
export const ANCHOR_ALIASES = {
  undefined: ['undefined', 'לא מוגדר'],
  null: ['null', 'נאל'],
  spread: ['spread', 'מפרק', 'מפזר', 'פיזור', 'expand', 'unpack'],
  rest: ['rest', 'אוסף', 'איסוף', 'condense', 'pack', 'gather'],
  var: ['var'],
  let: ['let'],
  hoisting: ['hoisting', 'העמסה', 'הרמה'],
  prototype: ['prototype', 'אב', 'טיפוס'],
  closure: ['closure', 'סגור', 'סגירה'],
  mutable: ['mutable', 'ניתן לשינוי', 'משתנה'],
  immutable: ['immutable', 'אימוטבילי', 'לא ניתן לשינוי'],
  padding: ['padding', 'ריפוד', 'פנימי'],
  margin: ['margin', 'שוליים', 'חיצוני'],
  canvas: ['canvas'],
  svg: ['svg'],
  flexbox: ['flexbox', 'flex'],
  grid: ['grid'],
};

function normalizeToken(token) {
  return token.toLowerCase().replace(/[^\w\u0590-\u05ff]/g, '');
}

export function expandAnchorToken(token) {
  const normalized = normalizeToken(token);
  if (!normalized) return [];

  const expanded = new Set([normalized]);

  for (const aliases of Object.values(ANCHOR_ALIASES)) {
    if (aliases.some((alias) => normalizeToken(alias) === normalized)) {
      aliases.forEach((alias) => expanded.add(normalizeToken(alias)));
    }
  }

  return [...expanded];
}

export function getConceptConflictAnchors(primaryToken) {
  const normalized = normalizeToken(primaryToken);
  if (!normalized) return new Set();

  const conflicts = new Set();

  for (const group of CONCEPT_GROUPS) {
    if (!group.some((term) => normalized.includes(term) || term.includes(normalized))) {
      continue;
    }

    for (const term of group) {
      if (term === normalized || normalized.includes(term) || term.includes(normalized)) {
        continue;
      }
      expandAnchorToken(term).forEach((alias) => conflicts.add(alias));
    }
  }

  return conflicts;
}

export function getPrimaryAnchorSet(enPhrase, hePhrase, extractAnchors) {
  const anchors = new Set();

  for (const phrase of [enPhrase, hePhrase]) {
    const primary = extractAnchors(phrase)[0];
    if (primary) {
      expandAnchorToken(primary).forEach((token) => anchors.add(token));
    }
  }

  return anchors;
}

export function tokenMatchesPrimaryAnchor(token, primaryAnchorSet) {
  if (primaryAnchorSet.size === 0) return true;
  const normalized = normalizeToken(token);
  return primaryAnchorSet.has(normalized);
}
