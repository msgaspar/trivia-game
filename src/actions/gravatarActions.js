import gravatarAPI from '../services/gravatarApi';

export const GET_GRAVATAR = 'GET_GRAVATAR';
export const GET_GRAVATAR_SUCCESS = 'GET_GRAVATAR_SUCCESS';
export const GET_GRAVATAR_ERROR = 'GET_GRAVATAR_ERROR';

const getGravatar = () => ({
  type: GET_GRAVATAR,
});

const getGravatarSuccess = (payload) => ({
  type: GET_GRAVATAR_SUCCESS,
  payload,
});

const getGravatarError = (error) => ({
  type: GET_GRAVATAR_ERROR,
  error,
});

export function thunkGravatar(email) {
  return (dispatch) => {
    dispatch(getGravatar());
    return gravatarAPI(email).then(
      (payload) => dispatch(getGravatarSuccess(payload)),
      (error) => dispatch(getGravatarError(error.message)),
    );
  };
}
