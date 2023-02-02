import { TOrder } from "../../utils/types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/ws";

interface IwsInitAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

interface IwsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IwsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Error | null;
}

interface IwsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IwsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: { orders: TOrder[]; total: number; totalToday: number };
}

export type TwsActions =
  | IwsInitAction
  | IwsConnectionSuccessAction
  | IwsConnectionErrorAction
  | IwsConnectionCloseAction
  | IwsGetMessageAction;

export const wsInit = (wsURL: string) => {
  return { type: WS_CONNECTION_START, payload: wsURL };
};

export const wsConnectionSuccess = () => {
  return { type: WS_CONNECTION_SUCCESS };
};

export const wsConnectionError = () => {
  return { type: WS_CONNECTION_ERROR };
};

export const wsConnectionClose = () => {
  return { type: WS_CONNECTION_CLOSED };
};

export const wsGetMessage = () => {
  return { type: WS_GET_MESSAGE };
};

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
