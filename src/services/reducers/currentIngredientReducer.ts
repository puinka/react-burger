import { TIngredient } from "../../utils/types";
import { TCurrentIngredientActions } from "../actions/currentIngredient";
import {
  RESET_INGREDIENT_MODAL,
  SET_INGREDIENT_MODAL,
} from "../constants/currentIngredient";

type TInitialState = {
  currentIngredient: null | TIngredient;
};

const initialState: TInitialState = {
  currentIngredient: null,
};

export const currentIngredientReducer = (
  state = initialState,
  action: TCurrentIngredientActions
) => {
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
      return state;
  }
};
