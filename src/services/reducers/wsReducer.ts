import { TOrder } from "../../utils/types";
import { TwsActions } from "../actions/wsActionTypes";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws";

type TInitialState = {
  wsLoading: boolean;
  wsConnected: boolean;
  wsError: null | Error;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TInitialState = {
  wsLoading: false,
  wsConnected: false,
  wsError: null,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (
  state = initialState,
  action: TwsActions
): TInitialState => {
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
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
