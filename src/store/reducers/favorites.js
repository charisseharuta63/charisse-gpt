const initialState = [];

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return [...state, action.payload];
    case 'REMOVE_FROM_FAVORITES':
      return state.filter(recipe => recipe.url !== action.payload.url);
    default:
      return state;
  }
};