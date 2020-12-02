import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoriesButtons from './CategoriesButtons';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipeCards.css';

function RecipesDrinksCards({ categories }) {
  const { data } = useContext(RecipesContext);
  const DOZE = 12;

  if (!categories || data.length < 1) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="div-bttn-category">
      {
        categories === 'none'
          ? ''
          : <CategoriesButtons categories={ categories } />
      }
      <div className="card-div">
        {
          data[1].drinks.filter((_, index) => index < DOZE)
            .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
              <Link
                key={ idDrink }
                to={ `/bebidas/${idDrink}` }
              >
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt={ strDrink }
                  />
                  <h1 data-testid={ `${index}-card-name` }>
                    { strDrink }
                  </h1>
                </div>
              </Link>
            ))
        }
      </div>
    </div>
  );
}

RecipesDrinksCards.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipesDrinksCards;
