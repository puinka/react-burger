import { TIngredient } from "../../utils/types";
import { TCurrentBurgerActions } from "../actions/currentBurger";
import {
  ADD_BUN,
  ADD_MAIN,
  DELETE_MAIN,
  REORDER_MAINS,
} from "../constants/currentBurger";

type TInitialState = {
  bun: TIngredient | null;
  mains: TIngredient[];
};

const initialState: TInitialState = {
  bun: null,
  mains: [],
};

export const currentBurgerReducer = (
  state = initialState,
  action: TCurrentBurgerActions
): TInitialState => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.item,
      };
    case ADD_MAIN:
      return {
        ...state,
        mains: [
          ...state.mains,
          { ...action.item, currentID: action.currentID },
        ],
      };
    case DELETE_MAIN:
      return {
        ...state,
        mains: state.mains.filter(
          (item) => item.currentID !== action.currentID
        ),
      };

    case REORDER_MAINS:
      const dragItem = state.mains[action.from];
      const hoverItem = state.mains[action.to];
      const resultMains = [...state.mains];
      resultMains[action.from] = hoverItem;
      resultMains[action.to] = dragItem;
      return {
        ...state,
        mains: resultMains,
      };
    default:
      return state;
  }
};
