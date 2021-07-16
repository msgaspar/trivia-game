import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateScore } from '../actions/playerActions';
import getStorage from '../services/storage';

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
    this.changeBorderColor = this.changeBorderColor.bind(this);
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
    const { triviaQuestions, updateScoreAction } = this.props;
    const { timeLeft, idTrivia } = this.state;
    const { difficulty } = triviaQuestions[idTrivia];
    const { player } = getStorage('state');
    const newScore = this.newScore(difficulty, timeLeft);
    player.score += newScore;
    player.assertions += 1;
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
    if (timeLeft > 0 && !isAnswered) {
      this.setState((oldState) => ({ timeLeft: oldState.timeLeft - 1 }));
    }
  }

  updateRanking() {
    const { player, history } = this.props;
    const ranking = getStorage('ranking');
    if (ranking) {
      const updatedRanking = [...ranking, player];
      updatedRanking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(updatedRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([player]));
    }
    history.push('/feedback');
  }

  renderQuestion() {
    const { borderCorrect, borderIncorrect, timeLeft, isAnswered, idTrivia } = this.state;
    const { triviaQuestions } = this.props;
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
              disabled={ timeLeft === 0 || isAnswered }
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

  renderButtonNext() {
    const { timeLeft, isAnswered, idTrivia } = this.state;
    const { triviaQuestions } = this.props;
    if ((isAnswered || timeLeft === 0) && idTrivia === triviaQuestions.length - 1) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.updateRanking() }
        >
          Próxima
        </button>
      );
    }
    return (
      <button
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
      <div>
        <Header />
        { triviaQuestions.length > 0 ? this.renderQuestion() : <p>Carregando...</p> }
        <p>
          Tempo:
          {' '}
          { timeLeft }
        </p>
        { (isAnswered || timeLeft === 0) && this.renderButtonNext() }
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
  // updateRankingAction: (player) => dispatch(updateRanking(player))
});

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
