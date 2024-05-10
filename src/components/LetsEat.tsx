import React, { useState, useEffect } from 'react';
import '../components/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { cuisines, dishTypes } from '../consts/dropdownOptions';
import { Recipe, RecipeCard } from './RecipeCard';

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
            {dishTypes.map(dishType => <option value={dishType.value}>{dishType.label}</option>)}
          </select>
        </div>
        
        <div className='dropdown-container-last'>
          <label htmlFor="cuisine" className='label'>Cuisine:</label>
          <select id="cuisine" value={cuisine} onChange={(e) => {console.log('hi', e.target.value); setCuisine(e.target.value)}}>
            {cuisines.map(cuisine => <option value={cuisine.value}>{cuisine.label}</option>)}
          </select>
        </div>

        {recipes.map((recipe, index) => {
          return (
            <RecipeCard index={index} recipe={recipe}/>
          )
        })}
    </>
  );
};