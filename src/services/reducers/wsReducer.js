import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsActionTypes";

const initialState = {
  wsLoading: false,
  wsConnected: false,
  wsError: null,
  orders: [],
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsLoading: true,
        wsConnected: false,
        wsError: null,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsLoading: false,
        wsConnected: true,
        wsError: null,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsLoading: false,
        wsConnected: false,
        wsError: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsLoading: false,
        wsConnected: false,
        wsError: null,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        wsError: null,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
};
