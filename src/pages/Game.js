import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decode } from 'he';
import Header from '../components/Header';
import { updateScore } from '../actions/playerActions';
import { setRankingStorage, setScorePlayerStorage } from '../services/storage';
import './Game.css';
import { randomizeAnswers, getNewScore } from '../services/gameServices';

const initialState = {
  isAnswered: false,
  timeLeft: 30,
  borderCorrect: '',
  borderIncorrect: '',
};

class Game extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
      idTrivia: 0,
    };
    this.countDown = this.countDown.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
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

  getNextQuestion() {
    this.setState((oldState) => ({
      ...initialState,
      idTrivia: oldState.idTrivia + 1,
    }));
  }

  updateScore() {
    const { triviaQuestions, updateScoreAction } = this.props;
    const { timeLeft, idTrivia } = this.state;
    const { difficulty } = triviaQuestions[idTrivia];
    const newScore = getNewScore(difficulty, timeLeft);
    setScorePlayerStorage('state', newScore);
    updateScoreAction(newScore);
  }

  changeBorderColor() {
    this.setState({
      borderCorrect: '3px solid rgb(6, 240, 15)',
      borderIncorrect: '3px solid rgb(255, 0, 0)',
    });
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
    if (timeLeft > 0 && !isAnswered) {
      this.setState((oldState) => ({ timeLeft: oldState.timeLeft - 1 }));
    }
  }

  renderQuestion() {
    const { timeLeft, isAnswered, idTrivia, borderCorrect, borderIncorrect } = this.state;
    const { triviaQuestions } = this.props;
    const { category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaQuestions[idTrivia];

    const params = [incorrectAnswers, correctAnswer, borderCorrect, borderIncorrect];
    const answers = randomizeAnswers(...params);

    return (
      <div>
        <h4 data-testid="question-category">{ decode(category) }</h4>
        <h3 data-testid="question-text">{ decode(question) }</h3>
        <div className="answer-container">
          { answers.map((answer) => (
            <button
              style={ { border: answer.border } }
              type="button"
              key={ answer.testid }
              data-testid={ answer.testid }
              onClick={ () => this.checkAnswer(answer.checkAnswer) }
              disabled={ timeLeft === 0 || isAnswered }
            >
              { decode(answer.answer) }
            </button>
          )) }
        </div>
      </div>
    );
  }

  renderButtonNext() {
    const { timeLeft, isAnswered, idTrivia } = this.state;
    const { triviaQuestions, history, player } = this.props;

    if ((isAnswered || timeLeft === 0) && idTrivia === triviaQuestions.length - 1) {
      return (
        <button
          className="next-button"
          type="button"
          data-testid="btn-next"
          onClick={ () => {
            setRankingStorage('ranking', player);
            history.push('/feedback');
          } }
        >
          Próxima
        </button>
      );
    }
    return (
      <button
        className="next-button"
        type="button"
        data-testid="btn-next"
        onClick={ this.getNextQuestion }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { timeLeft, isAnswered } = this.state;
    const { triviaQuestions } = this.props;
    return (
      <div className="game-container">
        <div className="top-container">
          <Header />
          <div className="timer-container">
            <h4>Timer:</h4>
            <h1>{ timeLeft }</h1>
          </div>
        </div>
        <div className="question-answer-container">
          { triviaQuestions.length > 0 ? this.renderQuestion() : <p>Carregando...</p> }
          <div className="next-button-container">
            { (isAnswered || timeLeft === 0) && this.renderButtonNext() }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuestions: state.trivia.questions,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreAction: (score) => dispatch(updateScore(score)),
});

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
