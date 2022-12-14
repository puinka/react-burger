import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
} from "../actions/ingredients.js";

const initialState = {
  ingredients: [],
  isLoading: false,
  error: "",
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: action.ingredients,
      };
    case INGREDIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
