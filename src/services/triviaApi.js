const TRIVIA_URL = 'https://opentdb.com/api.php?';

const triviaApi = (token, settings) => {
  const { numberOfQuestions, category, difficulty, type } = settings;

  const amountUrl = `amount=${numberOfQuestions}`;
  const tokenUrl = `token=${token}`;
  const categoryUrl = `category=${category === 'any' ? '' : category}`;
  const difficultyUrl = `difficulty=${difficulty === 'any' ? '' : difficulty}`;
  const typeUrl = `type=${type === 'any' ? '' : type}`;

  const urlString = `${TRIVIA_URL}
    ${amountUrl}&${tokenUrl}&${categoryUrl}&${difficultyUrl}&${typeUrl}`;

  return fetch(urlString)
    .then((response) => response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
};

export default triviaApi;
