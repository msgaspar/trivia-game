import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateScore } from '../actions/playerActions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      borderCorrect: '',
      borderIncorrect: '',
    };
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  changeBorderColor() {
    this.setState({
      borderCorrect: '3px solid rgb(6, 240, 15)',
      borderIncorrect: '3px solid rgb(255, 0, 0)',
    });
  }

  updateScore(answer) {
    const { triviaQuestions, idTrivia, updateScoreAction } = this.props;
    const { difficulty } = triviaQuestions[idTrivia];
    const { player } = JSON.parse(localStorage.getItem('state'));
    if (answer === 'correct') {
      const ten = 10;
      const three = 3;
      switch (difficulty) {
      case 'hard':
        score = 10 + (3);
        break;
      case 'medium':
        score = 10 + (2);
        break;
      case 'easy':
        score = 10 + (1);
        break;
      default:
        score = 0;
      }
    }
    localStorage.setItem('state', JSON.stringify({ player }));
    updateScoreAction(player.score)
  }

  checkAnswer(answer) {
    this.updateScore(answer);
    this.changeBorderColor();
  }

  renderQuestion() {
    const { borderCorrect, borderIncorrect } = this.state;
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
            >
              { incorrectAnswer }
            </button>
          )) }
          <button
            style={ { border: borderCorrect } }
            type="button"
            data-testid="correct-answer"
            onClick={ () => this.checkAnswer('correct') }
          >
            { correctAnswer }
          </button>
        </div>

      </div>
    );
  }

  render() {
    const { triviaQuestions } = this.props;
    return (
      <div>
        <Header />
        { triviaQuestions.length > 0 ? this.renderQuestion() : <p>Carregando...</p> }
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
  updateScoreAction: (score) => dispatch(updateScore(score))
})

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
