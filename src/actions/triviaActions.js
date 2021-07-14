import tokenAPI from '../services/tokenApi';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

const getToken = () => ({
  type: GET_TOKEN,
});

const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

const getTokenError = (error) => ({
  type: GET_TOKEN_ERROR,
  error,
});

export function thunkToken() {
  return (dispatch) => {
    dispatch(getToken());
    return tokenAPI().then(
      (payload) => dispatch(getTokenSuccess(payload)),
      (error) => dispatch(getTokenError(error.message)),
    );
  };
}
