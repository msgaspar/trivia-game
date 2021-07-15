import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      borderCorrect: '',
      borderIncorrect: '',
      timeLeft: 30,
    };
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.countDown = this.countDown.bind(this);
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

  countDown() {
    const { timeLeft } = this.state;
    if (timeLeft > 0) {
      this.setState((oldState) => ({ timeLeft: oldState.timeLeft - 1 }));
    }
  }

  renderQuestion() {
    const { borderCorrect, borderIncorrect, timeLeft } = this.state;
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
              onClick={ this.changeBorderColor }
              disabled={ timeLeft === 0 }
            >
              { incorrectAnswer }
            </button>
          )) }
          <button
            style={ { border: borderCorrect } }
            type="button"
            data-testid="correct-answer"
            onClick={ this.changeBorderColor }
            disabled={ timeLeft === 0 }
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
});

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps)(Game);
