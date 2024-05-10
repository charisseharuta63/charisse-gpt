import { Recipe } from "../../components/RecipeCard";

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = (recipe: Recipe): any => ({
    type: ADD_TO_FAVORITES,
    payload: recipe,
});
  
export const removeFromFavorites = (recipe: Recipe): any => ({
    type: REMOVE_FROM_FAVORITES,
    payload: recipe,
});