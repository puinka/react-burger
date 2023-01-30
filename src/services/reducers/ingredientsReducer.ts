import { TIngredient } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
} from "../constants/ingredients";

type TInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | string;
};

const initialState: TInitialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: action.ingredients,
        error: null,
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
