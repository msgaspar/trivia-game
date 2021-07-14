import React, { Component } from 'react';
import { connect } from 'react-redux';
import tokenApi from '../services/tokenApi';
import logo from '../trivia.png';

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
    localStorage.setItem('token', token);
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              data-testid="input-player-name"
              id="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.validateLogin() }
            onClick={ () => this.startGame() }
          >
            Jogar
          </button>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // getTokenAction: () => dispatch(getTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);
