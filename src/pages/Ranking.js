import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: JSON.parse(localStorage.getItem('ranking')) || [],
    };
  }

  render() {
    // const ranking = [
    //   { name: 'Diogo', score: 10, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
    //   { name: 'Ana Clara', score: 8, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec077108d50' },
    // ];
    const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div className="ranking-container">
        <h1>Ranking</h1>
        <ul>
          { ranking.map(({ name, score, picture }, index) => (
            <li className="ranking-item" key={ index }>
              <img src={ picture } alt={ `Avatar de ${name}` } />
              <p>
                <span data-testid={ `player-name-${index}` }>{name}</span>
                {' '}
                -
                {' '}
                <span data-testid={ `player-score-${index}` }>
                  {score}
                  {' '}
                  pontos
                </span>
              </p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar para a tela inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default Ranking;
