export const SET_PLAYER = 'SET_PLAYER';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const setPlayer = (player) => ({
  type: SET_PLAYER,
  player,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});
