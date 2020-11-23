import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/Header.css';
import RecipesCards from './RecipesCards';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputRecipe, setInputRecipe] = useState('');
  const [radioValue, setRadioValue] = useState('i');
  const [data, setData] = useState([]);
  const history = useHistory();
  const DOZE = 12;

  useEffect(() => {
    if (data.meals || data.drinks) {
      setLoading(false);
    }
  }, [data]);

  const onlyOne = (recipe) => {
    if (title === 'Comidas') {
      if (recipe.meals.length === 1) {
        return history.push(
          {
            pathname: `/comidas/${recipe.meals[0].idMeal}`,
            state: { recipe: recipe.meals[0] },
          },
        );
      }
      return;
    }
    if (recipe.drinks.length === 1) {
      return history.push(
        {
          pathname: `/bebidas/${recipe.drinks[0].idDrink}`,
          state: { recipe: recipe.drinks[0] },
        },
      );
    }
  };

  const searchFood = async () => {
    if (title === 'Comidas') {
      if (radioValue === 'i') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputRecipe}`);
        const responseJson = await response.json();
        if (responseJson.meals === null) {
          return alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          );
        }
        onlyOne(responseJson);
        return setData(responseJson);
      }
      if (radioValue === 'f' && inputRecipe.length !== 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${radioValue}=${inputRecipe}`);
      const responseJson = await response.json();
      if (responseJson.meals === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      onlyOne(responseJson);
      return setData(responseJson);
    }

    if (radioValue === 'i') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputRecipe}`);
      const responseJson = await response.json();
      if (responseJson.drinks === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      onlyOne(responseJson);
      return setData(responseJson);
    }
    if (radioValue === 'f' && inputRecipe.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${radioValue}=${inputRecipe}`);
    const responseJson = await response.json();
    if (responseJson.drinks === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    onlyOne(responseJson);
    return setData(responseJson);
  };

  return (
    <header>
      <nav>
        <Link className="profile" to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone de perfil" />
        </Link>
        <h1 data-testid="page-title" className="title">{ title }</h1>
        {
          (title === 'Comidas' || title === 'Explorar Origem' || title === 'Bebidas')
          && (
            <button
              className="searchButton"
              type="button"
              onClick={ () => { setSearchBar(!searchBar); } }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="Icone de busca" />
            </button>
          )
        }
      </nav>

      {
        searchBar
        && (
          <div>
            <input
              value={ inputRecipe }
              onChange={ ({ target: { value } }) => { setInputRecipe(value); } }
              data-testid="search-input"
              type="text"
              placeholder="Buscar Receita"
            />
            <label htmlFor="radioIngrediente">
              <input
                data-testid="ingredient-search-radio"
                type="radio"
                id="radioIngrediente"
                name="search"
                onClick={ () => { setRadioValue('i'); } }
              />
              Ingrediente
            </label>
            <label htmlFor="radioNome">
              <input
                type="radio"
                id="radioNome"
                name="search"
                onClick={ () => { setRadioValue('s'); } }
                data-testid="name-search-radio"
              />
              Nome
            </label>
            <label htmlFor="radioLetra">
              <input
                data-testid="first-letter-search-radio"
                type="radio"
                id="radioLetra"
                name="search"
                onClick={ () => { setRadioValue('f'); } }
              />
              Primeira Letra
            </label>
            <button
              data-testid="exec-search-btn"
              onClick={ searchFood }
              type="button"
            >
              Buscar
            </button>
          </div>)
      }
      {!loading && title === 'Comidas' && data.meals.filter((_, index) => index < DOZE)
        .map((recipe, index) => (
          <RecipesCards
            key={ index }
            title={ title }
            recipe={ recipe }
            index={ index }
          />
        )) }

      {!loading && title === 'Bebidas' && data.drinks.filter((_, index) => index < DOZE)
        .map((recipe, index) => (
          <RecipesCards
            key={ index }
            title={ title }
            recipe={ recipe }
            index={ index }
          />
        )) }

    </header>
  );
}

Header.propTypes = { title: PropTypes.string.isRequired };

export default Header;