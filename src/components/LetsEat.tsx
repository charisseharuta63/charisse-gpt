import React, { useState, useEffect } from 'react';
import '../components/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Recipe {
  label: string;
  url: string;
}

export const LetsEat: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [input, setInput] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dishType, setDishType] = useState('');
  const findRecipes = async (text: string) => {
    try {
      const endpoint = 'https://api.edamam.com/api/recipes/v2';
      const params = new URLSearchParams();
      params.append('app_id', '7bae4bda')
      params.append('app_key', 'a1e5c2c6128af97e9d59d1333ed96824')
      params.append('type', 'any')
      params.append('q', text)

      if (cuisine) {
        params.append('cuisineType', cuisine);
      }
      if (dishType) {
        params.append('dishType', dishType);
      }
        await fetch(`${endpoint}?${params}`)
        .then(async response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRecipes(data.hits.map((hit: any) => hit.recipe))
          return data;
        })
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        findRecipes(input);
      }, 1000);
  
      return () => clearTimeout(timeoutId);
    }, [input, cuisine, dishType]);

  const handleSubmit = () => {
    findRecipes(input);
    setInput('');
  }

  return (
    <>
      <div className='input-container'>    
        <div className='input-wrapper'>
          <input
            className='input'
            type="text"
            placeholder="Search Recipes!"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit()
              }
            }}
          />
          <div className='search-icon' onClick={() => handleSubmit()}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>
        
        <div>
          <label htmlFor="dishType" className='label'>Dish Type:</label>
          <select id="dishType" value={dishType} onChange={(e) => setDishType(e.target.value)}>
            <option value="">Any</option>
            <option value="Biscuits and cookies">Biscuits and cookies</option>
            <option value="Bread">Bread</option>
            <option value="Cereals">Cereals</option>
            <option value="Condiments and sauces">Condiments and sauces</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
            <option value="Main course">Main course</option>
            <option value="Pancake">Pancake</option>
            <option value="Preps">Preps</option>
            <option value="Preserve">Preserve</option>
            <option value="Salad">Salad</option>
            <option value="Sandwiches">Sandwiches</option>
            <option value="Side dish">Side dish</option>
            <option value="Soup">Soup</option>
            <option value="Starter">Starter</option>
            <option value="Sweets">Sweets</option>
          </select>
        </div>
        
        <div className='dropdown-container-last'>
          <label htmlFor="cuisine" className='label'>Cuisine:</label>
          <select id="cuisine" value={cuisine} onChange={(e) => {console.log('hi', e.target.value); setCuisine(e.target.value)}}>
            <option value="">Any</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Central Europe">Central Europe</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="French">French</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Kosher">Kosher</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="South American">South American</option>
            <option value="South East Asian">South East Asian</option>
          </select>
        </div>

        {recipes.map((recipe, index) => {
          return (
            <div key={index} className='recipe' onClick={() => window.open(recipe.url, '_blank', 'noopener noreferrer')}>
              {recipe.label}
            </div>
          )
        })}
    </>
  );
};