import { SET_PLAYER, UPDATE_SCORE } from '../actions/playerActions';

const INITIAL_STATE = { };

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
      score: action.score,
    })
  default:
    return state;
  }
}

export default player;
