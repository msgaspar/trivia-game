import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const minimumAssertions = 3;

    return (
      <div className="feedback-main-container">
        <div className="top-container">
          <Header />
        </div>
        <div className="feedback-container">
          <h1 data-testid="feedback-text">
            {assertions < minimumAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
          </h1>
          <h3>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
          </h3>
          <h3>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </h3>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ver ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
