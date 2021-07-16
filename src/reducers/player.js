import { SET_PLAYER, UPDATE_SCORE } from '../actions/playerActions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  gravatarEmail: 'email@email.com',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return ({
      ...state,
      ...action.player,
    });
  case UPDATE_SCORE:
    return ({
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    });
  default:
    return state;
  }
}

export default player;
