import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { shareIcon, blackHeartIcon } from '../images';

function ReceitasFavoritas() {
  // const [isFavorite, setIsFavorite] = useState(true);
  const [favoriteRecipes, setFavoriteRecipe] = useState([]);

  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      return <h1>Você ainda não tem nenhuma receita Favorita. :(</h1>;
    }
    setFavoriteRecipe(JSON.parse(localStorage.favoriteRecipes));
  }, []);

  useEffect(() => {

  }, [favoriteRecipes]);

  const handleClick = (index) => {
    const newFavoriteRecipes = [...favoriteRecipes];
    newFavoriteRecipes.splice(index, 1);
    setFavoriteRecipe(newFavoriteRecipes);
    localStorage.favoriteRecipes = newFavoriteRecipes;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        { favoriteRecipes
          .map((
            {
              id,
              type,
              image,
              alcoholicOrNot,
              name,
              area,
              category,
              doneDate,
              tags,
            },
            index,
          ) => (
            <span
              key={ index }
            >
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              {
                (type === 'comida')
                  ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${area} - ${category}` }
                    </p>)
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { alcoholicOrNot }
                    </p>)
              }
              <Link to={ `/${type}s/${id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { doneDate }
              </p>
              <img
                src={ shareIcon }
                alt="Compatilhar Receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              <button
                type="button"
                onClick={ () => { handleClick(index); } }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Botão de Favorito"
                />
              </button>
              {tags ? tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag }
                </p>
              )) : '' }

            </span>
          )) }
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
