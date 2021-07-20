import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  saveCategories,
  setCategory,
  setDifficulty,
  setType,
} from '../actions/triviaActions';

import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    const { saveCategoriesAction } = this.props;
    fetch('https://opentdb.com/api_category.php')
      .then((result) => result.json())
      .then((data) => {
        saveCategoriesAction(data.trivia_categories);
      });
  }

  handleCategoryChange({ target }) {
    const { setCategoryAction } = this.props;
    setCategoryAction(target.value);
  }

  handleDifficultyChange({ target }) {
    const { setDifficultyAction } = this.props;
    setDifficultyAction(target.value);
  }

  handleTypeChange({ target }) {
    const { setTypeAction } = this.props;
    setTypeAction(target.value);
  }

  renderCategorySelector() {
    const { category, categories } = this.props;
    return (
      <label htmlFor="category">
        Categoria
        <select
          id="category"
          name="category"
          value={ category }
          onChange={ this.handleCategoryChange }
        >
          <option value="any">Any Category</option>
          {categories.map(({ id, name }) => (
            <option
              key={ id }
              value={ id }
            >
              {name}
            </option>
          ))}
        </select>
      </label>);
  }

  renderDifficultySelector() {
    const { difficulty } = this.props;
    return (
      <label htmlFor="difficulty">
        Dificuldade
        <select
          id="difficulty"
          value={ difficulty }
          onChange={ this.handleDifficultyChange }
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>);
  }

  renderTypeSelector() {
    const { type } = this.props;
    return (
      <label htmlFor="type">
        Tipo
        <select id="type" value={ type } onChange={ this.handleTypeChange }>
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </label>
    );
  }

  render() {
    const { history } = this.props;

    return (
      <div className="settings-container">
        <h2 data-testid="settings-title">Configurações</h2>
        <form className="settings-form">
          {this.renderCategorySelector()}
          {this.renderDifficultySelector()}
          {this.renderTypeSelector()}
        </form>
        <button
          type="button"
          onClick={ () => history.push('/') }
        >
          Salvar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.trivia.category,
  categories: state.trivia.categories,
  difficulty: state.trivia.difficulty,
  type: state.trivia.type,
});

const mapDispatchToProps = (dispatch) => ({
  setCategoryAction: (category) => dispatch(setCategory(category)),
  saveCategoriesAction: (categories) => dispatch(saveCategories(categories)),
  setDifficultyAction: (difficulty) => dispatch(setDifficulty(difficulty)),
  setTypeAction: (type) => dispatch(setType(type)),
});

Settings.propTypes = {
  category: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  setCategoryAction: PropTypes.func.isRequired,
  saveCategoriesAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setDifficultyAction: PropTypes.func.isRequired,
  setTypeAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
