import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
} from "../actions/ingredients.js";

const initialState = {
  ingredients: [],
  isLoading: true,
  error: "",
};

export const orderReducer = (state = initialState, action) => {
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
      state;
  }
};
