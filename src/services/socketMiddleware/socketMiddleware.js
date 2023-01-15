export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // if (socket) {
        //   return;
        // }
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

        // socket.onclose = (event) => {
        //   dispatch({ type: onClose, payload: event });
        // };
      }

      if (type === onClose) {
        socket.close(1000, "diconnected");
      }

      next(action);
    };
  };
};
