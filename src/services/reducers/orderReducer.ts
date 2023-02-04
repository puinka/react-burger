import { TOrderActions } from "../actions/order";
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  RESET_ORDER,
} from "../constants/order";

type TInitialState = {
  number: null | number;
  isLoading: boolean;
  error: null | string;
};

const initialState: TInitialState = {
  number: null,
  isLoading: false,
  error: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
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
        error: null,
      };
    default:
      return state;
  }
};
