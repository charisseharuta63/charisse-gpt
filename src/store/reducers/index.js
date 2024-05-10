import { combineReducers } from 'redux';
import { favorites } from './favorites';

export const rootReducer = combineReducers({
  favorites: favorites,
});

