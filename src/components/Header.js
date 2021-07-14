import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  gravatarAPI(email) {
    const url = 'https://www.gravatar.com/avatar/';
    const hash = md5(email).toString();
    return url + hash;
  }

  render() {
    // const { name, assertions, score, gravatarEmail} = JSON.parse(localStorage.getItem('state'))
    return (
      <div>
        Titulo
        {/* <p>{ name }</p> */}
        {/* <img src= { this.gravatarAPI(gravatarEmail)} alt="avatar" /> */}

      </div>
    );
  }
}

export default Header;
