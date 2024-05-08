import React, { useState } from 'react';
import '../components/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Recipe {
  label: string;
}

export const LetsEat: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [input, setInput] = useState('');
  const findRecipes = async (text: string) => {
    try {
        const endpoint = 'https://api.edamam.com/api/recipes/v2';
        const params = new URLSearchParams();
        params.append('app_id', '7bae4bda')
        params.append('app_key', 'a1e5c2c6128af97e9d59d1333ed96824')
        params.append('type', 'any')
        params.append('q', text)
        // {
        // ingr: '5-10', // Filter by number of ingredients (optional)
        // diet: ['balanced', 'high-protein'], // Diet label (optional)
        // cuisineType: ['American', 'Italian'], // Cuisine type (optional)
        // mealType: ['Breakfast', 'Lunch'], // Meal type (optional)
        // dishType: ['Main course', 'Salad'], // Dish type (optional)
        // // Add more parameters as needed
        // };

        // Create the fetch request
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

  return (
    <>
      <div className='input-container'>    
        <div className='input-wrapper'>
          <input
            className='input'
            type="text"
            placeholder="Search Recipes!"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                findRecipes(input)
                setInput('')
              }
            }}
          />
          <div className='search-icon' onClick={() => findRecipes(input)}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        </div>
        {recipes.map((recipe, index) => {
          return (
            <div key={index} className='recipe'>
              {recipe.label}
            </div>
          )
        })}
    </>
  );
};