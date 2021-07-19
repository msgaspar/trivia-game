export const SAVE_TRIVIA = 'SAVE_TRIVIA';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const SET_TYPE = 'SET_TYPE';

export const saveTrivia = (payload) => ({
  type: SAVE_TRIVIA,
  payload,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  category,
});

export const saveCategories = (categories) => ({
  type: SAVE_CATEGORIES,
  categories,
});

export const setDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  difficulty,
});

export const setType = (value) => ({
  type: SET_TYPE,
  value,
});
