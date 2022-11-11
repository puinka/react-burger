import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER,
} from "../actions/order.js";

const initialState = {
  number: null,
  isLoading: false,
  error: "",
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        number: action.number,
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case RESET_ORDER:
      return {
        ...state,
        number: null,
      };
    default:
      return { ...state };
  }
};
