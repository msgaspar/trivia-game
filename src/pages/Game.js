import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateScore } from '../actions/playerActions';
import getStorage from '../services/storage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      borderCorrect: '',
      borderIncorrect: '',
      isAnswered: false, // pra parar o timer quanto for true (e futuramente vai servir para o botão de ir pra próxima questão)
      timeLeft: 30,
    };
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(
      this.countDown,
      ONE_SECOND,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeBorderColor() {
    this.setState({
      borderCorrect: '3px solid rgb(6, 240, 15)',
      borderIncorrect: '3px solid rgb(255, 0, 0)',
    });
  }

  newScore(difficulty, time) {
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
  }

  updateScore() {
    const { triviaQuestions, idTrivia, updateScoreAction } = this.props;
    const { timeLeft } = this.state;
    const { difficulty } = triviaQuestions[idTrivia];
    const { player } = getStorage('state');
    const newScore = this.newScore(difficulty, timeLeft);
    player.score = newScore;
    localStorage.setItem('state', JSON.stringify({ player }));
    updateScoreAction(newScore);
  }

  checkAnswer(answer) {
    this.setState({ isAnswered: true });
    this.changeBorderColor();
    if (answer === 'correct') {
      this.updateScore();
    }
  }

  countDown() {
    const { timeLeft, isAnswered } = this.state;
    if (timeLeft > 0 && !isAnswered) { // acrescentei a condição de isAnswered para parar o timer
      this.setState((oldState) => ({ timeLeft: oldState.timeLeft - 1 }));
    }
  }

  renderQuestion() {
    const { borderCorrect, borderIncorrect, timeLeft, isAnswered } = this.state;
    const { triviaQuestions, idTrivia } = this.props;
    const { category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaQuestions[idTrivia];

    return (
      <div>
        <h4 data-testid="question-category">{ category }</h4>
        <h3 data-testid="question-text">{ question }</h3>
        <div>
          { incorrectAnswers.map((incorrectAnswer, index) => (
            <button
              style={ { border: borderIncorrect } }
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.checkAnswer('incorrect') }
              disabled={ timeLeft === 0 || isAnswered } // acrescentei mais uma condição para desabilitar o botão quando a questão tiver sido respondida
            >
              { incorrectAnswer }
            </button>
          )) }
          <button
            style={ { border: borderCorrect } }
            type="button"
            data-testid="correct-answer"
            onClick={ () => this.checkAnswer('correct') }
            disabled={ timeLeft === 0 || isAnswered }
          >
            { correctAnswer }
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { timeLeft } = this.state;
    const { triviaQuestions } = this.props;
    return (
      <div>
        <Header />
        { triviaQuestions.length > 0 ? this.renderQuestion() : <p>Carregando...</p> }
        <p>
          Tempo:
          {' '}
          { timeLeft }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuestions: state.trivia.questions,
  idTrivia: state.trivia.idTrivia,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreAction: (score) => dispatch(updateScore(score)),
});

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
