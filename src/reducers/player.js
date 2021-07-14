import { SET_PLAYER } from '../actions/playerActions';

const INITIAL_STATE = { player: '' };

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return ({
      ...state,
      player: action.player,
    });
  default:
    return state;
  }
}

export default player;
