import {
  SET_INGREDIENT_MODAL,
  RESET_INGREDIENT_MODAL,
} from "../actions/currentIngredient";

const initialState = {
  currentIngredient: null,
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL:
      return {
        ...state,
        currentIngredient: action.item,
      };
    case RESET_INGREDIENT_MODAL:
      return {
        ...state,
        currentIngredient: null,
      };
    default:
      return { ...state };
  }
};
