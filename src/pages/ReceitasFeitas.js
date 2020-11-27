import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { Header } from '../components';
import { shareIcon } from '../images';
import '../style/Receitas.css';

function ReceitasFeitas() {
  const timeoutTextCopy = 3000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (!localStorage.doneRecipes) {
      return <h1>Você ainda não tem nenhuma receita pronta. </h1>;
    }
    setDoneRecipes(JSON.parse(localStorage.doneRecipes));
  }, []);

  const filterRecipes = ({ innerText }) => {
    if (innerText === 'Food') {
      const newDone = doneRecipes.filter((done) => (
        done.type === 'comida'
      ));
      setDoneRecipes(newDone);
    } else if (innerText === 'Drinks') {
      const newDone = doneRecipes.filter((done) => (
        done.type === 'bebida'
      ));
      setDoneRecipes(newDone);
    } else {
      setDoneRecipes(JSON.parse(localStorage.doneRecipes));
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        Drinks
      </button>
      <div>
        { doneRecipes
          .map((
            { id,
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
                  className="receipe-img"
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
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => handleCopy(`/${type}s/${id}`) }
              >
                <img
                  src={ shareIcon }
                  alt="Compatilhar Receita"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              { isCopied ? <p>Link copiado!</p> : true }
              {tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag }
                </p>
              )) }
            </span>
          )) }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
