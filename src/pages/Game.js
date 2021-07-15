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
    };
    this.changeBorderColor = this.changeBorderColor.bind(this);
  }

  changeBorderColor() {
    this.setState({
      borderCorrect: '3px solid rgb(6, 240, 15)',
      borderIncorrect: '3px solid rgb(255, 0, 0)',
    });
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
              onClick={ this.changeBorderColor }
            >
              { incorrectAnswer }
            </button>
          )) }
          <button
            style={ { border: borderCorrect } }
            type="button"
            data-testid="correct-answer"
            onClick={ this.changeBorderColor }
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
});

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps)(Game);
