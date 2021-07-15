import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenApi from '../services/tokenApi';
import triviaApi from '../services/triviaApi';
import logo from '../trivia.png';
import { setPlayer } from '../actions/playerActions';
import { saveTrivia } from '../actions/triviaActions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  validateLogin() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      return false;
    }
    return true;
  }

  async startGame() {
    const { token } = await tokenApi();
    const { email, name } = this.state;
    const { setPlayerAction, saveTriviaAction } = this.props;
    const five = 5;
    const { results } = await triviaApi(token, five);
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify({ player }));

    saveTriviaAction(results);
    setPlayerAction(player);
  }

  createTextInput(testId, value, label, name) {
    return (
      <label htmlFor={ testId }>
        { label }
        <input
          data-testid={ testId }
          id={ testId }
          type="text"
          name={ name }
          value={ value }
          onChange={ this.handleChange }
          autoComplete="off"
        />
      </label>
    );
  }

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <div className="login-container">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form className="login-form">
          { this.createTextInput('input-player-name', name, 'Nome:', 'name')}
          { this.createTextInput('input-gravatar-email', email, 'E-mail:', 'email')}
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.validateLogin() }
            onClick={ () => { this.startGame(); history.push('/jogo'); } }
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/configuracao') }
          >
            Configurações
          </button>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerAction: (player) => dispatch(setPlayer(player)),
  saveTriviaAction: (trivia) => dispatch(saveTrivia(trivia)),
});

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default connect(null, mapDispatchToProps)(Login);
