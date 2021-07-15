import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gravatarAPI from '../services/gravatarApi';

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        <img
          data-testid="header-profile-picture"
          src={ gravatarAPI(gravatarEmail) }
          alt="avatar"
        />
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
