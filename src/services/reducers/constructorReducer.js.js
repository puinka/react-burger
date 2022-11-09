import { ADD_BUN, ADD_MAIN, DELETE_MAIN } from "../actions/currentBurger.js";

const initialState = {
  bun: null,
  mains: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.item,
      };
    case ADD_MAIN:
      return {
        ...state,
        mains: [...state.mains, action.item],
      };
    case DELETE_MAIN:
      return {
        ...state,
        //TODO filter !== id
      };
    default:
      return { ...state };
  }
};
