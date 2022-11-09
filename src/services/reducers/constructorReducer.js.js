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
    default:
      return { ...state };
  }
};
