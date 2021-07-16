import { SAVE_TRIVIA } from '../actions/triviaActions';

const INITIAL_STATE = { questions: [] };

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TRIVIA:
    return ({
      ...state,
      questions: [...action.payload],
    });
  default:
    return state;
  }
}

export default trivia;
