const TOKEN_TRIVIA_URL = 'https://opentdb.com/api_token.php?command=request';

const tokenApi = () => fetch(TOKEN_TRIVIA_URL).then((response) => response
  .json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export default tokenApi;
