import React from 'react';
import '../components/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/actions/favorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export interface Recipe {
    label: string;
    url: string;
    isFavorite: boolean;
  }
  
interface RecipeCardProps {
    recipe: Recipe;
    index: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: any) => state.favorites);
    const isFavorite = favorites.some((favRecipe: Recipe) => favRecipe.url === recipe.url);
    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(recipe));
        } else {
            dispatch(addToFavorites(recipe));
        }
    };

  return (
    <div className='recipe-container'>
      {/* do something with isFavorite here */}
        <FontAwesomeIcon icon={faHeart} className={'heart' + (isFavorite ? '-red' : '')} onClick={handleToggleFavorite}/>
        <div key={index} className='recipe' onClick={() => window.open(recipe.url, '_blank', 'noopener noreferrer')}>
            {recipe.label}
        </div>
    </div>
  );
};