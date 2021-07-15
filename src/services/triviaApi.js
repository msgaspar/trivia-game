const TRIVIA_URL = 'https://opentdb.com/api.php?';

const triviaApi = (token, amount) => fetch(`${TRIVIA_URL}amount=${amount}&token=${token}`)
  .then((response) => response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export default triviaApi;
