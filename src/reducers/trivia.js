import {
  SAVE_TRIVIA,
  SET_CATEGORY,
  SAVE_CATEGORIES,
  SET_DIFFICULTY,
  SET_TYPE,
} from '../actions/triviaActions';

const INITIAL_STATE = {
  questions: [],
  categories: [],
  category: 'any',
  difficulty: 'any',
  type: 'any',
};

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TRIVIA:
    return ({
      ...state,
      questions: [...action.payload],
    });
  case SET_CATEGORY:
    return ({
      ...state,
      category: action.category,
    });
  case SAVE_CATEGORIES:
    return ({
      ...state,
      categories: action.categories,
    });
  case SET_DIFFICULTY:
    return ({
      ...state,
      difficulty: action.difficulty,
    });
  case SET_TYPE:
    return ({
      ...state,
      type: action.value,
    });
  default:
    return state;
  }
}

export default trivia;
