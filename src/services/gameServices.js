export const randomizeAnswers = (
  incorrectAnswers, correctAnswer, borderCorrect, borderIncorrect,
) => {
  const incorrectAnswersObjects = incorrectAnswers.map((element, index) => ({
    answer: element,
    testid: `wrong-answer-${index}`,
    border: borderIncorrect,
    checkAnswer: 'incorrect',
  }));
  const correctAnswerObject = {
    answer: correctAnswer,
    testid: 'correct-answer',
    border: borderCorrect,
    checkAnswer: 'correct',
  };
  const allAnswers = [...incorrectAnswersObjects, correctAnswerObject];
  allAnswers.sort((a, b) => +(a.answer > b.answer) || +(a.answer === b.answer) - 1);
  return allAnswers;
};

export const getNewScore = (difficulty, time) => {
  const ten = 10;
  const three = 3;
  switch (difficulty) {
  case 'hard':
    return ten + (time * three);
  case 'medium':
    return ten + (time * 2);
  case 'easy':
    return ten + (time * 1);
  default:
    return 0;
  }
};
