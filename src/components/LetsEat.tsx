import React, { useState } from 'react';
import '../components/style.css';

interface Recipe {
  label: string;
}

export const LetsEat: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
        const response = await fetch(`${endpoint}?${params}`)
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
    <div className='input-container'>      
      <input
        className='input'
        type="text"
        placeholder="Search Recipes!"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            findRecipes((event.target as HTMLInputElement).value);
            (event.target as HTMLInputElement).value = '';
          }
        }}
      />
      {recipes.map((recipe, index) => {
        return (
          <div key={index}>
            {recipe.label}
          </div>
        )
      })}
    </div>
  );
};