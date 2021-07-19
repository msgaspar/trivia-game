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
    const {
      setPlayerAction,
      saveTriviaAction,
      history,
      category,
      difficulty,
      type,
    } = this.props;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

    const settings = {
      numberOfQuestions: 5,
      category,
      difficulty,
      type,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify({ player }));
    const response = await triviaApi(token, settings);
    console.log(response);

    saveTriviaAction(response.results);
    setPlayerAction(player);

    history.push('/jogo');
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
            onClick={ this.startGame }
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

const mapStateToProps = (state) => ({
  category: state.trivia.category,
  difficulty: state.trivia.difficulty,
  type: state.trivia.type,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayerAction: (player) => dispatch(setPlayer(player)),
  saveTriviaAction: (trivia) => dispatch(saveTrivia(trivia)),
});

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setPlayerAction: PropTypes.func.isRequired,
  saveTriviaAction: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
