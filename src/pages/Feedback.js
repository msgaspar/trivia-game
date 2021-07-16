import React, { Component } from 'react';
import { connect } from 'redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <h1>Podia ser melhor...</h1>
          <p>Você acertou 2 questões!</p>
          <p>Um total de 20 pontos</p>
        </div>
        <button type="button">VER RANKING</button>
        <button type="button">JOGAR NOVAMENTE</button>
      </div>
    );
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(Feedback);
