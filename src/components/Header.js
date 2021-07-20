import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gravatarAPI from '../services/gravatarApi';
import './Header.css';

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;
    return (
      <div className="header-container">
        <img
          className="header-img"
          data-testid="header-profile-picture"
          src={ gravatarAPI(gravatarEmail) }
          alt="avatar"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <div className="score-container">
          <h4>Score:</h4>
          <h1 data-testid="header-score">{ score }</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }),
}).isRequired;

export default connect(mapStateToProps)(Header);
