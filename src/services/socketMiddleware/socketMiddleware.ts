import { Middleware } from "redux";
import { RootState } from "../../utils/types";

type TwsActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const socketMiddleware = (
  wsActions: TwsActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restData } = parsedData;

          dispatch({ type: onMessage, payload: restData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (type === onClose) {
        socket && socket.close(1000, "diconnected");
      }

      next(action);
    };
  };
};
