import React, { Component } from 'react';
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
            // onClick={}
          >
            Jogar
          </button>
        </form>

      </div>
    );
  }
}

export default Login;
