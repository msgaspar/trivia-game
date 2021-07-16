import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const minimumAssertions = 3;

    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="feedback-text">
            {assertions < minimumAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
          </h1>
          <p>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
          </p>
          <p>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </p>
        </div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          VER RANKING
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          JOGAR NOVAMENTE
        </button>
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
